<template>
  <div class="min-h-screen bg-ink">
    <!-- Hero Section -->
    <section class="bg-ink border-b border-mint/10">
      <div class="container py-20 md:py-28">
        <div class="max-w-4xl">
          <h1 class="heading-hero">
            <span>Proven</span>
            <span class="text-mint"> Process</span>
          </h1>
          <p class="content-spacing text-lead max-w-2xl">
            A structured approach refined over 13 years and dozens of projects. 
            Designed to deliver quality, speed, and maintainability—every time.
          </p>
        </div>
      </div>
    </section>

    <!-- Process Overview -->
    <section class="bg-surface">
      <div class="container section-padding">
        <div class="text-center mb-16">
          <h2 class="heading-section">Four Phases to Success</h2>
          <p class="content-spacing text-lead max-w-3xl mx-auto">
            Every project follows the same proven methodology, adapted to your specific needs and constraints. 
            No surprises, no chaos—just consistent, high-quality delivery.
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 bg-mint text-ink rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 class="heading-service mb-2">Discovery</h3>
            <p class="text-slate text-sm">Understand, scope, and plan</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-mint text-ink rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 class="heading-service mb-2">Architecture</h3>
            <p class="text-slate text-sm">Design system and structure</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-mint text-ink rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 class="heading-service mb-2">Build</h3>
            <p class="text-slate text-sm">Develop and iterate</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-mint text-ink rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
            <h3 class="heading-service mb-2">Handoff</h3>
            <p class="text-slate text-sm">Test, document, and transfer</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Phase Breakdown -->
    <section class="bg-ink">
      <div class="container section-padding">
        <h2 class="heading-section text-center mb-16">Deep Dive: Each Phase</h2>
        
        <div class="max-w-5xl mx-auto space-y-16">
          <!-- Phase 1: Discovery -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-mint text-ink rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 class="heading-service">Discovery & Audit</h3>
                  <div class="text-mint text-sm">Week 1 • Foundation Setting</div>
                </div>
              </div>
              
              <p class="text-body mb-6">
                Before any code is written, we establish a solid foundation. I dive deep into your design assets, 
                technical requirements, and project goals to ensure perfect alignment from day one.
              </p>

              <div class="space-y-4">
                <h4 class="text-offwhite font-semibold mb-3">Key Activities:</h4>
                <div class="grid gap-3">
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Design Asset Review</strong>
                      <p class="text-slate text-sm">Figma files, style guides, component inventories</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Technical Requirements Analysis</strong>
                      <p class="text-slate text-sm">Browser support, performance targets, accessibility needs</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Scope Definition</strong>
                      <p class="text-slate text-sm">Component count, complexity assessment, timeline planning</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Risk Assessment</strong>
                      <p class="text-slate text-sm">Potential challenges, mitigation strategies, contingency planning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card bg-surface border-mint/20">
              <h4 class="heading-service text-mint mb-4">Deliverables</h4>
              <ul class="space-y-2 text-slate">
                <li>• Project scope document</li>
                <li>• Technical requirements specification</li>
                <li>• Component inventory and complexity map</li>
                <li>• Timeline with milestones</li>
                <li>• Risk assessment and mitigation plan</li>
              </ul>
              
              <div class="mt-6 pt-6 border-t border-mint/10">
                <h5 class="text-offwhite font-semibold mb-2">Success Criteria</h5>
                <p class="text-slate text-sm">
                  100% alignment on scope, timeline, and expectations. 
                  All stakeholders understand what will be delivered and when.
                </p>
              </div>
            </div>
          </div>

          <!-- Phase 2: Architecture -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <div class="card bg-surface border-mint/20">
                <h4 class="heading-service text-mint mb-4">Deliverables</h4>
                <ul class="space-y-2 text-slate">
                  <li>• Component architecture diagram</li>
                  <li>• Naming conventions guide</li>
                  <li>• File structure and organization</li>
                  <li>• Reusability pattern definitions</li>
                  <li>• Performance and accessibility strategy</li>
                </ul>
                
                <div class="mt-6 pt-6 border-t border-mint/10">
                  <h5 class="text-offwhite font-semibold mb-2">Success Criteria</h5>
                  <p class="text-slate text-sm">
                    Clear blueprint for scalable, maintainable code. 
                    All architectural decisions documented and approved.
                  </p>
                </div>
              </div>
            </div>

            <div class="order-1 lg:order-2">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-mint text-ink rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 class="heading-service">Architecture Design</h3>
                  <div class="text-mint text-sm">Days 3-5 • System Planning</div>
                </div>
              </div>
              
              <p class="text-body mb-6">
                The foundation of every great codebase is thoughtful architecture. Before writing a single component, 
                I design the system structure, naming conventions, and reusability patterns that will scale with your team.
              </p>

              <div class="space-y-4">
                <h4 class="text-offwhite font-semibold mb-3">Key Activities:</h4>
                <div class="grid gap-3">
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Component Hierarchy Design</strong>
                      <p class="text-slate text-sm">Atomic design principles, composition patterns</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Naming Convention Standards</strong>
                      <p class="text-slate text-sm">Consistent, predictable naming across components</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Reusability Strategy</strong>
                      <p class="text-slate text-sm">Prop APIs, composition patterns, extension points</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Performance Optimization Plan</strong>
                      <p class="text-slate text-sm">Bundle splitting, lazy loading, critical path optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 3: Build -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-mint text-ink rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 class="heading-service">Build & Iterate</h3>
                  <div class="text-mint text-sm">Weeks 2-3 • Development Sprint</div>
                </div>
              </div>
              
              <p class="text-body mb-6">
                With a solid architecture in place, development moves fast and smooth. I build components systematically, 
                integrate design tokens, and ensure every element works perfectly across devices and browsers.
              </p>

              <div class="space-y-4">
                <h4 class="text-offwhite font-semibold mb-3">Key Activities:</h4>
                <div class="grid gap-3">
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Component Development</strong>
                      <p class="text-slate text-sm">Vue 3 + TypeScript, following architectural guidelines</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Design System Integration</strong>
                      <p class="text-slate text-sm">Tailwind config, design tokens, consistent styling</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Responsive Implementation</strong>
                      <p class="text-slate text-sm">Mobile-first approach, breakpoint optimization</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Cross-Browser Testing</strong>
                      <p class="text-slate text-sm">Modern browser support, progressive enhancement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card bg-surface border-mint/20">
              <h4 class="heading-service text-mint mb-4">Deliverables</h4>
              <ul class="space-y-2 text-slate">
                <li>• Production-ready Vue 3 components</li>
                <li>• Integrated design system and tokens</li>
                <li>• Responsive, accessible implementation</li>
                <li>• Performance-optimized code</li>
                <li>• Cross-browser compatibility</li>
              </ul>
              
              <div class="mt-6 pt-6 border-t border-mint/10">
                <h5 class="text-offwhite font-semibold mb-2">Success Criteria</h5>
                <p class="text-slate text-sm">
                  Components match design specifications exactly while 
                  maintaining performance and accessibility standards.
                </p>
              </div>
            </div>
          </div>

          <!-- Phase 4: Handoff -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <div class="card bg-surface border-mint/20">
                <h4 class="heading-service text-mint mb-4">Deliverables</h4>
                <ul class="space-y-2 text-slate">
                  <li>• Comprehensive component documentation</li>
                  <li>• Usage examples and guidelines</li>
                  <li>• Team training session (optional)</li>
                  <li>• Maintenance and extension guide</li>
                  <li>• 30-day post-launch support</li>
                </ul>
                
                <div class="mt-6 pt-6 border-t border-mint/10">
                  <h5 class="text-offwhite font-semibold mb-2">Success Criteria</h5>
                  <p class="text-slate text-sm">
                    Your team can confidently use, maintain, and extend 
                    the component system without ongoing dependency.
                  </p>
                </div>
              </div>
            </div>

            <div class="order-1 lg:order-2">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 bg-mint text-ink rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 class="heading-service">QA & Handoff</h3>
                  <div class="text-mint text-sm">Week 4 • Knowledge Transfer</div>
                </div>
              </div>
              
              <p class="text-body mb-6">
                The project isn't done when the code is written—it's done when your team can confidently maintain and extend it. 
                Comprehensive testing, documentation, and training ensure long-term success.
              </p>

              <div class="space-y-4">
                <h4 class="text-offwhite font-semibold mb-3">Key Activities:</h4>
                <div class="grid gap-3">
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Comprehensive Testing</strong>
                      <p class="text-slate text-sm">Functionality, accessibility, performance validation</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Documentation Creation</strong>
                      <p class="text-slate text-sm">Usage guides, API references, best practices</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Team Training</strong>
                      <p class="text-slate text-sm">Live walkthrough, Q&A, ongoing support setup</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="text-mint mt-1">✓</span>
                    <div>
                      <strong class="text-offwhite">Maintenance Planning</strong>
                      <p class="text-slate text-sm">Extension strategies, future optimization roadmap</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quality Standards -->
    <section class="bg-surface">
      <div class="container section-padding">
        <div class="text-center mb-16">
          <h2 class="heading-section">Quality Standards</h2>
          <p class="content-spacing text-lead max-w-3xl mx-auto">
            Every deliverable meets rigorous standards for performance, accessibility, and maintainability. 
            No compromises, no shortcuts.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div class="card text-center">
            <div class="text-mint text-3xl mb-4">⚡</div>
            <h3 class="heading-service mb-3">Performance</h3>
            <ul class="text-slate text-sm space-y-1">
              <li>• 95+ Lighthouse scores</li>
              <li>• Optimized bundle sizes</li>
              <li>• Fast loading times</li>
              <li>• Smooth interactions</li>
            </ul>
          </div>

          <div class="card text-center">
            <div class="text-mint text-3xl mb-4">♿</div>
            <h3 class="heading-service mb-3">Accessibility</h3>
            <ul class="text-slate text-sm space-y-1">
              <li>• WCAG 2.1 AA compliance</li>
              <li>• Screen reader optimization</li>
              <li>• Keyboard navigation</li>
              <li>• Color contrast standards</li>
            </ul>
          </div>

          <div class="card text-center">
            <div class="text-mint text-3xl mb-4">🔧</div>
            <h3 class="heading-service mb-3">Maintainability</h3>
            <ul class="text-slate text-sm space-y-1">
              <li>• Clean, documented code</li>
              <li>• Consistent architecture</li>
              <li>• TypeScript integration</li>
              <li>• Extensible patterns</li>
            </ul>
          </div>

          <div class="card text-center">
            <div class="text-mint text-3xl mb-4">📱</div>
            <h3 class="heading-service mb-3">Compatibility</h3>
            <ul class="text-slate text-sm space-y-1">
              <li>• Modern browser support</li>
              <li>• Mobile-first responsive</li>
              <li>• Cross-device testing</li>
              <li>• Progressive enhancement</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Communication & Collaboration -->
    <section class="bg-ink">
      <div class="container section-padding">
        <div class="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h2 class="heading-section mb-8">Communication & Collaboration</h2>
            <div class="space-y-6 text-body">
              <p>
                Great projects are built on great communication. I maintain transparency throughout 
                the process with regular updates, clear documentation, and proactive problem-solving.
              </p>
              <p>
                You'll always know where the project stands, what's coming next, and any potential 
                challenges on the horizon. No surprises, no radio silence—just consistent, professional collaboration.
              </p>
            </div>
          </div>
          
          <div class="space-y-6">
            <div class="card">
              <h3 class="heading-service mb-3">Project Updates</h3>
              <p class="text-slate text-sm">Weekly progress reports, milestone demos, real-time Slack communication</p>
            </div>
            
            <div class="card">
              <h3 class="heading-service mb-3">Feedback Integration</h3>
              <p class="text-slate text-sm">Structured review cycles, rapid iteration, design alignment checkpoints</p>
            </div>
            
            <div class="card">
              <h3 class="heading-service mb-3">Knowledge Sharing</h3>
              <p class="text-slate text-sm">Technical documentation, team training, best practice recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-surface">
      <div class="container section-padding">
        <div class="card shadow-soft max-w-4xl mx-auto text-center bg-ink border-mint/20">
          <h2 class="heading-section mb-6">Ready to Experience the Process?</h2>
          <p class="text-lead mb-8">
            Let's discuss your project and walk through how this proven methodology 
            can deliver exactly what you need—on time, on budget, and beyond expectations.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-primary">Start Your Project</button>
            <a href="#" class="btn-ghost">See Case Studies</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Component-specific logic would go here
</script>