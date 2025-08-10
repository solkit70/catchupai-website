document.addEventListener('DOMContentLoaded', () => {
  // Handle back to home buttons
  const backToHomeButtons = document.querySelectorAll('.back-to-home');
  
  backToHomeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#home';
    });
  });
});