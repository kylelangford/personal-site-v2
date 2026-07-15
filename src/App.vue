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
        <RouterLink to="/" class="header-logo font-display text-lg text-offwhite hover:text-orange transition-all">
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
            <div class="absolute top-full left-0 mt-2 w-56 bg-black border border-orange/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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
          <span class="hidden sm:block">
            <a href="/#contact" class="btn-primary text-sm py-2 px-4">Get a Quote</a>
          </span>
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
          <p class="text-sm">Web development done right · Boston, MA</p>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-orange/10 text-sm text-center">
        <p>&copy; {{ year }} Precision Frontend. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
