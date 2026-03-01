/**
 * Catch Up AI 2026 - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // 2. Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with 'reveal' class
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // Also add reveal to specific legacy components if they don't have it
  document.querySelectorAll('.project-card, .section-header, .support-card, .newsletter-content').forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    }
  });

  // 3. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
      
      // Animate hamburger to X
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mainNav.classList.contains('mobile-open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // 4. Newsletter Handling (Brevo API)
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input').value;
      const isKorean = document.documentElement.lang === 'ko';
      const msgEl = document.getElementById('newsletter-msg');

      try {
        const res = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': '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'
          },
          body: JSON.stringify({
            email: email,
            listIds: [4],
            updateEnabled: true
          })
        });

        if (res.ok || res.status === 204) {
          msgEl.textContent = isKorean
            ? '구독해 주셔서 감사합니다! 곧 소식을 전해드릴게요.'
            : 'Thank you for subscribing! We\'ll keep you updated.';
          msgEl.className = 'newsletter-msg newsletter-msg--success';
          newsletterForm.reset();
        } else {
          const data = await res.json();
          if (data.code === 'duplicate_parameter') {
            msgEl.textContent = isKorean
              ? '이미 구독 중인 이메일입니다.'
              : 'This email is already subscribed.';
            msgEl.className = 'newsletter-msg newsletter-msg--info';
          } else {
            throw new Error('API error');
          }
        }
      } catch {
        msgEl.textContent = isKorean
          ? '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
          : 'Something went wrong. Please try again later.';
        msgEl.className = 'newsletter-msg newsletter-msg--error';
      }
    });
  }
});
