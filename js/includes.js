// Include external HTML files
(function() {
    // Page Loader functionality
    function initializePageLoader() {
        const pageLoader = document.getElementById('pageLoader');
        
        if (!pageLoader) {
            console.log('Page loader not found');
            return;
        }
        
        // Hide loader when page is fully loaded
        function hideLoader() {
            if (pageLoader) {
                pageLoader.classList.add('hidden');
                // Remove loader from DOM after animation completes
                setTimeout(() => {
                    if (pageLoader.parentNode) {
                        pageLoader.parentNode.removeChild(pageLoader);
                    }
                }, 500);
            }
        }
        
        // Hide loader immediately when page is ready
        if (document.readyState === 'complete') {
            // Page already loaded, hide immediately
            hideLoader();
        } else {
            // Wait for page to load and hide immediately
            window.addEventListener('load', function() {
                hideLoader();
            });
        }
        
        // Fallback: hide loader after 300ms maximum (in case something goes wrong)
        setTimeout(hideLoader, 300);
        
        console.log('Page loader initialized');
    }
    
    function loadInclude(selector, file, callback) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = html;
                    if (callback) callback();
                }
            })
            .catch(error => {
                console.error('Error loading include:', error);
            });
    }

    // Initialize desktop dropdown functionality
    function initializeDesktopDropdown() {
        const servicesDropdown = document.querySelector('.nav-item.is-dropdown-d');
        const dropdownToggle = servicesDropdown?.querySelector('.nav-link');
        const dropdown = servicesDropdown?.querySelector('.dropdown');
        
        if (!servicesDropdown || !dropdownToggle || !dropdown) {
            console.log('Desktop dropdown elements not found');
            return;
        }
        
        let isOpen = false;
        
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            isOpen = !isOpen;
            
            if (isOpen) {
                dropdown.style.display = 'flex';
                dropdownToggle.classList.add('w--open');
            } else {
                dropdown.style.display = 'none';
                dropdownToggle.classList.remove('w--open');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!servicesDropdown.contains(e.target)) {
                isOpen = false;
                dropdown.style.display = 'none';
                dropdownToggle.classList.remove('w--open');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                isOpen = false;
                dropdown.style.display = 'none';
                dropdownToggle.classList.remove('w--open');
            }
        });
        
        // Hover functionality removed - dropdown only works on click
        // This ensures the dropdown only opens/closes when the Services link is clicked
        
        console.log('Desktop dropdown initialized successfully');
    }

    // Initialize hamburger menu functionality
    function initializeHamburgerMenu() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const mobileServicesToggle = document.getElementById('mobileServicesToggle');
        const mobileServicesDropdown = document.getElementById('mobileServicesDropdown');
        
        if (!hamburgerBtn || !mobileNavOverlay) {
            console.log('Hamburger menu elements not found');
            return;
        }
        
        // Toggle mobile navigation
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileNavOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Toggle services dropdown in mobile
        if (mobileServicesToggle && mobileServicesDropdown) {
            mobileServicesToggle.addEventListener('click', function(e) {
                e.preventDefault();
                const isOpen = mobileServicesDropdown.style.display === 'block';
                mobileServicesDropdown.style.display = isOpen ? 'none' : 'block';
            });
        }
        
        // Close mobile nav when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(#mobileServicesToggle), .mobile-services-link, .mobile-cta-btn');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileServicesDropdown) {
                    mobileServicesDropdown.style.display = 'none';
                }
            });
        });
        
        // Close mobile nav when clicking overlay
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                hamburgerBtn.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileServicesDropdown) {
                    mobileServicesDropdown.style.display = 'none';
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                hamburgerBtn.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileServicesDropdown) {
                    mobileServicesDropdown.style.display = 'none';
                }
            }
        });
        
        console.log('Hamburger menu initialized successfully');
    }

    // Function to load includes with retry mechanism
    function loadIncludesWithRetry() {
        console.log('Loading includes...');
        
        // Initialize page loader immediately
        initializePageLoader();
        
        // Load header with callback to initialize both hamburger menu and desktop dropdown
        const headerPlaceholder = document.querySelector('[data-include="header"]');
        if (headerPlaceholder) {
            console.log('Header placeholder found, loading header...');
            loadInclude('[data-include="header"]', '/includes/header.html', function() {
                console.log('Header loaded successfully');
                // Small delay to ensure DOM elements are ready
                setTimeout(function() {
                    initializeHamburgerMenu();
                    initializeDesktopDropdown();
                }, 100);
            });
        } else {
            console.log('Header placeholder not found');
        }

        // Load footer  
        const footerPlaceholder = document.querySelector('[data-include="footer"]');
        if (footerPlaceholder) {
            console.log('Footer placeholder found, loading footer...');
            loadInclude('[data-include="footer"]', '/includes/footer.html');
        } else {
            console.log('Footer placeholder not found');
        }
    }

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', loadIncludesWithRetry);
    
    // Fallback: try loading after a short delay if DOM is already ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(loadIncludesWithRetry, 50);
    }
    
    // Additional fallback: try loading after window load
    window.addEventListener('load', function() {
        // Check if includes have already loaded
        const headerPlaceholder = document.querySelector('[data-include="header"]');
        const footerPlaceholder = document.querySelector('[data-include="footer"]');
        
        if (headerPlaceholder && headerPlaceholder.innerHTML.trim() === '') {
            console.log('Header still empty after window load, retrying...');
            loadIncludesWithRetry();
        }
        if (footerPlaceholder && footerPlaceholder.innerHTML.trim() === '') {
            console.log('Footer still empty after window load, retrying...');
            loadIncludesWithRetry();
        }
    });
})(); 