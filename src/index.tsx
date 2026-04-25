import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// ─── Landing Page (Home) ─────────────────────────────────────────────────────
app.get('/', (c) => {
  return c.html(landingPage())
})

// ─── Additional Pages ────────────────────────────────────────────────────────
app.get('/features', (c) => c.html(featuresPage()))
app.get('/pricing', (c) => c.html(pricingPage()))
app.get('/blog', (c) => c.html(blogPage()))
app.get('/contact', (c) => c.html(contactPage()))
app.get('/login', (c) => c.html(loginPage()))
app.get('/signup', (c) => c.html(signupPage()))
app.get('/dashboard', (c) => c.html(dashboardPage()))

// ─── Landing Page Variations ─────────────────────────────────────────────────
app.get('/variant-dark', (c) => c.html(variantDarkPage()))
app.get('/variant-minimal', (c) => c.html(variantMinimalPage()))

// ─── Helper: shared <head> ───────────────────────────────────────────────────
function sharedHead(title: string, extraCss = '') {
  return `
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} — NexusAI</title>
  <meta name="description" content="NexusAI – The AI-powered content & automation platform for modern teams. Generate copy, visuals, and workflows in seconds."/>
  <meta property="og:title" content="${title} — NexusAI"/>
  <meta property="og:description" content="Supercharge your workflow with AI. Generate, automate, and scale faster than ever."/>
  <meta property="og:type" content="website"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="/static/css/design-system.css"/>
  <link rel="stylesheet" href="/static/css/components.css"/>
  ${extraCss}
  `
}

// ─── LANDING PAGE ────────────────────────────────────────────────────────────
function landingPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Home')}<link rel="stylesheet" href="/static/css/landing.css"/></head>
<body>

<!-- STICKY HEADER -->
<header class="site-header" id="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo">
        <div class="logo-icon"><i class="fas fa-bolt"></i></div>
        <span class="logo-text">Nexus<span class="gradient-text">AI</span></span>
      </a>
      <nav class="main-nav" id="main-nav">
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
        <a href="/dashboard" class="nav-badge">Dashboard <span class="badge">New</span></a>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" id="theme-toggle" title="Toggle dark/light mode">
          <i class="fas fa-moon" id="theme-icon"></i>
        </button>
        <a href="/login" class="btn btn-ghost">Sign In</a>
        <a href="/signup" class="btn btn-primary">Start Free Trial</a>
        <button class="mobile-menu-btn" id="mobile-menu-btn">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- HERO SECTION -->
<section class="hero-section" id="hero">
  <div class="hero-bg-grid"></div>
  <div class="hero-orb hero-orb-1"></div>
  <div class="hero-orb hero-orb-2"></div>
  <div class="hero-orb hero-orb-3"></div>
  <div class="container">
    <div class="hero-badge">
      <i class="fas fa-sparkles"></i>
      <span>Introducing NexusAI 2.0 — Now with GPT-4o Vision</span>
      <a href="/features">Learn more <i class="fas fa-arrow-right"></i></a>
    </div>
    <h1 class="hero-headline">
      Create <span class="gradient-text typed-text" id="typed-text">10x Faster</span><br/>
      with the Power of AI
    </h1>
    <p class="hero-subheadline">
      NexusAI is the all-in-one AI platform that generates content, automates workflows, 
      and scales your business — in seconds, not hours.
    </p>
    <div class="hero-cta-group">
      <a href="/signup" class="btn btn-primary btn-xl pulse-glow">
        <i class="fas fa-rocket"></i> Start Free Trial
        <span class="btn-subtitle">No credit card required</span>
      </a>
      <button class="btn btn-outline btn-xl" id="play-demo-btn">
        <i class="fas fa-play"></i> Watch Demo
        <span class="btn-subtitle">2 min overview</span>
      </button>
    </div>
    <div class="hero-trust">
      <span class="trust-label">Trusted by teams at</span>
      <div class="trust-logos">
        <span class="trust-logo">Stripe</span>
        <span class="trust-logo">Vercel</span>
        <span class="trust-logo">Notion</span>
        <span class="trust-logo">Linear</span>
        <span class="trust-logo">Figma</span>
      </div>
    </div>
  </div>
  <div class="hero-stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number counter" data-target="50000">0</div>
          <div class="stat-label">Active Users</div>
        </div>
        <div class="stat-item">
          <div class="stat-number counter" data-target="99">0</div>
          <div class="stat-label">Uptime %</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">10x</div>
          <div class="stat-label">Faster Output</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">$2.4M</div>
          <div class="stat-label">Saved by Users</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PRODUCT DEMO SECTION -->
<section class="demo-section" id="demo">
  <div class="container">
    <div class="section-header">
      <div class="section-tag"><i class="fas fa-wand-magic-sparkles"></i> Live Demo</div>
      <h2 class="section-title">See NexusAI in Action</h2>
      <p class="section-subtitle">Watch how our AI transforms a simple prompt into polished, professional content in real time.</p>
    </div>
    <div class="demo-interface">
      <div class="demo-sidebar">
        <div class="demo-nav-item active" data-demo="content">
          <i class="fas fa-pen-nib"></i><span>Content Writer</span>
        </div>
        <div class="demo-nav-item" data-demo="image">
          <i class="fas fa-image"></i><span>Image Gen</span>
        </div>
        <div class="demo-nav-item" data-demo="code">
          <i class="fas fa-code"></i><span>Code Helper</span>
        </div>
        <div class="demo-nav-item" data-demo="chat">
          <i class="fas fa-comments"></i><span>AI Chat</span>
        </div>
      </div>
      <div class="demo-main">
        <div class="demo-toolbar">
          <div class="demo-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="demo-filename">nexusai — content-generator</span>
          <div class="demo-actions">
            <button class="demo-action-btn"><i class="fas fa-expand"></i></button>
          </div>
        </div>
        <div class="demo-content" id="demo-content">
          <div class="demo-input-area">
            <label class="demo-label">Your Prompt</label>
            <div class="demo-textarea-wrapper">
              <textarea class="demo-textarea" id="demo-prompt" placeholder="Write a compelling product launch email for our new AI tool...">Write a compelling product launch email for our new AI tool targeting SaaS founders...</textarea>
              <div class="demo-textarea-actions">
                <button class="demo-enhance-btn" onclick="enhancePrompt()">
                  <i class="fas fa-sparkles"></i> Enhance
                </button>
              </div>
            </div>
            <div class="demo-options">
              <select class="demo-select"><option>Professional</option><option>Casual</option><option>Persuasive</option></select>
              <select class="demo-select"><option>Long Form</option><option>Short Form</option><option>Bullet Points</option></select>
              <button class="btn btn-primary btn-sm" onclick="runDemo()">
                <i class="fas fa-bolt"></i> Generate
              </button>
            </div>
          </div>
          <div class="demo-output-area" id="demo-output">
            <label class="demo-label">AI Output <span class="demo-badge">GPT-4o</span></label>
            <div class="demo-output-content" id="demo-output-content">
              <div class="typing-indicator" id="typing-indicator">
                <span></span><span></span><span></span>
              </div>
              <div id="output-text" class="output-text hidden">
                <p><strong>Subject: The future of content creation is here 🚀</strong></p>
                <p>Hi [First Name],</p>
                <p>I'll cut straight to the point — we just shipped something that's going to fundamentally change how you create content.</p>
                <p>Introducing <strong>NexusAI 2.0</strong>: the AI platform built specifically for SaaS founders who are tired of spending hours on copy, documentation, and marketing materials.</p>
                <p>Here's what early users are saying:<br/>→ "I wrote a 2,000-word blog post in 4 minutes."<br/>→ "Cut our content budget by 60% in week one."<br/>→ "This is the unfair advantage I've been waiting for."</p>
                <p>Ready to see it for yourself? <a href="#">Start your free 14-day trial →</a></p>
              </div>
            </div>
            <div class="demo-output-actions" id="demo-output-actions" style="display:none;">
              <button class="demo-copy-btn" onclick="copyOutput()"><i class="fas fa-copy"></i> Copy</button>
              <button class="demo-save-btn"><i class="fas fa-bookmark"></i> Save</button>
              <button class="demo-export-btn"><i class="fas fa-download"></i> Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES SECTION -->
<section class="features-section" id="features">
  <div class="features-bg-orb"></div>
  <div class="container">
    <div class="section-header">
      <div class="section-tag"><i class="fas fa-grid-2"></i> Features</div>
      <h2 class="section-title">Everything you need to<br/>move at <span class="gradient-text">AI speed</span></h2>
      <p class="section-subtitle">From content generation to full workflow automation — NexusAI handles the heavy lifting so your team can focus on what matters.</p>
    </div>
    <div class="features-grid">
      <div class="feature-card feature-card-large" data-aos="fade-up">
        <div class="feature-icon-wrap" style="--icon-color: #6366f1;">
          <i class="fas fa-brain"></i>
        </div>
        <h3>Multi-Model AI Engine</h3>
        <p>Access GPT-4o, Claude 3, Gemini Pro, and Llama 3 from one unified interface. Switch models per task to optimize for quality and cost.</p>
        <div class="feature-tags">
          <span>GPT-4o</span><span>Claude 3</span><span>Gemini</span>
        </div>
        <div class="feature-visual">
          <div class="model-selector-ui">
            <div class="model-option active"><span class="model-dot" style="background:#10a37f;"></span>GPT-4o</div>
            <div class="model-option"><span class="model-dot" style="background:#7c3aed;"></span>Claude 3</div>
            <div class="model-option"><span class="model-dot" style="background:#4285f4;"></span>Gemini</div>
          </div>
        </div>
      </div>

      <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
        <div class="feature-icon-wrap" style="--icon-color: #10b981;">
          <i class="fas fa-bolt"></i>
        </div>
        <h3>Lightning Fast Output</h3>
        <p>Generate 2,000-word articles, full code components, and marketing campaigns in under 10 seconds with our optimized inference pipeline.</p>
        <div class="speed-bar">
          <div class="speed-fill" style="width:92%;">
            <span>92% faster</span>
          </div>
        </div>
      </div>

      <div class="feature-card" data-aos="fade-up" data-aos-delay="150">
        <div class="feature-icon-wrap" style="--icon-color: #f59e0b;">
          <i class="fas fa-robot"></i>
        </div>
        <h3>Workflow Automation</h3>
        <p>Build AI-powered pipelines that run on schedule or trigger on events. Connect to Zapier, Make, and 200+ apps.</p>
      </div>

      <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
        <div class="feature-icon-wrap" style="--icon-color: #ec4899;">
          <i class="fas fa-palette"></i>
        </div>
        <h3>Brand Voice Training</h3>
        <p>Train NexusAI on your brand guidelines, tone, and style. Every output sounds authentically you — not generic AI.</p>
      </div>

      <div class="feature-card" data-aos="fade-up" data-aos-delay="250">
        <div class="feature-icon-wrap" style="--icon-color: #06b6d4;">
          <i class="fas fa-chart-line"></i>
        </div>
        <h3>Performance Analytics</h3>
        <p>Track content performance, usage patterns, and ROI across all your AI-generated assets with rich dashboards.</p>
      </div>

      <div class="feature-card feature-card-large" data-aos="fade-up" data-aos-delay="300">
        <div class="feature-icon-wrap" style="--icon-color: #8b5cf6;">
          <i class="fas fa-users"></i>
        </div>
        <h3>Team Collaboration</h3>
        <p>Share prompts, templates, and outputs with your team. Set permissions, comment on generations, and work in real time.</p>
        <div class="team-avatars">
          <div class="avatar" style="background: #6366f1;">A</div>
          <div class="avatar" style="background: #10b981;">B</div>
          <div class="avatar" style="background: #f59e0b;">C</div>
          <div class="avatar" style="background: #ec4899;">D</div>
          <div class="avatar avatar-count">+12</div>
        </div>
      </div>
    </div>

    <!-- Feature Comparison -->
    <div class="feature-comparison">
      <h3 class="compare-title">The NexusAI Advantage</h3>
      <div class="compare-grid">
        <div class="compare-col compare-before">
          <div class="compare-header">
            <i class="fas fa-times-circle"></i> Without NexusAI
          </div>
          <ul>
            <li><i class="fas fa-times"></i> 8+ hours on content creation</li>
            <li><i class="fas fa-times"></i> $3,000/mo content team cost</li>
            <li><i class="fas fa-times"></i> Inconsistent brand voice</li>
            <li><i class="fas fa-times"></i> Manual workflow bottlenecks</li>
            <li><i class="fas fa-times"></i> Slow iteration cycles</li>
          </ul>
        </div>
        <div class="compare-col compare-after">
          <div class="compare-header">
            <i class="fas fa-check-circle"></i> With NexusAI
          </div>
          <ul>
            <li><i class="fas fa-check"></i> Content in under 30 seconds</li>
            <li><i class="fas fa-check"></i> Save 70% on content costs</li>
            <li><i class="fas fa-check"></i> Always on-brand output</li>
            <li><i class="fas fa-check"></i> Fully automated pipelines</li>
            <li><i class="fas fa-check"></i> Ship 10x faster</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how-it-works" id="how-it-works">
  <div class="container">
    <div class="section-header">
      <div class="section-tag"><i class="fas fa-map"></i> How It Works</div>
      <h2 class="section-title">Up and running in <span class="gradient-text">3 simple steps</span></h2>
    </div>
    <div class="steps-grid">
      <div class="step-card" data-aos="fade-up">
        <div class="step-number">01</div>
        <div class="step-icon"><i class="fas fa-keyboard"></i></div>
        <h3>Enter Your Prompt</h3>
        <p>Describe what you need in plain English. Use our smart prompt builder or start from 500+ expert templates.</p>
      </div>
      <div class="step-connector"><i class="fas fa-arrow-right"></i></div>
      <div class="step-card" data-aos="fade-up" data-aos-delay="100">
        <div class="step-number">02</div>
        <div class="step-icon"><i class="fas fa-microchip"></i></div>
        <h3>AI Generates</h3>
        <p>Our multi-model AI engine processes your request, applies your brand voice, and generates premium output.</p>
      </div>
      <div class="step-connector"><i class="fas fa-arrow-right"></i></div>
      <div class="step-card" data-aos="fade-up" data-aos-delay="200">
        <div class="step-number">03</div>
        <div class="step-icon"><i class="fas fa-paper-plane"></i></div>
        <h3>Export & Publish</h3>
        <p>Edit, polish, and export to Notion, Google Docs, your CMS, or any platform via our one-click integrations.</p>
      </div>
    </div>
  </div>
</section>

<!-- PRICING SECTION -->
<section class="pricing-section" id="pricing">
  <div class="container">
    <div class="section-header">
      <div class="section-tag"><i class="fas fa-tag"></i> Pricing</div>
      <h2 class="section-title">Simple, transparent pricing</h2>
      <p class="section-subtitle">Choose the plan that fits your team. All plans include a 14-day free trial.</p>
      <div class="billing-toggle">
        <span id="monthly-label" class="toggle-label active">Monthly</span>
        <button class="toggle-switch" id="billing-toggle" onclick="toggleBilling()">
          <span class="toggle-thumb" id="toggle-thumb"></span>
        </button>
        <span id="yearly-label" class="toggle-label">Yearly <span class="save-badge">Save 20%</span></span>
      </div>
    </div>

    <div class="pricing-grid">
      <!-- Starter -->
      <div class="pricing-card" data-aos="fade-up">
        <div class="plan-header">
          <div class="plan-icon" style="background: rgba(99,102,241,0.1); color: #6366f1;"><i class="fas fa-seedling"></i></div>
          <h3 class="plan-name">Starter</h3>
          <p class="plan-desc">Perfect for solo creators and freelancers</p>
        </div>
        <div class="plan-price">
          <span class="price-currency">$</span>
          <span class="price-amount monthly-price">19</span>
          <span class="price-period">/month</span>
        </div>
        <ul class="plan-features">
          <li><i class="fas fa-check"></i> 50,000 AI words/month</li>
          <li><i class="fas fa-check"></i> 5 AI image generations</li>
          <li><i class="fas fa-check"></i> 10 workflow automations</li>
          <li><i class="fas fa-check"></i> GPT-4o access</li>
          <li><i class="fas fa-check"></i> Basic analytics</li>
          <li><i class="fas fa-check"></i> Email support</li>
          <li class="disabled"><i class="fas fa-times"></i> Brand voice training</li>
          <li class="disabled"><i class="fas fa-times"></i> Team collaboration</li>
          <li class="disabled"><i class="fas fa-times"></i> API access</li>
        </ul>
        <a href="/signup" class="btn btn-outline btn-full">Start Free Trial</a>
      </div>

      <!-- Pro (Featured) -->
      <div class="pricing-card pricing-featured" data-aos="fade-up" data-aos-delay="100">
        <div class="plan-badge">Most Popular</div>
        <div class="plan-header">
          <div class="plan-icon" style="background: rgba(99,102,241,0.2); color: #818cf8;"><i class="fas fa-rocket"></i></div>
          <h3 class="plan-name">Pro</h3>
          <p class="plan-desc">For growing teams and power users</p>
        </div>
        <div class="plan-price">
          <span class="price-currency">$</span>
          <span class="price-amount monthly-price">49</span>
          <span class="price-period">/month</span>
        </div>
        <ul class="plan-features">
          <li><i class="fas fa-check"></i> Unlimited AI words</li>
          <li><i class="fas fa-check"></i> 100 AI image generations</li>
          <li><i class="fas fa-check"></i> Unlimited automations</li>
          <li><i class="fas fa-check"></i> All AI models (GPT-4o, Claude, Gemini)</li>
          <li><i class="fas fa-check"></i> Advanced analytics</li>
          <li><i class="fas fa-check"></i> Priority support</li>
          <li><i class="fas fa-check"></i> Brand voice training</li>
          <li><i class="fas fa-check"></i> 5 team seats</li>
          <li class="disabled"><i class="fas fa-times"></i> API access</li>
        </ul>
        <a href="/signup" class="btn btn-primary btn-full">Start Free Trial</a>
        <p class="plan-note">14-day free trial. No credit card required.</p>
      </div>

      <!-- Enterprise -->
      <div class="pricing-card" data-aos="fade-up" data-aos-delay="200">
        <div class="plan-header">
          <div class="plan-icon" style="background: rgba(245,158,11,0.1); color: #f59e0b;"><i class="fas fa-building"></i></div>
          <h3 class="plan-name">Enterprise</h3>
          <p class="plan-desc">For large teams with custom needs</p>
        </div>
        <div class="plan-price">
          <span class="price-currency">$</span>
          <span class="price-amount monthly-price">149</span>
          <span class="price-period">/month</span>
        </div>
        <ul class="plan-features">
          <li><i class="fas fa-check"></i> Everything in Pro</li>
          <li><i class="fas fa-check"></i> Unlimited image generations</li>
          <li><i class="fas fa-check"></i> Custom AI model fine-tuning</li>
          <li><i class="fas fa-check"></i> Full REST API access</li>
          <li><i class="fas fa-check"></i> Custom integrations</li>
          <li><i class="fas fa-check"></i> Dedicated account manager</li>
          <li><i class="fas fa-check"></i> SSO / SAML</li>
          <li><i class="fas fa-check"></i> Unlimited team seats</li>
          <li><i class="fas fa-check"></i> SLA guarantee</li>
        </ul>
        <a href="/contact" class="btn btn-outline btn-full">Contact Sales</a>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials-section" id="testimonials">
  <div class="container">
    <div class="section-header">
      <div class="section-tag"><i class="fas fa-star"></i> Testimonials</div>
      <h2 class="section-title">Loved by <span class="gradient-text">10,000+ teams</span></h2>
    </div>
    <div class="testimonials-grid">
      <div class="testimonial-card" data-aos="fade-up">
        <div class="testimonial-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="testimonial-text">"NexusAI completely transformed our content operation. We went from 3 writers to 1, and output doubled. The quality is genuinely indistinguishable from human writing."</p>
        <div class="testimonial-author">
          <div class="author-avatar" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);">SM</div>
          <div>
            <div class="author-name">Sarah Mitchell</div>
            <div class="author-role">Head of Content @ Drift</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card testimonial-featured" data-aos="fade-up" data-aos-delay="100">
        <div class="testimonial-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="testimonial-text">"We run a SaaS agency and NexusAI is essentially our secret weapon. We deliver client campaigns in 2 days instead of 2 weeks. The ROI is absolutely insane."</p>
        <div class="testimonial-author">
          <div class="author-avatar" style="background: linear-gradient(135deg, #10b981, #06b6d4);">JL</div>
          <div>
            <div class="author-name">James Liu</div>
            <div class="author-role">CEO @ GrowthStack Agency</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="200">
        <div class="testimonial-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="testimonial-text">"The brand voice training feature is a game-changer. Everything NexusAI writes sounds exactly like us. Our customers literally can't tell the difference."</p>
        <div class="testimonial-author">
          <div class="author-avatar" style="background: linear-gradient(135deg, #f59e0b, #ef4444);">AP</div>
          <div>
            <div class="author-name">Alex Park</div>
            <div class="author-role">Marketing Director @ Paddle</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="300">
        <div class="testimonial-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="testimonial-text">"Switched from Jasper and never looked back. NexusAI's multi-model access means I always get the best output. Support team is also incredibly responsive."</p>
        <div class="testimonial-author">
          <div class="author-avatar" style="background: linear-gradient(135deg, #ec4899, #8b5cf6);">RC</div>
          <div>
            <div class="author-name">Rachel Chen</div>
            <div class="author-role">Solo Founder @ Promptly</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="350">
        <div class="testimonial-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="testimonial-text">"We generate 50+ pieces of SEO content per week using NexusAI automations. Organic traffic is up 340% in 4 months. This tool pays for itself 100x over."</p>
        <div class="testimonial-author">
          <div class="author-avatar" style="background: linear-gradient(135deg, #06b6d4, #3b82f6);">MK</div>
          <div>
            <div class="author-name">Mike Korte</div>
            <div class="author-role">SEO Lead @ Webflow</div>
          </div>
        </div>
      </div>
      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="400">
        <div class="testimonial-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="testimonial-text">"Enterprise plan was a no-brainer. Custom model fine-tuning on our proprietary data means NexusAI truly understands our niche. Best B2B SaaS investment of the year."</p>
        <div class="testimonial-author">
          <div class="author-avatar" style="background: linear-gradient(135deg, #a855f7, #ec4899);">DW</div>
          <div>
            <div class="author-name">Diana Wang</div>
            <div class="author-role">VP Marketing @ Series B Startup</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Trust Badges -->
    <div class="trust-badges">
      <div class="trust-badge"><i class="fas fa-shield-halved"></i> SOC 2 Type II</div>
      <div class="trust-badge"><i class="fas fa-lock"></i> GDPR Compliant</div>
      <div class="trust-badge"><i class="fas fa-certificate"></i> ISO 27001</div>
      <div class="trust-badge"><i class="fas fa-star"></i> G2 Leader 2024</div>
      <div class="trust-badge"><i class="fas fa-award"></i> ProductHunt #1</div>
    </div>
  </div>
</section>

<!-- FAQ SECTION -->
<section class="faq-section" id="faq">
  <div class="container">
    <div class="section-header">
      <div class="section-tag"><i class="fas fa-circle-question"></i> FAQ</div>
      <h2 class="section-title">Frequently asked questions</h2>
    </div>
    <div class="faq-grid">
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-question">
          <span>How does the free trial work?</span>
          <i class="fas fa-plus faq-icon"></i>
        </div>
        <div class="faq-answer">
          <p>Start your 14-day free trial with full Pro plan features — no credit card required. At the end, you choose which plan fits your needs or cancel with one click. There are zero strings attached.</p>
        </div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-question">
          <span>Which AI models does NexusAI use?</span>
          <i class="fas fa-plus faq-icon"></i>
        </div>
        <div class="faq-answer">
          <p>NexusAI gives you access to GPT-4o, Claude 3.5 Sonnet, Google Gemini Pro, and Llama 3. You can choose which model to use per task, or let our smart router automatically select the best one for your prompt type.</p>
        </div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-question">
          <span>Can I train NexusAI on my brand voice?</span>
          <i class="fas fa-plus faq-icon"></i>
        </div>
        <div class="faq-answer">
          <p>Absolutely. Pro and Enterprise plans include Brand Voice Training. Simply upload examples of your existing content and writing guidelines. NexusAI learns your style and applies it to every generation.</p>
        </div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-question">
          <span>Is there an API available?</span>
          <i class="fas fa-plus faq-icon"></i>
        </div>
        <div class="faq-answer">
          <p>Yes! The Enterprise plan includes full REST API access with comprehensive documentation. You can integrate NexusAI into any custom workflow, CMS, or application. We also offer Webhooks, Zapier, and Make.com integrations.</p>
        </div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-question">
          <span>What content types can NexusAI generate?</span>
          <i class="fas fa-plus faq-icon"></i>
        </div>
        <div class="faq-answer">
          <p>NexusAI supports 50+ content types including blog posts, SEO articles, social media copy, email sequences, ad copy, product descriptions, landing pages, video scripts, code snippets, and more. We add new templates monthly.</p>
        </div>
      </div>
      <div class="faq-item" onclick="toggleFaq(this)">
        <div class="faq-question">
          <span>Is my data secure and private?</span>
          <i class="fas fa-plus faq-icon"></i>
        </div>
        <div class="faq-answer">
          <p>Security is our top priority. We're SOC 2 Type II certified and GDPR compliant. Your prompts and generated content are never used to train AI models. Data is encrypted at rest and in transit. Enterprise plans include dedicated data isolation.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta-section">
  <div class="cta-bg-orb-1"></div>
  <div class="cta-bg-orb-2"></div>
  <div class="container">
    <div class="final-cta-card">
      <div class="cta-grid-decoration"></div>
      <div class="section-tag"><i class="fas fa-rocket"></i> Get Started</div>
      <h2>Ready to create faster with AI?</h2>
      <p>Join 50,000+ teams already using NexusAI to build, create, and grow. Start your 14-day free trial today.</p>
      <div class="cta-buttons">
        <a href="/signup" class="btn btn-primary btn-xl pulse-glow">
          <i class="fas fa-rocket"></i> Start Free Trial
        </a>
        <a href="/contact" class="btn btn-outline btn-xl">
          <i class="fas fa-calendar"></i> Book a Demo
        </a>
      </div>
      <div class="cta-fine-print">No credit card required &nbsp;·&nbsp; 14-day free trial &nbsp;·&nbsp; Cancel anytime</div>
    </div>
  </div>
</section>

<!-- EMAIL CAPTURE SECTION -->
<section class="email-capture-section">
  <div class="container">
    <div class="email-capture-card">
      <div class="email-capture-text">
        <h3>Stay ahead of the AI curve</h3>
        <p>Get weekly tips, tutorials, and early access to new NexusAI features.</p>
      </div>
      <form class="email-capture-form" onsubmit="handleEmailCapture(event)">
        <input type="email" placeholder="Enter your work email" required class="email-input"/>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-paper-plane"></i> Subscribe
        </button>
      </form>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo">
          <div class="logo-icon"><i class="fas fa-bolt"></i></div>
          <span class="logo-text">Nexus<span class="gradient-text">AI</span></span>
        </a>
        <p>The AI platform built for modern teams who move fast.</p>
        <div class="footer-social">
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Product</h4>
        <ul>
          <li><a href="/features">Features</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="#">Integrations</a></li>
          <li><a href="#">Changelog</a></li>
          <li><a href="#">Roadmap</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="#">Careers <span class="footer-badge">Hiring</span></a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="#">Press Kit</a></li>
          <li><a href="#">Affiliate Program</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">API Reference</a></li>
          <li><a href="#">Templates</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">Status</a></li>
          <li><a href="#">Help Center</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Cookie Policy</a></li>
          <li><a href="#">Security</a></li>
          <li><a href="#">GDPR</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 NexusAI Inc. All rights reserved. Built with ❤️ for AI-powered teams.</p>
      <div class="footer-bottom-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Cookies</a>
      </div>
    </div>
  </div>
</footer>

<!-- VIDEO MODAL -->
<div class="modal-overlay" id="video-modal" onclick="closeModal()">
  <div class="modal-content" onclick="event.stopPropagation()">
    <button class="modal-close" onclick="closeModal()"><i class="fas fa-times"></i></button>
    <div class="video-placeholder">
      <i class="fas fa-play-circle"></i>
      <p>Product Demo Video</p>
      <span>2 min overview of NexusAI</span>
    </div>
  </div>
</div>

<script src="/static/js/main.js"></script>
</body>
</html>`
}

// ─── DASHBOARD PAGE ──────────────────────────────────────────────────────────
function dashboardPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Dashboard')}<link rel="stylesheet" href="/static/css/dashboard.css"/></head>
<body class="dashboard-body">

<!-- DASHBOARD SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <a href="/" class="logo">
      <div class="logo-icon"><i class="fas fa-bolt"></i></div>
      <span class="logo-text">Nexus<span class="gradient-text">AI</span></span>
    </a>
    <button class="sidebar-close" id="sidebar-close"><i class="fas fa-times"></i></button>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-group">
      <div class="nav-group-label">Main</div>
      <a href="/dashboard" class="nav-item active">
        <i class="fas fa-house"></i><span>Overview</span>
      </a>
      <a href="#" class="nav-item" onclick="switchTab('generate')">
        <i class="fas fa-bolt"></i><span>Generate</span>
        <span class="nav-badge-hot">HOT</span>
      </a>
      <a href="#" class="nav-item" onclick="switchTab('projects')">
        <i class="fas fa-folder"></i><span>Projects</span>
      </a>
      <a href="#" class="nav-item" onclick="switchTab('templates')">
        <i class="fas fa-layout"></i><span>Templates</span>
        <span class="nav-count">500+</span>
      </a>
    </div>
    <div class="nav-group">
      <div class="nav-group-label">Workspace</div>
      <a href="#" class="nav-item">
        <i class="fas fa-users"></i><span>Team</span>
      </a>
      <a href="#" class="nav-item">
        <i class="fas fa-chart-pie"></i><span>Analytics</span>
      </a>
      <a href="#" class="nav-item">
        <i class="fas fa-plug"></i><span>Integrations</span>
      </a>
      <a href="#" class="nav-item">
        <i class="fas fa-gear"></i><span>Settings</span>
      </a>
    </div>
  </nav>
  <div class="sidebar-footer">
    <div class="usage-card">
      <div class="usage-header">
        <span>Words Used</span>
        <span class="usage-count">34,200 / 50,000</span>
      </div>
      <div class="usage-bar">
        <div class="usage-fill" style="width: 68%"></div>
      </div>
      <a href="/pricing" class="upgrade-btn">
        <i class="fas fa-arrow-up"></i> Upgrade to Pro
      </a>
    </div>
    <div class="sidebar-user">
      <div class="user-avatar-sm">JD</div>
      <div class="user-info">
        <div class="user-name">John Doe</div>
        <div class="user-plan">Starter Plan</div>
      </div>
      <button class="user-menu-btn"><i class="fas fa-ellipsis"></i></button>
    </div>
  </div>
</aside>

<!-- MAIN CONTENT -->
<div class="dashboard-main" id="dashboard-main">
  <!-- TOP BAR -->
  <header class="dashboard-topbar">
    <div class="topbar-left">
      <button class="sidebar-toggle" id="sidebar-toggle">
        <i class="fas fa-bars"></i>
      </button>
      <div class="breadcrumb">
        <span>Dashboard</span>
        <i class="fas fa-chevron-right"></i>
        <span class="breadcrumb-current" id="breadcrumb-current">Overview</span>
      </div>
    </div>
    <div class="topbar-right">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search projects, templates..." />
        <kbd>⌘K</kbd>
      </div>
      <button class="topbar-btn" title="Notifications">
        <i class="fas fa-bell"></i>
        <span class="notif-dot"></span>
      </button>
      <button class="theme-toggle topbar-btn" id="dash-theme-toggle">
        <i class="fas fa-moon" id="dash-theme-icon"></i>
      </button>
      <div class="topbar-user">
        <div class="user-avatar-sm">JD</div>
      </div>
    </div>
  </header>

  <!-- DASHBOARD CONTENT TABS -->
  <div class="dashboard-content">

    <!-- OVERVIEW TAB -->
    <div class="dash-tab active" id="tab-overview">
      <div class="dash-section-header">
        <div>
          <h1>Good morning, John 👋</h1>
          <p>Here's what's happening with your workspace today.</p>
        </div>
        <a href="#" class="btn btn-primary btn-sm" onclick="switchTab('generate')">
          <i class="fas fa-bolt"></i> New Generation
        </a>
      </div>

      <!-- KPI CARDS -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon" style="background:rgba(99,102,241,.15);color:#818cf8;"><i class="fas fa-pen-nib"></i></div>
          <div class="kpi-data">
            <div class="kpi-number" data-target="34200">0</div>
            <div class="kpi-label">Words Generated</div>
            <div class="kpi-change positive"><i class="fas fa-arrow-up"></i> 12% vs last week</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:rgba(16,185,129,.15);color:#34d399;"><i class="fas fa-folder-open"></i></div>
          <div class="kpi-data">
            <div class="kpi-number" data-target="47">0</div>
            <div class="kpi-label">Projects Created</div>
            <div class="kpi-change positive"><i class="fas fa-arrow-up"></i> 5 new this week</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:rgba(245,158,11,.15);color:#fbbf24;"><i class="fas fa-clock"></i></div>
          <div class="kpi-data">
            <div class="kpi-number-text">14.3h</div>
            <div class="kpi-label">Time Saved</div>
            <div class="kpi-change positive"><i class="fas fa-arrow-up"></i> Est. this month</div>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon" style="background:rgba(236,72,153,.15);color:#f472b6;"><i class="fas fa-dollar-sign"></i></div>
          <div class="kpi-data">
            <div class="kpi-number-text">$892</div>
            <div class="kpi-label">Cost Saved</div>
            <div class="kpi-change positive"><i class="fas fa-arrow-up"></i> vs agency cost</div>
          </div>
        </div>
      </div>

      <!-- CHART + ACTIVITY -->
      <div class="overview-grid">
        <div class="chart-card">
          <div class="card-header">
            <h3>Usage Overview</h3>
            <div class="chart-tabs">
              <button class="chart-tab active" onclick="switchChart('words', this)">Words</button>
              <button class="chart-tab" onclick="switchChart('projects', this)">Projects</button>
            </div>
          </div>
          <div class="chart-area">
            <canvas id="usageChart" width="600" height="220"></canvas>
          </div>
        </div>

        <div class="activity-card">
          <div class="card-header">
            <h3>Recent Activity</h3>
            <a href="#" class="card-link">View all</a>
          </div>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(99,102,241,.15);color:#818cf8;"><i class="fas fa-pen-nib"></i></div>
              <div class="activity-info">
                <div class="activity-title">Blog post generated</div>
                <div class="activity-meta">2,150 words · 3 mins ago</div>
              </div>
              <span class="activity-type content">Content</span>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(16,185,129,.15);color:#34d399;"><i class="fas fa-image"></i></div>
              <div class="activity-info">
                <div class="activity-title">Hero image created</div>
                <div class="activity-meta">1024×1024 · 18 mins ago</div>
              </div>
              <span class="activity-type image">Image</span>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(245,158,11,.15);color:#fbbf24;"><i class="fas fa-envelope"></i></div>
              <div class="activity-info">
                <div class="activity-title">Email sequence drafted</div>
                <div class="activity-meta">5 emails · 1 hour ago</div>
              </div>
              <span class="activity-type email">Email</span>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(139,92,246,.15);color:#a78bfa;"><i class="fas fa-code"></i></div>
              <div class="activity-info">
                <div class="activity-title">React component built</div>
                <div class="activity-meta">142 lines · 2 hours ago</div>
              </div>
              <span class="activity-type code">Code</span>
            </div>
            <div class="activity-item">
              <div class="activity-icon" style="background:rgba(6,182,212,.15);color:#22d3ee;"><i class="fas fa-twitter"></i></div>
              <div class="activity-info">
                <div class="activity-title">Twitter thread written</div>
                <div class="activity-meta">12 tweets · Yesterday</div>
              </div>
              <span class="activity-type social">Social</span>
            </div>
          </div>
        </div>
      </div>

      <!-- PROJECTS QUICK VIEW -->
      <div class="quick-projects">
        <div class="card-header">
          <h3>Recent Projects</h3>
          <a href="#" class="card-link" onclick="switchTab('projects')">View all</a>
        </div>
        <div class="projects-grid-sm">
          <div class="project-card-sm" onclick="switchTab('generate')">
            <div class="project-icon"><i class="fas fa-globe"></i></div>
            <div class="project-name">Website Redesign Copy</div>
            <div class="project-meta">8 files · 2 days ago</div>
            <div class="project-status active">Active</div>
          </div>
          <div class="project-card-sm" onclick="switchTab('generate')">
            <div class="project-icon"><i class="fas fa-envelope-open"></i></div>
            <div class="project-name">Q4 Email Campaign</div>
            <div class="project-meta">12 files · 3 days ago</div>
            <div class="project-status active">Active</div>
          </div>
          <div class="project-card-sm" onclick="switchTab('generate')">
            <div class="project-icon"><i class="fas fa-hashtag"></i></div>
            <div class="project-name">Social Media Nov</div>
            <div class="project-meta">45 posts · 1 week ago</div>
            <div class="project-status draft">Draft</div>
          </div>
          <div class="project-card-sm new-project" onclick="switchTab('generate')">
            <div class="project-icon"><i class="fas fa-plus"></i></div>
            <div class="project-name">New Project</div>
            <div class="project-meta">Click to create</div>
          </div>
        </div>
      </div>
    </div>

    <!-- GENERATE TAB -->
    <div class="dash-tab" id="tab-generate">
      <div class="dash-section-header">
        <div>
          <h1>AI Generation Studio</h1>
          <p>Select a content type and generate in seconds.</p>
        </div>
      </div>
      <div class="generation-layout">
        <!-- Left: Controls -->
        <div class="gen-controls">
          <div class="gen-type-selector">
            <div class="gen-type active" data-type="content" onclick="selectGenType(this,'content')">
              <i class="fas fa-pen-nib"></i><span>Content</span>
            </div>
            <div class="gen-type" data-type="image" onclick="selectGenType(this,'image')">
              <i class="fas fa-image"></i><span>Image</span>
            </div>
            <div class="gen-type" data-type="code" onclick="selectGenType(this,'code')">
              <i class="fas fa-code"></i><span>Code</span>
            </div>
            <div class="gen-type" data-type="chat" onclick="selectGenType(this,'chat')">
              <i class="fas fa-comments"></i><span>Chat</span>
            </div>
          </div>

          <div class="gen-template-picker">
            <label>Template</label>
            <select class="form-select">
              <option>Blog Post</option>
              <option>Email Newsletter</option>
              <option>Social Media Post</option>
              <option>Ad Copy</option>
              <option>Product Description</option>
              <option>Landing Page</option>
              <option>Press Release</option>
              <option>Video Script</option>
            </select>
          </div>

          <div class="gen-field">
            <label>AI Model</label>
            <div class="model-pills">
              <button class="model-pill active">GPT-4o</button>
              <button class="model-pill">Claude 3</button>
              <button class="model-pill">Gemini</button>
            </div>
          </div>

          <div class="gen-field">
            <label>Tone</label>
            <select class="form-select">
              <option>Professional</option>
              <option>Casual</option>
              <option>Persuasive</option>
              <option>Humorous</option>
              <option>Educational</option>
            </select>
          </div>

          <div class="gen-field">
            <label>Length</label>
            <input type="range" min="1" max="5" value="3" class="range-slider" oninput="updateLengthLabel(this)"/>
            <div class="range-labels">
              <span>Short</span><span id="length-label">Medium</span><span>Long</span>
            </div>
          </div>

          <div class="gen-field">
            <label>Language</label>
            <select class="form-select">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
          </div>

          <div class="gen-field">
            <label>Keywords <span class="optional">(optional)</span></label>
            <input type="text" class="form-input" placeholder="AI, SaaS, automation..."/>
          </div>
        </div>

        <!-- Right: Prompt + Output -->
        <div class="gen-workspace">
          <div class="gen-prompt-area">
            <div class="prompt-header">
              <label>Your Prompt</label>
              <div class="prompt-actions">
                <button class="prompt-action" onclick="clearPrompt()"><i class="fas fa-trash"></i></button>
                <button class="prompt-action" onclick="pasteExample()"><i class="fas fa-lightbulb"></i> Example</button>
              </div>
            </div>
            <textarea id="gen-prompt" class="gen-textarea" placeholder="Describe what you want to create... Be specific for better results.

Example: Write a 1,200-word SEO blog post about AI content generation tools for SaaS marketers. Include H2 headings, an intro hook, 3 main sections with tips, and a strong CTA at the end."></textarea>
            <div class="prompt-footer">
              <span class="char-count" id="char-count">0 / 2000 chars</span>
              <button class="btn btn-primary" onclick="dashGenerate()">
                <i class="fas fa-bolt"></i> Generate with AI
              </button>
            </div>
          </div>

          <div class="gen-output-area" id="gen-output-area">
            <div class="output-header">
              <label>AI Output</label>
              <div class="output-meta">
                <span class="output-badge" id="output-model-badge">GPT-4o</span>
                <span class="output-words" id="output-words">0 words</span>
              </div>
              <div class="output-actions" id="output-actions-bar">
                <button onclick="copyGen()" class="output-action-btn"><i class="fas fa-copy"></i> Copy</button>
                <button class="output-action-btn"><i class="fas fa-wand-magic-sparkles"></i> Rewrite</button>
                <button class="output-action-btn"><i class="fas fa-download"></i> Export</button>
                <button class="output-action-btn"><i class="fas fa-bookmark"></i> Save</button>
              </div>
            </div>
            <div class="gen-output-content" id="gen-output-content">
              <div class="gen-placeholder">
                <i class="fas fa-bolt gen-placeholder-icon"></i>
                <p>Your AI-generated content will appear here.</p>
                <span>Enter a prompt and click Generate to get started.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PROJECTS TAB -->
    <div class="dash-tab" id="tab-projects">
      <div class="dash-section-header">
        <div>
          <h1>Projects</h1>
          <p>Manage and organize all your AI-generated content.</p>
        </div>
        <button class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> New Project</button>
      </div>

      <div class="projects-toolbar">
        <div class="projects-search">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search projects..."/>
        </div>
        <div class="projects-filters">
          <button class="filter-btn active">All</button>
          <button class="filter-btn">Active</button>
          <button class="filter-btn">Drafts</button>
          <button class="filter-btn">Archived</button>
        </div>
        <div class="view-toggle">
          <button class="view-btn active"><i class="fas fa-grid-2"></i></button>
          <button class="view-btn"><i class="fas fa-list"></i></button>
        </div>
      </div>

      <div class="projects-grid-full">
        ${generateProjectCards()}
      </div>
    </div>

    <!-- TEMPLATES TAB -->
    <div class="dash-tab" id="tab-templates">
      <div class="dash-section-header">
        <div>
          <h1>Template Library</h1>
          <p>500+ professionally crafted prompts for every use case.</p>
        </div>
      </div>
      <div class="templates-categories">
        <button class="cat-btn active">All</button>
        <button class="cat-btn">Marketing</button>
        <button class="cat-btn">SEO</button>
        <button class="cat-btn">Email</button>
        <button class="cat-btn">Social</button>
        <button class="cat-btn">Code</button>
        <button class="cat-btn">Sales</button>
      </div>
      <div class="templates-grid">
        ${generateTemplateCards()}
      </div>
    </div>

  </div>
</div>

<script>
// Chart.js CDN fallback — simple canvas drawing
window.addEventListener('load', function() {
  drawUsageChart();
  animateKPIs();
  initDashboard();
});
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<script src="/static/js/dashboard.js"></script>
</body>
</html>`
}

function generateProjectCards() {
  const projects = [
    { name: 'Website Redesign Copy', icon: 'fa-globe', color: '#6366f1', type: 'Content', files: 8, status: 'active', date: '2 days ago' },
    { name: 'Q4 Email Campaign', icon: 'fa-envelope-open', color: '#10b981', type: 'Email', files: 12, status: 'active', date: '3 days ago' },
    { name: 'Social Media Nov', icon: 'fa-hashtag', color: '#f59e0b', type: 'Social', files: 45, status: 'draft', date: '1 week ago' },
    { name: 'Product Launch Blog', icon: 'fa-rocket', color: '#ec4899', type: 'Blog', files: 3, status: 'active', date: '4 days ago' },
    { name: 'Ad Copy Experiments', icon: 'fa-bullhorn', color: '#8b5cf6', type: 'Ads', files: 24, status: 'draft', date: '5 days ago' },
    { name: 'API Documentation', icon: 'fa-book', color: '#06b6d4', type: 'Docs', files: 10, status: 'archived', date: '2 weeks ago' },
    { name: 'Investor Pitch Deck', icon: 'fa-chart-bar', color: '#ef4444', type: 'Presentation', files: 5, status: 'active', date: '1 day ago' },
    { name: 'Twitter Thread Pack', icon: 'fa-twitter', color: '#1d9bf0', type: 'Social', files: 30, status: 'active', date: '6 days ago' },
  ]
  return projects.map(p => `
    <div class="project-card-full">
      <div class="pcf-header">
        <div class="pcf-icon" style="background: ${p.color}22; color: ${p.color}">
          <i class="fas ${p.icon}"></i>
        </div>
        <div class="pcf-status ${p.status}">${p.status}</div>
      </div>
      <div class="pcf-name">${p.name}</div>
      <div class="pcf-meta">
        <span><i class="fas fa-file-alt"></i> ${p.files} files</span>
        <span><i class="fas fa-clock"></i> ${p.date}</span>
      </div>
      <div class="pcf-type-tag">${p.type}</div>
      <div class="pcf-actions">
        <button class="pcf-btn" onclick="switchTab('generate')"><i class="fas fa-bolt"></i> Open</button>
        <button class="pcf-btn"><i class="fas fa-ellipsis"></i></button>
      </div>
    </div>
  `).join('')
}

function generateTemplateCards() {
  const templates = [
    { name: 'SEO Blog Post', cat: 'SEO', icon: 'fa-search', color: '#10b981', desc: 'Long-form article optimized for search rankings' },
    { name: 'Cold Email Sequence', cat: 'Email', icon: 'fa-envelope', color: '#6366f1', desc: '5-email B2B outreach sequence with personalization' },
    { name: 'Product Hunt Launch', cat: 'Marketing', icon: 'fa-rocket', color: '#f59e0b', desc: 'Tagline, description, and maker comment' },
    { name: 'Twitter Thread', cat: 'Social', icon: 'fa-twitter', color: '#1d9bf0', desc: 'Viral-format thread with hook and CTA' },
    { name: 'Landing Page Copy', cat: 'Marketing', icon: 'fa-layout', color: '#ec4899', desc: 'Hero, benefits, social proof, and CTA sections' },
    { name: 'React Component', cat: 'Code', icon: 'fa-code', color: '#8b5cf6', desc: 'Functional component with hooks and TypeScript' },
    { name: 'LinkedIn Post', cat: 'Social', icon: 'fa-linkedin', color: '#0077b5', desc: 'Professional post with storytelling format' },
    { name: 'Sales Email', cat: 'Sales', icon: 'fa-handshake', color: '#06b6d4', desc: 'Personalized pitch email for B2B prospects' },
    { name: 'YouTube Script', cat: 'Marketing', icon: 'fa-youtube', color: '#ef4444', desc: 'Engaging video script with hook and chapters' },
    { name: 'Press Release', cat: 'Marketing', icon: 'fa-newspaper', color: '#64748b', desc: 'Formal announcement following AP style' },
    { name: 'Product Description', cat: 'SEO', icon: 'fa-shopping-bag', color: '#10b981', desc: 'Conversion-focused ecommerce copy with keywords' },
    { name: 'Onboarding Email', cat: 'Email', icon: 'fa-door-open', color: '#a855f7', desc: 'Welcome sequence for new SaaS users' },
  ]
  return templates.map(t => `
    <div class="template-card">
      <div class="tc-icon" style="background:${t.color}22;color:${t.color}">
        <i class="fas ${t.icon}"></i>
      </div>
      <div class="tc-cat">${t.cat}</div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-desc">${t.desc}</div>
      <button class="tc-use-btn" onclick="useTemplate('${t.name}')">
        <i class="fas fa-bolt"></i> Use Template
      </button>
    </div>
  `).join('')
}

// ─── FEATURES PAGE ───────────────────────────────────────────────────────────
function featuresPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Features')}</head>
<body>
${navHTML()}
<main class="page-main">
  <section class="page-hero">
    <div class="container">
      <div class="section-tag"><i class="fas fa-grid-2"></i> Platform Features</div>
      <h1 class="page-headline">Every tool your team needs<br/><span class="gradient-text">in one AI platform</span></h1>
      <p class="page-subheadline">50+ AI-powered tools for content, automation, analytics, and collaboration — unified under one intuitive workspace.</p>
    </div>
  </section>
  <section class="features-full container">
    <div class="features-list">
      ${featuresListHTML()}
    </div>
  </section>
  <section class="integrations-section container">
    <div class="section-header">
      <div class="section-tag"><i class="fas fa-plug"></i> Integrations</div>
      <h2 class="section-title">Connects with your entire stack</h2>
    </div>
    <div class="integrations-grid">
      ${['Zapier', 'Slack', 'Notion', 'HubSpot', 'Salesforce', 'Stripe', 'Google Workspace', 'Shopify', 'WordPress', 'Webflow', 'GitHub', 'Intercom'].map(n => `<div class="integration-badge"><i class="fas fa-link"></i> ${n}</div>`).join('')}
    </div>
  </section>
  ${footerHTML()}
</main>
<script src="/static/js/main.js"></script>
</body></html>`
}

function featuresListHTML() {
  const features = [
    { icon: 'fa-brain', color: '#6366f1', title: 'Multi-Model AI Engine', desc: 'Access GPT-4o, Claude 3, Gemini Pro, and Llama 3 from a single interface. Automatically route prompts to the best model for each task type.', tags: ['GPT-4o', 'Claude 3', 'Gemini Pro', 'Llama 3'] },
    { icon: 'fa-bolt', color: '#10b981', title: 'Instant Generation Pipeline', desc: 'Our proprietary inference optimization delivers outputs up to 10x faster than using model APIs directly. Zero queuing, zero cold starts.', tags: ['< 10s generation', 'No rate limits', 'Streaming output'] },
    { icon: 'fa-palette', color: '#ec4899', title: 'Brand Voice Training', desc: 'Upload your existing content and style guide. NexusAI learns your brand personality and applies it consistently across all generations.', tags: ['Custom tone', 'Style guide', 'On-brand output'] },
    { icon: 'fa-robot', color: '#f59e0b', title: 'Workflow Automation', desc: 'Build multi-step AI pipelines that trigger on schedules, webhooks, or user events. Connect to 200+ apps via Zapier and Make.', tags: ['Zapier', 'Make.com', 'Webhooks', 'Scheduled jobs'] },
    { icon: 'fa-chart-line', color: '#06b6d4', title: 'Advanced Analytics', desc: 'Track content performance, team usage, model cost breakdown, and ROI across all your AI operations with real-time dashboards.', tags: ['Usage tracking', 'Cost analysis', 'Performance metrics'] },
    { icon: 'fa-users', color: '#8b5cf6', title: 'Real-Time Collaboration', desc: 'Co-edit prompts and outputs, leave comments, assign tasks, and manage team permissions — all inside NexusAI.', tags: ['Live editing', 'Comments', 'Role management'] },
  ]
  return features.map((f, i) => `
    <div class="feature-full-item ${i % 2 === 1 ? 'reverse' : ''}" data-aos="fade-up">
      <div class="ffi-content">
        <div class="ffi-icon" style="background:${f.color}22;color:${f.color}"><i class="fas ${f.icon}"></i></div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
        <div class="ffi-tags">${f.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <a href="/signup" class="btn btn-outline btn-sm">Try it free <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="ffi-visual">
        <div class="ffi-mock" style="border-color: ${f.color}44;">
          <div class="ffi-mock-bar">
            <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
            <span style="font-size:11px;color:var(--text-muted);margin-left:8px;">${f.title}</span>
          </div>
          <div class="ffi-mock-content">
            <div class="ffi-bar" style="width:85%;background:${f.color};opacity:0.4;height:8px;border-radius:4px;margin-bottom:8px;"></div>
            <div class="ffi-bar" style="width:65%;background:${f.color};opacity:0.3;height:6px;border-radius:4px;margin-bottom:8px;"></div>
            <div class="ffi-bar" style="width:75%;background:${f.color};opacity:0.2;height:6px;border-radius:4px;"></div>
          </div>
        </div>
      </div>
    </div>
  `).join('')
}

// ─── PRICING PAGE ────────────────────────────────────────────────────────────
function pricingPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Pricing')}</head>
<body>
${navHTML()}
<main class="page-main">
  <section class="page-hero">
    <div class="container" style="text-align:center;">
      <div class="section-tag"><i class="fas fa-tag"></i> Pricing</div>
      <h1 class="page-headline">Simple, transparent pricing</h1>
      <p class="page-subheadline">Start free, scale as you grow. All plans include a 14-day trial with full Pro features.</p>
      <div class="billing-toggle" style="justify-content:center;margin-top:2rem;">
        <span class="toggle-label active">Monthly</span>
        <button class="toggle-switch" id="billing-toggle" onclick="toggleBilling()">
          <span class="toggle-thumb" id="toggle-thumb"></span>
        </button>
        <span class="toggle-label">Yearly <span class="save-badge">Save 20%</span></span>
      </div>
    </div>
  </section>
  <section class="container" style="padding:0 1rem 4rem;">
    <div class="pricing-grid">
      <div class="pricing-card" data-aos="fade-up">
        <div class="plan-header">
          <div class="plan-icon" style="background:rgba(99,102,241,.1);color:#6366f1;"><i class="fas fa-seedling"></i></div>
          <h3 class="plan-name">Starter</h3>
          <p class="plan-desc">For solo creators and freelancers</p>
        </div>
        <div class="plan-price"><span class="price-currency">$</span><span class="price-amount monthly-price">19</span><span class="price-period">/mo</span></div>
        <ul class="plan-features">
          <li><i class="fas fa-check"></i> 50,000 words/month</li>
          <li><i class="fas fa-check"></i> 5 AI image generations</li>
          <li><i class="fas fa-check"></i> 10 automations</li>
          <li><i class="fas fa-check"></i> GPT-4o access</li>
          <li><i class="fas fa-check"></i> Basic analytics</li>
          <li class="disabled"><i class="fas fa-times"></i> Brand voice training</li>
          <li class="disabled"><i class="fas fa-times"></i> API access</li>
        </ul>
        <a href="/signup" class="btn btn-outline btn-full">Get Started Free</a>
      </div>
      <div class="pricing-card pricing-featured" data-aos="fade-up" data-aos-delay="100">
        <div class="plan-badge">Most Popular</div>
        <div class="plan-header">
          <div class="plan-icon" style="background:rgba(99,102,241,.2);color:#818cf8;"><i class="fas fa-rocket"></i></div>
          <h3 class="plan-name">Pro</h3>
          <p class="plan-desc">For growing teams and power users</p>
        </div>
        <div class="plan-price"><span class="price-currency">$</span><span class="price-amount monthly-price">49</span><span class="price-period">/mo</span></div>
        <ul class="plan-features">
          <li><i class="fas fa-check"></i> Unlimited AI words</li>
          <li><i class="fas fa-check"></i> 100 image generations</li>
          <li><i class="fas fa-check"></i> Unlimited automations</li>
          <li><i class="fas fa-check"></i> All AI models</li>
          <li><i class="fas fa-check"></i> Brand voice training</li>
          <li><i class="fas fa-check"></i> Advanced analytics</li>
          <li><i class="fas fa-check"></i> 5 team seats</li>
        </ul>
        <a href="/signup" class="btn btn-primary btn-full">Start Free Trial</a>
      </div>
      <div class="pricing-card" data-aos="fade-up" data-aos-delay="200">
        <div class="plan-header">
          <div class="plan-icon" style="background:rgba(245,158,11,.1);color:#f59e0b;"><i class="fas fa-building"></i></div>
          <h3 class="plan-name">Enterprise</h3>
          <p class="plan-desc">Custom solutions for large teams</p>
        </div>
        <div class="plan-price"><span class="price-currency">$</span><span class="price-amount monthly-price">149</span><span class="price-period">/mo</span></div>
        <ul class="plan-features">
          <li><i class="fas fa-check"></i> Everything in Pro</li>
          <li><i class="fas fa-check"></i> Full REST API access</li>
          <li><i class="fas fa-check"></i> Custom model fine-tuning</li>
          <li><i class="fas fa-check"></i> SSO / SAML</li>
          <li><i class="fas fa-check"></i> Unlimited team seats</li>
          <li><i class="fas fa-check"></i> Dedicated support</li>
          <li><i class="fas fa-check"></i> SLA guarantee</li>
        </ul>
        <a href="/contact" class="btn btn-outline btn-full">Contact Sales</a>
      </div>
    </div>
  </section>
  ${footerHTML()}
</main>
<script src="/static/js/main.js"></script>
</body></html>`
}

// ─── BLOG PAGE ───────────────────────────────────────────────────────────────
function blogPage() {
  const posts = [
    { title: 'How We Built a $1M ARR SaaS Content Operation with AI', category: 'Case Study', date: 'Nov 12, 2024', read: '8 min read', color: '#6366f1' },
    { title: 'GPT-4o vs Claude 3.5: The Definitive Content Creation Comparison', category: 'Guide', date: 'Nov 8, 2024', read: '12 min read', color: '#10b981' },
    { title: '10 Prompt Engineering Secrets That Will 10x Your Output Quality', category: 'Tutorial', date: 'Nov 5, 2024', read: '6 min read', color: '#f59e0b' },
    { title: 'The Complete Guide to AI Workflow Automation in 2025', category: 'Guide', date: 'Nov 1, 2024', read: '15 min read', color: '#ec4899' },
    { title: 'Why Brand Voice Training Is the Most Underused AI Feature', category: 'Tips', date: 'Oct 28, 2024', read: '5 min read', color: '#8b5cf6' },
    { title: 'NexusAI Product Update: Introducing Vision, Voice & Agents', category: 'Product', date: 'Oct 22, 2024', read: '4 min read', color: '#06b6d4' },
  ]
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Blog')}</head>
<body>
${navHTML()}
<main class="page-main">
  <section class="page-hero">
    <div class="container" style="text-align:center;">
      <div class="section-tag"><i class="fas fa-newspaper"></i> NexusAI Blog</div>
      <h1 class="page-headline">Insights, tutorials & product updates</h1>
      <p class="page-subheadline">Stay ahead of AI with actionable guides from the NexusAI team and community.</p>
    </div>
  </section>
  <section class="container" style="padding:0 1rem 4rem;">
    <div class="blog-grid">
      ${posts.map((p, i) => `
        <article class="blog-card ${i === 0 ? 'blog-featured' : ''}" data-aos="fade-up" data-aos-delay="${i * 50}">
          <div class="blog-img" style="background: linear-gradient(135deg, ${p.color}33, ${p.color}11);">
            <div class="blog-img-icon" style="color:${p.color};"><i class="fas fa-newspaper"></i></div>
          </div>
          <div class="blog-body">
            <div class="blog-meta">
              <span class="blog-cat" style="color:${p.color};">${p.category}</span>
              <span class="blog-sep">·</span>
              <span>${p.date}</span>
              <span class="blog-sep">·</span>
              <span>${p.read}</span>
            </div>
            <h2 class="blog-title">${p.title}</h2>
            <a href="#" class="blog-read-more">Read Article <i class="fas fa-arrow-right"></i></a>
          </div>
        </article>
      `).join('')}
    </div>
  </section>
  ${footerHTML()}
</main>
<script src="/static/js/main.js"></script>
</body></html>`
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────
function contactPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Contact')}</head>
<body>
${navHTML()}
<main class="page-main">
  <section class="page-hero">
    <div class="container" style="text-align:center;">
      <div class="section-tag"><i class="fas fa-envelope"></i> Get in Touch</div>
      <h1 class="page-headline">We'd love to hear from you</h1>
      <p class="page-subheadline">Whether it's a sales question, support issue, or partnership opportunity — our team responds within 24 hours.</p>
    </div>
  </section>
  <section class="container contact-layout" style="padding:0 1rem 4rem;">
    <div class="contact-cards">
      <div class="contact-info-card">
        <i class="fas fa-comments"></i>
        <h3>Chat with Sales</h3>
        <p>Talk to a product specialist about your specific needs and get a custom demo.</p>
        <a href="/signup" class="btn btn-primary btn-sm">Book a Demo</a>
      </div>
      <div class="contact-info-card">
        <i class="fas fa-circle-question"></i>
        <h3>Support Center</h3>
        <p>Browse docs, tutorials, and community answers. Available 24/7 for Pro users.</p>
        <a href="#" class="btn btn-outline btn-sm">Open Help Desk</a>
      </div>
      <div class="contact-info-card">
        <i class="fas fa-handshake"></i>
        <h3>Partnerships</h3>
        <p>Interested in integrating NexusAI into your product or becoming an affiliate?</p>
        <a href="mailto:partners@nexusai.com" class="btn btn-outline btn-sm">Email Us</a>
      </div>
    </div>
    <div class="contact-form-card">
      <h2>Send us a message</h2>
      <form onsubmit="handleContact(event)" class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-input" placeholder="John" required/>
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-input" placeholder="Doe" required/>
          </div>
        </div>
        <div class="form-group">
          <label>Work Email</label>
          <input type="email" class="form-input" placeholder="john@company.com" required/>
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" class="form-input" placeholder="Acme Inc."/>
        </div>
        <div class="form-group">
          <label>Subject</label>
          <select class="form-select">
            <option>Sales inquiry</option>
            <option>Technical support</option>
            <option>Partnership</option>
            <option>Press / Media</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea class="form-input form-textarea" placeholder="Tell us how we can help..." rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-full">
          <i class="fas fa-paper-plane"></i> Send Message
        </button>
      </form>
    </div>
  </section>
  ${footerHTML()}
</main>
<script src="/static/js/main.js"></script>
</body></html>`
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function loginPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Sign In')}</head>
<body class="auth-body">
  <div class="auth-layout">
    <div class="auth-brand-panel">
      <a href="/" class="logo">
        <div class="logo-icon"><i class="fas fa-bolt"></i></div>
        <span class="logo-text">Nexus<span class="gradient-text">AI</span></span>
      </a>
      <div class="auth-brand-content">
        <h2>"NexusAI saved us 20+ hours a week.<br/>Absolute game-changer."</h2>
        <div class="auth-testimonial-author">
          <div class="author-avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);">JL</div>
          <div>
            <div class="author-name">James Liu</div>
            <div class="author-role">CEO @ GrowthStack</div>
          </div>
        </div>
      </div>
      <div class="auth-brand-orbs">
        <div class="auth-orb auth-orb-1"></div>
        <div class="auth-orb auth-orb-2"></div>
      </div>
    </div>
    <div class="auth-form-panel">
      <div class="auth-form-container">
        <button class="theme-toggle" id="auth-theme-toggle" style="position:absolute;top:1.5rem;right:1.5rem;">
          <i class="fas fa-moon"></i>
        </button>
        <div class="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to your NexusAI workspace</p>
        </div>
        <div class="auth-social-buttons">
          <button class="social-btn"><i class="fab fa-google"></i> Continue with Google</button>
          <button class="social-btn"><i class="fab fa-github"></i> Continue with GitHub</button>
        </div>
        <div class="auth-divider"><span>or continue with email</span></div>
        <form class="auth-form" onsubmit="handleLogin(event)">
          <div class="form-group">
            <label>Email Address</label>
            <div class="input-with-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" class="form-input" placeholder="john@company.com" required/>
            </div>
          </div>
          <div class="form-group">
            <label>
              Password
              <a href="#" class="forgot-link">Forgot password?</a>
            </label>
            <div class="input-with-icon">
              <i class="fas fa-lock"></i>
              <input type="password" class="form-input" placeholder="••••••••" required id="login-password"/>
              <button type="button" class="password-toggle" onclick="togglePassword('login-password')">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          <div class="form-group form-checkbox">
            <label class="checkbox-label">
              <input type="checkbox"/>
              <span class="checkmark"></span>
              Keep me signed in for 30 days
            </label>
          </div>
          <button type="submit" class="btn btn-primary btn-full">
            <i class="fas fa-arrow-right-to-bracket"></i> Sign In
          </button>
        </form>
        <p class="auth-footer-text">
          Don't have an account? <a href="/signup" class="auth-link">Sign up free</a>
        </p>
      </div>
    </div>
  </div>
<script src="/static/js/main.js"></script>
</body></html>`
}

// ─── SIGNUP PAGE ──────────────────────────────────────────────────────────────
function signupPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Start Free Trial')}</head>
<body class="auth-body">
  <div class="auth-layout">
    <div class="auth-brand-panel">
      <a href="/" class="logo">
        <div class="logo-icon"><i class="fas fa-bolt"></i></div>
        <span class="logo-text">Nexus<span class="gradient-text">AI</span></span>
      </a>
      <div class="auth-brand-content">
        <h2>Join 50,000+ teams creating content 10x faster with AI.</h2>
        <div class="signup-benefits">
          <div class="signup-benefit"><i class="fas fa-check-circle"></i> No credit card required</div>
          <div class="signup-benefit"><i class="fas fa-check-circle"></i> Full Pro features for 14 days</div>
          <div class="signup-benefit"><i class="fas fa-check-circle"></i> Setup in under 2 minutes</div>
          <div class="signup-benefit"><i class="fas fa-check-circle"></i> Cancel anytime, no questions asked</div>
        </div>
      </div>
      <div class="auth-brand-orbs">
        <div class="auth-orb auth-orb-1"></div>
        <div class="auth-orb auth-orb-2"></div>
      </div>
    </div>
    <div class="auth-form-panel">
      <div class="auth-form-container">
        <div class="auth-header">
          <h1>Start your free trial</h1>
          <p>Create your account in 30 seconds</p>
        </div>
        <div class="auth-social-buttons">
          <button class="social-btn"><i class="fab fa-google"></i> Sign up with Google</button>
          <button class="social-btn"><i class="fab fa-github"></i> Sign up with GitHub</button>
        </div>
        <div class="auth-divider"><span>or sign up with email</span></div>
        <form class="auth-form" onsubmit="handleSignup(event)">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" class="form-input" placeholder="John" required/>
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" class="form-input" placeholder="Doe" required/>
            </div>
          </div>
          <div class="form-group">
            <label>Work Email</label>
            <div class="input-with-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" class="form-input" placeholder="john@company.com" required/>
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <div class="input-with-icon">
              <i class="fas fa-lock"></i>
              <input type="password" class="form-input" placeholder="Min. 8 characters" required id="signup-password"/>
              <button type="button" class="password-toggle" onclick="togglePassword('signup-password')">
                <i class="fas fa-eye"></i>
              </button>
            </div>
            <div class="password-strength" id="password-strength">
              <div class="strength-bars">
                <span class="strength-bar"></span>
                <span class="strength-bar"></span>
                <span class="strength-bar"></span>
                <span class="strength-bar"></span>
              </div>
              <span class="strength-label" id="strength-label">Enter password</span>
            </div>
          </div>
          <div class="form-group">
            <label>Team Size</label>
            <select class="form-select form-input">
              <option>Just me</option>
              <option>2-5 people</option>
              <option>6-20 people</option>
              <option>21-100 people</option>
              <option>100+ people</option>
            </select>
          </div>
          <div class="form-group form-checkbox">
            <label class="checkbox-label">
              <input type="checkbox" required/>
              <span class="checkmark"></span>
              I agree to the <a href="#" class="auth-link">Terms of Service</a> and <a href="#" class="auth-link">Privacy Policy</a>
            </label>
          </div>
          <button type="submit" class="btn btn-primary btn-full pulse-glow">
            <i class="fas fa-rocket"></i> Create Free Account
          </button>
        </form>
        <p class="auth-footer-text">
          Already have an account? <a href="/login" class="auth-link">Sign in</a>
        </p>
      </div>
    </div>
  </div>
<script src="/static/js/main.js"></script>
</body></html>`
}

// ─── VARIANT: DARK HERO ───────────────────────────────────────────────────────
function variantDarkPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>${sharedHead('Variant — Dark Hero')}</head>
<body>
${navHTML()}
<section class="variant-dark-hero">
  <div class="vdh-grid"></div>
  <div class="container" style="text-align:center;position:relative;z-index:2;padding:8rem 1rem;">
    <div class="vdh-eyebrow">✦ The future of content creation is here</div>
    <h1 style="font-size:clamp(2.5rem,6vw,5rem);font-weight:900;line-height:1.1;margin:1.5rem 0;">
      The AI Platform That<br/>
      <span style="background: linear-gradient(90deg,#c084fc,#e879f9,#fb7185);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Writes, Designs & Ships</span>
    </h1>
    <p style="font-size:1.25rem;color:var(--text-muted);max-width:600px;margin:0 auto 3rem;">
      One AI workspace for content, images, code, and automation. Stop context-switching between 10 tools.
    </p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
      <a href="/signup" class="btn btn-primary btn-xl">Start for free →</a>
      <a href="/dashboard" class="btn btn-ghost btn-xl">See dashboard</a>
    </div>
    <div class="vdh-scroll-indicator">
      <div class="scroll-dot"></div>
    </div>
  </div>
</section>
<section style="padding:4rem 0;" class="container">
  <p style="text-align:center;color:var(--text-muted);margin-bottom:3rem;font-size:.9rem;letter-spacing:.1em;text-transform:uppercase;">As featured in</p>
  <div style="display:flex;gap:3rem;justify-content:center;flex-wrap:wrap;">
    ${['TechCrunch', 'Product Hunt', 'Forbes', 'Wired', 'The Verge'].map(n => `<span style="color:var(--text-muted);font-weight:600;font-size:1.1rem;">${n}</span>`).join('')}
  </div>
</section>
${footerHTML()}
<script src="/static/js/main.js"></script>
</body></html>`
}

// ─── VARIANT: MINIMAL ─────────────────────────────────────────────────────────
function variantMinimalPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>${sharedHead('Variant — Minimal')}</head>
<body>
${navHTML()}
<section style="padding:10rem 1rem 6rem;text-align:center;">
  <div class="container">
    <span style="font-size:.8rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--primary);">AI-POWERED</span>
    <h1 style="font-size:clamp(2.5rem,5vw,4.5rem);font-weight:800;margin:1rem 0;color:var(--text-primary);line-height:1.15;">
      Your AI writing assistant<br/>that actually understands you.
    </h1>
    <p style="font-size:1.1rem;color:var(--text-muted);max-width:540px;margin:0 auto 3rem;line-height:1.7;">
      NexusAI learns your brand, matches your tone, and generates content that sounds authentically like you — at 10x the speed.
    </p>
    <form style="display:flex;gap:.5rem;max-width:440px;margin:0 auto 1rem;" onsubmit="handleEmailCapture(event)">
      <input type="email" placeholder="Work email address" required style="flex:1;padding:.75rem 1rem;border:1.5px solid var(--border);border-radius:8px;background:var(--bg-surface);color:var(--text-primary);font-size:1rem;outline:none;"/>
      <button type="submit" class="btn btn-primary">Get started free</button>
    </form>
    <p style="font-size:.8rem;color:var(--text-muted);">No credit card · 14-day trial · Cancel anytime</p>
  </div>
</section>
${footerHTML()}
<script src="/static/js/main.js"></script>
</body></html>`
}

// ─── SHARED NAV & FOOTER HTML ─────────────────────────────────────────────────
function navHTML() {
  return `<header class="site-header" id="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo">
        <div class="logo-icon"><i class="fas fa-bolt"></i></div>
        <span class="logo-text">Nexus<span class="gradient-text">AI</span></span>
      </a>
      <nav class="main-nav" id="main-nav">
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
        <a href="/dashboard" class="nav-badge">Dashboard</a>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" id="theme-toggle" title="Toggle dark/light mode">
          <i class="fas fa-moon" id="theme-icon"></i>
        </button>
        <a href="/login" class="btn btn-ghost">Sign In</a>
        <a href="/signup" class="btn btn-primary">Get Started</a>
        <button class="mobile-menu-btn" id="mobile-menu-btn">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</header>`
}

function footerHTML() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo">
          <div class="logo-icon"><i class="fas fa-bolt"></i></div>
          <span class="logo-text">Nexus<span class="gradient-text">AI</span></span>
        </a>
        <p>The AI platform built for modern teams who move fast.</p>
        <div class="footer-social">
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
        </div>
      </div>
      <div class="footer-col"><h4>Product</h4><ul>
        <li><a href="/features">Features</a></li>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="#">Integrations</a></li>
      </ul></div>
      <div class="footer-col"><h4>Company</h4><ul>
        <li><a href="#">About</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="#">Careers</a></li>
      </ul></div>
      <div class="footer-col"><h4>Legal</h4><ul>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#">Security</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 NexusAI Inc. All rights reserved.</p>
    </div>
  </div>
</footer>`
}

export default app
