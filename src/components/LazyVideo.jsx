import { useEffect, useRef } from 'react';

/**
 * Ambient autoplay video — no controls, lazy loaded.
 * Plays when 40%+ visible in viewport, pauses when scrolled out.
 * src is set dynamically so preload="none" holds until entry.
 */
export default function LazyVideo({ src, poster, className, 'aria-label': ariaLabel }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!video.getAttribute('src')) video.setAttribute('src', src);
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      aria-label={ariaLabel}
    />
  );
}