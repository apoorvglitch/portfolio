/**
 * Portfolio — Apoorv Nambiar
 * Modular JavaScript for interactions and animations
 */

'use strict';
emailjs.init({
  publicKey: "7yLAKqG-Hn5g9D_du",
});
/* ============================================
   Module: Loader
   ============================================ */
const Loader = {
  init() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const hideLoader = () => {
      loader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    };

    document.body.classList.add('no-scroll');

    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 800);
    } else {
      window.addEventListener('load', () => setTimeout(hideLoader, 800));
    }
  }
};

/* ============================================
   Module: Custom Cursor (Desktop Only)
   ============================================ */
const CustomCursor = {
  cursor: null,
  follower: null,

  init() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    this.cursor = document.getElementById('cursor');
    this.follower = document.getElementById('cursorFollower');
    if (!this.cursor || !this.follower) return;

    document.body.classList.add('custom-cursor');

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      this.cursor.style.left = `${mouseX}px`;
      this.cursor.style.top = `${mouseY}px`;
    });

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      this.follower.style.left = `${followerX}px`;
      this.follower.style.top = `${followerY}px`;
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    const interactiveElements = 'a, button, input, textarea, .skill-card, .project-card';
    document.querySelectorAll(interactiveElements).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
        this.follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
        this.follower.classList.remove('hover');
      });
    });
  }
};

/* ============================================
   Module: Navigation
   ============================================ */
const Navigation = {
  header: null,
  navToggle: null,
  navMenu: null,
  navLinks: null,
  sections: null,

  init() {
    this.header = document.getElementById('header');
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = document.querySelectorAll('.nav__link');
    this.sections = document.querySelectorAll('section[id]');

    this.bindEvents();
    this.handleScroll();
  },

  bindEvents() {
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.updateActiveLink();
    });

    this.navToggle?.addEventListener('click', () => this.toggleMenu());

    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          this.closeMenu();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (
        this.navMenu?.classList.contains('open') &&
        !this.navMenu.contains(e.target) &&
        !this.navToggle?.contains(e.target)
      ) {
        this.closeMenu();
      }
    });
  },

  handleScroll() {
    if (window.scrollY > 50) {
      this.header?.classList.add('scrolled');
    } else {
      this.header?.classList.remove('scrolled');
    }
  },

  updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.dataset.section === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  },

  toggleMenu() {
    const isOpen = this.navMenu?.classList.toggle('open');
    this.navToggle?.classList.toggle('active');
    this.navToggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', isOpen);
  },

  closeMenu() {
    this.navMenu?.classList.remove('open');
    this.navToggle?.classList.remove('active');
    this.navToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }
};

/* ============================================
   Module: Scroll Progress
   ============================================ */
const ScrollProgress = {
  init() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    });
  }
};

/* ============================================
   Module: Scroll Reveal
   ============================================ */
const ScrollReveal = {
  init() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }
};

/* ============================================
   Module: Typing Effect
   ============================================ */
const TypingEffect = {
  titles: [
    'Frontend Web Developer',
    'UI Enthusiast',
    'Creative Coder',
    'Web Designer'
  ],
  element: null,
  titleIndex: 0,
  charIndex: 0,
  isDeleting: false,
  typeSpeed: 80,
  deleteSpeed: 40,
  pauseDuration: 2000,

  init() {
    this.element = document.getElementById('typingText');
    if (!this.element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.element.textContent = this.titles[0];
      return;
    }

    this.type();
  },

  type() {
    const currentTitle = this.titles[this.titleIndex];

    if (this.isDeleting) {
      this.element.textContent = currentTitle.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentTitle.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentTitle.length) {
      delay = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.titleIndex = (this.titleIndex + 1) % this.titles.length;
      delay = 500;
    }

    setTimeout(() => this.type(), delay);
  }
};

/* ============================================
   Module: Back to Top
   ============================================ */
const BackToTop = {
  init() {
    const button = document.getElementById('backToTop');
    if (!button) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        button.classList.add('visible');
        button.removeAttribute('hidden');
      } else {
        button.classList.remove('visible');
        button.setAttribute('hidden', '');
      }
    });

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

/* ============================================
   Module: Contact Form Validation
   ============================================ */
const ContactForm = {
  form: null,

  init() {
    this.form = document.getElementById('contactForm');
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    const inputs = this.form.querySelectorAll('.form-input');
    inputs.forEach((input) => {
      input.addEventListener('input', () => this.clearError(input));
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    this.clearAllErrors();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');

    let isValid = true;

    if (!name.value.trim()) {
      this.showError(name, 'nameError', 'Please enter your name.');
      isValid = false;
    } else if (name.value.trim().length < 2) {
      this.showError(name, 'nameError', 'Name must be at least 2 characters.');
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      this.showError(email, 'emailError', 'Please enter your email.');
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      this.showError(email, 'emailError', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!message.value.trim()) {
      this.showError(message, 'messageError', 'Please enter a message.');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      this.showError(message, 'messageError', 'Message must be at least 10 characters.');
      isValid = false;
    }

    if (isValid) {
      const submitButton = this.form.querySelector('button[type="submit"]');
  
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
  
      emailjs.sendForm(
          "service_ctvyjgf",
          "template_0b3wp4d",
          this.form,
          "7yLAKqG-Hn5g9D_du"
      )
      .then(() => {
          formSuccess.hidden = false;
          formSuccess.textContent = "Thank you! Your message has been sent successfully.";
  
          this.form.reset();
  
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
  
          setTimeout(() => {
              formSuccess.hidden = true;
          }, 5000);
      })
      .catch((error) => {
          console.error(error);
  
          alert("Failed to send message. Please try again.");
  
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
      });
    }
  },

  showError(input, errorId, message) {
    input.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message;
  },

  clearError(input) {
    input.classList.remove('error');
    const errorId = input.id + 'Error';
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = '';
  },

  clearAllErrors() {
    this.form.querySelectorAll('.form-input').forEach((input) => {
      input.classList.remove('error');
    });
    this.form.querySelectorAll('.form-error').forEach((el) => {
      el.textContent = '';
    });
    document.getElementById('formSuccess').hidden = true;
  }
};

/* ============================================
   Module: Lazy Loading Enhancement
   ============================================ */
const LazyLoad = {
  init() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if (!images.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '100px' }
    );

    images.forEach((img) => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';

      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', () => {
          img.style.opacity = '1';
        });
        observer.observe(img);
      }
    });
  }
};

/* ============================================
   Initialize All Modules
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  Loader.init();
  CustomCursor.init();
  Navigation.init();
  ScrollProgress.init();
  ScrollReveal.init();
  TypingEffect.init();
  BackToTop.init();
  ContactForm.init();
  LazyLoad.init();
});
