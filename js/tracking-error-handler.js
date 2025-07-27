// Tracking Script Error Handler
// This script handles errors from Facebook Pixel, LinkedIn Insight Tag, and other tracking scripts

(function() {
    'use strict';
    
    // Configuration
    const config = {
        facebookPixelId: '2106360683057343',
        linkedinPartnerId: '8024057',
        enableErrorLogging: true,
        suppressConsoleWarnings: false
    };
    
    // Error handling for Facebook Pixel
    function handleFacebookPixel() {
        try {
            // Check if Facebook Pixel is blocked
            if (typeof fbq === 'undefined') {
                if (!config.suppressConsoleWarnings) {
                    console.warn('Facebook Pixel blocked by ad blocker or not loaded');
                }
                return false;
            }
            
            // Initialize Facebook Pixel if not already done
            if (typeof fbq === 'function') {
                fbq('init', config.facebookPixelId);
                fbq('track', 'PageView');
                return true;
            }
        } catch (error) {
            if (config.enableErrorLogging) {
                console.warn('Facebook Pixel error:', error);
            }
        }
        return false;
    }
    
    // Error handling for LinkedIn Insight Tag
    function handleLinkedInInsight() {
        try {
            // Check if LinkedIn Insight Tag is blocked
            if (typeof _linkedin_partner_id === 'undefined') {
                if (!config.suppressConsoleWarnings) {
                    console.warn('LinkedIn Insight Tag blocked by ad blocker or not loaded');
                }
                return false;
            }
            
            // Initialize LinkedIn Insight Tag
            _linkedin_partner_id = config.linkedinPartnerId;
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            
            return true;
        } catch (error) {
            if (config.enableErrorLogging) {
                console.warn('LinkedIn Insight Tag error:', error);
            }
        }
        return false;
    }
    
    // Error handling for Google Analytics
    function handleGoogleAnalytics() {
        try {
            // Check if Google Analytics is loaded
            if (typeof gtag === 'undefined') {
                if (!config.suppressConsoleWarnings) {
                    console.warn('Google Analytics not loaded');
                }
                return false;
            }
            
            return true;
        } catch (error) {
            if (config.enableErrorLogging) {
                console.warn('Google Analytics error:', error);
            }
        }
        return false;
    }
    
    // Handle KaTeX warnings (browser extension interference)
    function handleKaTeXWarnings() {
        // Override console.warn to filter out KaTeX warnings
        const originalWarn = console.warn;
        console.warn = function(...args) {
            const message = args.join(' ');
            if (message.includes('KaTeX') && message.includes('quirks mode')) {
                // Suppress KaTeX quirks mode warnings (usually from browser extensions)
                return;
            }
            originalWarn.apply(console, args);
        };
    }
    
    // Handle Long Running Recorder warnings (browser extension)
    function handleLongRunningRecorder() {
        // Override console.log to filter out Long Running Recorder messages
        const originalLog = console.log;
        console.log = function(...args) {
            const message = args.join(' ');
            if (message.includes('Long Running Recorder') || 
                message.includes('Content script initialised') ||
                message.includes('Recorder disabled')) {
                // Suppress Long Running Recorder messages (browser extension)
                return;
            }
            originalLog.apply(console, args);
        };
    }
    
    // Handle Canvas/Blackboard integration warnings
    function handleCanvasBlackboardWarnings() {
        const originalWarn = console.warn;
        console.warn = function(...args) {
            const message = args.join(' ');
            if (message.includes('Not a Canvas page') || 
                message.includes('Not a Blackboard page') ||
                message.includes('CanvasIntegration will not initialize') ||
                message.includes('BlackboardIntegration will not initialize')) {
                // Suppress Canvas/Blackboard warnings (browser extension)
                return;
            }
            originalWarn.apply(console, args);
        };
    }
    
    // Initialize all error handlers
    function initializeErrorHandlers() {
        // Handle browser extension warnings
        handleKaTeXWarnings();
        handleLongRunningRecorder();
        handleCanvasBlackboardWarnings();
        
        // Handle tracking script errors
        window.addEventListener('load', function() {
            setTimeout(function() {
                handleFacebookPixel();
                handleLinkedInInsight();
                handleGoogleAnalytics();
            }, 1000); // Delay to allow scripts to load
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeErrorHandlers);
    } else {
        initializeErrorHandlers();
    }
    
    // Export functions for manual testing
    window.trackingErrorHandler = {
        handleFacebookPixel,
        handleLinkedInInsight,
        handleGoogleAnalytics,
        config
    };
    
})(); 