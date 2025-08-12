/**
 * CSS Imports
 * Vite will bundle these into a single CSS file.
 */
import './css/variables.css';
import './css/main.css';
import './css/layout.css';
import './css/animations.css';

/**
 * JavaScript Modules
 * All scripts are combined here to act as a single entry point.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -- From js/main.js --
  const header = document.getElementById('main-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      if (email) {
        alert(`Thank you for subscribing with ${email}! We'll keep you updated with our latest news.`);
        emailInput.value = '';
      }
    });
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  const vibeCodingBtn = document.getElementById('vibe-coding-btn');
  const vibeCodingContainer = document.getElementById('vibe-coding-container');
  const closeVibeCoding = () => {
    if (vibeCodingContainer) {
      vibeCodingContainer.style.display = 'none';
      document.body.classList.remove('vibe-coding-active');
    }
  };

  if (vibeCodingBtn && vibeCodingContainer) {
    vibeCodingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      vibeCodingContainer.style.display = 'block';
      document.body.classList.add('vibe-coding-active');
      window.scrollTo(0, 0);
    });
  }

  // -- From js/navigation.js --
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveSection = () => {
    const hash = window.location.hash || '#home';
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    const activeSection = document.querySelector(hash);
    if (activeSection) {
      activeSection.classList.add('active');
      const activeNavLink = document.querySelector(`.nav-link[href="${hash}"]`);
      if (activeNavLink) activeNavLink.classList.add('active');
    } else {
      document.getElementById('home')?.classList.add('active');
      document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
    }
    
    // If navigating away from a specific app view, ensure vibe coding is closed
    if(hash === '#home') {
        closeVibeCoding();
    }
  };

  window.addEventListener('hashchange', updateActiveSection);
  updateActiveSection(); // Initial call

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
      }
      // The hashchange event will handle the rest
    });
  });

  // -- From js/app-loader.js --
  const backToHomeButtons = document.querySelectorAll('.back-to-home');
  backToHomeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#home';
    });
  });
});