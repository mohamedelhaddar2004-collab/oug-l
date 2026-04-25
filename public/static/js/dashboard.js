/* ============================================================
   NEXUSAI DASHBOARD.JS — Dashboard Interactions & Charts
   ============================================================ */

/* ─── TAB SWITCHING ────────────────────────────────────────── */
function switchTab(tabName) {
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  const target = document.getElementById('tab-' + tabName);
  if (target) target.classList.add('active');

  // Update breadcrumb
  const labels = {
    overview: 'Overview',
    generate: 'Generate',
    projects: 'Projects',
    templates: 'Templates'
  };
  const bc = document.getElementById('breadcrumb-current');
  if (bc) bc.textContent = labels[tabName] || tabName;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

  // Close mobile sidebar
  const sidebar = document.getElementById('sidebar');
  if (sidebar && window.innerWidth <= 1024) {
    sidebar.classList.remove('open');
  }
}

/* ─── SIDEBAR TOGGLE (MOBILE) ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('sidebar-toggle');
  const close = document.getElementById('sidebar-close');
  const sidebar = document.getElementById('sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
  if (close && sidebar) {
    close.addEventListener('click', () => sidebar.classList.remove('open'));
  }
});

/* ─── KPI COUNTER ANIMATION ────────────────────────────────── */
function animateKPIs() {
  document.querySelectorAll('.kpi-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = target >= 1000 ? current.toLocaleString() : current;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(update);
  });
}

/* ─── USAGE CHART ──────────────────────────────────────────── */
let usageChartInstance = null;
let currentChartMode = 'words';

function drawUsageChart() {
  const canvas = document.getElementById('usageChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const wordsData = [3200, 4800, 3900, 6100, 5400, 2800, 4200];
  const projectsData = [3, 5, 4, 7, 6, 2, 4];

  const isWords = currentChartMode === 'words';
  const data = isWords ? wordsData : projectsData;
  const color = '#818cf8';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const textColor = isDark ? '#6060a0' : '#8080a0';

  if (usageChartInstance) {
    usageChartInstance.destroy();
    usageChartInstance = null;
  }

  if (typeof Chart === 'undefined') {
    // Fallback: draw simple bar chart manually
    drawFallbackChart(ctx, canvas, labels, data, color, gridColor, textColor, isDark);
    return;
  }

  usageChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        fill: true,
        borderColor: color,
        backgroundColor: createGradient(ctx, canvas.height, color),
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: color,
        pointBorderColor: isDark ? '#16161f' : '#fff',
        pointBorderWidth: 2.5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1a1a26' : '#fff',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          borderWidth: 1,
          titleColor: isDark ? '#f0f0ff' : '#0f0f1a',
          bodyColor: isDark ? '#a0a0b8' : '#40405a',
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y.toLocaleString()} ${isWords ? 'words' : 'projects'}`,
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { size: 11, family: "'Inter', sans-serif" } },
          border: { color: 'transparent' }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { size: 11 },
            callback: (val) => isWords ? (val >= 1000 ? val/1000 + 'k' : val) : val
          },
          border: { color: 'transparent' }
        }
      },
      interaction: { mode: 'index', intersect: false },
    }
  });
}

function createGradient(ctx, height, color) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, color + '33');
  gradient.addColorStop(1, color + '00');
  return gradient;
}

function drawFallbackChart(ctx, canvas, labels, data, color, gridColor, textColor, isDark) {
  const W = canvas.offsetWidth || 600;
  const H = canvas.offsetHeight || 220;
  canvas.width = W;
  canvas.height = H;
  const pad = { l: 40, r: 20, t: 10, b: 30 };
  const max = Math.max(...data) * 1.15;
  const barW = (W - pad.l - pad.r) / labels.length;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ((H - pad.t - pad.b) / 4) * i;
    ctx.beginPath();
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 1;
    ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y);
    ctx.stroke();
  }

  // Fill area
  const pts = data.map((v, i) => ({
    x: pad.l + barW * i + barW / 2,
    y: pad.t + (H - pad.t - pad.b) * (1 - v / max)
  }));
  ctx.beginPath();
  ctx.moveTo(pts[0].x, H - pad.b);
  ctx.lineTo(pts[0].x, pts[0].y);
  pts.forEach((p, i) => i > 0 && ctx.bezierCurveTo(
    pts[i-1].x + (p.x - pts[i-1].x) * .4, pts[i-1].y,
    p.x - (p.x - pts[i-1].x) * .4, p.y,
    p.x, p.y
  ));
  ctx.lineTo(pts[pts.length - 1].x, H - pad.b);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, pad.t, 0, H - pad.b);
  grad.addColorStop(0, color + '33');
  grad.addColorStop(1, color + '00');
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach((p, i) => i > 0 && ctx.bezierCurveTo(
    pts[i-1].x + (p.x - pts[i-1].x) * .4, pts[i-1].y,
    p.x - (p.x - pts[i-1].x) * .4, p.y,
    p.x, p.y
  ));
  ctx.stroke();

  // Points
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = isDark ? '#16161f' : '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels
  ctx.fillStyle = textColor;
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  labels.forEach((l, i) => {
    ctx.fillText(l, pad.l + barW * i + barW / 2, H - 6);
  });
}

function switchChart(mode, btn) {
  currentChartMode = mode;
  document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  drawUsageChart();
}

/* ─── INIT DASHBOARD ───────────────────────────────────────── */
function initDashboard() {
  // Sidebar toggle for mobile
  const toggle = document.getElementById('sidebar-toggle');
  const close = document.getElementById('sidebar-close');
  const sidebar = document.getElementById('sidebar');
  if (toggle) toggle.addEventListener('click', () => sidebar && sidebar.classList.toggle('open'));
  if (close) close.addEventListener('click', () => sidebar && sidebar.classList.remove('open'));

  // Character counter for prompt
  const promptTextarea = document.getElementById('gen-prompt');
  const charCount = document.getElementById('char-count');
  if (promptTextarea && charCount) {
    promptTextarea.addEventListener('input', () => {
      const len = promptTextarea.value.length;
      charCount.textContent = `${len} / 2000 chars`;
      charCount.style.color = len > 1800 ? '#ef4444' : 'var(--text-muted)';
    });
  }

  // Redraw chart on theme change
  const observer = new MutationObserver(() => drawUsageChart());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Chart.js loaded event
  window.addEventListener('chartjs-ready', drawUsageChart);

  // Draw on load regardless
  setTimeout(drawUsageChart, 300);
}

/* ─── GENERATE FUNCTION ────────────────────────────────────── */
const sampleOutputs = {
  content: `<h3 style="margin-bottom:.75rem;">The Complete Guide to AI Content Creation for SaaS Marketers</h3>
<p>In 2024, SaaS companies that leverage AI for content creation are <strong>3x more likely to hit their traffic targets</strong> — here's how to join them.</p>
<h4 style="margin:.75rem 0 .4rem;">Why AI Content Creation Changes Everything</h4>
<p>The traditional content bottleneck — waiting days for writers, spending thousands on agencies — is officially over. With tools like NexusAI, you can produce SEO-optimized long-form content in minutes, not weeks.</p>
<p><strong>Key benefits for SaaS marketers:</strong><br/>→ 10x output with the same team<br/>→ Consistent brand voice at every scale<br/>→ A/B test content variations instantly<br/>→ Rank faster with AI-optimized structure</p>
<p>Ready to start? <a href="/signup" style="color:#818cf8;">Try NexusAI free for 14 days →</a></p>`,
  image: `<div style="padding:2rem;text-align:center;background:rgba(99,102,241,0.05);border-radius:8px;">
<i class="fas fa-image" style="font-size:3rem;color:#818cf8;margin-bottom:1rem;display:block;"></i>
<p style="color:var(--text-primary);font-weight:600;">Image Generated Successfully</p>
<p style="color:var(--text-muted);font-size:.85rem;">1024×1024 · PNG · 2.4MB · Generated in 4.2s</p>
</div>`,
  code: `<pre style="background:var(--bg-base);padding:1.25rem;border-radius:8px;overflow-x:auto;font-size:.82rem;font-family:'JetBrains Mono',monospace;color:#e2e8f0;"><code><span style="color:#818cf8">import</span> { useState, useEffect } <span style="color:#818cf8">from</span> <span style="color:#86efac">'react'</span>;
<span style="color:#818cf8">import</span> { generateContent } <span style="color:#818cf8">from</span> <span style="color:#86efac">'./api/nexusai'</span>;

<span style="color:#818cf8">export default function</span> <span style="color:#7dd3fc">AIContentGenerator</span>() {
  <span style="color:#818cf8">const</span> [prompt, setPrompt] = useState(<span style="color:#86efac">''</span>);
  <span style="color:#818cf8">const</span> [output, setOutput] = useState(<span style="color:#86efac">''</span>);
  <span style="color:#818cf8">const</span> [loading, setLoading] = useState(<span style="color:#fbbf24">false</span>);

  <span style="color:#818cf8">const</span> <span style="color:#7dd3fc">handleGenerate</span> = <span style="color:#818cf8">async</span> () => {
    setLoading(<span style="color:#fbbf24">true</span>);
    <span style="color:#818cf8">const</span> result = <span style="color:#818cf8">await</span> generateContent({ prompt, model: <span style="color:#86efac">'gpt-4o'</span> });
    setOutput(result.content);
    setLoading(<span style="color:#fbbf24">false</span>);
  };

  <span style="color:#818cf8">return</span> (
    &lt;<span style="color:#7dd3fc">div</span> className=<span style="color:#86efac">"ai-generator"</span>&gt;
      &lt;<span style="color:#7dd3fc">textarea</span> value={prompt} onChange={e => setPrompt(e.target.value)} /&gt;
      &lt;<span style="color:#7dd3fc">button</span> onClick={handleGenerate} disabled={loading}&gt;Generate&lt;/<span style="color:#7dd3fc">button</span>&gt;
      {output &amp;&amp; &lt;<span style="color:#7dd3fc">div</span> className=<span style="color:#86efac">"output"</span>&gt;{output}&lt;/<span style="color:#7dd3fc">div</span>&gt;}
    &lt;/<span style="color:#7dd3fc">div</span>&gt;
  );
}</code></pre>`,
  chat: `<div style="display:flex;flex-direction:column;gap:.75rem;">
<div style="display:flex;gap:.75rem;align-items:flex-start;">
  <div style="width:30px;height:30px;border-radius:50%;background:var(--bg-elevated);display:flex;align-items:center;justify-content:center;font-size:.75rem;flex-shrink:0;color:var(--text-muted);">You</div>
  <div style="background:var(--bg-elevated);padding:.75rem 1rem;border-radius:12px;border-radius:0 12px 12px 12px;font-size:.88rem;color:var(--text-secondary);">How can I improve my SaaS onboarding flow?</div>
</div>
<div style="display:flex;gap:.75rem;align-items:flex-start;flex-direction:row-reverse;">
  <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:.7rem;flex-shrink:0;color:#fff;font-weight:700;">AI</div>
  <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);padding:.75rem 1rem;border-radius:12px 0 12px 12px;font-size:.88rem;color:var(--text-secondary);max-width:85%;">
    Great question! Here are 5 proven strategies to improve your SaaS onboarding:
    <ol style="margin-top:.5rem;padding-left:1.25rem;line-height:1.8;">
      <li>Reduce time-to-value — show the "aha moment" in under 2 minutes</li>
      <li>Use interactive product tours, not static walkthrough videos</li>
      <li>Personalize onboarding by user role or use case</li>
      <li>Send triggered emails based on feature adoption</li>
      <li>Add a progress bar — users complete 30% more when they see progress</li>
    </ol>
    Want me to write the onboarding email sequence for any of these?
  </div>
</div>
</div>`
};

function dashGenerate() {
  const prompt = document.getElementById('gen-prompt');
  const outputContent = document.getElementById('gen-output-content');
  const outputWords = document.getElementById('output-words');
  const btn = document.querySelector('[onclick="dashGenerate()"]');
  const activeType = document.querySelector('.gen-type.active');
  const type = activeType ? activeType.dataset.type : 'content';

  if (!prompt || !prompt.value.trim()) {
    showToast('Please enter a prompt first.', 'error');
    return;
  }

  if (btn) {
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;
  }

  outputContent.innerHTML = `
    <div style="display:flex;gap:.4rem;align-items:center;padding:.5rem;">
      <span style="width:8px;height:8px;background:#818cf8;border-radius:50%;animation:typingBounce 1.2s infinite;display:inline-block;"></span>
      <span style="width:8px;height:8px;background:#818cf8;border-radius:50%;animation:typingBounce 1.2s infinite .2s;display:inline-block;"></span>
      <span style="width:8px;height:8px;background:#818cf8;border-radius:50%;animation:typingBounce 1.2s infinite .4s;display:inline-block;"></span>
      <span style="color:var(--text-muted);font-size:.82rem;margin-left:.5rem;">Generating with GPT-4o...</span>
    </div>
  `;

  setTimeout(() => {
    const output = sampleOutputs[type] || sampleOutputs.content;
    outputContent.innerHTML = output;
    if (outputWords) outputWords.textContent = Math.floor(Math.random() * 300 + 200) + ' words';
    if (btn) {
      btn.innerHTML = '<i class="fas fa-bolt"></i> Generate with AI';
      btn.disabled = false;
    }
    showToast('✨ Content generated successfully!');
  }, 2000);
}

function copyGen() {
  const content = document.getElementById('gen-output-content');
  if (content) {
    navigator.clipboard.writeText(content.innerText).then(() => showToast('Copied to clipboard!'));
  }
}

function clearPrompt() {
  const ta = document.getElementById('gen-prompt');
  if (ta) { ta.value = ''; ta.focus(); }
  const charCount = document.getElementById('char-count');
  if (charCount) charCount.textContent = '0 / 2000 chars';
}

function pasteExample() {
  const examples = {
    content: 'Write a 1,200-word SEO blog post about the top 5 AI productivity tools for startups in 2024. Include an engaging intro, H2 headings, practical tips, and a CTA to sign up for NexusAI.',
    image: 'A futuristic SaaS dashboard UI with dark theme, purple gradient accents, showing AI analytics and data visualization. Clean, minimal, professional.',
    code: 'Create a React hook called useAIGeneration that handles async AI content generation with loading states, error handling, and retry logic. Include TypeScript types.',
    chat: 'I\'m building a B2B SaaS for HR teams. What are the most effective positioning angles I should test for landing page messaging?'
  };
  const ta = document.getElementById('gen-prompt');
  const activeType = document.querySelector('.gen-type.active');
  const type = activeType ? activeType.dataset.type : 'content';
  if (ta) {
    ta.value = examples[type] || examples.content;
    ta.dispatchEvent(new Event('input'));
    ta.focus();
  }
}

function selectGenType(el, type) {
  document.querySelectorAll('.gen-type').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const placeholders = {
    content: 'Describe the content you want to generate... Be specific for best results.',
    image: 'Describe the image you want to create in detail...',
    code: 'Describe the code you want to generate (language, framework, functionality)...',
    chat: 'Ask NexusAI anything about your business, marketing, or product...'
  };
  const ta = document.getElementById('gen-prompt');
  if (ta) ta.placeholder = placeholders[type] || placeholders.content;
}

function useTemplate(name) {
  switchTab('generate');
  const ta = document.getElementById('gen-prompt');
  if (ta) {
    ta.value = `Using the "${name}" template:\n\n`;
    ta.focus();
  }
}

function updateLengthLabel(input) {
  const labels = ['', 'Short (~300 words)', 'Medium (~600 words)', 'Long (~1200 words)', 'Very Long (~2000 words)', 'Max (~3000 words)'];
  const el = document.getElementById('length-label');
  if (el) el.textContent = labels[input.value] || 'Medium';
}

/* ─── TOAST FOR DASHBOARD ──────────────────────────────────── */
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  const colors = { success: '#10b981', error: '#ef4444', info: '#6366f1' };
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
    background: var(--bg-card); border: 1px solid ${colors[type]}44;
    color: var(--text-primary); padding: .85rem 1.25rem; border-radius: 12px;
    font-size: .875rem; font-weight: 500; box-shadow: 0 8px 32px rgba(0,0,0,.4);
    display: flex; align-items: center; gap: .65rem; max-width: 320px;
    animation: toastIn .3s cubic-bezier(0.16,1,0.3,1) forwards;
  `;
  const dot = document.createElement('span');
  dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${colors[type]};flex-shrink:0;`;
  toast.appendChild(dot);
  toast.appendChild(document.createTextNode(msg));
  document.body.appendChild(toast);

  if (!document.querySelector('style#toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = `@keyframes toastIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes typingBounce{0%,80%,100%{transform:scale(.8);opacity:.4}40%{transform:scale(1.2);opacity:1}}`;
    document.head.appendChild(s);
  }

  setTimeout(() => {
    toast.style.transition = 'all .3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
