import { useRef, useEffect } from 'react';

/**
 * LazyVideo — loads and plays a video only when it enters the viewport.
 * Shows a poster image until visible, then streams the video.
 * Pauses when scrolled away to save CPU / battery on mobile.
 */
export default function LazyVideo({ src, poster, className, ariaLabel, style }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play the video, with a touch-based fallback for iOS Chrome
    const tryPlay = () => {
      const p = video.play();
      if (p && p.catch) {
        p.catch(() => {
          // Autoplay was blocked — set up a one-time user interaction fallback
          const resumeOnTouch = () => {
            video.play().catch(() => {});
            document.removeEventListener('touchstart', resumeOnTouch, true);
            document.removeEventListener('click', resumeOnTouch, true);
          };
          document.addEventListener('touchstart', resumeOnTouch, { once: true, capture: true });
          document.addEventListener('click', resumeOnTouch, { once: true, capture: true });
        });
      }
    };

    // Use IntersectionObserver to play/pause the video purely based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { rootMargin: '100px 0px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline=""
      preload="none"
      aria-label={ariaLabel}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  );
}

