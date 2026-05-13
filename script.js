// ===== HERO BACKGROUND SLIDESHOW =====
(function () {
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  if (!slides.length) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 4000);
})();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 32px rgba(255,79,163,0.14)'
      : '0 2px 20px rgba(255,79,163,0.08)';
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    }
  });
  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== FADE IN ON SCROLL =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.6s ease ${i * 0.06}s both`;
      entry.target.style.opacity = '1';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.card, .impact-card, .value-card, .civic-card, .testimonial-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  fadeObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString() + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.getAttribute('data-count');
      const suffix = el.getAttribute('data-suffix') || '';
      if (raw) animateCounter(el, parseInt(raw), suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ===== GALLERY LIGHTBOX (works with real <img> tags) =====
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || '';
      if (lbImg && img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
      }
      if (lbCaption) lbCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lbImg) setTimeout(() => { lbImg.src = ''; }, 300);
  };
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

// ===== ACTIVE NAV LINK =====
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href === currentPage) link.classList.add('active');
  else if (currentPage === '' && href === 'index.html') link.classList.add('active');
});


