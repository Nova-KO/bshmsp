// Environment Configuration Utility
// This file provides a centralized way to access environment variables

class EnvironmentConfig {
    constructor() {
        this.config = this.loadConfig();
    }

    // Load configuration from environment or defaults
    loadConfig() {
        return {
            // Sanity Configuration
            sanity: {
                projectId: this.getEnvVar('SANITY_STUDIO_PROJECT_ID', 'w38otuoh'),
                dataset: this.getEnvVar('SANITY_STUDIO_DATASET', 'production'),
                apiVersion: this.getEnvVar('SANITY_API_VERSION', '2023-10-01'),
                useCdn: this.getEnvVar('NODE_ENV', 'development') === 'production'
            },

            // Website Configuration
            website: {
                baseUrl: this.getEnvVar('BASE_URL', 'https://bshtechnologies.in'),
                siteName: this.getEnvVar('SITE_NAME', 'BSH Technologies'),
                siteDescription: this.getEnvVar('SITE_DESCRIPTION', 'Professional IT Support, Cybersecurity, Cloud Services, and Network Management for businesses'),
                contactEmail: this.getEnvVar('CONTACT_EMAIL', 'contact@bshtechnologies.in')
            },

            // Analytics Configuration
            analytics: {
                googleAnalyticsId: this.getEnvVar('GOOGLE_ANALYTICS_ID', ''),
                googleTagManagerId: this.getEnvVar('GOOGLE_TAG_MANAGER_ID', ''),
                facebookPixelId: this.getEnvVar('FACEBOOK_PIXEL_ID', ''),
                linkedinInsightTag: this.getEnvVar('LINKEDIN_INSIGHT_TAG', ''),
                enabled: this.getEnvVar('ENABLE_ANALYTICS', 'true') === 'true'
            },

            // Feature Flags
            features: {
                errorTracking: this.getEnvVar('ENABLE_ERROR_TRACKING', 'true') === 'true',
                debug: this.getEnvVar('DEBUG', 'false') === 'true',
                logLevel: this.getEnvVar('LOG_LEVEL', 'info')
            },

            // Performance Configuration
            performance: {
                cacheDuration: parseInt(this.getEnvVar('CACHE_DURATION', '3600')),
                cdnUrl: this.getEnvVar('CDN_URL', '')
            }
        };
    }

    // Get environment variable with fallback
    getEnvVar(key, defaultValue = '') {
        // In browser environment, try to get from window object
        if (typeof window !== 'undefined' && window.ENV && window.ENV[key]) {
            return window.ENV[key];
        }
        
        // For server-side, this would be process.env[key]
        // For now, return default value
        return defaultValue;
    }

    // Get specific configuration section
    get(section, key = null) {
        if (key) {
            return this.config[section]?.[key];
        }
        return this.config[section];
    }

    // Check if feature is enabled
    isFeatureEnabled(feature) {
        return this.config.features[feature] === true;
    }

    // Get analytics configuration
    getAnalytics() {
        return this.config.analytics;
    }

    // Get Sanity configuration
    getSanity() {
        return this.config.sanity;
    }

    // Get website configuration
    getWebsite() {
        return this.config.website;
    }

    // Check if in development mode
    isDevelopment() {
        return this.getEnvVar('NODE_ENV', 'development') === 'development';
    }

    // Check if in production mode
    isProduction() {
        return this.getEnvVar('NODE_ENV', 'development') === 'production';
    }

    // Get base URL for API calls
    getApiBaseUrl() {
        return this.config.website.baseUrl;
    }

    // Get CDN URL for assets
    getCdnUrl() {
        return this.config.performance.cdnUrl || this.config.website.baseUrl;
    }

    // Validate required configuration
    validate() {
        const required = [
            'sanity.projectId',
            'sanity.dataset',
            'website.baseUrl'
        ];

        const missing = required.filter(key => {
            const value = this.getByPath(key);
            return !value || value === '';
        });

        if (missing.length > 0) {
            console.warn('Missing required environment variables:', missing);
            return false;
        }

        return true;
    }

    // Get value by dot notation path
    getByPath(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.config);
    }

    // Set configuration value (for testing or runtime updates)
    set(section, key, value) {
        if (!this.config[section]) {
            this.config[section] = {};
        }
        this.config[section][key] = value;
    }

    // Export configuration for use in other modules
    export() {
        return JSON.parse(JSON.stringify(this.config));
    }
}

// Create global instance
const envConfig = new EnvironmentConfig();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnvironmentConfig, envConfig };
} else {
    // Browser environment
    window.envConfig = envConfig;
}

// Auto-validate on load
if (envConfig.isDevelopment()) {
    envConfig.validate();
} 