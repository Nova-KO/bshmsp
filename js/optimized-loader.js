// Optimized JavaScript Loader
// This script optimizes the loading of large JavaScript bundles

class OptimizedLoader {
    constructor() {
        this.loadedScripts = new Set();
        this.loadingPromises = new Map();
    }

    // Load script with caching and error handling
    async loadScript(src, options = {}) {
        // Return if already loaded
        if (this.loadedScripts.has(src)) {
            return Promise.resolve();
        }

        // Return existing promise if already loading
        if (this.loadingPromises.has(src)) {
            return this.loadingPromises.get(src);
        }

        const loadPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = options.async !== false;
            script.defer = options.defer || false;

            // Add error handling
            script.onerror = () => {
                console.warn(`Failed to load script: ${src}`);
                this.loadingPromises.delete(src);
                reject(new Error(`Failed to load script: ${src}`));
            };

            script.onload = () => {
                this.loadedScripts.add(src);
                this.loadingPromises.delete(src);
                resolve();
            };

            document.head.appendChild(script);
        });

        this.loadingPromises.set(src, loadPromise);
        return loadPromise;
    }

    // Load essential scripts immediately
    async loadEssentialScripts() {
        const essentialScripts = [
            '/js/includes.js',
            '/js/sanity-config.js'
        ];

        try {
            await Promise.all(essentialScripts.map(src => this.loadScript(src)));
        } catch (error) {
            console.error('Failed to load essential scripts:', error);
        }
    }

    // Load Webflow scripts only when needed
    async loadWebflowScripts() {
        // Only load if Webflow elements are present
        if (document.querySelector('[data-w-id]') || document.querySelector('.w-nav')) {
            const webflowScripts = [
                '/js/webflow.schunk.121b0d7ff03e0f4a.js',
                '/js/webflow-script.js'
            ];

            try {
                await Promise.all(webflowScripts.map(src => this.loadScript(src, { async: true })));
            } catch (error) {
                console.warn('Webflow scripts failed to load:', error);
            }
        }
    }

    // Load jQuery only when needed
    async loadJQuery() {
        if (typeof $ === 'undefined' && document.querySelector('[data-jquery]')) {
            try {
                await this.loadScript('/js/jquery.js', { defer: true });
            } catch (error) {
                console.warn('jQuery failed to load:', error);
            }
        }
    }

    // Load large animation files only when needed
    async loadAnimations() {
        if (document.querySelector('[data-animation]')) {
            try {
                await this.loadScript('/js/ui_animation_v09.json', { async: true });
            } catch (error) {
                console.warn('Animation file failed to load:', error);
            }
        }
    }

    // Load admin scripts only on admin pages
    async loadAdminScripts() {
        if (window.location.pathname.includes('admin')) {
            const adminScripts = [
                '/js/admin-auth-server.js',
                '/js/sanity-client.js'
            ];

            try {
                await Promise.all(adminScripts.map(src => this.loadScript(src)));
            } catch (error) {
                console.error('Admin scripts failed to load:', error);
            }
        }
    }

    // Initialize optimized loading
    async init() {
        // Load essential scripts first
        await this.loadEssentialScripts();

        // Load other scripts based on page needs
        await Promise.all([
            this.loadWebflowScripts(),
            this.loadJQuery(),
            this.loadAnimations(),
            this.loadAdminScripts()
        ]);
    }
}

// Initialize optimized loader
const optimizedLoader = new OptimizedLoader();

// Start loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => optimizedLoader.init());
} else {
    optimizedLoader.init();
} 