<script setup>
import ServicePage from '../../components/ServicePage.vue'

const pageData = {
  title: 'Accessibility & WCAG Compliance',
  subtitle: 'WCAG violations are legal liability. They\'re also excluding 15-20% of potential customers.',
  problem: `Web accessibility isn't optional—it's increasingly a legal requirement. ADA lawsuits against websites have grown dramatically. Beyond legal risk, inaccessible sites exclude users with disabilities: that's 1 in 5 people. You're leaving money on the table and exposing yourself to lawsuits.`,
  businessCase: `Web accessibility lawsuits exceeded 4,500 in 2023. Schools, healthcare, municipalities, and e-commerce are common targets. But even without legal pressure, the disability community represents $8 trillion in global spending power. Accessibility is good business.`,
  symptoms: [
    'No alt text on important images',
    'Poor color contrast on text',
    'Forms without proper labels',
    'Can\'t navigate the site with keyboard only',
    'No skip navigation links',
    'Videos without captions'
  ],
  whatWeDo: [
    {
      title: 'WCAG 2.1 Audit',
      description: 'We test against WCAG 2.1 AA guidelines—the standard for legal compliance. Automated scans plus manual testing with real assistive technology.'
    },
    {
      title: 'Priority Remediation',
      description: 'We prioritize fixes by legal risk and user impact. Critical issues first, then systematic cleanup of remaining violations.'
    },
    {
      title: 'Keyboard Navigation',
      description: 'We ensure your entire site works without a mouse. Focus states, tab order, skip links, and proper interactive element roles.'
    },
    {
      title: 'Accessible Components',
      description: 'We rebuild inaccessible UI components: modals, dropdowns, carousels, forms. Native HTML where possible, ARIA where necessary.'
    }
  ],
  relatedServices: [
    { title: 'Redesign', link: '/services/redesign' },
    { title: 'Performance', link: '/services/performance' },
    { title: 'Conversion', link: '/services/conversion' }
  ]
}
</script>

<template>
  <ServicePage v-bind="pageData" />
</template>
