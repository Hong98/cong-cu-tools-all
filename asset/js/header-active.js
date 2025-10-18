/**
 * Auto-activate navigation menu based on current page URL
 * This function should be called AFTER header is loaded into DOM
 */
function activateCurrentMenu() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove all active classes first
    document.querySelectorAll('.doitenhinhanhsticky__nav-link--active').forEach(link => {
        link.classList.remove('doitenhinhanhsticky__nav-link--active');
    });
    
    // Find and activate matching menu item
    document.querySelectorAll('.doitenhinhanhsticky__nav-link, .doitenhinhanhsticky__dropdown-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Extract filename from href (handle both ./file.html and file.html)
            const linkPage = href.replace('./', '').split('/').pop();
            
            if (linkPage === currentPage) {
                link.classList.add('doitenhinhanhsticky__nav-link--active');
                
                // If it's a dropdown link, also mark parent as active
                if (link.classList.contains('doitenhinhanhsticky__dropdown-link')) {
                    const parentNav = link.closest('.doitenhinhanhsticky__nav-item--dropdown');
                    if (parentNav) {
                        const parentLink = parentNav.querySelector('.doitenhinhanhsticky__nav-link');
                        if (parentLink) {
                            parentLink.classList.add('doitenhinhanhsticky__nav-link--active');
                        }
                    }
                }
            }
        }
    });
    
    // Handle index.html or root path
    if (currentPage === '' || currentPage === 'index.html') {
        const logoLink = document.querySelector('.doitenhinhanhsticky__logo-link');
        if (logoLink) {
            logoLink.classList.add('doitenhinhanhsticky__nav-link--active');
        }
    }
}

/**
 * Add click event listeners to menu items for instant active state toggle
 */
function addMenuClickHandlers() {
    // Get all menu links (both nav and dropdown)
    const allMenuLinks = document.querySelectorAll('.doitenhinhanhsticky__nav-link, .doitenhinhanhsticky__dropdown-link');
    
    allMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            document.querySelectorAll('.doitenhinhanhsticky__nav-link--active').forEach(activeLink => {
                activeLink.classList.remove('doitenhinhanhsticky__nav-link--active');
            });
            
            // Add active class to clicked link
            this.classList.add('doitenhinhanhsticky__nav-link--active');
            
            // If it's a dropdown link, also activate parent
            if (this.classList.contains('doitenhinhanhsticky__dropdown-link')) {
                const parentNav = this.closest('.doitenhinhanhsticky__nav-item--dropdown');
                if (parentNav) {
                    const parentLink = parentNav.querySelector('.doitenhinhanhsticky__nav-link');
                    if (parentLink) {
                        parentLink.classList.add('doitenhinhanhsticky__nav-link--active');
                    }
                }
            }
            
            // Note: The link will still navigate to the new page
            // The active state will be re-applied by activateCurrentMenu() when new page loads
        });
    });
    
    // Handle logo click
    const logoLink = document.querySelector('.doitenhinhanhsticky__logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function() {
            // Remove all active states when clicking logo
            document.querySelectorAll('.doitenhinhanhsticky__nav-link--active').forEach(activeLink => {
                activeLink.classList.remove('doitenhinhanhsticky__nav-link--active');
            });
        });
    }
}

/**
 * Load header template and auto-activate current menu
 * Usage: Call this function to load header into #doitenhinhanhsticky__header
 */
function loadHeaderWithActiveMenu() {
    fetch('./templates/header.html')
        .then(response => response.text())
        .then(data => {
            const headerElement = document.querySelector("#doitenhinhanhsticky__header");
            if (headerElement) {
                headerElement.innerHTML = data;
                
                // Activate current menu after header is loaded
                activateCurrentMenu();
                
                // Add click handlers for instant feedback
                addMenuClickHandlers();
            }
        })
        .catch(error => console.error('Lỗi load header:', error));
}
