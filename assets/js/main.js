/**
 * Tryave — main.js
 * Organized as a namespace with focused, single-responsibility modules.
 */

const Tryave = (() => {

  // ─── Nav ────────────────────────────────────────────
  const nav = {
    el: null,

    init() {
      this.el = document.getElementById('navbar');
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    },

    onScroll() {
      this.el.classList.toggle('scrolled', window.scrollY > 20);
    },
  };

  // ─── Mobile Menu ────────────────────────────────────
  const menu = {
    el: null,

    init() {
      this.el = document.getElementById('mobileMenu');
      const hamburger = document.getElementById('hamburger');
      if (hamburger) hamburger.addEventListener('click', () => this.toggle());

      // Close on nav link click
      this.el.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.close());
      });
    },

    toggle() {
      this.el.classList.toggle('open');
    },

    close() {
      this.el.classList.remove('open');
    },
  };

  // ─── Scroll Animations ──────────────────────────────
  const scrollReveal = {
    observer: null,

    init() {
      this.observer = new IntersectionObserver(
        (entries) => this.onIntersect(entries),
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('.fade-up').forEach(el => {
        this.observer.observe(el);
      });
    },

    onIntersect(entries) {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        this.observer.unobserve(entry.target);
      });
    },
  };

  // ─── Smooth Scroll ──────────────────────────────────
  const smoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const target = document.querySelector(anchor.getAttribute('href'));
          if (!target) return;
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    },
  };

  // ─── Contact Form ────────────────────────────────────
  const contactForm = {
    formEl:    null,
    submitBtn: null,
    successEl: null,

    init() {
      this.formEl    = document.getElementById('contactForm');
      this.submitBtn = document.getElementById('submitBtn');
      this.successEl = document.getElementById('formSuccess');

      if (!this.formEl) return;
      this.formEl.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
      e.preventDefault();
      this.setLoading(true);

      // Replace with a real API call (e.g. fetch to a form endpoint) when ready
      setTimeout(() => {
        this.setLoading(false);
        this.showSuccess();
        this.formEl.reset();
      }, 1200);
    },

    setLoading(isLoading) {
      this.submitBtn.disabled = isLoading;
      this.submitBtn.innerHTML = isLoading
        ? '<span>⏳</span> Sending…'
        : '<span>🎯</span> Request Demo';
    },

    showSuccess() {
      this.successEl.classList.add('visible');
      // Auto-hide after 6s
      setTimeout(() => this.successEl.classList.remove('visible'), 6000);
    },
  };

  // ─── Bootstrap ──────────────────────────────────────
  function init() {
    nav.init();
    menu.init();
    scrollReveal.init();
    smoothScroll.init();
    contactForm.init();
  }

  return { init };

})();

document.addEventListener('DOMContentLoaded', () => Tryave.init());
