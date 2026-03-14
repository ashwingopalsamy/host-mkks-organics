import { useRef, useState, useEffect } from 'react';
import { PlayIcon } from './icons.jsx';

/**
 * LazyVideo - tap-to-play video with poster thumbnail.
 * Shows poster image until user explicitly taps to play.
 * Pauses when scrolled away to save CPU/battery on mobile.
 */
export default function LazyVideo({ src, poster, className, ariaLabel, style }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!loaded) {
      video.src = src;
      setLoaded(true);
    }

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
  };

  useEffect(() => {
    if (!isPlaying || !videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { rootMargin: '100px 0px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isPlaying]);

  return (
    <div className={`lazy-video-wrap ${className ?? ''}`.trim()} style={style}>
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        webkit-playsinline=""
        preload="none"
        aria-label={ariaLabel}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {!isPlaying && (
        <button
          className="lazy-video-play"
          onClick={handlePlay}
          aria-label="Play video"
          type="button"
        >
          <PlayIcon />
        </button>
      )}
    </div>
  );
}
