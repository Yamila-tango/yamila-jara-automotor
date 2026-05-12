/* ══════════════════════════════════════════════════
   YAMILA JARA — Mandataria del Automotor
   script.js
══════════════════════════════════════════════════ */

/* ── Header: cambio al hacer scroll ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ── Menú hamburguesa (mobile) ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Cerrar menú al tocar cualquier link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Cerrar menú al tocar fuera
document.addEventListener('click', e => {
  if (!header.contains(e.target)) {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});


/* ── Animaciones fade-in al hacer scroll ── */
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Escalonar items que están dentro de la misma grilla
    const siblings = Array.from(
      entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)')
    );
    const idx = siblings.indexOf(entry.target);
    const delay = Math.min(idx * 90, 360);

    setTimeout(() => {
      entry.target.classList.add('visible');
    }, delay);

    fadeObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));


/* ── Accordion FAQ ── */
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const answer = item.querySelector('.faq__a');
    const isOpen = item.classList.contains('open');

    // Cerrar todos
    document.querySelectorAll('.faq__item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
    });

    // Abrir el clickeado (si estaba cerrado)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.removeAttribute('hidden');
    }
  });
});


/* ── Smooth scroll para links internos (complementa CSS) ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── Marcar link activo en el nav según sección visible ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + entry.target.id
      );
    });
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObs.observe(s));
