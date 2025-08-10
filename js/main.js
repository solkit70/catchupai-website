document.addEventListener('DOMContentLoaded', () => {
  // Handle header scroll effect
  const header = document.getElementById('main-header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Handle newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // In a real implementation, you would send this to your backend
        alert(`Thank you for subscribing with ${email}! We'll keep you updated with our latest news.`);
        emailInput.value = '';
      }
    });
  }
  
  // Initialize mobile menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('#main-nav .nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
      }
    });
  });
  
  // In-view animations
  function handleIntersections(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(handleIntersections, observerOptions);
  
  document.querySelectorAll('.feature-card, .app-card').forEach(el => {
    observer.observe(el);
  });
  
  // Handle Vibe Coding Test App button
  const vibeCodingBtn = document.getElementById('vibe-coding-btn');
  const vibeCodingContainer = document.getElementById('vibe-coding-container');
  
  if (vibeCodingBtn && vibeCodingContainer) {
    vibeCodingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Show the iframe container
      vibeCodingContainer.style.display = 'block';
      
      // Add class to body to hide other content
      document.body.classList.add('vibe-coding-active');
      
      // Scroll to top
      window.scrollTo(0, 0);
    });
    
    // Close iframe when clicking outside or pressing escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('vibe-coding-active')) {
        closeVibeCoding();
      }
    });
    
    // Add close button functionality
    vibeCodingContainer.addEventListener('click', (e) => {
      if (e.target === vibeCodingContainer) {
        closeVibeCoding();
      }
    });
  }
  
  function closeVibeCoding() {
    const vibeCodingContainer = document.getElementById('vibe-coding-container');
    if (vibeCodingContainer) {
      vibeCodingContainer.style.display = 'none';
      document.body.classList.remove('vibe-coding-active');
    }
  }
  
  // Make closeVibeCoding available globally
  window.closeVibeCoding = closeVibeCoding;
  
  // Handle hash changes to reset dynamic content when navigating to home
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#home' || window.location.hash === '') {
      closeVibeCoding();
    }
  });
});