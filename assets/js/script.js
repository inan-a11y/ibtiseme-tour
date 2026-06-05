/* ============================================
   İBTİSEME TOUR – Main JavaScript
   ibtisemetour.com
   ============================================ */

'use strict';

// ──────────────────────────────────────────────
//  SESSION AUTH CHECK
// ──────────────────────────────────────────────
(function checkAuth() {
  if (sessionStorage.getItem('ibt_session') !== 'granted') {
    window.location.replace('login.html');
  }
})();

// ──────────────────────────────────────────────
//  UTILITY: DOM selectors & helpers
// ──────────────────────────────────────────────
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// ──────────────────────────────────────────────
//  1. NAVIGATION — Scroll effect + mobile menu
// ──────────────────────────────────────────────
(function initNav() {
  const nav        = $('#main-nav');
  const hamburger  = $('#nav-hamburger');
  const mobileMenu = $('#mobile-menu');
  const mobileLinks = $$('.nav__mobile-link, .nav__mobile-cta', mobileMenu);

  if (!nav) return;

  // Scroll class
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // Mobile menu toggle
  function toggleMobileMenu(forceClose = false) {
    const isOpen = mobileMenu.classList.contains('open') || forceClose;

    if (isOpen) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  hamburger?.addEventListener('click', () => toggleMobileMenu());

  // Close when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMobileMenu(true);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMobileMenu(true);
    }
  });
})();

// ──────────────────────────────────────────────
//  2. ACTIVE NAV LINK — Highlight based on scroll
// ──────────────────────────────────────────────
(function initActiveNav() {
  const navLinks = $$('.nav__link');
  const sections = $$('section[id]');

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('nav__link--active', isActive);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();

// ──────────────────────────────────────────────
//  3. SCROLL REVEAL — Fade-in on scroll
// ──────────────────────────────────────────────
(function initScrollReveal() {
  // Add reveal class to target elements
  const targets = [
    '.trust__item',
    '.service-card',
    '.dest-card',
    '.about__value-item',
    '.team-card',
    '.office-info__item',
    '.markets__flag-item',
    '.testimonial-card',
    '.contact__left',
    '.vip-form',
    '.section-header',
    '.footer__brand',
    '.footer__nav-col',
  ];

  const isMobile = window.innerWidth < 768;

  targets.forEach(selector => {
    $$(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * (isMobile ? 40 : 80)}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.reveal').forEach(el => observer.observe(el));
})();

// ──────────────────────────────────────────────
//  4. VIP FORM — Submission & validation
// ──────────────────────────────────────────────
(function initVIPForm() {
  const form        = $('#vip-request-form');
  const submitBtn   = $('#form-submit-btn');
  const successMsg  = $('#form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation
    const name  = $('#form-name').value.trim();
    const phone = $('#form-phone').value.trim();

    if (!name) {
      shakeField('#form-name');
      return;
    }
    if (!phone) {
      shakeField('#form-phone');
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending…';
    submitBtn.style.opacity = '0.7';

    // Simulate async submission (replace with real endpoint)
    await delay(1600);

    // Success state
    form.querySelector('.vip-form__group:not([hidden])') && null; // no-op, keep fields visible
    submitBtn.hidden = true;
    successMsg.hidden = false;
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Reset after 8 seconds
    setTimeout(() => {
      form.reset();
      submitBtn.hidden = false;
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send My Enquiry';
      submitBtn.style.opacity = '';
      successMsg.hidden = true;
    }, 8000);
  });

  // Shake animation for invalid fields
  function shakeField(selector) {
    const el = $(selector);
    if (!el) return;
    el.style.animation = 'none';
    el.focus();
    requestAnimationFrame(() => {
      el.style.animation = 'shake 0.45s ease';
    });
    el.addEventListener('animationend', () => {
      el.style.animation = '';
    }, { once: true });
  }

  // Add shake keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);

  // Premium input focus glow
  $$('.vip-form__input, .vip-form__select, .vip-form__textarea').forEach(el => {
    el.addEventListener('focus', () => {
      el.parentElement.classList.add('focused');
    });
    el.addEventListener('blur', () => {
      el.parentElement.classList.remove('focused');
    });
  });
})();

// ──────────────────────────────────────────────
//  5. LANGUAGE SWITCHER — Dropdown toggle
// ──────────────────────────────────────────────
(function initLangSwitcher() {
  const switcher = $('#lang-switcher');
  if (!switcher) return;

  const btn = $('#lang-btn');

  function openSwitcher() {
    switcher.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeSwitcher() {
    switcher.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    switcher.classList.contains('open') ? closeSwitcher() : openSwitcher();
  });

  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) closeSwitcher();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSwitcher();
  });
})();

// ──────────────────────────────────────────────
//  6. FOOTER YEAR — Auto-update
// ──────────────────────────────────────────────
(function initFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ──────────────────────────────────────────────
//  7. WHATSAPP FAB — Entrance animation
// ──────────────────────────────────────────────
(function initWhatsAppFAB() {
  const fab = $('#whatsapp-fab');
  if (!fab) return;

  fab.style.opacity = '0';
  fab.style.transform = 'translateY(20px) scale(0.9)';
  fab.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  setTimeout(() => {
    fab.style.opacity = '1';
    fab.style.transform = 'translateY(0) scale(1)';
  }, 1800);
})();

// ──────────────────────────────────────────────
//  8. SMOOTH ANCHOR SCROLL — With nav offset
// ──────────────────────────────────────────────
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('main-nav')?.offsetHeight || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ──────────────────────────────────────────────
//  9. TOAST NOTIFICATION — Subtle UI feedback
// ──────────────────────────────────────────────
function showToast(message, duration = 3000) {
  // Remove existing toast
  document.querySelector('.toast')?.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '100px',
    right: '28px',
    zIndex: '9999',
    padding: '12px 20px',
    background: 'rgba(20,20,32,0.96)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#F0F0F8',
    fontSize: '0.82rem',
    fontFamily: 'Inter, sans-serif',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    opacity: '0',
    transform: 'translateY(8px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    maxWidth: '280px',
    lineHeight: '1.5',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ──────────────────────────────────────────────
//  10. PARALLAX HERO — Subtle depth on scroll
// ──────────────────────────────────────────────
(function initParallax() {
  const heroImg = document.querySelector('.hero__bg-img');
  if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight * 1.5) {
          heroImg.style.transform = `scale(1.06) translateY(${scrolled * 0.25}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ──────────────────────────────────────────────
//  11. ANIMATED COUNTERS — Numbers section
// ──────────────────────────────────────────────
(function initCounters() {
  const counters = $$('.numbers__count[data-target]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = target > 100 ? 2000 : 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = value >= 1000 ? value.toLocaleString() : value;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

// ──────────────────────────────────────────────
//  HELPERS
// ──────────────────────────────────────────────
//  12. SCROLL TO TOP — Appears after 400px scroll
// ──────────────────────────────────────────────
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ──────────────────────────────────────────────
//  13. LANGUAGE PREFERENCE — Save to localStorage
// ──────────────────────────────────────────────
(function initLangPreference() {
  $$('.lang-switcher__option, .nav__mobile-lang-btn').forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.includes('index-tr')) localStorage.setItem('ibt_lang', 'tr');
      else if (href.includes('index-ar')) localStorage.setItem('ibt_lang', 'ar');
      else localStorage.setItem('ibt_lang', 'en');
    });
  });
})();

// ──────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
