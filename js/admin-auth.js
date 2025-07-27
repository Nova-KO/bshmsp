// Admin Authentication Middleware
class AdminAuth {
    constructor() {
        this.checkAuth();
    }

    // Check if user is authenticated
    checkAuth() {
        const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
        const loginTime = sessionStorage.getItem('adminLoginTime');
        
        // Check if session is expired (8 hours)
        const sessionExpiry = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        const isExpired = loginTime && (Date.now() - parseInt(loginTime)) > sessionExpiry;
        
        if (!isAuthenticated || isExpired) {
            this.redirectToLogin();
        }
    }

    // Redirect to login page
    redirectToLogin() {
        if (window.location.pathname !== '/admin-login.html') {
            window.location.href = '/admin-login.html';
        }
    }

    // Logout user
    logout() {
        sessionStorage.removeItem('adminAuthenticated');
        sessionStorage.removeItem('adminLoginTime');
        this.redirectToLogin();
    }

    // Get current user info
    getCurrentUser() {
        return {
            isAuthenticated: sessionStorage.getItem('adminAuthenticated') === 'true',
            loginTime: sessionStorage.getItem('adminLoginTime')
        };
    }
}

// Initialize auth on admin pages
if (window.location.pathname.includes('admin-dashboard') || window.location.pathname.includes('admin-jobs')) {
    const auth = new AdminAuth();
    
    // Add logout functionality to window
    window.adminLogout = function() {
        auth.logout();
    };
} 