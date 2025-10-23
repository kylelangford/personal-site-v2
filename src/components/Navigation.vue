<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-sm border-b border-mint/10" role="navigation" aria-label="Main navigation">
    <div class="container">
      <div class="flex items-center justify-between py-4">
        <!-- Logo/Brand -->
        <a href="#" @click.prevent="setCurrentPage('home')" class="font-display text-xl font-bold text-offwhite hover:text-mint transition-colors">
          Precision Frontend
        </a>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-slate hover:text-offwhite transition-colors"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a 
            href="#" 
            @click.prevent="setCurrentPage('home')"
            :class="[
              'text-sm font-medium transition-colors hover:text-mint',
              currentPage === 'home' ? 'text-mint' : 'text-slate'
            ]"
          >
            Home
          </a>
          <a 
            href="#" 
            @click.prevent="setCurrentPage('services')"
            :class="[
              'text-sm font-medium transition-colors hover:text-mint',
              currentPage === 'services' ? 'text-mint' : 'text-slate'
            ]"
          >
            Services
          </a>
          <a 
            href="#" 
            @click.prevent="setCurrentPage('process')"
            :class="[
              'text-sm font-medium transition-colors hover:text-mint',
              currentPage === 'process' ? 'text-mint' : 'text-slate'
            ]"
          >
            Process
          </a>
          <a 
            href="#" 
            @click.prevent="setCurrentPage('about')"
            :class="[
              'text-sm font-medium transition-colors hover:text-mint',
              currentPage === 'about' ? 'text-mint' : 'text-slate'
            ]"
          >
            About
          </a>
          <button 
            @click="$emit('openContact', 'project')"
            class="btn-primary text-sm px-4 py-2"
          >
            Start Project
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div 
        v-if="isMobileMenuOpen"
        id="mobile-navigation"
        class="md:hidden pb-4 border-t border-mint/10 mt-4 pt-4"
      >
        <div class="flex flex-col space-y-4">
          <a 
            href="#" 
            @click.prevent="setCurrentPage('home'); toggleMobileMenu()"
            :class="[
              'text-sm font-medium transition-colors hover:text-mint',
              currentPage === 'home' ? 'text-mint' : 'text-slate'
            ]"
          >
            Home
          </a>
          <a 
            href="#" 
            @click.prevent="setCurrentPage('services'); toggleMobileMenu()"
            :class="[
              'text-sm font-medium transition-colors hover:text-mint',
              currentPage === 'services' ? 'text-mint' : 'text-slate'
            ]"
          >
            Services
          </a>
          <a 
            href="#" 
            @click.prevent="setCurrentPage('process'); toggleMobileMenu()"
            :class="[
              'text-sm font-medium transition-colors hover:text-mint',
              currentPage === 'process' ? 'text-mint' : 'text-slate'
            ]"
          >
            Process
          </a>
          <a 
            href="#" 
            @click.prevent="setCurrentPage('about'); toggleMobileMenu()"
            :class="[
              'text-sm font-medium transition-colors hover:text-mint',
              currentPage === 'about' ? 'text-mint' : 'text-slate'
            ]"
          >
            About
          </a>
          <button 
            @click="$emit('openContact', 'project'); toggleMobileMenu()"
            class="btn-primary text-sm w-full justify-center"
          >
            Start Project
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentPage: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['changePage', 'openContact'])

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const setCurrentPage = (page) => {
  emit('changePage', page)
  // Close mobile menu when navigating
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}
</script>