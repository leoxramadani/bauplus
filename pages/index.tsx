'use client';
import { useExplore } from '@/lib/contexts/ExploreContext';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isExploreClicked } = useExplore();

  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => {
      setIsLoading(false);
    };

    videoElement.muted = true;
    videoElement.play().catch(() => setIsLoading(false));

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
    <div className="relative flex h-[80vh] w-[100vw] items-center justify-center">
      {' '}
      <div className="relative h-full w-full max-w-7xl overflow-hidden">
        {' '}
        <video
          ref={videoRef}
          src="enisvideo(1).mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="h-full w-full object-fill"
        ></video>
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-lg px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-4 font-serif text-2xl font-bold text-white md:text-3xl">
              Kualitet, siguri dhe garancë.
            </h1>
            <p className="mb-4 font-serif text-xl text-white">
              Shtëpia juaj, obligimi ynë!
            </p>
            <p className="font-serif text-xl text-white">
              +389 70 848 844
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
