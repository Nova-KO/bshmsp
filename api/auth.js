// Admin Authentication API Endpoints
// This provides REST API endpoints for admin authentication

const { 
    handleLogin, 
    handlePasswordReset, 
    handleLogout, 
    requireAuth 
} = require('./admin-auth');

// Login endpoint
async function loginEndpoint(req, res) {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }
        
        const result = await handleLogin(username, password);
        
        if (result.success) {
            // Set session token as HTTP-only cookie
            res.setHeader('Set-Cookie', `sessionToken=${result.sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`);
            
            return res.json({
                success: true,
                message: result.message
            });
        } else {
            return res.status(401).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Password reset endpoint
async function passwordResetEndpoint(req, res) {
    try {
        const { username, securityAnswer, newPassword } = req.body;
        
        if (!username || !securityAnswer || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Username, security answer, and new password are required'
            });
        }
        
        // Validate password strength
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }
        
        const result = await handlePasswordReset(username, securityAnswer, newPassword);
        
        if (result.success) {
            return res.json({
                success: true,
                message: result.message
            });
        } else {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Logout endpoint
function logoutEndpoint(req, res) {
    try {
        const sessionToken = req.cookies?.sessionToken;
        
        if (sessionToken) {
            handleLogout(sessionToken);
        }
        
        // Clear the session cookie
        res.setHeader('Set-Cookie', 'sessionToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
        
        return res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Verify session endpoint
function verifySessionEndpoint(req, res) {
    try {
        const sessionToken = req.cookies?.sessionToken;
        
        if (!sessionToken) {
            return res.status(401).json({
                success: false,
                message: 'No session token found'
            });
        }
        
        const isValid = requireAuth(req, res, () => {
            return res.json({
                success: true,
                message: 'Session is valid'
            });
        });
        
        if (isValid === false) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired session'
            });
        }
    } catch (error) {
        console.error('Session verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

// Export endpoints for use in server.js
module.exports = {
    loginEndpoint,
    passwordResetEndpoint,
    logoutEndpoint,
    verifySessionEndpoint
}; 