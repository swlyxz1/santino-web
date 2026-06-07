// ═══════════════════════════════════════════
//  SANTINO JAN ANDRÉ — script.js
// ═══════════════════════════════════════════

// ─── NAV SCROLL EFEKT ─────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── REVEAL ANIMACE (Intersection Observer)
const reveals = document.querySelectorAll(
  '#about .about-grid, #about .section-tag, #about .section-title,' +
  '.fact-card, .skill-card, .contact-item, .contact-form, ' +
  '#skills .section-tag, #skills .section-title,' +
  '#contact .section-tag, #contact .section-title, .contact-left'
);

reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * i);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ─── FORMULÁŘ (jen UI — bez backendu)
// ✏️ Pokud chceš skutečně odesílat emaily,
//    napoč Formspree nebo EmailJS
function handleForm(e) {
  e.preventDefault();
  const btn   = e.target.querySelector('button[type="submit"]');
  const msg   = document.getElementById('form-msg');
  const orig  = btn.textContent;

  btn.textContent = 'Odesílám...';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent = '✓ Zpráva odeslána';
    msg.textContent = 'Ozvu se co nejdřív. Díky!';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled    = false;
      msg.textContent = '';
    }, 4000);
  }, 1200);
}

// ─── SMOOTH SCROLL pro všechny #linky ─────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
