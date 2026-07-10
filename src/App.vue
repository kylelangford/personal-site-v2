<script setup>
import { onMounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

const year = new Date().getFullYear()

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark')
})

const services = [
  { title: 'Legacy CMS', link: '/services/legacy-cms' },
  { title: 'Performance', link: '/services/performance' },
  { title: 'Broken Links', link: '/services/broken-links' },
  { title: 'Local SEO', link: '/services/local-seo' },
  { title: 'Accessibility', link: '/services/accessibility' },
  { title: 'Conversion', link: '/services/conversion' },
  { title: 'Redesign', link: '/services/redesign' },
  { title: 'Scaling', link: '/services/scaling' },
  { title: 'Competitive Analysis', link: '/services/competitive-analysis' },
  { title: 'Tech Migration', link: '/services/tech-migration' }
]
</script>

<template>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>

  <!-- HEADER -->
  <header class="bg-ink/95 backdrop-blur-sm border-b border-orange/10 sticky top-0 z-50">
    <div class="container py-4">
      <nav class="flex items-center justify-between" aria-label="Main navigation">
        <RouterLink to="/" class="font-display text-lg text-offwhite hover:text-orange transition-colors">
          Precision Frontend
        </RouterLink>

        <div class="flex items-center gap-6">
          <div class="relative group">
            <button class="text-slate hover:text-offwhite transition-colors text-sm flex items-center gap-1">
              Services
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute top-full left-0 mt-2 w-56 bg-ink border border-orange/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div class="p-2">
                <RouterLink
                  v-for="service in services"
                  :key="service.link"
                  :to="service.link"
                  class="block px-3 py-2 text-sm text-slate hover:text-offwhite hover:bg-orange/10 rounded transition-colors"
                >
                  {{ service.title }}
                </RouterLink>
              </div>
            </div>
          </div>
          <a href="/#contact" class="btn-primary text-sm py-2 px-4">Free Audit</a>
        </div>
      </nav>
    </div>
  </header>

  <main id="main-content" role="main">
    <RouterView />
  </main>

  <!-- FOOTER -->
  <footer class="bg-ink border-t border-orange/10" role="contentinfo" aria-label="Site footer">
    <div class="container py-10 text-slate">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p class="font-semibold text-offwhite">Precision Frontend</p>
          <p class="text-sm">Web audits & development for growing companies</p>
        </div>
        <div class="flex items-center gap-4">
          <a href="https://kylelangford.com" target="_blank" rel="noopener noreferrer" class="text-slate hover:text-orange transition-colors text-sm">
            Kyle Langford
          </a>
          <a
            href="https://www.linkedin.com/in/kylelangford/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-slate hover:text-orange transition-colors text-sm"
            aria-label="LinkedIn"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-orange/10 text-sm text-center">
        <p>&copy; {{ year }} Precision Frontend. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
