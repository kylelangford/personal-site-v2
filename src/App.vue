<script setup>
import { onMounted } from 'vue'

const year = new Date().getFullYear()


onMounted(() => {
  // Set dark theme as default
  document.documentElement.setAttribute('data-theme', 'dark')
  
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
  
  
  <main id="main-content" role="main">
    <!-- HERO -->
    <section class="bg-ink" aria-labelledby="hero-heading">
      <div class="container py-24 md:py-32">
        <div class="hero-content">
          <h1 id="hero-heading" class="heading-hero">
            <span>Precision Frontend Engineering</span>
          </h1>
          <p class="content-spacing text-lead lead-content">
            Building thoughtful web applications and developer tools for the open internet.
            Modern JavaScript. Web standards. User-first design. Built to last.
          </p>
          <div class="actions-spacing flex items-center gap-4" role="group" aria-label="Primary actions">
            <a href="https://kylelangford.com/" target="_blank" rel="noopener noreferrer" class="btn-primary" aria-describedby="hero-heading">Founded by Kyle Langford</a>
            <a href="https://kylelangford.com/blog" target="_blank" rel="noopener noreferrer" class="btn-ghost" aria-describedby="hero-heading">My Blog</a>
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
            <h2 class="heading-card">Building for humans, not metrics</h2>
            <p class="content-spacing-sm text-body">
              Every line of code respects user agency. Fast-loading, accessible interfaces that work for everyone.
            </p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="200">
            <h2 class="heading-card">Not just Vibes</h2>
            <p class="content-spacing-sm text-body">
              14+ years crafting web experiences with timeless principles. Using web standards, semantic markup, and progressive enhancement to create products that endure beyond the framework du jour.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="bg-ink" data-animate="fade-up" aria-labelledby="services-heading" role="region">
      <div class="container section-padding">
        <h2 id="services-heading" class="heading-section" data-animate="fade-up">Building the Open Web</h2>
        <div class="actions-spacing grid-cards-3" role="list" aria-label="What we build">
          <div class="card" data-animate="fade-up" data-delay="100" role="listitem">
            <h3 class="heading-service">Product UI & Interfaces</h3>
            <p class="content-spacing-xs text-body">Beautiful, functional interfaces for web applications and SaaS products.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="150" role="listitem">
            <h3 class="heading-service">Custom Web Applications</h3>
            <p class="content-spacing-xs text-body">Bespoke JavaScript apps built with modern frameworks and thoughtful architecture.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="200" role="listitem">
            <h3 class="heading-service">Developer Tools & Utilities</h3>
            <p class="content-spacing-xs text-body">CLI tools, build systems, and utilities that make developers' lives easier.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="250" role="listitem">
            <h3 class="heading-service">Interactive Experiences</h3>
            <p class="content-spacing-xs text-body">Data visualizations, configurators, and engaging web experiences.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="300" role="listitem">
            <h3 class="heading-service">Open Source Projects</h3>
            <p class="content-spacing-xs text-body">Contributing to the commons with libraries, tools, and educational resources.</p>
          </div>
          <div class="card" data-animate="fade-up" data-delay="350" role="listitem">
            <h3 class="heading-service">Modern Web Stacks</h3>
            <p class="content-spacing-xs text-body">Full-stack JavaScript applications using Vue, React, Node.js, and edge computing.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BUILT FOR -->
    <section class="bg-surface" data-animate="fade-up" aria-labelledby="target-audience-heading" role="region">
      <div class="container section-padding">
        <h2 id="target-audience-heading" class="heading-section" data-animate="fade-up">Building for the Open Internet</h2>
        <ul class="content-spacing grid-list-2" role="list" aria-label="Our values and community">
          <li class="card text-body" data-animate="fade-up" data-delay="100">Makers and builders who believe the web should remain open, accessible, and user-controlled.</li>
          <li class="card text-body" data-animate="fade-up" data-delay="150">Independent developers and small teams creating meaningful digital products.</li>
          <li class="card text-body" data-animate="fade-up" data-delay="200">Companies that prioritize user privacy, web standards, and sustainable technology.</li>
          <li class="card text-body" data-animate="fade-up" data-delay="250">Anyone building for the long-term health of the internet, not just quarterly metrics.</li>
        </ul>
      </div>
    </section>

    <!-- TECH STACK -->
    <!-- <section class="bg-ink" data-animate="fade-up" aria-labelledby="tech-heading" role="region">
      <div class="container section-padding-sm">
        <h2 id="tech-heading" class="heading-section" data-animate="fade-up">I love working with</h2>
        <p class="content-spacing-sm text-body" data-animate="fade-up" data-delay="100">Vue 3 • Tailwind • TypeScript • Vite • Design Systems</p>
      </div>
    </section> -->

    <!-- CONTACT / CTA -->
    <section id="contact" class="bg-ink" data-animate="fade-up" aria-labelledby="contact-heading" role="region">
      <div class="container section-padding">
        <div class="card shadow-soft" data-animate="fade-up" data-delay="100">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 id="contact-heading" class="heading-card">(Add)ictive Programming Blog</h3>
              <p class="content-spacing-xs text-body">Honest, experience-driven insights on modern web development. Navigating the ever-changing frontend and leading candid conversations about mental health, burnout, and working with ADD in the tech industry.</p>
            </div>
            <a href="https://kylelangford.com/blog" target="_blank" rel="noopener noreferrer" class="btn-primary" aria-label="Visit technical writing blog">Read&nbsp;My&nbsp;Blog</a>
          </div>
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
