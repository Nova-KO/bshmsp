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

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Load header
        const headerPlaceholder = document.querySelector('[data-include="header"]');
        if (headerPlaceholder) {
            loadInclude('[data-include="header"]', 'includes/header.html');
        }

        // Load footer  
        const footerPlaceholder = document.querySelector('[data-include="footer"]');
        if (footerPlaceholder) {
            loadInclude('[data-include="footer"]', 'includes/footer.html');
        }
    });
})(); 