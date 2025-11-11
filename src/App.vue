<script setup>
import { onMounted, ref } from 'vue'
import Navigation from './components/Navigation.vue'
import ServicesPage from './components/ServicesPage.vue'
import AboutPage from './components/AboutPage.vue'
import ProcessPage from './components/ProcessPage.vue'

const year = new Date().getFullYear()
const isDark = ref(true)
const currentPage = ref('home')

// Contact modal state
const showContactModal = ref(false)
const contactFormType = ref('project') // 'project' or 'intro'

// Form data and validation
const formData = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const formErrors = ref({})
const isSubmitting = ref(false)
const submitMessage = ref('')

// Theme management
const getSystemPreference = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const initializeTheme = () => {
  const stored = localStorage.getItem('theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = getSystemPreference()
  }
  applyTheme()
}

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
}

// Contact modal functions
const openContactModal = (type) => {
  console.log('Opening modal with type:', type) // Debug log
  contactFormType.value = type
  showContactModal.value = true
  resetForm()
  // Focus trap and body scroll prevention
  document.body.style.overflow = 'hidden'
  console.log('Modal state:', showContactModal.value) // Debug log
}

const changePage = (page) => {
  currentPage.value = page
  // Scroll to top when changing pages
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const closeContactModal = () => {
  showContactModal.value = false
  document.body.style.overflow = ''
  resetForm()
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    company: '',
    message: ''
  }
  formErrors.value = {}
  submitMessage.value = ''
  isSubmitting.value = false
}

// Form validation
const validateForm = () => {
  const errors = {}
  
  if (!formData.value.name.trim()) {
    errors.name = 'Name is required'
  }
  
  if (!formData.value.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!formData.value.message.trim()) {
    errors.message = 'Message is required'
  } else if (formData.value.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
  }
  
  formErrors.value = errors
  return Object.keys(errors).length === 0
}

// Form submission
const submitForm = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  submitMessage.value = ''
  
  try {
    // TODO: Implement actual form submission logic here
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
    
    submitMessage.value = 'Thank you! Your message has been sent successfully.'
    setTimeout(() => {
      closeContactModal()
    }, 2000)
  } catch (error) {
    submitMessage.value = 'Sorry, there was an error sending your message. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Keyboard event handling for modal
const handleKeydown = (event) => {
  if (event.key === 'Escape' && showContactModal.value) {
    closeContactModal()
  }
}

onMounted(() => {
  // Initialize theme first
  initializeTheme()
  
  // Add keyboard event listener for modal
  document.addEventListener('keydown', handleKeydown)
  
  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    // If user prefers reduced motion, make all elements visible immediately
    const animatedElements = document.querySelectorAll('[data-animate]')
    animatedElements.forEach(el => el.classList.add('animate-in'))
    return
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
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

  const animatedElements = document.querySelectorAll('[data-animate]')
  animatedElements.forEach(el => observer.observe(el))
})
</script>


<template>
  <!-- Skip Navigation -->
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  
  <!-- Navigation -->
  <Navigation 
    :currentPage="currentPage" 
    @changePage="changePage" 
    @openContact="openContactModal"
  />
  
  <!-- Theme Toggle -->
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    type="button"
    title="Toggle theme"
  >
    <!-- Sun icon for dark mode (shows when we can switch to light) -->
    <svg v-if="isDark" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
    </svg>
    <!-- Moon icon for light mode (shows when we can switch to dark) -->
    <svg v-else viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
    </svg>
  </button>
  
  <div class="pt-20">
    <!-- Home Page -->
    <main v-if="currentPage === 'home'" id="main-content" role="main">
    <!-- HERO -->
    <section class="bg-ink" aria-labelledby="hero-heading">
      <div class="container py-24 md:py-32">
        <div class="hero-content">
          <h1 id="hero-heading" class="heading-hero">
            <span>Precision Frontend Engineering</span>
            <span class="text-mint"> for Product and Marketing Teams</span>
          </h1>
          <p class="content-spacing text-lead lead-content">
            I help product and marketing teams bring designs to life with clean, scalable component architectures. 
            Your projects ship faster, look better, and stay maintainable long after launch.
          </p>
          <div class="content-spacing-sm text-slate">
            <span class="text-offwhite font-semibold">14 years experience</span> • Frontend Engineering • Greater Boston & Remote
          </div>
          <div class="actions-spacing flex items-center gap-4" role="group" aria-label="Primary actions">
            <button @click="openContactModal('project')" class="btn-primary" aria-describedby="hero-heading">Start a project</button>
            <a href="#services" class="btn-ghost" aria-describedby="hero-heading">See services</a>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUE -->
    <section class="bg-surface" data-animate="fade-up" aria-labelledby="value-section" role="region">
      <div class="container section-padding-sm">
        <h2 id="value-section" class="sr-only">Our Core Values</h2>
        <div class="grid-cards-3">
          <div class="card" data-animate="fade-up" data-delay="100">
            <div class="text-mint text-2xl mb-3">🎯</div>
            <h2 class="heading-card">Design-to-Code</h2>
            <p class="content-spacing-sm text-body">
              Translating Figma and design files into production-ready UI. No more fragile handoffs or broken implementations.
            </p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="150">
            <div class="text-mint text-2xl mb-3">⚡</div>
            <h2 class="heading-card">Speed + Flexibility</h2>
            <p class="content-spacing-sm text-body">
              Fixed-scope projects that deliver fast without sacrificing quality. Build once, scale forever.
            </p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="200">
            <div class="text-mint text-2xl mb-3">🔧</div>
            <h2 class="heading-card">UX-First Development</h2>
            <p class="content-spacing-sm text-body">
              Code that respects design quality and user experience. 14 years bridging design and engineering disciplines.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SIGNATURE OFFER -->
    <section class="bg-ink border-t border-mint/10" data-animate="fade-up" aria-labelledby="signature-offer-heading" role="region">
      <div class="container section-padding">
        <div class="text-center max-w-4xl mx-auto">
          <div class="text-mint text-sm font-semibold uppercase tracking-wide mb-4" data-animate="fade-up">Signature Offer</div>
          <h2 id="signature-offer-heading" class="heading-section" data-animate="fade-up">UI Foundation</h2>
          <p class="content-spacing text-lead max-w-3xl mx-auto" data-animate="fade-up" data-delay="100">
            Take designs from Figma to production-ready, reusable Vue 3 component systems in 2–4 weeks.
          </p>
        </div>
        
        <div class="content-spacing grid-cards-2">
          <div class="card bg-surface border-mint/20" data-animate="fade-up" data-delay="200">
            <h3 class="heading-service text-mint mb-4">What's Included</h3>
            <ul class="space-y-3 text-body">
              <li class="flex items-start gap-3">
                <span class="text-mint mt-1">✓</span>
                Design → HTML/CSS/JS implementation
              </li>
              <li class="flex items-start gap-3">
                <span class="text-mint mt-1">✓</span>
                Vue 3 + Tailwind component architecture
              </li>
              <li class="flex items-start gap-3">
                <span class="text-mint mt-1">✓</span>
                Accessibility + performance optimization
              </li>
              <li class="flex items-start gap-3">
                <span class="text-mint mt-1">✓</span>
                Documentation and Training (optional)
              </li>
              <li class="flex items-start gap-3">
                <span class="text-mint mt-1">✓</span>
                Smooth handoff
              </li>
            </ul>
          </div>
          
          <div class="card" data-animate="fade-up" data-delay="300">
            <h3 class="heading-service mb-4">Perfect For</h3>
            <ul class="space-y-3 text-body">
              <li class="flex items-start gap-3">
                <span class="text-accent">•</span>
                Your design is ready to go.
              </li>
              <li class="flex items-start gap-3">
                <span class="text-accent">•</span>
                You need a world class frontend.
              </li>
              <li class="flex items-start gap-3">
                <span class="text-accent">•</span>
                You like when the thing you bought works!
              </li>
            </ul>
            <div class="mt-6 pt-6 border-t border-mint/10">
              <div class="text-slate text-sm mb-2">Typical Investment</div>
              <div class="text-offwhite text-xl font-semibold">$8,000 – $18,000</div>
              <div class="text-slate text-sm">Fixed-scope, based on complexity</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="bg-surface" data-animate="fade-up" aria-labelledby="services-heading" role="region">
      <div class="container section-padding">
        <h2 id="services-heading" class="heading-section" data-animate="fade-up">All Services</h2>
        <div class="actions-spacing grid-cards-3" role="list" aria-label="Available services">
          <div class="card" data-animate="fade-up" data-delay="100" role="listitem">
            <h3 class="heading-service">UI Foundation</h3>
            <p class="content-spacing-xs text-body mb-4">Figma to production-ready in 2-4 weeks.</p>
            <div class="text-slate text-sm">Typical Investment: $6,000 – $18,000</div>
          </div>
          <div class="card" data-animate="fade-up" data-delay="150" role="listitem">
            <h3 class="heading-service">Interactive Tool</h3>
            <p class="content-spacing-xs text-body mb-4">Calculators, configurators, lead-gen.</p>
            <div class="text-slate text-sm">Typical Investment: $8,000 – $25,000</div>
          </div>
          <div class="card" data-animate="fade-up" data-delay="250" role="listitem">
            <h3 class="heading-service">Frontend Rebuild</h3>
            <p class="content-spacing-xs text-body mb-4">Migrate and refactor messy UI codebases.</p>
            <div class="text-slate text-sm">Typical Investment: $10,000 – $25,000</div>
          </div>
          <div class="card" data-animate="fade-up" data-delay="300" role="listitem">
            <h3 class="heading-service">Service Level Agreement</h3>
            <p class="content-spacing-xs text-body mb-4">Ongoing monthly retainer for scaling bandwith.</p>
            <div class="text-slate text-sm">Typical Investment: $3,000 – $9,000/mo</div>
          </div>
          <div class="card border-mint/20 bg-ink" data-animate="fade-up" data-delay="350" role="listitem">
            <h3 class="heading-service text-mint">Custom Projects</h3>
            <p class="content-spacing-xs text-body mb-4">Have something unique? Let's discuss your needs.</p>
            <div class="text-slate text-sm">Contact for pricing</div>
          </div>
        </div>
      </div>
    </section>

     <!-- BUILT FOR -->
    <section class="bg-ink" data-animate="fade-up" aria-labelledby="target-audience-heading" role="region">
      <div class="container section-padding">
        <h2 id="target-audience-heading" class="heading-section" data-animate="fade-up">Built for people who value quality</h2>
        <div class="content-spacing grid-cards-2">
          <div class="space-y-4">
            <div class="card text-body" data-animate="fade-up" data-delay="100">
              <h3 class="heading-service mb-3">Product Teams</h3>
              <p>Need an impactful UI that matches your products ambition.</p>
            </div>
            <div class="card text-body" data-animate="fade-up" data-delay="200">
              <h3 class="heading-service mb-3">Marketing Teams</h3>
              <p>Building interactive tools, calculators, and lead-generation pages that convert.</p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="card text-body" data-animate="fade-up" data-delay="150">
              <h3 class="heading-service mb-3">Design + Dev Agencies</h3>
              <p>Need a reliable frontend specialist for white-label projects and ongoing partnerships.</p>
            </div>
            <div class="card text-body" data-animate="fade-up" data-delay="250">
              <h3 class="heading-service mb-3">Startups</h3>
              <p>Building for the future...</p>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center" data-animate="fade-up" data-delay="300">
          <h3 class="heading-service mb-4">You're a good fit if you:</h3>
          <div class="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <div class="flex items-start gap-3 text-body">
              <span class="text-mint mt-1">✓</span>
              Value design quality and engineering discipline
            </div>
            <div class="flex items-start gap-3 text-body">
              <span class="text-mint mt-1">✓</span>
              Prefer fixed-scope, efficient projects
            </div>
            <div class="flex items-start gap-3 text-body">
              <span class="text-mint mt-1">✓</span>
              Have design assets ready or near-final
            </div>
            <div class="flex items-start gap-3 text-body">
              <span class="text-mint mt-1">✓</span>
              Understand the ROI of clean UI systems
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TECH STACK -->
    <section class="bg-surface" data-animate="fade-up" aria-labelledby="tech-heading" role="region">
      <div class="container section-padding-sm">
        <h2 id="tech-heading" class="heading-section" data-animate="fade-up">I love working with</h2>
        <p class="content-spacing-sm text-body" data-animate="fade-up" data-delay="100">Vue 3 • Tailwind CSS • TypeScript • Vite • REST / GraphQL • UI Systems</p>
      </div>
    </section>

    <!-- CONTACT / CTA -->
    <section id="contact" class="bg-ink" data-animate="fade-up" aria-labelledby="contact-heading" role="region">
      <div class="container section-padding">
        <div class="card shadow-soft" data-animate="fade-up" data-delay="100">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 id="contact-heading" class="heading-card">Ready to Build Something Great?</h3>
              <p class="content-spacing-xs text-body">Fixed-scope packages starting at $8k • Free estimate for qualified projects</p>
            </div>
            <button @click="openContactModal('intro')" class="btn-primary" aria-label="Book a 15-minute intro call">Book a 15‑min intro</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-ink border-t border-mint/10" role="contentinfo" aria-label="Site footer">
      <div class="container py-10 text-slate">
        <p>© {{ year }} Precision Frontend Engineering. Built with Vue 3, and Tailwind. Deployed on Vercel.</p>
      </div>
    </footer>
    </main>

    <!-- Other Pages -->
    <ServicesPage v-else-if="currentPage === 'services'" />
    <AboutPage v-else-if="currentPage === 'about'" />
    <ProcessPage v-else-if="currentPage === 'process'" />
  </div>

  <!-- Contact Modal -->
  <Teleport to="body">
    <div 
      v-if="showContactModal" 
      class="modal-overlay"
      @click="closeContactModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; padding: 1rem;"
    >
    <div 
      class="modal-content"
      @click.stop
      role="document"
    >
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 id="modal-title" class="heading-card">
          {{ contactFormType === 'project' ? 'Start a Project' : 'Book a 15-min Intro' }}
        </h2>
        <button 
          @click="closeContactModal"
          class="modal-close"
          aria-label="Close dialog"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Modal Description -->
      <p id="modal-description" class="modal-description text-body">
        {{ contactFormType === 'project' 
          ? 'Tell me about your project and I\'ll get back to you within 24 hours.' 
          : 'Let\'s chat about your frontend needs in a quick 15-minute call.' 
        }}
      </p>

      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="contact-form" novalidate>
        <div class="form-group">
          <label for="contact-name" class="form-label">
            Name <span class="required" aria-label="required">*</span>
          </label>
          <input
            id="contact-name"
            v-model="formData.name"
            type="text"
            class="form-input"
            :class="{ 'error': formErrors.name }"
            :aria-invalid="!!formErrors.name"
            :aria-describedby="formErrors.name ? 'name-error' : null"
            autocomplete="name"
            required
          />
          <div 
            v-if="formErrors.name" 
            id="name-error" 
            class="form-error"
            role="alert"
          >
            {{ formErrors.name }}
          </div>
        </div>

        <div class="form-group">
          <label for="contact-email" class="form-label">
            Email <span class="required" aria-label="required">*</span>
          </label>
          <input
            id="contact-email"
            v-model="formData.email"
            type="email"
            class="form-input"
            :class="{ 'error': formErrors.email }"
            :aria-invalid="!!formErrors.email"
            :aria-describedby="formErrors.email ? 'email-error' : null"
            autocomplete="email"
            required
          />
          <div 
            v-if="formErrors.email" 
            id="email-error" 
            class="form-error"
            role="alert"
          >
            {{ formErrors.email }}
          </div>
        </div>

        <div class="form-group">
          <label for="contact-company" class="form-label">
            Company
          </label>
          <input
            id="contact-company"
            v-model="formData.company"
            type="text"
            class="form-input"
            autocomplete="organization"
          />
        </div>

        <div class="form-group">
          <label for="contact-message" class="form-label">
            Message <span class="required" aria-label="required">*</span>
          </label>
          <textarea
            id="contact-message"
            v-model="formData.message"
            class="form-textarea"
            :class="{ 'error': formErrors.message }"
            :aria-invalid="!!formErrors.message"
            :aria-describedby="formErrors.message ? 'message-error' : null"
            rows="4"
            :placeholder="contactFormType === 'project' 
              ? 'Describe your project, timeline, and any specific requirements...' 
              : 'What would you like to discuss in our intro call?'"
            required
          ></textarea>
          <div 
            v-if="formErrors.message" 
            id="message-error" 
            class="form-error"
            role="alert"
          >
            {{ formErrors.message }}
          </div>
        </div>

        <!-- Submit Message -->
        <div 
          v-if="submitMessage" 
          class="submit-message"
          :class="{ 'success': submitMessage.includes('Thank you'), 'error': submitMessage.includes('error') }"
          role="alert"
          aria-live="polite"
        >
          {{ submitMessage }}
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button 
            type="button"
            @click="closeContactModal"
            class="btn-ghost"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="btn-primary"
            :disabled="isSubmitting"
            :aria-describedby="isSubmitting ? 'submit-status' : null"
          >
            <span v-if="isSubmitting">
              <svg class="spinner" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"/>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Sending...
            </span>
            <span v-else>
              {{ contactFormType === 'project' ? 'Send Project Details' : 'Request Intro Call' }}
            </span>
          </button>
        </div>
        
        <div v-if="isSubmitting" id="submit-status" class="sr-only" aria-live="polite">
          Form is being submitted, please wait.
        </div>
      </form>
    </div>
  </div>
  </Teleport>
</template>
