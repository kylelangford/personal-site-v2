<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import Icon from '../components/Icon.vue'

const year = new Date().getFullYear()
const heroText = ref('Web Development Done&nbsp;Right')
const displayText = ref('')
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>[]{}/'

let observer = null

// Intro animation state
const introComplete = ref(false)
const scrollY = ref(0)
const activeSection = ref('intro')

// Sections for lava lamp nav
const sections = [
  { id: 'intro', label: 'Top' },
  { id: 'expertise', label: 'What We Do' },
  { id: 'who', label: 'Good Fit' },
  { id: 'services', label: 'How It Works' },
  { id: 'packages', label: 'Packages' },
  { id: 'contact', label: 'Contact' }
]

// Computed intro opacity based on scroll - faster fade for snappier feel
const introOpacity = computed(() => {
  const fadeStart = 0
  const fadeEnd = 150
  if (scrollY.value <= fadeStart) return 1
  if (scrollY.value >= fadeEnd) return 0
  return 1 - (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
})

// Move up as you scroll
const introTranslateY = computed(() => {
  const moveStart = 0
  const moveEnd = 200
  if (scrollY.value <= moveStart) return 0
  if (scrollY.value >= moveEnd) return -100
  return -100 * (scrollY.value - moveStart) / (moveEnd - moveStart)
})

// Step number opacity based on scroll - returns opacity for each step
const stepNumberOpacity = ref([0.15, 0.15, 0.15, 0.15])

// Card expand state - both cards expand/collapse together
const cardsExpanded = ref(false)

function toggleCards() {
  cardsExpanded.value = !cardsExpanded.value
}

function updateStepOpacities() {
  const steps = document.querySelectorAll('.step-number')
  steps.forEach((step, index) => {
    const rect = step.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementCenter = rect.top + rect.height / 2

    // Start fading in when element is 80% down the viewport
    // Fully opaque when element is at 40% of viewport
    const fadeStart = windowHeight * 0.8
    const fadeEnd = windowHeight * 0.4

    if (elementCenter >= fadeStart) {
      stepNumberOpacity.value[index] = 0.15
    } else if (elementCenter <= fadeEnd) {
      stepNumberOpacity.value[index] = 1
    } else {
      const progress = (fadeStart - elementCenter) / (fadeStart - fadeEnd)
      stepNumberOpacity.value[index] = 0.15 + (0.85 * progress)
    }
  })
}

// Scroll handler
function handleScroll() {
  scrollY.value = window.scrollY

  // Update active section based on scroll position
  const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean)
  for (let i = sectionElements.length - 1; i >= 0; i--) {
    const rect = sectionElements[i].getBoundingClientRect()
    if (rect.top <= window.innerHeight / 2) {
      activeSection.value = sections[i].id
      break
    }
  }

  // Emit scroll event for header
  if (scrollY.value > 200) {
    document.body.classList.add('scrolled-past-intro')
  } else {
    document.body.classList.remove('scrolled-past-intro')
  }

  // Update step number opacities
  updateStepOpacities()
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// Contact form state
const form = reactive({
  company: '',
  name: '',
  email: '',
  siteUrl: '',
  message: ''
})

const formStatus = ref('idle') // idle, submitting, success, error
const formError = ref('')

async function submitForm() {
  formStatus.value = 'submitting'
  formError.value = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (!response.ok) throw new Error('Failed to send')

    formStatus.value = 'success'
    Object.assign(form, {
      company: '',
      name: '',
      email: '',
      siteUrl: '',
      message: ''
    })
  } catch (err) {
    formStatus.value = 'error'
    formError.value = 'Something went wrong. Please email us directly.'
  }
}

// Text decode animation
function decodeText(finalText, duration = 2000) {
  const length = finalText.length
  const iterations = 3
  const intervalTime = duration / (length * iterations)

  let currentIndex = 0
  let iterationCount = 0

  function buildText() {
    return finalText.split('').map((char, index) => {
      if (char === ' ') return ' '
      if (index < currentIndex) {
        return `<span class="decoded">${char}</span>`
      }
      return `<span class="decoding">${chars[Math.floor(Math.random() * chars.length)]}</span>`
    }).join('')
  }

  displayText.value = buildText()

  const interval = setInterval(() => {
    iterationCount++
    if (iterationCount >= iterations) {
      iterationCount = 0
      currentIndex++
    }

    displayText.value = buildText()

    if (currentIndex > length) {
      clearInterval(interval)
      displayText.value = finalText
    }
  }, intervalTime)
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark')

  // Prevent browser scroll restoration and start at top
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  if (!window.location.hash) {
    window.scrollTo(0, 0)
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial call

  // Check if this is first visit in session
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')

  // Intro animation
  if (prefersReducedMotion) {
    introComplete.value = true
    displayText.value = heroText.value
  } else {
    // Trigger intro animation after a brief delay
    setTimeout(() => {
      introComplete.value = true
    }, 100)

    // Auto-scroll to hero after 3 seconds (first visit only)
    if (!hasSeenIntro) {
      sessionStorage.setItem('hasSeenIntro', 'true')
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }, 3000)
    }

    // Start text decode when hero comes into view
    const heroSection = document.querySelector('.hero-glow-container')
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            decodeText(heroText.value, 2000)
            heroObserver.disconnect()
          }
        })
      }, { threshold: 0.3 })
      heroObserver.observe(heroSection)
    }
  }

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
  window.removeEventListener('scroll', handleScroll)
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

// What we do well
const problems = [
  {
    title: 'Component Systems',
    risk: 'Design to code',
    description: 'Translating detailed designs into reusable, maintainable components. Much harder to replace with a template or AI.',
    icon: 'swatch',
    link: '/services/redesign'
  },
  {
    title: 'Enterprise CMS',
    risk: 'WordPress, Drupal, AEM',
    description: 'Implementation across enterprise CMS platforms. Custom themes, headless setups, complex content models.',
    icon: 'puzzle-piece',
    link: '/services/legacy-cms'
  },
  {
    title: 'Site Rebuilds',
    risk: 'Modernization',
    description: 'Rebuilding outdated or poorly maintained sites. Your Drupal 7 or old WordPress is hurting your team.',
    icon: 'cursor-arrow-rays',
    link: '/services/tech-migration'
  },
  {
    title: 'Integrations',
    risk: 'Connected systems',
    description: 'CRM, analytics, forms and marketing-platform integrations. Troubleshooting the ones that broke.',
    icon: 'chart-bar',
    link: '/services/broken-links'
  },
  {
    title: 'Performance & A11y',
    risk: 'Core Web Vitals',
    description: 'Accessibility, performance and Core Web Vitals. Google recommends them for search and UX—ongoing technical work.',
    icon: 'sparkles',
    link: '/services/performance'
  },
  {
    title: 'Technical Ownership',
    risk: 'Continuity',
    description: 'Supporting teams after the original developer disappears. Internal marketing teams that lack senior dev help.',
    icon: 'chart-pie',
    link: '/services/scaling'
  }
]

// Process steps
const processSteps = [
  {
    step: '01',
    title: 'Share Your Project',
    description: 'Tell us what you\'re working on—new build, updates, or improvements.'
  },
  {
    step: '02',
    title: 'We Review',
    description: 'We look at your requirements and put together a scope and quote.'
  },
  {
    step: '03',
    title: 'Quick Chat',
    description: '(Not) optional call to align on details. Or just reply via email. 50% down, 50% on completion.'
  },
  {
    step: '04',
    title: 'We Build',
    description: 'We get to work and deliver. Fixed pricing, no surprises.'
  }
]

// Who this is for
const idealClients = [
  {
    title: 'Growing Companies',
    description: 'Your website isn\'t converting like it should. You need it to build credibility and drive leads.'
  },
  {
    title: 'Funded Startups',
    description: 'You have your app to take care of—let us handle your website.'
  },
  {
    title: 'Marketing Teams',
    description: 'Support and implementation—supercharge your marketing effort.'
  },
  {
    title: 'Regional Leaders',
    description: 'You dominate your market but your website doesn\'t reflect it. Time to match your credibility online.'
  }
]

// All services for the services section
const allServices = [
  { title: 'Site Building', link: '/services/redesign', description: 'Full builds from design to launch' },
  { title: 'Interactive Elements', link: '/services/conversion', description: 'Forms, filters, dynamic UI' },
  { title: 'Animation & Effects', link: '/services/performance', description: 'Micro-interactions, scroll effects' },
  { title: 'Dashboards & Data', link: '/services/scaling', description: 'Admin panels, charts, reporting' },
  { title: 'CMS Theming', link: '/services/legacy-cms', description: 'WordPress, headless, custom themes' },
  { title: 'Form Integrations', link: '/services/broken-links', description: 'Logic, validation, third-party APIs' },
  { title: 'Tracking & Analytics', link: '/services/conversion', description: 'Custom events, goal tracking' },
  { title: 'Platform Migration', link: '/services/tech-migration', description: 'CMS moves, stack upgrades' },
  { title: 'Performance Tuning', link: '/services/performance', description: 'Core Web Vitals, speed fixes' },
  { title: 'Accessibility', link: '/services/accessibility', description: 'WCAG compliance, inclusive UX' }
]

// Results/metrics
const results = [
  { metric: '15+', label: 'Years Experience', description: 'Building web interfaces for startups, agencies, and growing companies' },
  { metric: '100+', label: 'Projects Delivered', description: 'From quick fixes to full platform migrations' },
  { metric: '24-48h', label: 'Quote Turnaround', description: 'Fast response with fixed pricing—no surprises' }
]

// Industries served
const industries = [
  'Healthcare Technology',
  'Higher Education',
  'Energy & Utilities',
  'SaaS Platforms',
  'Media & Publishing',
  'E-commerce'
]

// Productized services
const productizedServices = [
  {
    title: 'Website Audit',
    price: '$2,500',
    description: 'Performance, accessibility, SEO, and architecture review with prioritized recommendations.',
    deliverables: ['Technical audit report', 'Prioritized action items', '30-min review call']
  },
  {
    title: 'Core Web Vitals Fix',
    price: '$3,500',
    description: 'Guaranteed performance improvements. We fix what\'s slowing your site down.',
    deliverables: ['Performance optimization', 'Before/after metrics', 'LCP, CLS, INP improvements']
  },
  {
    title: 'Accessibility Compliance',
    price: '$5,000',
    description: 'WCAG AA audit and fixes. Make your site work for everyone.',
    deliverables: ['Full WCAG audit', 'Priority fixes implemented', 'Compliance documentation']
  },
  {
    title: 'Analytics Setup',
    price: '$2,000',
    description: 'GA4, custom events, and conversion tracking done right.',
    deliverables: ['GA4 configuration', 'Custom event tracking', 'Conversion goals setup']
  },
  {
    title: 'Landing Page',
    price: '$5,000',
    description: 'Design-to-code, single page, mobile-optimized. Ready to convert.',
    deliverables: ['Responsive build', 'Form integration', 'Analytics tracking']
  },
  {
    title: 'CMS Migration',
    price: 'From $15k',
    description: 'WordPress or Drupal rebuild with content migration. Modern stack, clean code.',
    deliverables: ['Platform migration', 'Content transfer', 'Redirects & SEO preservation']
  }
]

// How we work
const workStyle = [
  {
    title: 'Senior Expertise',
    description: 'You work directly with a senior developer, not a sales team. 15+ years of solving hard problems.'
  },
  {
    title: 'Single Point of Accountability',
    description: 'One person owns your project from start to finish. No handoffs, no "that\'s not my department."'
  },
  {
    title: 'Complex Implementation',
    description: 'The work templates and AI can\'t do—enterprise CMS, tricky integrations, sites that actually need engineering.'
  },
  {
    title: 'No Fluff',
    description: 'We don\'t upsell branding, SEO, or paid media. Just senior frontend work, done right.'
  }
]
</script>


<template>
  <!-- INTRO - Full screen centered logo -->
  <section
    id="intro"
    class="intro-screen"
    :style="{
      opacity: introOpacity,
      transform: `translateY(${introTranslateY}px)`
    }"
  >
    <div class="intro-content" :class="{ 'intro-visible': introComplete }">
      <span class="intro-logo font-display">Precision Frontend</span>
      <div class="intro-scroll-hint">
        <span class="text-slate text-sm">Growing companies need more out of their website</span>
        <svg class="intro-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </div>
  </section>

  <!-- Spacer to push content below intro -->
  <div class="h-screen" aria-hidden="true"></div>

  <!-- PAGE NAVIGATION -->
  <nav class="page-nav" aria-label="Page sections">
    <button
      v-for="section in sections"
      :key="section.id"
      @click="scrollToSection(section.id)"
      class="nav-dot"
      :class="{ 'nav-dot-active': activeSection === section.id }"
      :aria-label="section.label"
    >
      <span class="nav-dot-label">{{ section.label }}</span>
      <span class="nav-dot-inner"></span>
    </button>
  </nav>

  <!-- HERO -->
  <section class="bg-ink hero-glow-container" aria-labelledby="hero-heading">
    <div class="glow-orb glow-orb-1" aria-hidden="true"></div>
    <div class="glow-orb glow-orb-2" aria-hidden="true"></div>
    <div class="glow-orb glow-orb-3" aria-hidden="true"></div>

    <div class="container py-24 md:py-32 relative z-10">
      <div class="hero-content">
        <h1 id="hero-heading" class="heading-hero">
          <span class="text-decode" v-html="displayText"></span><span class="text-cursor" aria-hidden="true"></span>
        </h1>
        <p class="content-spacing text-lead lead-content">
          Senior technical implementation that improves credibility, conversions, and marketing operations—not just another website.
        </p>
        <div class="actions-spacing flex flex-col sm:flex-row items-start sm:items-center gap-4" role="group" aria-label="Primary actions">
          <a href="#contact" class="btn-primary w-full sm:w-auto justify-center">Get in Touch</a>
          <a href="#expertise" class="btn-ghost w-full sm:w-auto justify-center">What We Do</a>
        </div>
        <p class="mt-6 text-sm text-slate">A senior technical partner, not a full-service agency.</p>
      </div>
    </div>
  </section>

  <!-- EXPERTISE -->
  <section id="expertise" class="bg-ink" aria-labelledby="expertise-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="expertise-heading" class="heading-section" data-animate="fade-up">
          What We Do
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Convert the traffic you already have. Connect your marketing tools. Make your team faster.
        </p>
      </div>

      <div class="actions-spacing grid-cards-3" role="list">
        <RouterLink
          v-for="(problem, index) in problems"
          :key="problem.title"
          :to="problem.link"
          class="card card-link"
          :data-animate="'fade-up'"
          :data-delay="100 + (index * 50)"
          role="listitem"
        >
          <div class="mb-4 text-orange" aria-hidden="true">
            <Icon :name="problem.icon" size="32" />
          </div>
          <h3 class="heading-service">{{ problem.title }}</h3>
          <p class="text-orange text-sm font-medium mt-1">{{ problem.risk }}</p>
          <p class="content-spacing-sm text-body">{{ problem.description }}</p>
          <span class="mt-4 inline-flex items-center text-orange text-sm font-medium">
            Learn more →
          </span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- WHO IT'S FOR -->
  <section id="who" class="bg-ink" aria-labelledby="who-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="who-heading" class="heading-section" data-animate="fade-up">
          Good Fit
        </h2>
      </div>

      <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(client, index) in idealClients"
          :key="client.title"
          class="p-6 border border-orange/20 rounded-xl"
          :data-animate="'fade-up'"
          :data-delay="100 + (index * 50)"
        >
          <h3 class="heading-service">{{ client.title }}</h3>
          <p class="content-spacing-sm text-body text-sm">{{ client.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ALL SERVICES GRID -->
  <section id="all-services" class="bg-ink" aria-labelledby="all-services-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="all-services-heading" class="heading-section" data-animate="fade-up">
          What We Build
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          From full site builds to interactive components and complex integrations.
        </p>
      </div>

      <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <RouterLink
          v-for="(service, index) in allServices"
          :key="service.title"
          :to="service.link"
          class="p-4 border border-orange/20 rounded-lg hover:border-orange/50 transition-colors group"
          :data-animate="'fade-up'"
          :data-delay="100 + (index * 30)"
        >
          <h3 class="text-offwhite text-sm font-semibold group-hover:text-orange transition-colors">{{ service.title }}</h3>
          <p class="text-slate text-xs mt-1">{{ service.description }}</p>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- WHAT MATTERS -->
  <section class="bg-ink" aria-labelledby="matters-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="matters-heading" class="heading-section" data-animate="fade-up">
          What Actually Matters
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          You don't need a $50k custom website. You need one that works.
        </p>
      </div>

      <div class="actions-spacing grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div class="p-4 md:p-6 border border-orange/20 rounded-xl min-h-[180px] sm:min-h-[200px] md:min-h-0" data-animate="fade-up" data-delay="100">
          <p class="text-orange text-2xl font-display mb-2">01</p>
          <p class="text-offwhite font-semibold text-sm sm:text-base">Clearly explains what you offer</p>
        </div>
        <div class="p-4 md:p-6 border border-orange/20 rounded-xl min-h-[180px] sm:min-h-[200px] md:min-h-0" data-animate="fade-up" data-delay="150">
          <p class="text-orange text-2xl font-display mb-2">02</p>
          <p class="text-offwhite font-semibold text-sm sm:text-base">Shows credible evidence</p>
        </div>
        <div class="p-4 md:p-6 border border-orange/20 rounded-xl min-h-[180px] sm:min-h-[200px] md:min-h-0" data-animate="fade-up" data-delay="200">
          <p class="text-orange text-2xl font-display mb-2">03</p>
          <p class="text-offwhite font-semibold text-sm sm:text-base">Works properly on phones</p>
        </div>
        <div class="p-4 md:p-6 border border-orange/20 rounded-xl min-h-[180px] sm:min-h-[200px] md:min-h-0" data-animate="fade-up" data-delay="250">
          <p class="text-orange text-2xl font-display mb-2">04</p>
          <p class="text-offwhite font-semibold text-sm sm:text-base">Loads quickly</p>
        </div>
        <div class="p-4 md:p-6 border border-orange/20 rounded-xl min-h-[180px] sm:min-h-[200px] md:min-h-0" data-animate="fade-up" data-delay="300">
          <p class="text-orange text-2xl font-display mb-2">05</p>
          <p class="text-offwhite font-semibold text-sm sm:text-base">Makes the next action obvious</p>
        </div>
        <div class="p-4 md:p-6 border border-orange/20 rounded-xl min-h-[180px] sm:min-h-[200px] md:min-h-0" data-animate="fade-up" data-delay="350">
          <p class="text-orange text-2xl font-display mb-2">06</p>
          <p class="text-offwhite font-semibold text-sm sm:text-base">Appears in search and AI results</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services" class="bg-ink" aria-labelledby="services-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="services-heading" class="heading-section" data-animate="fade-up">
          How We Work
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Two ways to work together, depending on what you need.
        </p>
      </div>

      <div class="actions-spacing flex overflow-x-auto snap-x snap-mandatory md:overflow-visible md:flex-row gap-4 md:gap-8 items-start pb-4 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
        <!-- Project Work Card -->
        <article
          class="expandable-card flex-none w-[85vw] md:w-auto md:flex-1 snap-center"
          :class="{ 'is-expanded': cardsExpanded }"
        >
          <div class="expandable-card-inner" @click="toggleCards">
            <div class="flex items-center gap-3 mb-4">
              <span class="badge-free">Fixed Price</span>
              <span class="text-slate text-sm">24-48 hour response</span>
            </div>
            <h3 class="heading-card">Project Work</h3>
            <p class="content-spacing-sm text-body">
              Audits, implementation, and modernization. Senior technical work with clear deliverables and fixed pricing.
            </p>
            <ul class="mt-4 space-y-1 text-sm text-slate">
              <li class="flex items-center gap-2"><span class="text-orange">✓</span> Fixed-price quote</li>
              <li class="flex items-center gap-2"><span class="text-orange">✓</span> 50% down, 50% completion</li>
              <li class="flex items-center gap-2"><span class="text-orange">✓</span> No obligation</li>
            </ul>

            <div class="expandable-card-extra">
              <div class="pt-6 mt-6 border-t border-orange/20 space-y-6">
                <div>
                  <h4 class="text-offwhite font-semibold mb-3">Typical Project Pricing</h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-baseline">
                      <div>
                        <span class="text-offwhite">Audits & Planning</span>
                      </div>
                      <span class="text-orange font-semibold">$2,500 – $5k</span>
                    </div>
                    <p class="text-slate text-sm -mt-1">Architecture reviews, accessibility audits, performance analysis, roadmaps</p>

                    <div class="flex justify-between items-baseline">
                      <div>
                        <span class="text-offwhite">Feature Work</span>
                      </div>
                      <span class="text-orange font-semibold">$5k – $15k</span>
                    </div>
                    <p class="text-slate text-sm -mt-1">Component libraries, integrations, landing pages, CMS work</p>

                    <div class="flex justify-between items-baseline">
                      <div>
                        <span class="text-offwhite">Full Builds</span>
                      </div>
                      <span class="text-orange font-semibold">$15k – $40k</span>
                    </div>
                    <p class="text-slate text-sm -mt-1">Complete sites, WordPress/Drupal rebuilds, platform migrations</p>
                  </div>
                </div>
                <a href="#contact" class="btn-primary w-full sm:w-auto justify-center" @click.stop>Get a Quote</a>
              </div>
            </div>

            <div class="expandable-card-toggle mt-6 text-orange text-sm font-medium">
              <span v-if="cardsExpanded">Show Less ↑</span>
              <span v-else>View Pricing →</span>
            </div>
          </div>
        </article>

        <!-- Retained Services Card -->
        <article
          class="expandable-card flex-none w-[85vw] md:w-auto md:flex-1 snap-center"
          :class="{ 'is-expanded': cardsExpanded }"
        >
          <div class="expandable-card-inner" @click="toggleCards">
            <div class="flex items-center gap-3 mb-4">
              <span class="badge-paid">Monthly</span>
              <span class="text-slate text-sm">Ongoing partnership</span>
            </div>
            <h3 class="heading-card">Retained Services</h3>
            <p class="content-spacing-sm text-body">
              Roadmaps and ongoing web support. Make your marketing team faster with dedicated senior capacity.
            </p>
            <ul class="mt-4 space-y-1 text-sm text-slate">
              <li class="flex items-center gap-2"><span class="text-orange">✓</span> Priority response SLA</li>
              <li class="flex items-center gap-2"><span class="text-orange">✓</span> Direct Slack access</li>
              <li class="flex items-center gap-2"><span class="text-orange">✓</span> Hours roll over</li>
            </ul>

            <div class="expandable-card-extra">
              <div class="pt-6 mt-6 border-t border-orange/20 space-y-6">
                <div>
                  <h4 class="text-offwhite font-semibold mb-3">Retainer Options</h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-baseline">
                      <div>
                        <span class="text-offwhite">Starter</span>
                        <span class="text-slate text-sm ml-2">~10 hrs/mo</span>
                      </div>
                      <span class="text-orange font-semibold">$2,500/mo</span>
                    </div>
                    <p class="text-slate text-sm -mt-1">Maintenance, bug fixes, small updates</p>

                    <div class="flex justify-between items-baseline">
                      <div>
                        <span class="text-offwhite">Growth</span>
                        <span class="text-slate text-sm ml-2">~20 hrs/mo</span>
                      </div>
                      <span class="text-orange font-semibold">$4,500/mo</span>
                    </div>
                    <p class="text-slate text-sm -mt-1">Landing pages, analytics, ongoing improvements</p>

                    <div class="flex justify-between items-baseline">
                      <div>
                        <span class="text-offwhite">Scale</span>
                        <span class="text-slate text-sm ml-2">~30 hrs/mo</span>
                      </div>
                      <span class="text-orange font-semibold">$6,000/mo</span>
                    </div>
                    <p class="text-slate text-sm -mt-1">Dedicated capacity, priority everything</p>
                  </div>
                </div>
                <a href="#contact" class="btn-primary w-full sm:w-auto justify-center" @click.stop>Discuss Retainer</a>
              </div>
            </div>

            <div class="expandable-card-toggle mt-6 text-orange text-sm font-medium">
              <span v-if="cardsExpanded">Show Less ↑</span>
              <span v-else>View Pricing →</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- PRODUCTIZED SERVICES -->
  <section id="packages" class="bg-ink" aria-labelledby="packages-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="packages-heading" class="heading-section" data-animate="fade-up">
          Fixed-Price Packages
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Clear scope, fixed pricing. Contact for details.
        </p>
      </div>

      <div class="actions-spacing flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-4 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
        <article
          v-for="(service, index) in productizedServices"
          :key="service.title"
          class="card flex flex-col flex-none w-[85vw] sm:w-auto snap-center"
          :data-animate="'fade-up'"
          :data-delay="100 + (index * 50)"
        >
          <h3 class="heading-service mb-4">{{ service.title }}</h3>
          <p class="text-body text-sm mb-4">{{ service.description }}</p>
          <ul class="mt-auto space-y-1 text-sm text-slate">
            <li v-for="item in service.deliverables" :key="item" class="flex items-center gap-2">
              <span class="text-orange">✓</span> {{ item }}
            </li>
          </ul>
          <a href="#contact" class="btn-ghost w-full justify-center mt-6">Get Pricing</a>
        </article>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section id="process" class="bg-ink" aria-labelledby="process-heading">
    <div class="container section-padding">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 id="process-heading" class="heading-section" data-animate="fade-up">
          Simple Process
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Straightforward from start to finish.
        </p>
      </div>

      <div class="process-cards">
        <div
          v-for="(step, index) in processSteps"
          :key="step.step"
          class="process-card"
          :style="{ animationDelay: `${index * 2}s` }"
        >
          <div class="text-6xl font-display text-orange">{{ step.step }}</div>
          <div>
            <h3 class="text-offwhite font-semibold text-xl mb-3">{{ step.title }}</h3>
            <p class="text-body text-sm">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- RESULTS -->
  <section class="bg-ink" aria-labelledby="results-heading">
    <div class="container section-padding">
      <div class="grid md:grid-cols-3 gap-8 md:text-center">
        <div
          v-for="(result, index) in results"
          :key="result.label"
          :class="index % 2 === 0 ? 'text-left' : 'text-right'"
          class="py-8 md:py-0 md:!text-center"
          :data-animate="'fade-up'"
          :data-delay="100 + (index * 50)"
        >
          <div class="text-5xl md:text-6xl font-display text-orange mb-2">{{ result.metric }}</div>
          <div class="text-offwhite font-semibold mb-2">{{ result.label }}</div>
          <p class="text-body text-sm">{{ result.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- INDUSTRIES -->
  <section class="bg-ink" aria-labelledby="industries-heading">
    <div class="container section-padding-sm">
      <h2 id="industries-heading" class="heading-section text-center" data-animate="fade-up">
        Industries We Serve
      </h2>
      <div class="content-spacing grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-4 max-w-3xl mx-auto" data-animate="fade-up" data-delay="100">
        <span
          v-for="industry in industries"
          :key="industry"
          class="px-4 py-2 border border-orange/30 rounded-lg text-body text-sm text-center"
        >
          {{ industry }}
        </span>
      </div>
    </div>
  </section>

  <!-- HOW WE WORK -->
  <section class="bg-ink" aria-labelledby="workstyle-heading">
    <div class="container section-padding">
      <h2 id="workstyle-heading" class="heading-section" data-animate="fade-up">
        Our Approach
      </h2>
      <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in workStyle"
          :key="item.title"
          :data-animate="'fade-up'"
          :data-delay="100 + (index * 50)"
        >
          <h3 class="text-offwhite font-semibold mb-2">{{ item.title }}</h3>
          <p class="text-body text-sm">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT FORM -->
  <section id="contact" class="bg-ink" aria-labelledby="contact-heading">
    <div class="container section-padding">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h2 id="contact-heading" class="heading-section" data-animate="fade-up">
            Start a Conversation
          </h2>
          <p class="content-spacing text-body" data-animate="fade-up" data-delay="100">
            Tell us about your project. We typically respond within a day or two.
          </p>
        </div>

        <!-- Success State -->
        <div v-if="formStatus === 'success'" class="card text-center" data-animate="fade-up">
          <div class="text-5xl mb-4">✓</div>
          <h3 class="heading-card">Got It</h3>
          <p class="content-spacing text-body">
            We'll review your site and send you a quote within 24-48 hours.
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submitForm" class="card" data-animate="fade-up">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="company" class="block text-sm font-medium text-offwhite mb-2">Company</label>
              <input
                type="text"
                id="company"
                v-model="form.company"
                required
                class="form-input"
                placeholder="Acme Inc"
              />
            </div>
            <div>
              <label for="name" class="block text-sm font-medium text-offwhite mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="form-input"
                placeholder="Jane Smith"
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label for="email" class="block text-sm font-medium text-offwhite mb-2">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                class="form-input"
                placeholder="jane@acme.com"
              />
            </div>
            <div>
              <label for="siteUrl" class="block text-sm font-medium text-offwhite mb-2">Website URL</label>
              <input
                type="url"
                id="siteUrl"
                v-model="form.siteUrl"
                required
                class="form-input"
                placeholder="https://acme.com"
              />
            </div>
          </div>

          <div class="mt-6">
            <label for="message" class="block text-sm font-medium text-offwhite mb-2">
              What's the problem?
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              required
              class="form-input"
              placeholder="Our site is slow on mobile, we need to migrate off Drupal 7, the checkout form is broken..."
            ></textarea>
          </div>

          <div v-if="formStatus === 'error'" class="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {{ formError }}
          </div>

          <div class="mt-8">
            <button
              type="submit"
              class="btn-primary w-full justify-center"
              :disabled="formStatus === 'submitting'"
            >
              <span v-if="formStatus === 'submitting'">Sending...</span>
              <span v-else>Get My Quote</span>
            </button>
          </div>
        </form>

        <p class="text-center text-sm text-slate mt-6" data-animate="fade-up" data-delay="150">
          Prefer email? <a href="mailto:business@precisionfrontend.com" class="text-orange hover:underline">business@precisionfrontend.com</a>
        </p>
      </div>
    </div>
  </section>

  </template>
