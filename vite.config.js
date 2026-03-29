import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/mkks-organics-logo.png', 'images/pwa-192x192.png', 'images/pwa-512x512.png', 'images/apple-touch-icon.png'],
      manifest: {
        name: 'MKKS Organics',
        short_name: 'MKKS Organics',
        description: 'Tree-ripened organic mangoes from the Anaimalai foothills, Pollachi.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
