import { useTheme } from '@/lib/contexts/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import Dekorime from './../../../public/decorating.webp';
import IzolimeImg from './../../../public/izolime.webp';
import SkeleImg from './../../../public/scaffolding.webp';

function Cards() {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex h-auto w-full flex-col ">
      <h2
        className={`mt-[20px] bg-slate-100 text-center font-serif text-[26px] ${
          isDarkMode
            ? 'bg-transparent text-slate-200'
            : 'bg-slate-100 text-slate-600'
        }`}
      >
        Shërbimet tona
      </h2>
      <div
        className={`flex w-full flex-row flex-wrap items-center justify-center gap-10  ${
          isDarkMode ? 'bg-transparent' : 'text-slate-100'
        }  py-5 sm:my-[50px] sm:justify-around sm:gap-0 sm:py-0`}
      >
        <Link href="/Skele">
          <div
            className={`card1 relative flex h-[380px] w-[300px] flex-col items-center justify-center`}
          >
            <Image
              src={SkeleImg}
              alt="SkeleImg"
              objectFit="cover"
              className="rounded-lg"
            />
            <h1
              className={`font-serif text-[24px] ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Skele
            </h1>
            <h1
              className={`text-center font-serif  ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Ofrojmë skele shumë praktike dhe me siguri te lartë për
              objektet tuaja
            </h1>
          </div>
        </Link>
        <Link href="/Izolime">
          <div
            className={`card2 relative flex h-[380px] w-[300px] flex-col items-center justify-center `}
          >
            <Image
              src={IzolimeImg}
              alt="Izolime"
              objectFit="cover"
              className="rounded-lg"
            />
            <h1
              className={`font-serif text-[24px] ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Izolime
            </h1>
            <h1
              className={`text-center font-serif ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Ofrojmë izolime të shtëpive tuaja me standarde europiane
            </h1>
          </div>
        </Link>
        <Link href="/Dekorime">
          <div
            className={`card3 relative flex h-[380px] w-[300px] flex-col items-center justify-center`}
          >
            <Image
              src={Dekorime}
              alt="Dekorime"
              objectFit="cover"
              className="rounded-lg"
            />
            <h1
              className={`font-serif text-[24px] ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Dekorime
            </h1>
            <h1
              className={`text-center font-serif ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Ofrojmë dekorime të shtëpive tuaja
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Cards;
