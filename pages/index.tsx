'use client';
import { useExplore } from '@/lib/contexts/ExploreContext';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isExploreClicked } = useExplore();

  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // New state to control muting

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => {
      setIsLoading(false);
    };

    // Ensure video autoplays muted and unmutes when in view
    videoElement.muted = true;
    videoElement.play().catch(() => setIsLoading(false)); // Ensure loading state is removed even if autoplay fails

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.muted = false;
            setIsMuted(false);
            videoElement.play().catch((error) => {
              console.log('Failed to autoplay in view:', error);
            });
          } else {
            videoElement.muted = true;
            setIsMuted(true);
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoElement);
    videoElement.addEventListener('play', handlePlay);

    return () => {
      observer.disconnect();
      videoElement.removeEventListener('play', handlePlay);
    };
  }, []);

  useEffect(() => {
    if (isExploreClicked && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .catch((error) => console.log('Play error:', error));
    }
  }, [isExploreClicked]);

  return (
    <div className="relative">
      <div className="relative h-screen">
        <video
          ref={videoRef}
          src="enisvideo(1).mp4"
          autoPlay
          loop
          muted={isMuted} // Bind muted to state
          playsInline
          className="absolute inset-0 h-full w-full object-fill"
        ></video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <h1 className="mb-4 font-serif text-2xl font-bold text-white md:text-3xl">
                Kualitet, siguri dhe garancë.
              </h1>
              <p className="mb-4 text-center font-serif text-xl text-white">
                Shtëpia juaj, obligimi ynë!
              </p>
              <p className="text-center font-serif text-xl text-white">
                +389 70 848 844
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
