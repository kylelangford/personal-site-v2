<script setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'

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
  auditType: 'quick',
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
      auditType: 'quick',
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
    icon: '🔒',
    link: '/services/legacy-cms'
  },
  {
    title: 'Slow Page Loads',
    risk: 'You\'re losing customers',
    description: 'Your pages take 5+ seconds to load on mobile. Visitors bounce before they see your product. Google notices.',
    icon: '🐌',
    link: '/services/performance'
  },
  {
    title: 'Broken User Journeys',
    risk: 'You\'re wasting traffic',
    description: 'Dead links, confusing navigation, forms that don\'t work. Paid traffic hits a wall. Leads slip through cracks.',
    icon: '🔗',
    link: '/services/broken-links'
  },
  {
    title: 'Accessibility Issues',
    risk: 'You\'re exposed',
    description: 'WCAG violations are legal liability. Also: 15-20% of users have some form of disability. That\'s revenue you\'re missing.',
    icon: '⚠️',
    link: '/services/accessibility'
  },
  {
    title: 'No Clear Conversion Path',
    risk: 'You\'re invisible',
    description: 'Your traffic has nowhere obvious to go after the hero section. No clear next step means no conversions.',
    icon: '📱',
    link: '/services/conversion'
  },
  {
    title: 'Can\'t Move Fast',
    risk: 'You\'re falling behind',
    description: 'Simple changes require a developer. Content updates take days. Your competitors ship while you wait.',
    icon: '⏳',
    link: '/services/tech-migration'
  }
]

// Process steps
const processSteps = [
  {
    step: '01',
    title: 'Quick Audit',
    description: 'We review your site and send you a report within 48 hours. No fluff, just findings.'
  },
  {
    step: '02',
    title: 'Strategy Call',
    description: '30 minutes to walk through the findings and discuss what to fix first.'
  },
  {
    step: '03',
    title: 'Scope & Quote',
    description: 'Clear proposal with fixed pricing. No hourly billing surprises.'
  },
  {
    step: '04',
    title: 'Ship It',
    description: 'We fix the problems or rebuild what needs rebuilding. You get a site that works.'
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
          Slow pages. Broken links. Outdated platforms. Your website has problems you can't see—but your customers can.
          We find them and fix them.
        </p>
        <div class="actions-spacing flex flex-col sm:flex-row items-start sm:items-center gap-4" role="group" aria-label="Primary actions">
          <a href="#contact" class="btn-primary">Get a Free Site Audit</a>
          <a href="#problems" class="btn-ghost">What We Look For</a>
        </div>
        <p class="mt-6 text-sm text-slate">No sales call required. Just your URL and we'll send you a report.</p>
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
          <div class="text-3xl mb-4" aria-hidden="true">{{ problem.icon }}</div>
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
          What We Audit
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          We look for specific problems with clear business impact.
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
          How We Help
        </h2>
        <p class="content-spacing text-lead" data-animate="fade-up" data-delay="100">
          Start with a free audit. Go deeper if you need to.
        </p>
      </div>

      <div class="actions-spacing grid md:grid-cols-2 gap-8">
        <!-- Quick Audit - Free -->
        <div class="card card-featured" data-animate="fade-up" data-delay="150">
          <div class="flex items-center gap-3 mb-4">
            <span class="badge-free">Free</span>
            <span class="text-slate text-sm">48-hour turnaround</span>
          </div>
          <h3 class="heading-card">Site Audit</h3>
          <p class="content-spacing-sm text-body">
            We run your site through our diagnostic process and send you a clear report of what's broken,
            what's slow, and what's hurting conversions.
          </p>
          <ul class="content-spacing space-y-2 text-body">
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Performance & Core Web Vitals
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Mobile experience check
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Broken links & 404s
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Basic accessibility scan
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Tech stack assessment
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              PDF report you can share with your team
            </li>
          </ul>
          <div class="mt-8">
            <a href="#contact" class="btn-primary w-full justify-center">Get Your Free Audit</a>
          </div>
        </div>

        <!-- Full Assessment -->
        <div class="card" data-animate="fade-up" data-delay="200">
          <div class="flex items-center gap-3 mb-4">
            <span class="badge-paid">Deep Dive</span>
            <span class="text-slate text-sm">1-2 week engagement</span>
          </div>
          <h3 class="heading-card">Full Assessment + Roadmap</h3>
          <p class="content-spacing-sm text-body">
            Comprehensive technical review with prioritized recommendations and a clear plan to fix everything.
          </p>
          <ul class="content-spacing space-y-2 text-body">
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Everything in the free audit
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Full WCAG 2.1 accessibility audit
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              SEO technical review
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Security headers & vulnerabilities
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Architecture & scalability review
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Prioritized roadmap with estimates
            </li>
            <li class="flex items-start gap-2">
              <span class="text-orange">✓</span>
              Strategy call to review findings
            </li>
          </ul>
          <div class="mt-8">
            <a href="#contact" class="btn-ghost w-full justify-center">Request Pricing</a>
          </div>
        </div>
      </div>

      <!-- Remediation callout -->
      <div class="mt-12 p-8 border border-orange/20 rounded-xl text-center max-w-2xl mx-auto" data-animate="fade-up" data-delay="250">
        <h3 class="heading-service">Need it fixed, not just diagnosed?</h3>
        <p class="content-spacing-sm text-body">
          We also do the work. Performance optimization, accessibility fixes, platform migrations, rebuilds.
          Let's talk about what you need.
        </p>
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

  <!-- EXPERTISE -->
  <section class="bg-ink" aria-labelledby="expertise-heading">
    <div class="container section-padding-sm">
      <h2 id="expertise-heading" class="heading-section text-center" data-animate="fade-up">
        What We Work With
      </h2>
      <p class="content-spacing text-body text-center max-w-2xl mx-auto" data-animate="fade-up" data-delay="100">
        15+ years across startups, agencies, and growing companies.
      </p>
      <div class="content-spacing flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto" data-animate="fade-up" data-delay="150">
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">React</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Next.js</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Vue.js</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Nuxt</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">TypeScript</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Node.js</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">WordPress</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Drupal</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Webflow</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Shopify</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">AWS</span>
        <span class="px-4 py-2 bg-white/5 rounded-lg text-body">Vercel</span>
      </div>
    </div>
  </section>

  <!-- CONTACT FORM -->
  <section id="contact" class="bg-ink" aria-labelledby="contact-heading">
    <div class="container section-padding">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h2 id="contact-heading" class="heading-section" data-animate="fade-up">
            Get Your Free Audit
          </h2>
          <p class="content-spacing text-body" data-animate="fade-up" data-delay="100">
            Drop your URL below. We'll send you a report within 48 hours.
          </p>
        </div>

        <!-- Success State -->
        <div v-if="formStatus === 'success'" class="card text-center" data-animate="fade-up">
          <div class="text-5xl mb-4">✓</div>
          <h3 class="heading-card">Got It</h3>
          <p class="content-spacing text-body">
            We'll review your site and send you a report within 48 hours.
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
            <label class="block text-sm font-medium text-offwhite mb-2">What do you need?</label>
            <div class="flex flex-col sm:flex-row gap-4">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  v-model="form.auditType"
                  value="quick"
                  class="form-radio"
                />
                <span class="text-body">Free Site Audit</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  v-model="form.auditType"
                  value="comprehensive"
                  class="form-radio"
                />
                <span class="text-body">Full Assessment + Roadmap</span>
              </label>
            </div>
          </div>

          <div class="mt-6">
            <label for="message" class="block text-sm font-medium text-offwhite mb-2">
              Anything specific you want us to look at? <span class="text-slate">(optional)</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="3"
              class="form-input"
              placeholder="Our checkout flow feels slow, mobile is a mess, etc..."
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
              <span v-else>Send My URL</span>
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
