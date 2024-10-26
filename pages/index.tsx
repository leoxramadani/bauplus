// app/page.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'https://baustela.hr/app/uploads/2021/03/skela.png',
    'https://img.linemedia.com/img/s/construction-equipment-scaffolding-Telka-SKELE-SCAFFOLDING-eCHAFAUDAGE-500-m2-BYGGNADSSTaLLNIN---1601365294856496997_big--18022112194681893800.jpg',
    'https://www.saferack.com/wp-content/uploads/2019/06/AdobeStock_201200158-1-1024x683.jpeg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
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
