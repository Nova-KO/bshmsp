// Server-side Admin Authentication
// This replaces the client-side authentication with secure server-side authentication

class AdminAuthServer {
    constructor() {
        this.baseUrl = window.location.origin;
        this.isAuthenticated = false;
        this.sessionToken = null;
    }

    // Check if user is already authenticated
    async checkAuthStatus() {
        try {
            const response = await fetch(`${this.baseUrl}/api/auth/verify`, {
                method: 'GET',
                credentials: 'include', // Include cookies
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                this.isAuthenticated = true;
                return true;
            } else {
                this.isAuthenticated = false;
                return false;
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            this.isAuthenticated = false;
            return false;
        }
    }

    // Login with server-side authentication
    async login(username, password) {
        try {
            const response = await fetch(`${this.baseUrl}/api/auth/login`, {
                method: 'POST',
                credentials: 'include', // Include cookies
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                this.isAuthenticated = true;
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error during login' };
        }
    }

    // Password reset with server-side authentication
    async resetPassword(username, securityAnswer, newPassword) {
        try {
            const response = await fetch(`${this.baseUrl}/api/auth/password-reset`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, securityAnswer, newPassword })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || 'Password reset failed' };
            }
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, message: 'Network error during password reset' };
        }
    }

    // Logout
    async logout() {
        try {
            const response = await fetch(`${this.baseUrl}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                this.isAuthenticated = false;
                this.sessionToken = null;
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || 'Logout failed' };
            }
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: 'Network error during logout' };
        }
    }

    // Redirect to login if not authenticated
    async requireAuth() {
        const isAuth = await this.checkAuthStatus();
        if (!isAuth) {
            window.location.href = '/admin-login.html';
            return false;
        }
        return true;
    }

    // Get authentication status
    getAuthStatus() {
        return this.isAuthenticated;
    }
}

// Initialize admin authentication
const adminAuth = new AdminAuthServer();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdminAuthServer, adminAuth };
} 