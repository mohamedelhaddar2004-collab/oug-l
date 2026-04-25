/* ============================================================
   NEXUSAI MAIN.JS — Interactions, Animations & Utilities
   ============================================================ */

/* ─── THEME TOGGLE ─────────────────────────────────────────── */
(function initTheme() {
  const saved = localStorage.getItem('nexusai-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
})();

function updateThemeIcon(theme) {
  const icons = document.querySelectorAll('#theme-icon, #dash-theme-icon');
  icons.forEach(icon => {
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('nexusai-theme', next);
  updateThemeIcon(next);
}

document.addEventListener('DOMContentLoaded', () => {
  // Attach theme toggle to all toggle buttons
  document.querySelectorAll('#theme-toggle, #dash-theme-toggle, #auth-theme-toggle').forEach(btn => {
    if (btn) btn.addEventListener('click', toggleTheme);
  });
});

/* ─── STICKY HEADER ────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
});

/* ─── MOBILE MENU ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('main-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.style.display === 'flex';
      nav.style.cssText = isOpen
        ? ''
        : 'display:flex;flex-direction:column;position:absolute;top:70px;left:0;right:0;background:var(--bg-surface);border-bottom:1px solid var(--border);padding:1rem;z-index:999;gap:.5rem;';
    });
  }
});

/* ─── AOS (Animate on Scroll) ─────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('aos-animate');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
});

/* ─── COUNTER ANIMATION ────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
  const counterObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    }),
    { threshold: 0.5 }
  );
  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));
});

/* ─── TYPED TEXT HERO ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = ['10x Faster', 'Smarter', 'Effortlessly', 'At Scale', 'With AI'];
  let i = 0;
  let charIdx = 0;
  let deleting = false;

  const type = () => {
    const word = words[i];
    el.textContent = deleting ? word.substring(0, charIdx--) : word.substring(0, charIdx++);
    let delay = deleting ? 60 : 100;
    if (!deleting && charIdx === word.length + 1) { delay = 2200; deleting = true; }
    if (deleting && charIdx < 0) { deleting = false; i = (i + 1) % words.length; charIdx = 0; delay = 300; }
    setTimeout(type, delay);
  };
  setTimeout(type, 800);
});

/* ─── FAQ TOGGLE ───────────────────────────────────────────── */
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ─── BILLING TOGGLE ───────────────────────────────────────── */
let isYearly = false;
const yearlyPrices = { starter: 15, pro: 39, enterprise: 119 };
const monthlyPrices = { starter: 19, pro: 49, enterprise: 149 };

function toggleBilling() {
  isYearly = !isYearly;
  const btn = document.getElementById('billing-toggle');
  const thumb = document.getElementById('toggle-thumb');
  const monthLabel = document.getElementById('monthly-label');
  const yearLabel = document.getElementById('yearly-label');

  if (btn) btn.classList.toggle('on', isYearly);
  if (thumb) thumb.classList.toggle('on', isYearly);
  if (monthLabel) monthLabel.classList.toggle('active', !isYearly);
  if (yearLabel) yearLabel.classList.toggle('active', isYearly);

  const prices = isYearly ? yearlyPrices : monthlyPrices;
  const amounts = document.querySelectorAll('.price-amount.monthly-price');
  const vals = Object.values(prices);
  amounts.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      el.textContent = vals[i] || vals[0];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity .2s, transform .2s';
    }, 150);
  });
}

/* ─── DEMO SECTION ─────────────────────────────────────────── */
function runDemo() {
  const indicator = document.getElementById('typing-indicator');
  const outputText = document.getElementById('output-text');
  const outputActions = document.getElementById('demo-output-actions');

  if (!indicator || !outputText) return;

  indicator.style.display = 'flex';
  outputText.classList.add('hidden');
  if (outputActions) outputActions.style.display = 'none';

  setTimeout(() => {
    indicator.style.display = 'none';
    outputText.classList.remove('hidden');
    if (outputActions) outputActions.style.display = 'flex';
  }, 2200);
}

function copyOutput() {
  const text = document.getElementById('output-text');
  if (text) {
    navigator.clipboard.writeText(text.innerText).then(() => showToast('Copied to clipboard!'));
  }
}

function enhancePrompt() {
  const textarea = document.getElementById('demo-prompt');
  if (textarea) {
    const current = textarea.value;
    textarea.value = current + '\n\nTone: Confident and persuasive\nFormat: Email with subject line\nInclude: Social proof, urgency, and a clear CTA';
  }
}

/* ─── VIDEO MODAL ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.getElementById('play-demo-btn');
  if (playBtn) playBtn.addEventListener('click', openModal);
});

function openModal() {
  const modal = document.getElementById('video-modal');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('video-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ─── EMAIL CAPTURE ────────────────────────────────────────── */
function handleEmailCapture(e) {
  e.preventDefault();
  showToast('🎉 You\'re in! Check your email for confirmation.');
  e.target.reset();
}

/* ─── FORM HANDLERS ────────────────────────────────────────── */
function handleLogin(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  btn.disabled = true;
  setTimeout(() => {
    window.location.href = '/dashboard';
  }, 1500);
}

function handleSignup(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
  btn.disabled = true;
  setTimeout(() => {
    window.location.href = '/dashboard';
  }, 1800);
}

function handleContact(e) {
  e.preventDefault();
  showToast('✉️ Message sent! We\'ll respond within 24 hours.');
  e.target.reset();
}

/* ─── PASSWORD TOGGLE ──────────────────────────────────────── */
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  const btn = input.parentNode.querySelector('.password-toggle i');
  if (btn) btn.className = isText ? 'fas fa-eye' : 'fas fa-eye-slash';
}

/* ─── PASSWORD STRENGTH ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const pwInput = document.getElementById('signup-password');
  if (pwInput) {
    pwInput.addEventListener('input', () => {
      const val = pwInput.value;
      const bars = document.querySelectorAll('.strength-bar');
      const label = document.getElementById('strength-label');
      const strength = getPasswordStrength(val);
      const colors = ['#ef4444', '#f59e0b', '#10b981', '#10b981'];
      const labels = ['Weak', 'Fair', 'Good', 'Strong'];
      bars.forEach((bar, i) => {
        bar.style.background = i < strength ? colors[strength - 1] : '';
      });
      if (label) label.textContent = val.length === 0 ? 'Enter password' : labels[strength - 1] || 'Too weak';
    });
  }
});

function getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

/* ─── TOAST NOTIFICATIONS ──────────────────────────────────── */
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  const colors = { success: '#10b981', error: '#ef4444', info: '#6366f1' };
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
    background: var(--bg-card); border: 1px solid ${colors[type]}44;
    color: var(--text-primary); padding: 1rem 1.5rem; border-radius: 12px;
    font-size: .9rem; font-weight: 500; box-shadow: 0 8px 32px rgba(0,0,0,.4);
    display: flex; align-items: center; gap: .75rem; max-width: 360px;
    animation: toastIn .3s cubic-bezier(0.16,1,0.3,1) forwards;
  `;
  const dot = document.createElement('span');
  dot.style.cssText = `width: 8px; height: 8px; border-radius: 50%; background: ${colors[type]}; flex-shrink: 0;`;
  toast.appendChild(dot);
  toast.appendChild(document.createTextNode(msg));
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `@keyframes toastIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }`;
  document.head.appendChild(style);

  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all .3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
