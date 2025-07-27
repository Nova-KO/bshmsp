// Comprehensive Error Handling System
// This script provides robust error handling for the website

class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxLogSize = 100;
        this.init();
    }

    init() {
        // Global error handlers
        window.addEventListener('error', (event) => this.handleError(event.error, event.filename, event.lineno));
        window.addEventListener('unhandledrejection', (event) => this.handlePromiseRejection(event.reason));
        
        // Network error handling
        this.handleNetworkErrors();
        
        // Form submission error handling
        this.handleFormErrors();
        
        // API error handling
        this.handleAPIErrors();
    }

    // Handle JavaScript errors
    handleError(error, filename, lineno) {
        const errorInfo = {
            type: 'JavaScript Error',
            message: error.message,
            stack: error.stack,
            filename: filename,
            lineno: lineno,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.logError(errorInfo);
        this.showUserFriendlyError(errorInfo);
    }

    // Handle promise rejections
    handlePromiseRejection(reason) {
        const errorInfo = {
            type: 'Promise Rejection',
            message: reason.message || 'Promise was rejected',
            stack: reason.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.logError(errorInfo);
        this.showUserFriendlyError(errorInfo);
    }

    // Handle network errors
    handleNetworkErrors() {
        // Monitor fetch requests
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                return response;
            } catch (error) {
                const errorInfo = {
                    type: 'Network Error',
                    message: error.message,
                    url: args[0],
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent
                };

                this.logError(errorInfo);
                this.showNetworkError(errorInfo);
                throw error;
            }
        };
    }

    // Handle form submission errors
    handleFormErrors() {
        document.addEventListener('submit', (event) => {
            const form = event.target;
            
            // Add error handling to form submission
            form.addEventListener('submit', async (e) => {
                try {
                    // Validate form before submission
                    if (!form.checkValidity()) {
                        throw new Error('Please fill in all required fields correctly');
                    }
                } catch (error) {
                    e.preventDefault();
                    this.showFormError(error.message, form);
                }
            });
        });
    }

    // Handle API errors
    handleAPIErrors() {
        // Monitor API calls
        const originalXMLHttpRequest = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            const xhr = new originalXMLHttpRequest();
            
            xhr.addEventListener('error', () => {
                const errorInfo = {
                    type: 'API Error',
                    message: 'API request failed',
                    url: xhr.responseURL,
                    status: xhr.status,
                    timestamp: new Date().toISOString()
                };

                this.logError(errorInfo);
                this.showAPIError(errorInfo);
            });
            
            return xhr;
        };
    }

    // Log error to console and internal log
    logError(errorInfo) {
        console.error('Error logged:', errorInfo);
        
        this.errorLog.push(errorInfo);
        
        // Keep log size manageable
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog.shift();
        }
        
        // Send to analytics if available
        this.sendToAnalytics(errorInfo);
    }

    // Show user-friendly error message
    showUserFriendlyError(errorInfo) {
        // Don't show technical errors to users
        if (errorInfo.type === 'JavaScript Error' && !this.isDevelopment()) {
            return;
        }

        this.showNotification(
            'Something went wrong. Please try refreshing the page.',
            'error'
        );
    }

    // Show network error message
    showNetworkError(errorInfo) {
        this.showNotification(
            'Network connection issue. Please check your internet connection.',
            'warning'
        );
    }

    // Show form error message
    showFormError(message, form) {
        // Remove existing error messages
        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
            padding: 8px;
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
        `;
        errorElement.textContent = message;

        // Insert error message after form
        form.parentNode.insertBefore(errorElement, form.nextSibling);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.remove();
            }
        }, 5000);
    }

    // Show API error message
    showAPIError(errorInfo) {
        this.showNotification(
            'Service temporarily unavailable. Please try again later.',
            'error'
        );
    }

    // Show notification to user
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Set background color based on type
        const colors = {
            error: '#dc3545',
            warning: '#ffc107',
            success: '#28a745',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Send error to analytics
    sendToAnalytics(errorInfo) {
        // Send to Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: errorInfo.message,
                fatal: false
            });
        }

        // Send to custom analytics endpoint
        this.sendToCustomAnalytics(errorInfo);
    }

    // Send to custom analytics endpoint
    async sendToCustomAnalytics(errorInfo) {
        try {
            await fetch('/api/analytics/error', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(errorInfo)
            });
        } catch (error) {
            // Silently fail - don't create error loops
            console.warn('Failed to send error to analytics:', error);
        }
    }

    // Check if in development mode
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('dev');
    }

    // Get error log
    getErrorLog() {
        return this.errorLog;
    }

    // Clear error log
    clearErrorLog() {
        this.errorLog = [];
    }
}

// Initialize error handler
const errorHandler = new ErrorHandler();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ErrorHandler, errorHandler };
} 