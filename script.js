/**
 * HempRock Plaster LLC - Interactive Controller
 * Lightweight Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true' || false;
      mobileToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
    });

    // Close mobile menu on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- 4. Performance Matrix Tab Switching ---
  const matrixTabs = document.querySelectorAll('.matrix-tab-btn');
  const matrixTables = document.querySelectorAll('.matrix-table-container');

  matrixTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      
      matrixTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      matrixTables.forEach(table => {
        if (table.id === target) {
          table.style.display = 'block';
        } else {
          table.style.display = 'none';
        }
      });
    });
  });

  // --- 5. Interactive Carbon & Impact Calculator ---
  const sqftRange = document.getElementById('sqftRange');
  const sqftDisplay = document.getElementById('sqftDisplay');
  const carbonTrappedDisplay = document.getElementById('carbonTrappedDisplay');
  const concreteEmissionsDisplay = document.getElementById('concreteEmissionsDisplay');
  const netAdvantageDisplay = document.getElementById('netAdvantageDisplay');
  const carMilesDisplay = document.getElementById('carMilesDisplay');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Baseline formulas:
  // HempRock captures approx 0.83 lbs CO2 per sq ft applied (50 lbs net per standard 60 sq ft wall bucket batch)
  // Traditional concrete/stucco generates approx 3.15 lbs CO2 per sq ft
  // EPA standard conversion factor: ~0.88 lbs CO2 emitted per passenger vehicle mile (~400g CO2/mile)
  const calculateImpact = (sqft) => {
    const sqftNum = parseInt(sqft, 10) || 1200;
    const carbonTrapped = Math.round(sqftNum * 0.83); // sequestered lbs CO2
    const concreteEmissions = Math.round(sqftNum * 3.15); // emitted lbs CO2 by concrete
    const netAdvantage = carbonTrapped + concreteEmissions;
    const equivalentMiles = Math.round(netAdvantage / 0.88);

    if (sqftDisplay) sqftDisplay.textContent = `${sqftNum.toLocaleString()} sq. ft.`;
    if (carbonTrappedDisplay) carbonTrappedDisplay.textContent = `${carbonTrapped.toLocaleString()} lbs CO₂`;
    if (concreteEmissionsDisplay) concreteEmissionsDisplay.textContent = `${concreteEmissions.toLocaleString()} lbs CO₂`;
    if (netAdvantageDisplay) netAdvantageDisplay.textContent = `${netAdvantage.toLocaleString()} lbs CO₂`;
    if (carMilesDisplay) carMilesDisplay.textContent = `Equivalent to driving ~${equivalentMiles.toLocaleString()} fewer passenger car miles`;
  };

  if (sqftRange) {
    sqftRange.addEventListener('input', (e) => {
      calculateImpact(e.target.value);
      presetButtons.forEach(btn => btn.classList.remove('active'));
    });
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.sqft;
      if (sqftRange) {
        sqftRange.value = val;
      }
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculateImpact(val);
    });
  });

  // Run initial calculator evaluation
  if (sqftRange) {
    calculateImpact(sqftRange.value);
  }

  // --- 6. Project Gallery Filter & Lightbox ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  // Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Open
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('h4')?.textContent;
      const desc = card.querySelector('p')?.textContent;

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle) lightboxTitle.textContent = title || '';
      if (lightboxDesc) lightboxDesc.textContent = desc || '';

      if (lightboxModal) {
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Lightbox Close
  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --- 7. Contact Form Handler ---
  const contactForm = document.getElementById('hempContactForm');
  const formSuccessBanner = document.getElementById('formSuccessBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Submit Consultation Request';

      // UX Feedback: Disable button & show spinner
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Inquiry...</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>`;
      }

      try {
        const formData = new FormData(contactForm);

        const response = await fetch('send-email.php', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok && data.success) {
          if (formSuccessBanner) {
            formSuccessBanner.classList.add('active');
            formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          contactForm.reset();
        } else {
          alert(data.message || 'There was an issue sending your message. Please email info@hemprockplaster.com directly.');
        }
      } catch (err) {
        console.error('Form submission error:', err);
        // Smooth local preview fallback when not running on a live PHP server
        if (window.location.protocol === 'file:') {
          if (formSuccessBanner) {
            formSuccessBanner.classList.add('active');
            formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          contactForm.reset();
        } else {
          alert('There was a connection issue. Please email info@hemprockplaster.com directly.');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        }
      }
    });
  }

  // Preselect interest in contact form when clicking CTAs
  document.querySelectorAll('[data-preselect]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetService = btn.dataset.preselect;
      const checkbox = document.querySelector(`input[name="service"][value="${targetService}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  });
});
