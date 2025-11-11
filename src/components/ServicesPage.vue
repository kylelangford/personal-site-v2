<template>
  <div class="min-h-screen bg-ink">
    <!-- Hero Section -->
    <section class="bg-ink border-b border-mint/10">
      <div class="container py-20 md:py-28">
        <div class="max-w-4xl">
          <h1 class="heading-hero">
            <span>Frontend Solutions</span>
            <span class="text-mint"> That Work</span>
          </h1>
          <p class="content-spacing text-lead max-w-2xl">
            Fixed-scope packages designed to get your frontend from concept to production fast.
          </p>
        </div>
      </div>
    </section>

    <!-- Signature Offer Detailed -->
    <section class="bg-surface">
      <div class="container section-padding">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <div class="text-mint text-sm font-semibold uppercase tracking-wide mb-4">Best Value</div>
            <h2 class="heading-section">UI Accelerator Package</h2>
            <p class="content-spacing text-lead">
              Take designs from Figma to production-ready, reusable Vue 3 component systems in 2–4 weeks.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8 mb-12">
            <div class="card bg-ink border-mint/20">
              <h3 class="heading-service text-mint mb-6">What You Get</h3>
              <div class="space-y-4 text-body">
                <div class="flex items-start gap-3">
                  <span class="text-mint mt-1">✓</span>
                  <div>
                    <strong>Design → Production Implementation</strong>
                    <p class="text-slate text-sm mt-1">Pixel-perfect translation from Figma to semantic, accessible HTML/CSS/JS</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-mint mt-1">✓</span>
                  <div>
                    <strong>Vue 3 + Tailwind Architecture</strong>
                    <p class="text-slate text-sm mt-1">Modern, maintainable component structure with TypeScript support</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-mint mt-1">✓</span>
                  <div>
                    <strong>Reusable Pattern System</strong>
                    <p class="text-slate text-sm mt-1">Documented components your team can easily extend and maintain</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-mint mt-1">✓</span>
                  <div>
                    <strong>Performance & Accessibility</strong>
                    <p class="text-slate text-sm mt-1">Optimized for speed, SEO, and WCAG compliance</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-mint mt-1">✓</span>
                  <div>
                    <strong>Team Training Handoff</strong>
                    <p class="text-slate text-sm mt-1">Documentation and optional live training session</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="heading-service mb-6">Investment & Timeline</h3>
              <div class="space-y-6">
                <div>
                  <div class="text-offwhite text-2xl font-bold mb-2">$8,000 – $18,000</div>
                  <p class="text-slate text-sm">Fixed-scope pricing based on component complexity and count</p>
                </div>
                
                <div>
                  <div class="text-offwhite font-semibold mb-2">4-6 Week Delivery</div>
                  <ul class="text-slate text-sm space-y-1">
                    <li>• Week 1: Discovery & Architecture</li>
                    <li>• Week 2-4: Build & Iterate</li>
                    <li>• Week 5-6: QA & Handoff</li>
                  </ul>
                </div>

                <div class="pt-4 border-t border-mint/10">
                  <h4 class="text-offwhite font-semibold mb-3">Perfect For:</h4>
                  <ul class="text-body space-y-2">
                    <li>• Comapnies looking for seriously good UI.</li>
                    <li>• Companies looking to incrtease ROI</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Services Grid -->
    <section class="bg-ink">
      <div class="container section-padding">
        <h2 class="heading-section text-center mb-16">Services</h2>
        
        <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <!-- Interactive Tool Build -->
          <div class="card border-l-4 border-accent">
            <div class="flex justify-between items-start mb-4">
              <h3 class="heading-service">Interactive Tool Build</h3>
              <span class="text-slate text-sm">$10k–$25k</span>
            </div>
            <p class="text-body mb-6">
              Custom ROI calculators, product configurators, interactive maps, and lead-generation applications that convert.
            </p>
            
            <div class="mb-6">
              <h4 class="text-offwhite font-semibold mb-3">Includes:</h4>
              <ul class="text-slate text-sm space-y-1">
                <li>• Custom interactive logic and calculations</li>
                <li>• Real-time data visualization</li>
                <li>• Lead capture and analytics integration</li>
                <li>• Mobile-optimized responsive design</li>
                <li>• Performance optimization and testing</li>
              </ul>
            </div>
            
            <div class="text-mint text-sm font-semibold">4-8 week delivery</div>
          </div>

          <!-- Frontend Refactor -->
          <div class="card border-l-4 border-mint">
            <div class="flex justify-between items-start mb-4">
              <h3 class="heading-service">Frontend Refactor / UI Rehab</h3>
              <span class="text-slate text-sm">$6k–$15k</span>
            </div>
            <p class="text-body mb-6">
              Cleanup and optimization of messy UI codebases. Stabilize performance, improve developer experience, and eliminate technical debt.
            </p>
            
            <div class="mb-6">
              <h4 class="text-offwhite font-semibold mb-3">Focus Areas:</h4>
              <ul class="text-slate text-sm space-y-1">
                <li>• Code organization and component structure</li>
                <li>• Performance bottleneck elimination</li>
                <li>• Accessibility compliance improvements</li>
                <li>• Bundle size optimization</li>
                <li>• Developer tooling and workflow setup</li>
              </ul>
            </div>
            
            <div class="text-mint text-sm font-semibold">2-4 week delivery</div>
          </div>

          <!-- Design System Setup -->
          <div class="card border-l-4 border-accent">
            <div class="flex justify-between items-start mb-4">
              <h3 class="heading-service">Design System Setup</h3>
              <span class="text-slate text-sm">$15k–$35k</span>
            </div>
            <p class="text-body mb-6">
              Build a comprehensive, reusable UI library with tokens, components, and documentation that scales across teams and projects.
            </p>
            
            <div class="mb-6">
              <h4 class="text-offwhite font-semibold mb-3">Deliverables:</h4>
              <ul class="text-slate text-sm space-y-1">
                <li>• Design token system (colors, typography, spacing)</li>
                <li>• Component library with Storybook docs</li>
                <li>• Usage guidelines and best practices</li>
                <li>• Integration with existing design tools</li>
                <li>• Team training and adoption support</li>
              </ul>
            </div>
            
            <div class="text-mint text-sm font-semibold">6-12 week delivery</div>
          </div>

          <!-- Fractional Frontend Partner -->
          <div class="card border-l-4 border-mint bg-surface">
            <div class="flex justify-between items-start mb-4">
              <h3 class="heading-service">Fractional Frontend Partner</h3>
              <span class="text-slate text-sm">$3k–$10k/mo</span>
            </div>
            <p class="text-body mb-6">
              Ongoing monthly support for teams that need consistent frontend expertise without a full-time hire.
            </p>
            
            <div class="mb-6">
              <h4 class="text-offwhite font-semibold mb-3">Monthly Support:</h4>
              <ul class="text-slate text-sm space-y-1">
                <li>• 20-40 hours of dedicated frontend work</li>
                <li>• Architecture guidance and code reviews</li>
                <li>• Feature development and component builds</li>
                <li>• Team mentoring and best practice guidance</li>
                <li>• Technical strategy and roadmap planning</li>
              </ul>
            </div>
            
            <div class="text-mint text-sm font-semibold">Ongoing partnership</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Deep Dive -->
    <section class="bg-surface">
      <div class="container section-padding">
        <div class="text-center mb-16">
          <h2 class="heading-section">Proven Delivery Process</h2>
          <p class="content-spacing text-lead max-w-2xl mx-auto">
            A structured approach that ensures quality, speed, and maintainability in every project.
          </p>
        </div>

        <div class="max-w-4xl mx-auto space-y-12">
          <div class="flex gap-8">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-mint text-ink rounded-full flex items-center justify-center text-xl font-bold">1</div>
            </div>
            <div>
              <h3 class="heading-service mb-4">Discovery & Audit</h3>
              <p class="text-body mb-4">
                Deep dive into your design assets, technical requirements, and project goals. We identify scope, confirm component requirements, and establish success criteria.
              </p>
              <ul class="text-slate text-sm space-y-1">
                <li>• Design asset review and gap analysis</li>
                <li>• Technical requirements documentation</li>
                <li>• Timeline and milestone definition</li>
                <li>• Risk assessment and mitigation planning</li>
              </ul>
            </div>
          </div>

          <div class="flex gap-8">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-mint text-ink rounded-full flex items-center justify-center text-xl font-bold">2</div>
            </div>
            <div>
              <h3 class="heading-service mb-4">Architecture & Setup</h3>
              <p class="text-body mb-4">
                Establish the foundation with modern tooling, component architecture, and development workflow setup to ensure maintainable, scalable code.
              </p>
              <ul class="text-slate text-sm space-y-1">
                <li>• Project scaffolding and development environment</li>
                <li>• Component architecture and folder structure</li>
                <li>• Build tooling and development workflow</li>
                <li>• Code quality standards and linting setup</li>
              </ul>
            </div>
          </div>

          <div class="flex gap-8">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-mint text-ink rounded-full flex items-center justify-center text-xl font-bold">3</div>
            </div>
            <div>
              <h3 class="heading-service mb-4">Build & Iterate</h3>
              <p class="text-body mb-4">
                Develop components with modern best practices, integrate design systems, and ensure responsive behavior across all devices and browsers.
              </p>
              <ul class="text-slate text-sm space-y-1">
                <li>• Component development with TypeScript</li>
                <li>• Design system integration and tokens</li>
                <li>• Cross-browser and device testing</li>
                <li>• Performance optimization and monitoring</li>
              </ul>
            </div>
          </div>

          <div class="flex gap-8">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-mint text-ink rounded-full flex items-center justify-center text-xl font-bold">4</div>
            </div>
            <div>
              <h3 class="heading-service mb-4">QA & Handoff</h3>
              <p class="text-body mb-4">
                Comprehensive testing, documentation, and team training to ensure your project launches successfully and remains maintainable long-term.
              </p>
              <ul class="text-slate text-sm space-y-1">
                <li>• Comprehensive testing and QA validation</li>
                <li>• Component documentation and usage guides</li>
                <li>• Team training and knowledge transfer</li>
                <li>• Post-launch support and optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-ink">
      <div class="container section-padding">
        <div class="card shadow-soft max-w-4xl mx-auto text-center">
          <h2 class="heading-section mb-6">Ready to Upgrade Your Frontend?</h2>
          <p class="text-lead mb-8">
            Let's discuss your project and find the right approach to bring your designs to life.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-primary">Schedule Free Consultation</button>
            <a href="#" class="btn-ghost">View Case Studies</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Component-specific logic would go here
</script>