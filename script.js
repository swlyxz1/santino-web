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

// ─── FORMULÁŘ — odesílání přes Web3Forms (zdarma, bez vlastního serveru)
// ✏️ UPRAV: Sem vlož svůj Access Key z https://web3forms.com
//    (zadáš tam jen svůj email a klíč ti během pár vteřin přijde do schránky)
const WEB3FORMS_ACCESS_KEY = '4a08c522-687f-430e-ae86-fd35435b9ae6';

async function handleForm(e) {
  e.preventDefault();
  const form  = e.target;
  const btn   = form.querySelector('button[type="submit"]');
  const msg   = document.getElementById('form-msg');
  const orig  = btn.textContent;

  btn.textContent = 'Odesílám...';
  btn.disabled    = true;
  msg.textContent = '';

  try {
    const data = new FormData(form);
    data.append('access_key', WEB3FORMS_ACCESS_KEY);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    });
    const result = await res.json();

    if (result.success) {
      btn.textContent = '✓ Zpráva odeslána';
      msg.textContent = 'Ozvu se co nejdřív. Díky!';
      form.reset();
    } else {
      throw new Error(result.message || 'Odeslání selhalo');
    }
  } catch (err) {
    btn.textContent = orig;
    msg.textContent = 'Něco se nepovedlo, zkus to prosím znovu nebo napiš na email přímo.';
  } finally {
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = orig;
      msg.textContent = '';
    }, 4000);
  }
}

// ─── SMOOTH SCROLL pro všechny #linky ─────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
