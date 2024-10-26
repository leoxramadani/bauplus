// app/page.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleIntersection = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.muted = false;
          videoElement.play().catch((error) => {
            console.log('Autoplay prevented on iOS:', error);
          });
        } else {
          videoElement.muted = true;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative h-screen">
        <video
          ref={videoRef}
          src="enisvideo.MP4"
          autoPlay
          loop
          muted
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
