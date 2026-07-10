<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: String,
  subtitle: String,
  problem: String,
  businessCase: String,
  symptoms: Array,
  whatWeDo: Array,
  relatedServices: Array
})
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="bg-ink hero-glow-container" aria-labelledby="service-heading">
      <div class="glow-orb glow-orb-1" aria-hidden="true"></div>
      <div class="glow-orb glow-orb-2" aria-hidden="true"></div>

      <div class="container py-20 md:py-28 relative z-10">
        <div class="max-w-3xl">
          <RouterLink to="/" class="inline-flex items-center gap-2 text-slate hover:text-orange transition-colors text-sm mb-6">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </RouterLink>
          <h1 id="service-heading" class="heading-hero text-3xl md:text-5xl">
            {{ title }}
          </h1>
          <p class="content-spacing text-lead">
            {{ subtitle }}
          </p>
          <div class="actions-spacing">
            <a href="/#contact" class="btn-primary">Get a Free Quote</a>
          </div>
        </div>
      </div>
    </section>

    <!-- THE PROBLEM -->
    <section class="bg-ink" aria-labelledby="problem-heading">
      <div class="container section-padding">
        <div class="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 id="problem-heading" class="heading-section">The Problem</h2>
            <p class="content-spacing text-body text-lg">{{ problem }}</p>
          </div>
          <div class="card">
            <h3 class="heading-service text-orange">The Business Case</h3>
            <p class="content-spacing text-body">{{ businessCase }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SYMPTOMS -->
    <section class="bg-ink" aria-labelledby="symptoms-heading">
      <div class="container section-padding-sm">
        <h2 id="symptoms-heading" class="heading-section">Signs You Have This Problem</h2>
        <div class="actions-spacing grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(symptom, index) in symptoms"
            :key="index"
            class="p-5 border border-orange/20 rounded-lg"
          >
            <p class="text-offwhite">{{ symptom }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT WE DO -->
    <section class="bg-ink" aria-labelledby="solution-heading">
      <div class="container section-padding">
        <h2 id="solution-heading" class="heading-section">What We Do</h2>
        <div class="actions-spacing grid md:grid-cols-2 gap-6">
          <div
            v-for="(item, index) in whatWeDo"
            :key="index"
            class="flex gap-4"
          >
            <div class="text-orange text-2xl font-display">{{ String(index + 1).padStart(2, '0') }}</div>
            <div>
              <h3 class="heading-service">{{ item.title }}</h3>
              <p class="content-spacing-sm text-body">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-ink" aria-labelledby="cta-heading">
      <div class="container section-padding">
        <div class="card text-center max-w-2xl mx-auto">
          <h2 id="cta-heading" class="heading-card">Ready to Fix This?</h2>
          <p class="content-spacing text-body">
            Tell us what's broken. We'll send you a quote with fixed pricing—no obligation.
          </p>
          <div class="mt-8">
            <a href="/#contact" class="btn-primary">Get a Free Quote</a>
          </div>
        </div>
      </div>
    </section>

    <!-- RELATED SERVICES -->
    <section v-if="relatedServices?.length" class="bg-ink" aria-labelledby="related-heading">
      <div class="container section-padding-sm">
        <h2 id="related-heading" class="heading-section text-center">Related Issues</h2>
        <div class="actions-spacing grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <RouterLink
            v-for="service in relatedServices"
            :key="service.link"
            :to="service.link"
            class="p-4 border border-orange/20 rounded-lg hover:border-orange/50 transition-colors text-center group"
          >
            <h3 class="text-offwhite font-semibold group-hover:text-orange transition-colors">{{ service.title }}</h3>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
