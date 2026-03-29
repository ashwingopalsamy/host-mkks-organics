/**
 * analytics.js — Centralized analytics for MKKS Organics
 *
 * Dual-fires events to both Vercel Analytics and PostHog so every
 * significant user action shows up in both dashboards.
 *
 * Key exports:
 *  - trackPageView(path, name)  — virtual page view (Vercel Pages dashboard)
 *  - trackEvent(name, props)    — custom event (Vercel Events + PostHog)
 *  - useSectionTracker(sectionId, ref, posthog) — wires a section to virtual pages + dwell time
 *  - useScrollDepth(posthog)    — fires 25/50/75/100% scroll milestones
 *  - useSessionStart(posthog)   — fires once on mount with referrer/UTM/device info
 */

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

// ─── Section → virtual URL mapping ───────────────────────────────────────────
export const SECTION_PATHS = {
  home:        '/',
  varieties:   '/varieties',
  maintenance: '/maintenance',
  story:       '/story',
  contact:     '/contact',
};

export const SECTION_LABELS = {
  home:        'Home – Hero',
  varieties:   'Varieties – Pick Your Bite',
  maintenance: 'Maintenance – Orchard Care',
  story:       'Story – The Legacy',
  contact:     'Contact – Reserve',
};

// ─── Core helpers ─────────────────────────────────────────────────────────────

/**
 * Fire a virtual page view.
 * - Updates browser history so Vercel's automatic pageview detection picks it up
 * - Also fires a PostHog $pageview manually
 */
export function trackPageView(path, label, posthog) {
  try {
    window.history.replaceState(null, '', path);
  } catch {/* ignore */}

  // PostHog virtual pageview
  posthog?.capture('$pageview', {
    $current_url: window.location.origin + path,
    page_title: label,
    virtual: true,
  });
}

/**
 * Dual-fire a named event to both Vercel Analytics and PostHog.
 */
export function trackEvent(name, props = {}, posthog = null) {
  // Vercel Analytics custom event
  try {
    track(name, props);
  } catch {/* ignore if not in production */}

  // PostHog event
  posthog?.capture(name, props);
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/**
 * useSectionTracker
 *
 * Attaches to a section ref. When ≥50% of the section enters the viewport
 * and stays for at least 800ms:
 *  - fires a virtual pageview (Vercel + PostHog)
 *  - starts a dwell timer
 * When the section leaves the viewport, fires `section_dwell_time` on PostHog.
 */
export function useSectionTracker(sectionId, ref, posthog) {
  const firedRef = useRef(false);
  const enterTimeRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const path = SECTION_PATHS[sectionId];
    const label = SECTION_LABELS[sectionId];

    // Timer handle — we only fire the pageview if section stays visible ≥800ms
    let dwellTimer = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section entered viewport
          enterTimeRef.current = Date.now();

          if (!firedRef.current) {
            // Only fire the virtual pageview once on first meaningful view
            dwellTimer = setTimeout(() => {
              firedRef.current = true;
              if (path) trackPageView(path, label, posthog);
              track('section_entered', { section: sectionId, label });
              posthog?.capture('section_entered', { section_id: sectionId, section_label: label });
            }, 800);
          }
        } else {
          // Section left viewport
          clearTimeout(dwellTimer);

          if (enterTimeRef.current) {
            const dwellMs = Date.now() - enterTimeRef.current;
            const dwellSec = Math.round(dwellMs / 1000);
            enterTimeRef.current = null;

            if (dwellSec >= 1) {
              posthog?.capture('section_dwell_time', {
                section_id: sectionId,
                section_label: label,
                dwell_seconds: dwellSec,
              });
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(dwellTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);
}

/**
 * useScrollDepth
 *
 * Fires scroll depth milestones at 25%, 50%, 75%, 100%.
 * Each milestone fires once per page session.
 */
export function useScrollDepth(posthog) {
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const fired = new Set();

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrolled / docHeight) * 100);

      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          const eventName = `scroll_depth_${m}`;
          try { track(eventName, { depth_percent: m }); } catch {/* */}
          posthog?.capture('scroll_depth', { depth_percent: m, milestone: `${m}%` });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * useSessionStart
 *
 * Fires once on mount with session metadata:
 * referrer, UTM params, viewport, device type, connection.
 */
export function useSessionStart(posthog) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const utmSource   = params.get('utm_source')   || null;
    const utmMedium   = params.get('utm_medium')   || null;
    const utmCampaign = params.get('utm_campaign') || null;
    const utmContent  = params.get('utm_content')  || null;
    const utmTerm     = params.get('utm_term')     || null;

    const referrer = document.referrer || null;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const deviceType = viewportW < 768 ? 'mobile' : viewportW < 1024 ? 'tablet' : 'desktop';

    // eslint-disable-next-line no-undef
    const connection = navigator?.connection?.effectiveType || null;

    const props = {
      referrer,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      viewport_width: viewportW,
      viewport_height: viewportH,
      device_type: deviceType,
      connection_type: connection,
      language: navigator.language || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    };

    try { track('session_start', { device_type: deviceType, referrer: referrer || 'direct' }); } catch {/* */}
    posthog?.capture('session_start', props);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
