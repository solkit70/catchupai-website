document.addEventListener('DOMContentLoaded', () => {
  // Navigation system
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToHomeButtons = document.querySelectorAll('.back-to-home');
  
  // Show active section based on URL hash or default to home
  function updateActiveSection() {
    const hash = window.location.hash || '#home';
    
    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Show the active section
    const activeSection = document.querySelector(hash);
    if (activeSection) {
      activeSection.classList.add('active');
      
      // Add active class to corresponding nav link
      const activeNavLink = document.querySelector(`.nav-link[href="${hash}"]`);
      if (activeNavLink) {
        activeNavLink.classList.add('active');
      }
    } else {
      // Default to home if hash doesn't match any section
      document.getElementById('home').classList.add('active');
      document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }
  }
  
  // Initialize active section
  updateActiveSection();
  
  // Update active section when hash changes
  window.addEventListener('hashchange', updateActiveSection);
  
  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If clicking Home link, reset any dynamic content
      if (link.getAttribute('href') === '#home') {
        // Close Vibe Coding iframe if it's open
        const vibeCodingContainer = document.getElementById('vibe-coding-container');
        if (vibeCodingContainer && vibeCodingContainer.style.display !== 'none') {
          vibeCodingContainer.style.display = 'none';
          document.body.classList.remove('vibe-coding-active');
        }
      }
      
      // Remove active class from all nav links
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      
      // Add active class to clicked link
      link.classList.add('active');
    });
  });
  
  // Handle back to home buttons
  backToHomeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close Vibe Coding iframe if it's open
      const vibeCodingContainer = document.getElementById('vibe-coding-container');
      if (vibeCodingContainer && vibeCodingContainer.style.display !== 'none') {
        vibeCodingContainer.style.display = 'none';
        document.body.classList.remove('vibe-coding-active');
      }
      
      window.location.hash = '#home';
    });
  });
  
  // Handle direct navigation to streamlit apps
  document.querySelectorAll('.app-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const targetApp = e.currentTarget.getAttribute('href');
      window.location.hash = targetApp;
    });
  });
});