import { useRef, useEffect, useState } from 'react';

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

    // Use IntersectionObserver to play/pause the video purely based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play the video. The browser will begin downloading the buffer automatically
          // since preload is set to "none" initially.
          video.play().catch((err) => {
            console.warn('Video autoplay blocked or failed:', err);
          });
        } else {
          // Pause to save battery and battery when out of view
          video.pause();
        }
      },
      { rootMargin: '100px 0px' } // Pre-trigger slightly before it enters the viewport
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
      muted
      loop
      playsInline
      preload="none"
      aria-label={ariaLabel}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  );
}
