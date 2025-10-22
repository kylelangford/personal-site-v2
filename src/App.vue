<script setup>
    const year = new Date().getFullYear()
</script>

<template>
  <main>
    <!-- HERO -->
    <section class="bg-ink">
      <div class="container py-24 md:py-32">
        <div class="max-w-3xl">
          <h1 class="font-display text-4xl md:text-6xl leading-tight">
            <span class="text-offwhite">Precision Frontend Engineering</span>
          </h1>
          <p class="mt-6 text-lg text-slate max-w-2xl">
            I help product and marketing teams turn designs into production-grade UI—fast.
            Clean architecture. Reusable components. Zero frontend chaos.
          </p>
          <div class="mt-8 flex items-center gap-4">
            <a href="#contact" class="btn-primary">Start a project</a>
            <a href="#services" class="btn-ghost">See services</a>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUE -->
    <section class="bg-surface">
      <div class="container py-16 md:py-20">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="card">
            <h2 class="font-display text-2xl text-offwhite">Outcome, not hours</h2>
            <p class="mt-3 text-slate">
              I build scalable Vue 3 interfaces with a UX-first mindset so your product ships
              faster, looks better, and stays maintainable. No bloat. No fragile frontends. No handoff chaos.
            </p>
          </div>
          <div class="card">
            <h2 class="font-display text-2xl text-offwhite">Senior craft</h2>
            <p class="mt-3 text-slate">
              13 years in industry with a design background. I bridge design quality and engineering discipline to produce
              production-ready component systems that scale.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="bg-ink">
      <div class="container py-16 md:py-24">
        <h2 class="font-display text-3xl text-offwhite">Services</h2>
        <div class="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card">
            <h3 class="text-offwhite font-semibold">Design → HTML/CSS/JS</h3>
            <p class="mt-2 text-slate">High-fidelity implementation from Figma to production.</p>
          </div>
          <div class="card">
            <h3 class="text-offwhite font-semibold">Vue 3 Component Architecture</h3>
            <p class="mt-2 text-slate">Reusable libraries and UI systems that scale.</p>
          </div>
          <div class="card">
            <h3 class="text-offwhite font-semibold">Refactors & Performance</h3>
            <p class="mt-2 text-slate">Stabilize frontends, improve DX, and cut UI debt.</p>
          </div>
          <div class="card">
            <h3 class="text-offwhite font-semibold">Interactive Tools</h3>
            <p class="mt-2 text-slate">Calculators, maps, configurators, lead tools.</p>
          </div>
          <div class="card">
            <h3 class="text-offwhite font-semibold">SaaS Dashboards & Product UI</h3>
            <p class="mt-2 text-slate">Production-grade application interfaces.</p>
          </div>
          <div class="card">
            <h3 class="text-offwhite font-semibold">Design Systems</h3>
            <p class="mt-2 text-slate">Tokens, accessibility, and documentation.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BUILT FOR -->
    <section class="bg-surface">
      <div class="container py-16 md:py-24">
        <h2 class="font-display text-3xl text-offwhite">Built for</h2>
        <ul class="mt-6 grid md:grid-cols-2 gap-4">
          <li class="card text-slate">Teams who need frontend bandwidth without hiring full-time</li>
          <li class="card text-slate">SaaS teams scaling fast and tired of UI debt</li>
          <li class="card text-slate">Marketing teams needing high-converting interactive tools</li>
          <li class="card text-slate">Engineering teams who want clean UI systems—not spaghetti code</li>
        </ul>
      </div>
    </section>

    <!-- TECH STACK -->
    <section class="bg-ink">
      <div class="container py-16 md:py-20">
        <h2 class="font-display text-3xl text-offwhite">Tech Stack</h2>
        <p class="mt-3 text-slate">Vue 3 • Tailwind CSS • TypeScript • Vite • REST / GraphQL • UX Systems</p>
      </div>
    </section>

    <!-- CONTACT / CTA -->
    <section id="contact" class="bg-ink">
      <div class="container py-16 md:py-24">
        <div class="card shadow-soft">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 class="font-display text-2xl text-offwhite">Have a 40–60 hour project?</h3>
              <p class="mt-2 text-slate">$175/hr • 2 projects/month • Fixed-scope packages available</p>
            </div>
            <a class="btn-primary" href="mailto:hello@example.com">Book a 15‑min intro</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-ink border-t border-mint/10">
      <div class="container py-10 text-slate">
        <p>© {{ year }} Precision Frontend Engineering. Built with Vue 3, Vite, and Tailwind.</p>
      </div>
    </footer>
  </main>
</template>
