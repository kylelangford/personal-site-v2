<script setup>
import { onMounted, onUnmounted, ref, reactive, computed } from 'vue'
import Icon from '../components/Icon.vue'

const year = new Date().getFullYear()

let observer = null
const scrollY = ref(0)
const activeSection = ref('intro')
const hasSnappedToHero = ref(false)
let isSnapping = false

// Intro animation state
const introComplete = ref(false)

// Sections for navigation
const sections = [
  { id: 'intro', label: 'Top' },
  { id: 'work', label: 'Work' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' }
]

// Computed intro opacity based on scroll
const introOpacity = computed(() => {
  const fadeStart = 0
  const fadeEnd = 150
  if (scrollY.value <= fadeStart) return 1
  if (scrollY.value >= fadeEnd) return 0
  return 1 - (scrollY.value - fadeStart) / (fadeEnd - fadeStart)
})

const introTranslateY = computed(() => {
  const moveStart = 0
  const moveEnd = 200
  if (scrollY.value <= moveStart) return 0
  if (scrollY.value >= moveEnd) return -100
  return -100 * (scrollY.value - moveStart) / (moveEnd - moveStart)
})

// Parallax transforms - faster = closer, slower = farther
const parallax1 = computed(() => scrollY.value * 0.5)   // closest, fastest
const parallax2 = computed(() => scrollY.value * -0.15) // far, slow
const parallax3 = computed(() => scrollY.value * 0.35)  // mid-distance
const parallax4 = computed(() => scrollY.value * -0.08) // farthest, slowest

// Scale grows slightly as you scroll for depth effect
const scale1 = computed(() => 1 + (scrollY.value * 0.0002))  // closest grows most
const scale2 = computed(() => 1 + (scrollY.value * 0.00005)) // far, barely grows
const scale3 = computed(() => 1 + (scrollY.value * 0.00015)) // mid
const scale4 = computed(() => 1)                              // static, farthest

// Opacity fades in as you scroll - closer fades in faster
const geoOpacity1 = computed(() => Math.min(1, scrollY.value / 300))  // closest, fastest fade
const geoOpacity2 = computed(() => Math.min(1, scrollY.value / 600))  // far, slow fade
const geoOpacity3 = computed(() => Math.min(1, scrollY.value / 400))  // mid
const geoOpacity4 = computed(() => Math.min(1, scrollY.value / 800))  // farthest, slowest

// Scroll handler
function handleScroll() {
  scrollY.value = window.scrollY

  const snapThreshold = 100
  const heroSnapPoint = window.innerHeight - (window.innerHeight * 0.25)

  if (!hasSnappedToHero.value && !isSnapping && scrollY.value > snapThreshold && scrollY.value < window.innerHeight * 0.5) {
    isSnapping = true
    hasSnappedToHero.value = true
    window.scrollTo({
      top: heroSnapPoint,
      behavior: 'smooth'
    })
    setTimeout(() => {
      isSnapping = false
    }, 500)
  }

  if (scrollY.value < 20) {
    hasSnappedToHero.value = false
  }

  // Update active section
  const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean)
  for (let i = sectionElements.length - 1; i >= 0; i--) {
    const rect = sectionElements[i].getBoundingClientRect()
    if (rect.top <= window.innerHeight / 2) {
      activeSection.value = sections[i].id
      break
    }
  }

  if (scrollY.value > 200) {
    document.body.classList.add('scrolled-past-intro')
  } else {
    document.body.classList.remove('scrolled-past-intro')
  }
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

const formStatus = ref('idle')
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

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark')

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
  if (!window.location.hash) {
    window.scrollTo(0, 0)
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')

  if (prefersReducedMotion) {
    introComplete.value = true
  } else {
    setTimeout(() => {
      introComplete.value = true
    }, 100)

    if (!hasSeenIntro) {
      sessionStorage.setItem('hasSeenIntro', 'true')
      setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }, 3000)
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

// Tool types
const toolTypes = [
  { name: 'Savings Calculators', description: '"How much could you save?" with real-time results' },
  { name: 'Product Configurators', description: 'Build-your-own with pricing and specs' },
  { name: 'Eligibility Checkers', description: '"Do I qualify?" with conditional logic' },
  { name: 'Quote Builders', description: 'Multi-step forms that calculate and capture' },
  { name: 'ROI Estimators', description: 'Input assumptions, get projections' },
  { name: 'Data Tables', description: 'Filterable, sortable, embeddable datasets' }
]

// What ships with every tool
const included = [
  { title: 'Event Tracking', description: 'GA4 events wired in. Every step, every conversion, every drop-off.' },
  { title: 'Embed-Ready', description: 'Script tag or component that drops into your existing site' },
  { title: 'Mobile-First', description: 'Responsive by default, tested across devices' },
  { title: 'Accessible', description: 'WCAG-compliant, keyboard-navigable' }
]

// Add-ons
const addOns = [
  { title: 'Admin Interface', description: 'Your team manages pricing, rules, and content without touching code' },
  { title: 'Platform Integration', description: 'Connects to your CRM, email platform, or backend API' },
  { title: 'Data Pipeline', description: 'Complex source data transformed into optimized JSON' }
]

// Featured projects
const projects = [
  {
    title: 'Demand Response Calculator',
    client: 'Energy Company',
    tech: 'Vue, Python, Adobe AEM',
    description: 'Savings calculator helping commercial customers estimate earnings from demand response programs across the US and Canada.',
    challenge: '400,000 location records stored as AEM Content Fragments',
    solution: 'Consolidated into 130 JSON shards loaded on-demand',
    result: 'Sub-second lookups, deployment reduced from GB to 1.5 MB',
    features: ['Multi-step form with validation', 'Location-based matching', 'Python data pipeline', 'Enterprise CMS integration'],
    image: null // TODO: Add screenshot
  },
  {
    title: 'Analytics Data Tables',
    client: 'Sumer Sports',
    tech: 'Vanilla JS, Gulp, Babel',
    description: 'Embeddable data tables for football player and team statistics with real-time filtering and sorting.',
    challenge: 'Dense stats that update throughout the season',
    solution: 'JS-driven tables with client-side filtering',
    result: 'Fast, scannable data that updates without rebuilds',
    features: ['Season, team, position filters', 'Performance-optimized rendering', 'Designed for scanning', 'Embedded in platform'],
    image: null // TODO: Add screenshot
  },
  {
    title: 'Email Campaign Builder',
    client: 'Drizly',
    tech: 'AngularJS',
    description: 'Admin interface allowing marketing to build email campaigns from pre-approved components without developer involvement.',
    challenge: 'High-volume campaigns expensive to produce',
    solution: 'Drag-and-drop builder with component library',
    result: 'Marketing self-serve, consistent output, faster production',
    features: ['Drag-and-drop components', 'Real-time preview', 'HTML export', 'Litmus testing integration'],
    image: null // TODO: Add screenshot
  }
]

// Pricing tiers
const pricing = [
  {
    name: 'Standard',
    price: '$8,000',
    description: 'Tool + tracking + embed',
    features: ['Interactive tool (calculator, configurator, etc.)', 'GA4 event tracking', 'Embed script for your site', 'Mobile-responsive', 'Accessibility compliant']
  },
  {
    name: 'With Admin',
    price: '$15,000',
    description: '+ Admin interface for data management',
    features: ['Everything in Standard', 'Admin dashboard', 'Content/data management UI', 'Role-based access', 'Update without code deploys'],
    featured: true
  },
  {
    name: 'Full Integration',
    price: '$25,000',
    description: '+ CRM/API integration, data pipeline',
    features: ['Everything in With Admin', 'CRM/email integration', 'Backend API connections', 'Data transformation pipeline', 'Ongoing support options']
  }
]

// Process steps
const processSteps = [
  { step: '01', title: 'Describe Your Tool', description: 'What should it calculate? What decisions does it help with? What data drives it?' },
  { step: '02', title: 'We Scope & Quote', description: 'Fixed price, clear deliverables. You know the cost before we start.' },
  { step: '03', title: 'We Build', description: 'Vue SPA or embeddable widget. Regular check-ins, no surprises.' },
  { step: '04', title: 'You Launch', description: 'Embed script, CMS integration, or standalone. Events firing from day one.' }
]

// Why work with us
const reasons = [
  { title: 'Senior Dev, Direct', description: 'You work with me directly. No sales team, no handoffs, no account managers.' },
  { title: 'Fixed Pricing', description: 'Know the cost before we start. 50% down, 50% on completion.' },
  { title: 'Modern Stack', description: 'Vue, TypeScript, modern tooling. Built to last and easy to maintain.' },
  { title: 'Tracking Included', description: 'Analytics wired in from the start, not bolted on after.' }
]
</script>

<template>
  <!-- GEOMETRIC PARALLAX SHAPES - layered for depth -->
  <div class="geo-layer" aria-hidden="true">
    <!-- Farthest layer - slowest, blurred, fades last -->
    <div
      class="geo-shape geo-accent geo-depth-far"
      :style="{ transform: `translateY(${parallax4}px) rotate(-25deg) scale(${scale4})`, opacity: geoOpacity4 }"
    ></div>
    <!-- Far layer - slow, slight blur -->
    <div
      class="geo-shape geo-diagonal-2 geo-depth-mid"
      :style="{ transform: `translateY(${parallax2}px) rotate(8deg) scale(${scale2})`, opacity: geoOpacity2 }"
    ></div>
    <!-- Mid layer -->
    <div
      class="geo-shape geo-triangle-1"
      :style="{ transform: `translateY(${parallax3}px) rotate(5deg) scale(${scale3})`, opacity: geoOpacity3 }"
    ></div>
    <!-- Closest layer - fastest, sharp, fades first -->
    <div
      class="geo-shape geo-diagonal-1"
      :style="{ transform: `translateY(${parallax1}px) rotate(-12deg) scale(${scale1})`, opacity: geoOpacity1 }"
    ></div>
  </div>

  <!-- INTRO -->
  <section
    id="intro"
    class="intro-screen"
    :style="{
      opacity: introOpacity,
      transform: `translateY(${introTranslateY}px)`
    }"
  >
    <div class="intro-content" :class="{ 'intro-visible': introComplete }">
      <h1 class="intro-headline font-display">
        Interactive Tools<br />
        <span class="text-orange">That Convert</span>
      </h1>
      <p class="intro-subline text-slate">
        Calculators, configurators, quote builders, eligibility forms.<br />
        Embedded in your site with tracking included.
      </p>
      <div class="intro-scroll-hint mt-8">
        <a href="#work" class="text-orange text-sm font-medium hover:underline">See the work</a>
        <Icon name="arrow-down" size="20" class="intro-arrow" />
      </div>
    </div>
  </section>

  <!-- Spacer -->
  <div class="h-screen" aria-hidden="true"></div>

  <!-- PAGE NAV -->
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

    <div class="container py-24 md:py-32 relative z-10">
      <div class="hero-content">
        <h1 id="hero-heading" class="heading-hero">
          Interactive Tools That Convert
        </h1>
        <p class="content-spacing text-lead lead-content">
          Custom calculators, configurators, and data-driven widgets. Built with Vue, embedded in your platform, with tracking and admin included.
        </p>
        <div class="actions-spacing">
          <a href="#work" class="btn-ghost">See Examples</a>
          <a href="#pricing" class="btn-primary">View Pricing</a>
        </div>
        <p class="mt-6 text-sm text-slate">For marketing teams that need more than a contact form.</p>
      </div>
    </div>
  </section>

  <!-- WHAT WE BUILD -->
  <section id="tools" class="bg-ink" aria-labelledby="tools-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="tools-heading" class="heading-section" data-animate="fade-up">
          What We Build
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Tools that help your customers make decisions and capture the conversion.
        </p>
      </div>

      <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(tool, index) in toolTypes"
          :key="tool.name"
          class="p-5 rounded-lg gradient-border"
          data-animate="fade-up"
          :data-delay="100 + (index * 50)"
        >
          <h3 class="text-offwhite font-semibold mb-2">{{ tool.name }}</h3>
          <p class="text-slate text-sm">{{ tool.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- WHAT'S INCLUDED -->
  <section class="bg-ink" aria-labelledby="included-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="included-heading" class="heading-section" data-animate="fade-up">
          What Ships With Every Tool
        </h2>
      </div>

      <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in included"
          :key="item.title"
          data-animate="fade-up"
          :data-delay="100 + (index * 50)"
        >
          <div class="flex items-center gap-2 mb-2">
            <Icon name="check" size="20" class="text-orange" />
            <h3 class="text-offwhite font-semibold">{{ item.title }}</h3>
          </div>
          <p class="text-slate text-sm">{{ item.description }}</p>
        </div>
      </div>

      <div class="mt-16 max-w-3xl">
        <h3 class="text-offwhite font-semibold mb-6" data-animate="fade-up">When You Need More</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(item, index) in addOns"
            :key="item.title"
            class="p-5 rounded-lg gradient-border"
            data-animate="fade-up"
            :data-delay="100 + (index * 50)"
          >
            <h4 class="text-orange font-semibold mb-2">{{ item.title }}</h4>
            <p class="text-slate text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED WORK -->
  <section id="work" class="bg-ink" aria-labelledby="work-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="work-heading" class="heading-section" data-animate="fade-up">
          Featured Work
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Real tools solving real problems.
        </p>
      </div>

      <div class="actions-spacing space-y-12">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="card"
          data-animate="fade-up"
          :data-delay="100 + (index * 100)"
        >
          <!-- Screenshot placeholder -->
          <div class="mb-8 rounded-lg overflow-hidden bg-surface aspect-video flex items-center justify-center">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title + ' screenshot'"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-slate text-sm">Screenshot coming soon</span>
          </div>

          <div class="flex flex-col lg:flex-row lg:items-start gap-8">
            <div class="lg:w-2/3">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-orange font-semibold">{{ project.client }}</span>
                <span class="text-slate text-sm">{{ project.tech }}</span>
              </div>
              <h3 class="heading-card mb-4">{{ project.title }}</h3>
              <p class="text-body mb-6">{{ project.description }}</p>

              <div class="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p class="text-orange text-xs font-semibold uppercase tracking-wide mb-1">Challenge</p>
                  <p class="text-slate text-sm">{{ project.challenge }}</p>
                </div>
                <div>
                  <p class="text-orange text-xs font-semibold uppercase tracking-wide mb-1">Solution</p>
                  <p class="text-slate text-sm">{{ project.solution }}</p>
                </div>
                <div>
                  <p class="text-orange text-xs font-semibold uppercase tracking-wide mb-1">Result</p>
                  <p class="text-slate text-sm">{{ project.result }}</p>
                </div>
              </div>
            </div>

            <div class="lg:w-1/3">
              <p class="text-offwhite text-sm font-semibold mb-3">Features</p>
              <ul class="space-y-2">
                <li
                  v-for="feature in project.features"
                  :key="feature"
                  class="flex items-center gap-2 text-slate text-sm"
                >
                  <Icon name="check" size="16" class="text-orange flex-shrink-0" />
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section id="pricing" class="bg-ink" aria-labelledby="pricing-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="pricing-heading" class="heading-section" data-animate="fade-up">
          Pricing
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Fixed scope, fixed price. No surprises.
        </p>
      </div>

      <div class="actions-spacing grid md:grid-cols-3 gap-6">
        <article
          v-for="(tier, index) in pricing"
          :key="tier.name"
          class="card flex flex-col"
          :class="{ 'ring-2 ring-orange': tier.featured }"
          data-animate="fade-up"
          :data-delay="100 + (index * 50)"
        >
          <div v-if="tier.featured" class="text-orange text-xs font-semibold uppercase tracking-wide mb-2">
            Most Popular
          </div>
          <h3 class="heading-card">{{ tier.name }}</h3>
          <p class="text-orange text-3xl font-display mt-2">{{ tier.price }}</p>
          <p class="text-slate text-sm mt-1 mb-6">{{ tier.description }}</p>

          <ul class="space-y-2 mt-auto">
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="flex items-start gap-2 text-slate text-sm"
            >
              <Icon name="check" size="16" class="text-orange flex-shrink-0 mt-0.5" />
              {{ feature }}
            </li>
          </ul>

          <a href="#contact" class="btn-primary w-full justify-center mt-6">Get Started</a>
        </article>
      </div>

      <p class="text-center text-slate text-sm mt-8" data-animate="fade-up">
        All projects: 50% down, 50% on completion.
      </p>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="bg-ink" aria-labelledby="process-heading">
    <div class="container section-padding">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 id="process-heading" class="heading-section" data-animate="fade-up">
          How It Works
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(step, index) in processSteps"
          :key="step.step"
          data-animate="fade-up"
          :data-delay="100 + (index * 50)"
        >
          <div class="text-5xl font-display text-orange mb-4">{{ step.step }}</div>
          <h3 class="text-offwhite font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-slate text-sm">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- WHY US -->
  <section class="bg-ink" aria-labelledby="why-heading">
    <div class="container section-padding">
      <h2 id="why-heading" class="heading-section" data-animate="fade-up">
        Why Work With Us
      </h2>
      <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(reason, index) in reasons"
          :key="reason.title"
          data-animate="fade-up"
          :data-delay="100 + (index * 50)"
        >
          <h3 class="text-offwhite font-semibold mb-2">{{ reason.title }}</h3>
          <p class="text-slate text-sm">{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="bg-ink" aria-labelledby="contact-heading">
    <div class="container section-padding">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h2 id="contact-heading" class="heading-section" data-animate="fade-up">
            Let's Build Your Tool
          </h2>
          <p class="content-spacing text-body" data-animate="fade-up" data-delay="100">
            Tell us what you need. We'll scope it and send a fixed-price quote within 48 hours.
          </p>
        </div>

        <!-- Success State -->
        <div v-if="formStatus === 'success'" class="card text-center" data-animate="fade-up">
          <div class="text-5xl mb-4">&#10003;</div>
          <h3 class="heading-card">Got It</h3>
          <p class="content-spacing text-body">
            We'll review your project and send a quote within 24-48 hours.
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
                class="form-input"
                placeholder="https://acme.com"
              />
            </div>
          </div>

          <div class="mt-6">
            <label for="message" class="block text-sm font-medium text-offwhite mb-2">
              What tool do you need?
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              required
              class="form-input"
              placeholder="We need a savings calculator that shows customers their potential ROI based on their industry and usage..."
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
              <span v-else>Get a Quote</span>
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
