import { useEffect, useState, useCallback } from 'react';
import { usePostHog } from '@posthog/react';
import { trackEvent } from '../analytics.js';

// iOS Share Icon
const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
);

// iOS Add to Home Screen Icon
const PlusSquareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState(null); // 'ios' | 'android'
  const posthog = usePostHog();

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) return;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // Evaluate if we should show the prompt (only once per clear session/history, or simply driven by localStorage)
    const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (hasDismissed === 'true') return;

    if (isIOS) {
      setPlatform('ios');
      // Clever 5-sec delay to build trust and show value first
      const timer = setTimeout(() => {
        setShowPrompt(true);
        trackEvent('pwa_prompt_viewed', { platform: 'ios' }, posthog);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      // Android / Chrome - wait for the beforeinstallprompt event.
      // Cleverly, we also delay the UI showing by 5s even if the event fires instantly!
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setPlatform('android');
        setTimeout(() => {
          // Double check dismissal in case it changed
          if (localStorage.getItem('pwa_prompt_dismissed') !== 'true') {
            setShowPrompt(true);
            trackEvent('pwa_prompt_viewed', { platform: 'android' }, posthog);
          }
        }, 5000);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
  }, [posthog]);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
    trackEvent('pwa_prompt_dismissed', { platform }, posthog);
  }, [platform, posthog]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    trackEvent('pwa_install_interaction', { outcome, platform }, posthog);
    
    setDeferredPrompt(null);
    setShowPrompt(false);
    
    if (outcome === 'accepted') {
      localStorage.setItem('pwa_prompt_dismissed', 'true');
    }
  }, [deferredPrompt, platform, posthog]);

  if (!showPrompt || !platform) return null;

  return (
    <div className="pwa-prompt-container" role="dialog" aria-labelledby="pwa-title" aria-modal="true">
      <div className="pwa-capsule">
        <div className="pwa-capsule-main">
          <img src="/images/mkks-organics-logo.png" alt="MKKS Organics Logo" className="pwa-logo" />
          
          <div className="pwa-text-group">
            <h3 id="pwa-title" className="pwa-title">Install MKKS Organics</h3>
            <p className="pwa-subtitle">Get faster access & farm updates.</p>
          </div>

          <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Dismiss">
            <CloseIcon />
          </button>
        </div>

        <div className="pwa-capsule-action">
          {platform === 'ios' ? (
            <div className="pwa-ios-instructions">
              <span className="pwa-ios-text">Tap</span>
              <span className="pwa-inline-icon"><ShareIcon /></span>
              <span className="pwa-ios-text">then</span>
              <span className="pwa-inline-icon"><PlusSquareIcon /></span>
              <span className="pwa-ios-text"><strong>Add to Home Screen</strong></span>
            </div>
          ) : (
            <button className="pwa-install-btn" onClick={handleInstall}>
              Install App
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
