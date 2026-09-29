// Main JavaScript logic for Elite UK Consulting
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initModal();
  initForms();
  initTestimonialSlider();
});

// Mobile menu toggle
function initMobileMenu() {
  const toggleBtns = document.querySelectorAll('.mobile-menu-btn');
  const mobileMenus = document.querySelectorAll('.mobile-menu');

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      mobileMenus.forEach((menu) => {
        menu.classList.toggle('hidden');
      });
    });
  });
}

// Modal handling
function initModal() {
  const modal = document.getElementById('consultation-modal');
  const openBtns = document.querySelectorAll('.open-consultation-modal');
  const closeBtns = document.querySelectorAll('.close-consultation-modal');

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(modal);
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
}

function closeModal(modal) {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// Form Submission handling
function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<span class="material-symbols-outlined animate-spin text-sm">sync</span> Submitting...`;
        
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
          form.reset();
          
          // Close consultation modal if open
          const modal = document.getElementById('consultation-modal');
          if (modal && !modal.classList.contains('hidden')) {
            closeModal(modal);
          }
          
          showToast('Thank you! Your request has been submitted successfully. A consultant will reach out shortly.');
        }, 1200);
      }
    });
  });
}

// Toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 bg-[#101622] text-white border border-primary/40 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 modal-animate';
  toast.innerHTML = `
    <div class="bg-primary p-1.5 rounded-lg text-white">
      <span class="material-symbols-outlined text-sm">check_circle</span>
    </div>
    <p class="text-sm font-medium">${message}</p>
    <button class="ml-4 text-white/60 hover:text-white" onclick="this.parentElement.remove()">
      <span class="material-symbols-outlined text-sm">close</span>
    </button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 5000);
}

// Testimonial slider
function initTestimonialSlider() {
  const container = document.getElementById('testimonials-container');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');

  if (!container || !prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -340, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: 340, behavior: 'smooth' });
  });
}
