/* main.js - Klova Digital */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Sticky Navigation & Active Link Scroll ---
  const navbar = document.getElementById('navbar');
  const navLinksDesktop = document.querySelectorAll('.nav-links .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Nav shadow on scroll
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinksDesktop.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current) && current !== '') {
        link.classList.add('active');
      }
    });
  });

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 68, // Account for sticky nav
          behavior: 'smooth'
        });
      }
    });
  });

  // --- FAQ Accordion ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;

      // Close all other accordions first (optional, but good for UX)
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle current accordion
      if (!isExpanded) {
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      }
    });
  });

  // --- Intersection Observer for Scroll Reveals ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a slight delay for grid items
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If Intersection Observer not supported or reduced motion is enabled, show all elements immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  }
});

// --- Form Submission Handling ---
window.handleFormSubmit = function(event) {
  event.preventDefault();
  
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');
  const formWrapper = document.querySelector('.contact-form-wrapper');
  
  if (form && successMessage) {
    // Simulate form submission delay
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      form.style.display = 'none';
      successMessage.classList.remove('hidden');
      
      // Smoothly resize container if needed
      formWrapper.style.minHeight = successMessage.offsetHeight + 64 + 'px'; // 64 = padding
    }, 800);
  }
};
