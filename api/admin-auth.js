// Admin Authentication API
// This provides server-side authentication for admin access

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// In production, these should be stored in environment variables
const ADMIN_CREDENTIALS = {
    username: 'admin',
    // This should be a hashed password, not plain text
    passwordHash: '$2a$10$YourHashedPasswordHere', // Replace with actual hash
    securityQuestion: 'What is your favorite color?',
    securityAnswerHash: '$2a$10$YourHashedAnswerHere' // Replace with actual hash
};

// Session storage (in production, use Redis or database)
const activeSessions = new Map();

// Generate session token
function generateSessionToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Hash password
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

// Verify password
async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Create session
function createSession(userId) {
    const sessionToken = generateSessionToken();
    const session = {
        userId,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours
    };
    activeSessions.set(sessionToken, session);
    return sessionToken;
}

// Verify session
function verifySession(sessionToken) {
    const session = activeSessions.get(sessionToken);
    if (!session) return false;
    
    if (new Date() > session.expiresAt) {
        activeSessions.delete(sessionToken);
        return false;
    }
    
    return true;
}

// Login handler
async function handleLogin(username, password) {
    if (username !== ADMIN_CREDENTIALS.username) {
        return { success: false, message: 'Invalid credentials' };
    }
    
    const isValidPassword = await verifyPassword(password, ADMIN_CREDENTIALS.passwordHash);
    if (!isValidPassword) {
        return { success: false, message: 'Invalid credentials' };
    }
    
    const sessionToken = createSession(username);
    return { 
        success: true, 
        sessionToken,
        message: 'Login successful'
    };
}

// Password reset handler
async function handlePasswordReset(username, securityAnswer, newPassword) {
    if (username !== ADMIN_CREDENTIALS.username) {
        return { success: false, message: 'Invalid username' };
    }
    
    const isValidAnswer = await verifyPassword(securityAnswer, ADMIN_CREDENTIALS.securityAnswerHash);
    if (!isValidAnswer) {
        return { success: false, message: 'Invalid security answer' };
    }
    
    // In production, update the password hash in database
    const newPasswordHash = await hashPassword(newPassword);
    
    return { 
        success: true, 
        message: 'Password updated successfully',
        newPasswordHash // In production, save this to database
    };
}

// Logout handler
function handleLogout(sessionToken) {
    activeSessions.delete(sessionToken);
    return { success: true, message: 'Logged out successfully' };
}

// Middleware to check authentication
function requireAuth(req, res, next) {
    const sessionToken = req.headers['x-session-token'] || req.cookies?.sessionToken;
    
    if (!sessionToken || !verifySession(sessionToken)) {
        return res.status(401).json({ 
            success: false, 
            message: 'Authentication required' 
        });
    }
    
    next();
}

module.exports = {
    handleLogin,
    handlePasswordReset,
    handleLogout,
    requireAuth,
    verifySession,
    ADMIN_CREDENTIALS
}; 