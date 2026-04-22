// ─── Scroll progress bar ───
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
}

// ─── Nav scrolled class ───
const siteHeader = document.getElementById('site-header');
function updateNav() {
  siteHeader.classList.toggle('scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', () => { updateProgress(); updateNav(); }, { passive: true });
updateProgress();
updateNav();

// ─── Desktop dropdown ───
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const btn = dropdown.querySelector('.nav-dropdown-btn');
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
    if (!isOpen) dropdown.classList.add('open');
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown.open').forEach(d => {
    d.classList.remove('open');
    d.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded', 'false');
  });
});

// ─── Hamburger menu ───
const hamburgerBtn  = document.getElementById('hamburger-btn');
const mobileNav     = document.getElementById('mobile-nav');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMenu() {
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('active');
  hamburgerBtn.classList.add('open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('active');
  hamburgerBtn.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', () => {
  mobileNav.classList.contains('open') ? closeMenu() : openMenu();
});

mobileOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.mob-link:not(.mob-expand-btn)').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.querySelectorAll('.mob-sublink').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ─── Mobile submenu accordion ───
document.querySelectorAll('.mob-expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const submenu = document.getElementById(targetId);
    const chevron = btn.querySelector('.mob-chevron');
    if (!submenu) return;
    const isOpen = submenu.classList.contains('open');
    submenu.classList.toggle('open', !isOpen);
    if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
  });
});

// ─── Reveal on scroll (IntersectionObserver) ───
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Expose for dynamically added elements
window.observeReveal = function(root) {
  (root || document).querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
};

// ─── Counter animation ───
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const step   = target / (1500 / 16);
    let   cur    = 0;
    const tick   = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur);
      if (cur >= target) clearInterval(tick);
    }, 16);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(c => counterObs.observe(c));
