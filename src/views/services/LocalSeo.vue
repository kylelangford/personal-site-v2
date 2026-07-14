<script setup>
import ServicePage from '../../components/ServicePage.vue'

const pageData = {
  title: 'Local SEO',
  subtitle: 'Your competitors show up in local search. You don\'t. That\'s fixable.',
  problem: `Local search is how customers find service businesses. If your location pages are thin, your Google Business Profile is incomplete, or your NAP (Name, Address, Phone) is inconsistent across the web, you're invisible to local searchers. Your competitors are eating your lunch.`,
  businessCase: `46% of all Google searches have local intent. "Near me" searches have grown 500%+ in recent years. If you serve a geographic area and don't show up in local results, you're missing the customers actively looking for what you offer.`,
  symptoms: [
    'You don\'t appear in Google Maps results',
    'Competitors outrank you for "[service] near me"',
    'Your Google Business Profile has few reviews',
    'Location pages have minimal unique content',
    'Your address/phone differs across directories',
    'You have no schema markup for local business'
  ],
  whatWeDo: [
    {
      title: 'Local SEO Audit',
      description: 'We analyze your local presence: Google Business Profile, location pages, citations, reviews, and how you compare to local competitors.'
    },
    {
      title: 'Location Page Optimization',
      description: 'We build or improve location-specific pages with unique, relevant content—not just address swaps. Schema markup, local keywords, neighborhood relevance.'
    },
    {
      title: 'Google Business Profile',
      description: 'We optimize your GBP: categories, attributes, photos, posts, Q&A, review response strategy. The stuff that actually impacts local rankings.'
    },
    {
      title: 'Citation Cleanup',
      description: 'We find and fix inconsistent business information across directories. NAP consistency matters more than most people realize.'
    }
  ],
  approach: [
    {
      title: 'Design-to-Code Precision',
      description: 'We communicate in design language—exact pixel values, gradient angles, specific rgba colors. We read from design specs and translate them accurately. Many devs approximate; we implement exactly.'
    },
    {
      title: 'Component-Based CSS Architecture',
      description: 'Clean structure with dedicated partials per component, consistent BEM naming, and centralized variables. This scales well and makes handoffs easy. We write CSS that other devs can maintain.'
    },
    {
      title: 'Efficient Communication',
      description: 'Terse, unambiguous instructions. No back-and-forth needed. We get it without endless clarification—saving everyone time.'
    }
  ],
  relatedServices: [
    { title: 'Conversion', link: '/services/conversion' },
    { title: 'Broken Links', link: '/services/broken-links' },
    { title: 'Redesign', link: '/services/redesign' }
  ]
}
</script>

<template>
  <ServicePage v-bind="pageData" />
</template>
