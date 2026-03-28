import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { PostHogProvider } from '@posthog/react'

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
  autocapture: true, // Enables automatic tracking of clicks, inputs, etc.
  capture_pageview: true,
  capture_pageleave: true,
  property_blacklist: ['$ip'], // We don't need explicitly store IP, posthog derives location from it automatically
  person_profiles: 'identified_only', // Cost optimization for anonymous traffic
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>,
)
