import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:            resolve(__dirname, 'index.html'),
        startHere:       resolve(__dirname, 'start-here.html'),
        visas:           resolve(__dirname, 'pillar-visas.html'),
        business:        resolve(__dirname, 'pillar-business.html'),
        banking:         resolve(__dirname, 'pillar-banking.html'),
        cost:            resolve(__dirname, 'pillar-cost.html'),
        about:           resolve(__dirname, 'about.html'),
        contact:         resolve(__dirname, 'contact.html'),
        privacy:         resolve(__dirname, 'privacy.html'),
        disclaimer:      resolve(__dirname, 'disclaimer.html'),
        healthcare:      resolve(__dirname, 'healthcare.html'),
        education:       resolve(__dirname, 'education.html'),
        legalCompliance: resolve(__dirname, 'legal-compliance.html'),
        dubaiVsUk:       resolve(__dirname, 'dubai-vs-uk.html'),
        joey:            resolve(__dirname, 'joey.js'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
