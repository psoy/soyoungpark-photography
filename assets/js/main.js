// ============================================
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initNewsletter();
    initRightClickProtection();
    initContactForm();
    initScrollEffects();
});

// 1. Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');

            // Hamburger Animation
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Mobile Dropdown Toggle
        if (window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                link.addEventListener('click', function (e) {
                    // Prevent default only if checking sub-items on mobile 
                    // But here the link itself is "Gallery", maybe we want to toggle.
                    // Let's assume click on arrow or text toggles.
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            });
        }
    }
}

// 2. Newsletter Subscription (Mock) with Toast
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Simulate API call
                setTimeout(() => {
                    showToast('구독해 주셔서 감사합니다! 새로운 소식을 곧 전해드리겠습니다.');
                    newsletterForm.reset();
                }, 500);
            }
        });
    }
}

// 3. Right-Click Protection & Custom Tooltip
function initRightClickProtection() {
    // Create the tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'copyright-tooltip';
    tooltip.textContent = 'This photo is Soyoung Park © All rights reserved 2025.';
    document.body.appendChild(tooltip);

    let hideTimeout;

    // Disable right click on images
    document.addEventListener('contextmenu', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();

            // Position the tooltip at mouse coordinates
            // Ensure it doesn't go off screen
            let x = e.clientX;
            let y = e.clientY;

            tooltip.style.left = x + 'px';
            tooltip.style.top = y + 'px';

            tooltip.classList.add('visible');

            // Clear existing timeout if any
            if (hideTimeout) clearTimeout(hideTimeout);

            // Hide after 2 seconds
            hideTimeout = setTimeout(() => {
                tooltip.classList.remove('visible');
            }, 2000);
        }
    });

    // Hide tooltip on any click
    document.addEventListener('click', function () {
        tooltip.classList.remove('visible');
    });
}

// 4. Contact Form (Mock)
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simulate API call
            const btn = this.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('메시지가 성공적으로 전송되었습니다.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }
}

// 5. Scroll Effects (Navbar)
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Helper: Toast Notification
function showToast(message) {
    // Check if toast exists, if not create one
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
}
