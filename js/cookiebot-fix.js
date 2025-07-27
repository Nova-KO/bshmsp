// Cookiebot Domain Authorization Fix
// This script handles Cookiebot configuration issues and domain authorization

(function() {
    'use strict';
    
    // Check if we're on the correct domain
    const currentDomain = window.location.hostname.toLowerCase();
    const expectedDomain = 'bshtechnologies.in';
    
    // Only initialize Cookiebot if we're on the correct domain
    if (currentDomain === expectedDomain || currentDomain === 'www.' + expectedDomain) {
        // Initialize Cookiebot with proper error handling
        window.addEventListener('load', function() {
            try {
                // Check if Cookiebot script is loaded
                if (typeof window.Cookiebot === 'undefined') {
                    console.warn('Cookiebot not loaded, initializing manually...');
                    initializeCookiebot();
                }
            } catch (error) {
                console.warn('Cookiebot initialization error:', error);
                // Fallback to basic cookie consent
                initializeBasicCookieConsent();
            }
        });
    } else {
        console.warn('Cookiebot: Domain not authorized. Current domain:', currentDomain);
        // Initialize basic cookie consent for unauthorized domains
        initializeBasicCookieConsent();
    }
    
    function initializeCookiebot() {
        // Create Cookiebot script element
        const script = document.createElement('script');
        script.id = 'Cookiebot';
        script.src = 'https://consent.cookiebot.com/uc.js';
        script.setAttribute('data-cbid', '9c88c47e-a219-4bbd-a129-ab164c18cbc1');
        script.setAttribute('data-blockingmode', 'auto');
        script.type = 'text/javascript';
        
        // Add error handling
        script.onerror = function() {
            console.warn('Failed to load Cookiebot, using fallback');
            initializeBasicCookieConsent();
        };
        
        document.head.appendChild(script);
    }
    
    function initializeBasicCookieConsent() {
        // Basic cookie consent fallback
        if (!localStorage.getItem('cookieConsent')) {
            showBasicCookieBanner();
        }
    }
    
    function showBasicCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'basic-cookie-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #333;
            color: white;
            padding: 15px;
            text-align: center;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
        `;
        
        banner.innerHTML = `
            <p>This website uses cookies to ensure you get the best experience. 
            <button onclick="acceptCookies()" style="background: #4CAF50; color: white; border: none; padding: 8px 16px; margin-left: 10px; cursor: pointer; border-radius: 4px;">Accept</button>
            <button onclick="declineCookies()" style="background: #f44336; color: white; border: none; padding: 8px 16px; margin-left: 10px; cursor: pointer; border-radius: 4px;">Decline</button>
            </p>
        `;
        
        document.body.appendChild(banner);
        
        // Add global functions
        window.acceptCookies = function() {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.remove();
        };
        
        window.declineCookies = function() {
            localStorage.setItem('cookieConsent', 'declined');
            banner.remove();
        };
    }
    
    // Handle tracking script errors gracefully
    function handleTrackingErrors() {
        // Facebook Pixel error handling
        if (typeof fbq === 'undefined') {
            console.warn('Facebook Pixel not loaded (likely blocked by ad blocker)');
        }
        
        // LinkedIn Insight Tag error handling
        if (typeof _linkedin_partner_id === 'undefined') {
            console.warn('LinkedIn Insight Tag not loaded (likely blocked by ad blocker)');
        }
    }
    
    // Initialize error handling
    window.addEventListener('load', handleTrackingErrors);
    
})(); 