// Include external HTML files
(function() {
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

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Load header with callback to initialize hamburger menu
        const headerPlaceholder = document.querySelector('[data-include="header"]');
        if (headerPlaceholder) {
            loadInclude('[data-include="header"]', 'includes/header.html', function() {
                // Small delay to ensure DOM elements are ready
                setTimeout(initializeHamburgerMenu, 100);
            });
        }

        // Load footer  
        const footerPlaceholder = document.querySelector('[data-include="footer"]');
        if (footerPlaceholder) {
            loadInclude('[data-include="footer"]', 'includes/footer.html');
        }
    });
})(); 