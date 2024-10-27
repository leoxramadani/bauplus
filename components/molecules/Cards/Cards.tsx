import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Dekorime from './../../../public/decorating.webp';
import IzolimeImg from './../../../public/izolime.webp';
import SkeleImg from './../../../public/scaffolding.webp';

function Cards() {
  const divRef = useRef<HTMLDivElement | null>(null);

  const [visibleCards, setVisibleCards] = useState([
    false,
    false,
    false,
  ]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setVisibleCards((prev) => {
            const newVisibleCards = [...prev];
            newVisibleCards[index] = true;
            return newVisibleCards;
          });
          observer.unobserve(entry.target);
        }
      });
    });

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Trigger the click on component mount (or conditionally based on your needs)
    if (divRef.current) {
      divRef.current.click();
    }
  }, []);

  return (
    <div
      className="flex h-auto w-full flex-col"
      ref={divRef}
      onClick={() => console.log('test')}
    >
      <h2 className="text-slate-60 mt-[20px] bg-slate-100 text-center font-serif text-[26px] text-slate-600">
        Shërbimet tona
      </h2>
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-10 bg-slate-100 py-5 sm:my-[50px] sm:justify-around sm:gap-0 sm:py-0">
        <Link href="/Skele">
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className={`card1 relative flex h-[380px] w-[300px] flex-col items-center justify-center rounded-lg shadow-2xl shadow-slate-400 hover:shadow-zinc-500 ${
              visibleCards[0] ? 'visible' : ''
            }`}
          >
            <Image
              src={SkeleImg}
              alt="SkeleImg"
              objectFit="cover"
              className="rounded-lg"
            />
            <h1 className="font-serif text-[24px] text-slate-600">
              Skele
            </h1>
            <h1 className="text-center font-serif text-slate-600">
              Ofrojmë skele shumë praktike dhe me siguri te lartë për
              objektet tuaja
            </h1>
          </div>
        </Link>
        <Link href="/Izolime">
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className={`card2 relative flex h-[380px] w-[300px] flex-col items-center justify-center rounded-lg shadow-2xl shadow-slate-400 hover:shadow-zinc-500 ${
              visibleCards[1] ? 'visible' : ''
            }`}
          >
            <Image
              src={IzolimeImg}
              alt="Izolime"
              objectFit="cover"
              className="rounded-lg"
            />
            <h1 className="font-serif text-[24px] text-slate-600">
              Izolime
            </h1>
            <h1 className="text-center font-serif text-slate-600">
              Ofrojmë izolime të shtëpive tuaja me standarde europiane
            </h1>
          </div>
        </Link>
        <Link href="/Dekorime">
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className={`card3 relative flex h-[380px] w-[300px] flex-col items-center justify-center rounded-lg shadow-2xl shadow-slate-400 hover:shadow-zinc-500 ${
              visibleCards[2] ? 'visible' : ''
            }`}
          >
            <Image
              src={Dekorime}
              alt="Dekorime"
              objectFit="cover"
              className="rounded-lg"
            />
            <h1 className="font-serif text-[24px] text-slate-600">
              Dekorime
            </h1>
            <h1 className="text-center font-serif text-slate-600">
              Ofrojmë dekorime të shtëpive tuaja
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Cards;
