<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

const year = new Date().getFullYear()
const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 100
}

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'dark')
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
        <RouterLink
          to="/"
          class="header-logo text-offwhite hover:text-orange transition-colors"
          :class="{ 'is-scrolled': scrolled }"
        >
          <!-- P mark - always visible; animates in on load -->
          <svg
            class="logo-mark h-7 w-auto text-orange"
            viewBox="0 0 545 498"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M 95.5 2.5 H 434 C 508 2.5 553 41 534 116 C 529 136 520 169 507 202 C 482 267 431 300 362 300 H 185 L 121 487 H 1 L 118 162 H 235 L 214.5 217 H 341 C 372 217 397 200 406 170 L 413 148 C 426 110 405 90 379 90 H 58.5 Z"/>
          </svg>
          <!-- Name - wipes in on load, collapses into the mark on scroll -->
          <span class="logo-name-wrap">
            <span class="logo-name font-display text-lg">Precision Frontend</span>
          </span>
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
          <p class="text-sm">Interactive tools for marketing teams · Boston, MA</p>
        </div>
        <div class="text-sm">
          <a href="https://kylelangford.com" target="_blank" rel="noopener" class="text-orange hover:underline">
            Full portfolio & case studies →
          </a>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-orange/10 text-sm text-center">
        <p>&copy; {{ year }} Precision Frontend. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
