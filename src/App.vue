<script setup>
import { onMounted, ref } from 'vue'

const year = new Date().getFullYear()
const isDark = ref(true)

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
  contactFormType.value = type
  showContactModal.value = true
  resetForm()
  // Focus trap and body scroll prevention
  document.body.style.overflow = 'hidden'
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
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        company: formData.value.company,
        message: formData.value.message,
        type: contactFormType.value
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message')
    }
    
    submitMessage.value = 'Thank you! Your message has been sent successfully.'
    setTimeout(() => {
      closeContactModal()
    }, 2000)
  } catch (error) {
    console.error('Form submission error:', error)
    submitMessage.value = error.message || 'Sorry, there was an error sending your message. Please try again.'
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
  
  <main id="main-content" role="main">
    <!-- HERO -->
    <section class="bg-ink" aria-labelledby="hero-heading">
      <div class="container py-24 md:py-32">
        <div class="hero-content">
          <h1 id="hero-heading" class="heading-hero">
            <span>Precision Frontend Engineering</span>
          </h1>
          <p class="content-spacing text-lead lead-content">
            I help product and marketing teams turn designs into production-grade UI.
            Clean architecture. Reusable components. Zero frontend chaos. Fast.
          </p>
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
        <div class="grid-cards-2">
          <div class="card" data-animate="fade-up" data-delay="100">
            <h2 class="heading-card">Outcome, not hours</h2>
            <p class="content-spacing-sm text-body">
              I build scalable interfaces with a UX-first mindset so your product ships
              faster, looks better, and stays maintainable. No bloat. No fragile frontends. No handoff chaos.
            </p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="200">
            <h2 class="heading-card">Details Matter</h2>
            <p class="content-spacing-sm text-body">
              14+ years agency experience with a graphic design background. I bridge design knowledge and engineering discipline to produce
              world class user experiences that scale.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="bg-ink" data-animate="fade-up" aria-labelledby="services-heading" role="region">
      <div class="container section-padding">
        <h2 id="services-heading" class="heading-section" data-animate="fade-up">Services</h2>
        <div class="actions-spacing grid-cards-3" role="list" aria-label="Available services">
          <div class="card" data-animate="fade-up" data-delay="100" role="listitem">
            <h3 class="heading-service">Design → HTML/CSS/JS</h3>
            <p class="content-spacing-xs text-body">High-fidelity implementation from design to code.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="150" role="listitem">
            <h3 class="heading-service">Component Architecture</h3>
            <p class="content-spacing-xs text-body">Reusable libraries and UI systems that scale.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="200" role="listitem">
            <h3 class="heading-service">Refactors & Performance</h3>
            <p class="content-spacing-xs text-body">Stabilize frontends, improve DX, and cut UI debt.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="250" role="listitem">
            <h3 class="heading-service">Interactive Tools</h3>
            <p class="content-spacing-xs text-body">Calculators, maps, configurators, lead tools.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="300" role="listitem">
            <h3 class="heading-service">SaaS Dashboards & Product UI</h3>
            <p class="content-spacing-xs text-body">Production-grade application interfaces.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="350" role="listitem">
            <h3 class="heading-service">Design Systems</h3>
            <p class="content-spacing-xs text-body">Components, accessibility, and documentation.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BUILT FOR -->
    <section class="bg-surface" data-animate="fade-up" aria-labelledby="target-audience-heading" role="region">
      <div class="container section-padding">
        <h2 id="target-audience-heading" class="heading-section" data-animate="fade-up">Ready for</h2>
        <ul class="content-spacing grid-list-2" role="list" aria-label="Target audience types">
          <li class="card text-body" data-animate="fade-up" data-delay="100">Teams who need frontend bandwidth without hiring full-time.</li>
          <li class="card text-body" data-animate="fade-up" data-delay="150">SaaS teams scaling fast and tired of UI debt.</li>
          <li class="card text-body" data-animate="fade-up" data-delay="200">Marketing teams needing high-converting interactive tools.</li>
          <li class="card text-body" data-animate="fade-up" data-delay="250">Engineering teams who want clean UI systems—not spaghetti code.</li>
        </ul>
      </div>
    </section>

    <!-- TECH STACK -->
    <section class="bg-ink" data-animate="fade-up" aria-labelledby="tech-heading" role="region">
      <div class="container section-padding-sm">
        <h2 id="tech-heading" class="heading-section" data-animate="fade-up">I love working with</h2>
        <p class="content-spacing-sm text-body" data-animate="fade-up" data-delay="100">Vue 3 • Tailwind • TypeScript • Vite • Design Systems</p>
      </div>
    </section>

    <!-- CONTACT / CTA -->
    <section id="contact" class="bg-ink" data-animate="fade-up" aria-labelledby="contact-heading" role="region">
      <div class="container section-padding">
        <div class="card shadow-soft" data-animate="fade-up" data-delay="100">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 id="contact-heading" class="heading-card">Have a Frontend project?</h3>
              <p class="content-spacing-xs text-body">Fixed-scope projects available</p>
            </div>
            <button @click="openContactModal('intro')" class="btn-primary" aria-label="Book a 15-minute intro call">Book a 15‑min intro</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-ink border-t border-mint/10" role="contentinfo" aria-label="Site footer">
      <div class="container py-10 text-slate">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p>© {{ year }} Precision Frontend Engineering. Built with Vue 3, Vite, and Tailwind. Deployed on Vercel.</p>
          <div class="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/kylelangford/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-2 text-slate hover:text-mint transition-colors text-sm"
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
