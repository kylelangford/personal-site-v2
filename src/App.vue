<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const year = new Date().getFullYear()
const heroText = ref('Precision Frontend Engineering')
const displayText = ref('')
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>[]{}/'

let observer = null

// Text decode animation
function decodeText(finalText, duration = 2000) {
  const length = finalText.length
  const iterations = 3 // How many times each character scrambles before settling
  const intervalTime = duration / (length * iterations)

  let currentIndex = 0
  let iterationCount = 0

  // Start with all scrambled
  displayText.value = finalText.split('').map(char =>
    char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
  ).join('')

  const interval = setInterval(() => {
    displayText.value = finalText.split('').map((char, index) => {
      if (char === ' ') return ' '
      if (index < currentIndex) return char // Already decoded
      return chars[Math.floor(Math.random() * chars.length)] // Still scrambling
    }).join('')

    iterationCount++
    if (iterationCount >= iterations) {
      iterationCount = 0
      currentIndex++
    }

    if (currentIndex > length) {
      clearInterval(interval)
      displayText.value = finalText
    }
  }, intervalTime)
}

onMounted(() => {
  // Set dark theme as default
  document.documentElement.setAttribute('data-theme', 'dark')

  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    // Show final text immediately
    displayText.value = heroText.value
  } else {
    // Run decode animation
    setTimeout(() => decodeText(heroText.value, 2000), 300)
  }

  // Get animated elements
  const animatedElements = document.querySelectorAll('[data-animate]')

  if (prefersReducedMotion) {
    animatedElements.forEach(el => el.classList.add('animate-in'))
    return
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target
        const delay = element.dataset.delay || 0

        setTimeout(() => {
          element.classList.add('animate-in')
        }, parseInt(delay))

        observer.unobserve(element)
      }
    })
  }, observerOptions)

  animatedElements.forEach(el => observer.observe(el))
})

onUnmounted(() => {
  // Clean up observer to prevent memory leaks
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>


<template>
  <!-- Skip Navigation -->
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  
  <main id="main-content" role="main">
    <!-- HERO -->
    <section class="bg-ink hero-glow-container" aria-labelledby="hero-heading">
      <!-- Animated glow orbs -->
      <div class="glow-orb glow-orb-1" aria-hidden="true"></div>
      <div class="glow-orb glow-orb-2" aria-hidden="true"></div>
      <div class="glow-orb glow-orb-3" aria-hidden="true"></div>

      <div class="container py-24 md:py-32 relative z-10">
        <div class="hero-content">
          <h1 id="hero-heading" class="heading-hero">
            <span class="text-decode">{{ displayText }}</span><span class="text-cursor" aria-hidden="true"></span>
          </h1>
          <p class="content-spacing text-lead lead-content">
            We build web apps, micro SaaS products, and AI-powered tools for modern businesses.
            From B2B dashboards to agentic workflows—production-ready software that scales.
          </p>
          <div class="actions-spacing flex items-center gap-4" role="group" aria-label="Primary actions">
            <a href="https://kylelangford.com/" target="_blank" rel="noopener noreferrer" class="btn-primary">Founded by Kyle Langford</a>
            <a href="https://kylelangford.com/blog" target="_blank" rel="noopener noreferrer" class="btn-ghost">My Blog</a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FEATURED PROJECTS - Sticky Stacking -->
    <section class="bg-ink" aria-labelledby="featured-heading">
      <div class="container section-padding">
        <h2 id="featured-heading" class="heading-section mb-8" data-animate="fade-up">Featured Projects</h2>

        <div class="stack-container flex flex-col gap-6 pb-24">
          <!-- Project 1: (Add)ictive Programming -->
          <div class="stack-card" data-animate="fade-up" data-delay="100">
            <div class="card shadow-soft">
              <div class="flex flex-col md:flex-row gap-6 md:items-center">
                <div class="flex-1">
                  <h3 class="heading-card">(Add)ictive Programming</h3>
                  <p class="content-spacing-sm text-body">
                    A technical blog covering modern web development, AI integration, and candid conversations about mental health and working with ADD in the tech industry.
                  </p>
                  <div class="content-spacing flex flex-wrap gap-2">
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">Astro</span>
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">MDX</span>
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">Technical Writing</span>
                  </div>
                </div>
                <a href="http://addictiveprogramming.com/" target="_blank" rel="noopener noreferrer" class="btn-primary shrink-0">View Project</a>
              </div>
            </div>
          </div>
          <!-- Project 2: Spend Analyzer -->
          <div class="stack-card" data-animate="fade-up" data-delay="100">
            <div class="card shadow-soft">
              <div class="flex flex-col md:flex-row gap-6 md:items-center">
                <div class="flex-1">
                  <h3 class="heading-card">Spend Analyzer</h3>
                  <p class="content-spacing-sm text-body">
                    A micro SaaS tool that helps users understand their spending patterns. Upload transaction data, visualize trends, and identify opportunities to save.
                  </p>
                  <div class="content-spacing flex flex-wrap gap-2">
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">Vue 3</span>
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">TypeScript</span>
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">AI</span>
                  </div>
                </div>
                <span class="btn-primary btn-disabled shrink-0">Coming Soon</span>
              </div>
            </div>
          </div>

          <!-- Project 3: Daily Planner -->
          <div class="stack-card" data-animate="fade-up" data-delay="150">
            <div class="card shadow-soft">
              <div class="flex flex-col md:flex-row gap-6 md:items-center">
                <div class="flex-1">
                  <h3 class="heading-card">Daily Planner</h3>
                  <p class="content-spacing-sm text-body">
                    A developer tool that analyzes JavaScript code for readability and maintainability. Get actionable insights to write cleaner, more understandable code.
                  </p>
                  <div class="content-spacing flex flex-wrap gap-2">
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">Vue 3</span>
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">Typescript</span>
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">AI</span>
                  </div>
                </div>
                <span class="btn-primary btn-disabled shrink-0">Coming Soon</span>
              </div>
            </div>
          </div>

          <!-- Project 4: QR Holo -->
          <div class="stack-card" data-animate="fade-up" data-delay="200">
            <div class="card shadow-soft">
              <div class="flex flex-col md:flex-row gap-6 md:items-center">
                <div class="flex-1">
                  <h3 class="heading-card">QR Holo</h3>
                  <p class="content-spacing-sm text-body">
                    Generate QR codes with holographic visual effects. A utility tool that makes functional QR codes visually distinctive and memorable.
                  </p>
                  <div class="content-spacing flex flex-wrap gap-2">
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">Canvas API</span>
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">WebGL</span>
                    <span class="text-xs px-2 py-1 bg-white/5 rounded text-slate">QR Generation</span>
                  </div>
                </div>
                <span class="btn-primary btn-disabled shrink-0">Coming Soon</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="bg-ink" data-animate="fade-up" aria-labelledby="services-heading">
      <div class="container section-padding">
        <h2 id="services-heading" class="heading-section" data-animate="fade-up">Services</h2>
        <div class="actions-spacing grid-cards-3" role="list" aria-label="What we build">
          <div class="card" data-animate="fade-up" data-delay="100" role="listitem">
            <h3 class="heading-service">Web Applications</h3>
            <p class="content-spacing-xs text-body">Full-stack apps with modern frameworks, APIs, and cloud infrastructure.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="150" role="listitem">
            <h3 class="heading-service">Micro SaaS Products</h3>
            <p class="content-spacing-xs text-body">Focused software products that solve specific business problems.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="200" role="listitem">
            <h3 class="heading-service">B2B Tools & Dashboards</h3>
            <p class="content-spacing-xs text-body">Internal tools, admin panels, and data-driven interfaces.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="250" role="listitem">
            <h3 class="heading-service">Agentic Workflows</h3>
            <p class="content-spacing-xs text-body">Autonomous AI agents that automate complex multi-step processes.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="300" role="listitem">
            <h3 class="heading-service">AI Integration</h3>
            <p class="content-spacing-xs text-body">LLM-powered features, embeddings, and intelligent web apps.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="350" role="listitem">
            <h3 class="heading-service">Developer Tools</h3>
            <p class="content-spacing-xs text-body">Workflows, tooling, and systems that improves developer experience.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TECH STACK -->
    <section class="bg-ink" data-animate="fade-up" aria-labelledby="stack-heading">
      <div class="container section-padding-sm">
        <h2 id="stack-heading" class="heading-section text-center" data-animate="fade-up">Tech Stack</h2>
        <div class="content-spacing flex flex-wrap justify-center gap-3 md:gap-4" data-animate="fade-up" data-delay="100">
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Vue</span>
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Svelte</span>
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">TypeScript</span>
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Node.js</span>
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">PostgreSQL</span>
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Tailwind</span>
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Vercel</span>
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">OpenAI</span>
          <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Anthropic</span>
        </div>
      </div>
    </section>


    <!-- CONTACT CTA -->
    <section class="bg-ink" data-animate="fade-up" aria-labelledby="cta-heading">
      <div class="container section-padding">
        <div class="text-center max-w-2xl mx-auto">
          <h2 id="cta-heading" class="heading-section" data-animate="fade-up">Let's Build Something</h2>
          <p class="content-spacing text-body text-slate" data-animate="fade-up" data-delay="100">
            Have a project in mind? Whether it's a web app, SaaS product, or AI integration—I'd love to hear about it.
          </p>
          <a
            href="mailto:kyle.langford@gmail.com"
            class="content-spacing inline-block btn-primary"
            data-animate="fade-up"
            data-delay="200"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-ink border-t border-orange/10" role="contentinfo" aria-label="Site footer">
      <div class="container py-10 text-slate">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p>© {{ year }} Precision Frontend Engineering.</p>
          <div class="flex items-center gap-4">
            <a href="https://kylelangford.com" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-slate hover:text-orange transition-colors text-sm">
              Founded by Kyle Langford
            </a>
            <a 
              href="https://www.linkedin.com/in/kylelangford/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-2 text-slate hover:text-orange transition-colors text-sm"
              aria-label="Kyle Langford on LinkedIn"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  </main>

</template>
