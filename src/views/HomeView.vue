<script setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import Icon from '../components/Icon.vue'

const year = new Date().getFullYear()
const heroText = ref('Your Website Is Slowing You Down')
const displayText = ref('')
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>[]{}/'

let observer = null

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

  displayText.value = finalText.split('').map(char =>
    char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
  ).join('')

  const interval = setInterval(() => {
    displayText.value = finalText.split('').map((char, index) => {
      if (char === ' ') return ' '
      if (index < currentIndex) return char
      return chars[Math.floor(Math.random() * chars.length)]
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
  document.documentElement.setAttribute('data-theme', 'dark')

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    displayText.value = heroText.value
  } else {
    setTimeout(() => decodeText(heroText.value, 2000), 300)
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
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

// Problem areas data
const problems = [
  {
    title: 'Outdated Platform',
    risk: 'You\'re stuck',
    description: 'Drupal 7, old WordPress, or a framework nobody wants to touch. Every update is a risk. Every feature request takes forever.',
    icon: 'lock-closed',
    link: '/services/legacy-cms'
  },
  {
    title: 'Slow Page Loads',
    risk: 'You\'re losing customers',
    description: 'Your pages take 5+ seconds to load on mobile. Visitors bounce before they see your product. Google notices.',
    icon: 'clock',
    link: '/services/performance'
  },
  {
    title: 'Broken User Journeys',
    risk: 'You\'re wasting traffic',
    description: 'Dead links, confusing navigation, forms that don\'t work. Paid traffic hits a wall. Leads slip through cracks.',
    icon: 'link-slash',
    link: '/services/broken-links'
  },
  {
    title: 'Accessibility Issues',
    risk: 'You\'re exposed',
    description: 'WCAG violations are legal liability. Also: 15-20% of users have some form of disability. That\'s revenue you\'re missing.',
    icon: 'exclamation-triangle',
    link: '/services/accessibility'
  },
  {
    title: 'No Clear Conversion Path',
    risk: 'You\'re invisible',
    description: 'Your traffic has nowhere obvious to go after the hero section. No clear next step means no conversions.',
    icon: 'cursor-arrow-rays',
    link: '/services/conversion'
  },
  {
    title: 'Can\'t Move Fast',
    risk: 'You\'re falling behind',
    description: 'Simple changes require a developer. Content updates take days. Your competitors ship while you wait.',
    icon: 'bolt-slash',
    link: '/services/tech-migration'
  }
]

// Process steps
const processSteps = [
  {
    step: '01',
    title: 'Tell Us the Problem',
    description: 'Describe what\'s broken, slow, or outdated. Include your site URL.'
  },
  {
    step: '02',
    title: 'Get a Quote',
    description: 'We review your site and send a fixed-price quote within 24-48 hours.'
  },
  {
    step: '03',
    title: 'Quick Call',
    description: 'Optional 15-minute call to clarify scope. Or just reply to the quote.'
  },
  {
    step: '04',
    title: 'We Fix It',
    description: 'We do the work. You get a site that works. No hourly surprises.'
  }
]

// Who this is for
const idealClients = [
  {
    title: 'Growing Companies',
    description: 'You\'ve outgrown your original website. What worked at 10 employees doesn\'t work at 100.'
  },
  {
    title: 'Funded Startups',
    description: 'You raised a round and need to level up your web presence. Fast.'
  },
  {
    title: 'Marketing Teams',
    description: 'You\'re driving traffic but your site isn\'t converting. Development is a bottleneck.'
  },
  {
    title: 'Regional Leaders',
    description: 'You dominate your market but your website looks like 2015. Time to catch up.'
  }
]

// All services for the services section
const allServices = [
  { title: 'Legacy CMS Migration', link: '/services/legacy-cms', description: 'Drupal, old WordPress, custom PHP' },
  { title: 'Performance Optimization', link: '/services/performance', description: 'Core Web Vitals, page speed' },
  { title: 'Broken Link Audit', link: '/services/broken-links', description: '404s, dead ends, broken forms' },
  { title: 'Local SEO', link: '/services/local-seo', description: 'Location pages, Google Business' },
  { title: 'Accessibility', link: '/services/accessibility', description: 'WCAG compliance, legal risk' },
  { title: 'Conversion Optimization', link: '/services/conversion', description: 'CTAs, user journeys, funnels' },
  { title: 'Site Redesign', link: '/services/redesign', description: 'Modern design, fresh content' },
  { title: 'Scaling Support', link: '/services/scaling', description: 'Growth-ready infrastructure' },
  { title: 'Competitive Analysis', link: '/services/competitive-analysis', description: 'Benchmark against competitors' },
  { title: 'Tech Migration', link: '/services/tech-migration', description: 'Platform & stack upgrades' }
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

// Testimonials
const testimonials = [
  {
    quote: 'Kyle was a thoughtful and reliable partner who understood both the technical and operational constraints of enterprise delivery.',
    name: 'Jed H.',
    title: 'Engineering Director'
  },
  {
    quote: 'Kyle was great to work with. He took ideas from the marketing team and made them come to life.',
    name: 'Michelle O.',
    title: 'Marketing Manager'
  },
  {
    quote: 'Kyle\'s depth of experience across various disciplines of design make him a powerful leader and well rounded professional.',
    name: 'Joseph H.',
    title: 'Senior Frontend Developer'
  },
  {
    quote: 'Kyle is an excellent designer who brought creative ideas to bear on our projects.',
    name: 'Tom W.',
    title: 'Design Principal'
  }
]

// How we work
const workStyle = [
  {
    title: 'Direct Communication',
    description: 'You talk to the person doing the work. No account managers, no game of telephone.'
  },
  {
    title: 'Fixed Pricing',
    description: 'You know the cost before we start. No hourly billing, no scope creep surprises.'
  },
  {
    title: 'Fast Turnaround',
    description: 'Most quotes within 48 hours. Most projects completed in days or weeks, not months.'
  },
  {
    title: 'Enterprise Experience',
    description: 'Process and reliability from agency work, without the agency overhead.'
  }
]
</script>


<template>
  <!-- HERO -->
  <section class="bg-ink hero-glow-container" aria-labelledby="hero-heading">
    <div class="glow-orb glow-orb-1" aria-hidden="true"></div>
    <div class="glow-orb glow-orb-2" aria-hidden="true"></div>
    <div class="glow-orb glow-orb-3" aria-hidden="true"></div>

    <div class="container py-24 md:py-32 relative z-10">
      <div class="hero-content">
        <h1 id="hero-heading" class="heading-hero">
          <span class="text-decode">{{ displayText }}</span><span class="text-cursor" aria-hidden="true"></span>
        </h1>
        <p class="content-spacing text-lead lead-content">
          Slow pages. Broken links. Outdated platforms. You know something's wrong—you just need someone to fix it.
          Tell us the problem, we'll send you a quote.
        </p>
        <div class="actions-spacing flex flex-col sm:flex-row items-start sm:items-center gap-4" role="group" aria-label="Primary actions">
          <a href="#contact" class="btn-primary">Get a Free Quote</a>
          <a href="#problems" class="btn-ghost">Common Problems</a>
        </div>
        <p class="mt-6 text-sm text-slate">No sales call required. Tell us what's broken and we'll quote it.</p>
      </div>
    </div>
  </section>

  <!-- PROBLEMS -->
  <section id="problems" class="bg-ink" aria-labelledby="problems-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="problems-heading" class="heading-section" data-animate="fade-up">
          What's Actually Wrong
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Most growing companies have the same problems. They just don't know it yet.
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
          Who This Is For
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
          What We Fix
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Common problems we solve for growing companies.
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

  <!-- SERVICES -->
  <section id="services" class="bg-ink" aria-labelledby="services-heading">
    <div class="container section-padding">
      <div class="max-w-3xl">
        <h2 id="services-heading" class="heading-section" data-animate="fade-up">
          How It Works
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          You tell us what's broken. We tell you what it costs to fix.
        </p>
      </div>

      <div class="actions-spacing grid md:grid-cols-2 gap-8">
        <!-- Free Quote -->
        <div class="card card-featured" data-animate="fade-up" data-delay="150">
          <div class="flex items-center gap-3 mb-4">
            <span class="badge-free">Free</span>
            <span class="text-slate text-sm">24-48 hour response</span>
          </div>
          <h3 class="heading-card">Project Quote</h3>
          <p class="content-spacing-sm text-body">
            Tell us what's wrong with your site. We'll review it and send you a clear quote with fixed pricing.
          </p>
          <ul class="content-spacing space-y-2 text-body">
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Describe your problem
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              We review your site
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Get a fixed-price quote
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              No hourly surprises
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              No obligation
            </li>
          </ul>
          <div class="mt-8">
            <a href="#contact" class="btn-primary w-full justify-center">Get a Free Quote</a>
          </div>
        </div>

        <!-- Full Assessment -->
        <div class="card" data-animate="fade-up" data-delay="200">
          <div class="flex items-center gap-3 mb-4">
            <span class="badge-paid">Deep Dive</span>
            <span class="text-slate text-sm">For complex situations</span>
          </div>
          <h3 class="heading-card">Full Site Assessment</h3>
          <p class="content-spacing-sm text-body">
            Not sure what's wrong? We'll diagnose everything and build a prioritized roadmap.
          </p>
          <ul class="content-spacing space-y-2 text-body">
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Comprehensive technical audit
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Performance & Core Web Vitals
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Accessibility review
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              SEO technical analysis
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Strategy call to review findings
            </li>
          </ul>
          <div class="mt-8">
            <a href="#contact" class="btn-ghost w-full justify-center">Request Assessment</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section id="process" class="bg-ink" aria-labelledby="process-heading">
    <div class="container section-padding">
      <div class="text-center max-w-3xl mx-auto">
        <h2 id="process-heading" class="heading-section" data-animate="fade-up">
          Simple Process
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          No drawn-out discovery phases. No endless meetings. Here's how it works.
        </p>
      </div>

      <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(step, index) in processSteps"
          :key="step.step"
          class="text-center"
          :data-animate="'fade-up'"
          :data-delay="150 + (index * 50)"
        >
          <div class="text-5xl font-display text-orange/30 mb-2">{{ step.step }}</div>
          <h3 class="heading-service">{{ step.title }}</h3>
          <p class="content-spacing-sm text-body text-sm">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- RESULTS -->
  <section class="bg-ink" aria-labelledby="results-heading">
    <div class="container section-padding">
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div
          v-for="(result, index) in results"
          :key="result.label"
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
      <div class="content-spacing flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto" data-animate="fade-up" data-delay="100">
        <span
          v-for="industry in industries"
          :key="industry"
          class="px-4 py-2 border border-orange/30 rounded-lg text-body text-sm"
        >
          {{ industry }}
        </span>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="bg-ink" aria-labelledby="testimonials-heading">
    <div class="container section-padding">
      <h2 id="testimonials-heading" class="heading-section text-center" data-animate="fade-up">
        What Clients Say
      </h2>
      <div class="actions-spacing grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.name"
          class="p-6 border border-orange/20 rounded-xl"
          :data-animate="'fade-up'"
          :data-delay="100 + (index * 50)"
        >
          <p class="text-body italic mb-4">"{{ testimonial.quote }}"</p>
          <div class="flex items-center gap-3">
            <div>
              <p class="text-offwhite font-semibold text-sm">{{ testimonial.name }}</p>
              <p class="text-slate text-xs">{{ testimonial.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW WE WORK -->
  <section class="bg-ink" aria-labelledby="workstyle-heading">
    <div class="container section-padding">
      <h2 id="workstyle-heading" class="heading-section text-center" data-animate="fade-up">
        Why Companies Choose Us
      </h2>
      <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div
          v-for="(item, index) in workStyle"
          :key="item.title"
          class="text-center"
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
            Get a Free Quote
          </h2>
          <p class="content-spacing text-body" data-animate="fade-up" data-delay="100">
            Tell us what's broken. We'll send you a quote within 24-48 hours.
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
          Prefer email? <a href="mailto:kyle@precisionfrontend.com" class="text-orange hover:underline">kyle@precisionfrontend.com</a>
        </p>
      </div>
    </div>
  </section>
</template>
