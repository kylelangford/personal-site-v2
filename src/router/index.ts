import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/services/legacy-cms',
    name: 'legacy-cms',
    component: () => import('../views/services/LegacyCms.vue')
  },
  {
    path: '/services/performance',
    name: 'performance',
    component: () => import('../views/services/Performance.vue')
  },
  {
    path: '/services/broken-links',
    name: 'broken-links',
    component: () => import('../views/services/BrokenLinks.vue')
  },
  {
    path: '/services/local-seo',
    name: 'local-seo',
    component: () => import('../views/services/LocalSeo.vue')
  },
  {
    path: '/services/accessibility',
    name: 'accessibility',
    component: () => import('../views/services/Accessibility.vue')
  },
  {
    path: '/services/conversion',
    name: 'conversion',
    component: () => import('../views/services/Conversion.vue')
  },
  {
    path: '/services/redesign',
    name: 'redesign',
    component: () => import('../views/services/Redesign.vue')
  },
  {
    path: '/services/scaling',
    name: 'scaling',
    component: () => import('../views/services/Scaling.vue')
  },
  {
    path: '/services/competitive-analysis',
    name: 'competitive-analysis',
    component: () => import('../views/services/CompetitiveAnalysis.vue')
  },
  {
    path: '/services/tech-migration',
    name: 'tech-migration',
    component: () => import('../views/services/TechMigration.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
