import Image from 'next/image';
import Dekorime from './../../../public/dekorime.jpeg';
import IzolimeImg from './../../../public/izolime.png';
import SkeleImg from './../../../public/skele.png';
function Cards() {
  return (
    <div className="flex h-auto w-full flex-col">
      <h2 className="bg-slate-100 text-center text-[22px]">
        Shërbimet tona
      </h2>
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-10 bg-slate-100 py-5 sm:my-[50px] sm:justify-around sm:gap-0 sm:py-0">
        <div className="relative flex h-[380px] w-[300px] flex-col items-center justify-center rounded-lg shadow-2xl  shadow-slate-400 hover:shadow-zinc-500	 ">
          <Image
            src={SkeleImg}
            alt="SkeleImg"
            objectFit="cover"
            className="rounded-lg"
          />
          <h1 className="text-[20px]">Skele</h1>
          <h1 className="text-center">
            Ofrojmë skele shumë praktike dhe me siguri te lartë për
            objektet tuaja
          </h1>
        </div>
        <div className="relative flex h-[380px] w-[300px] flex-col items-center justify-center rounded-lg  shadow-2xl shadow-slate-400 hover:shadow-zinc-500	">
          <Image
            src={IzolimeImg}
            alt="Izolime"
            objectFit="cover"
            className="rounded-lg"
          />
          <h1 className="text-[20px]">Izolime</h1>
          <h1 className="text-center">
            Ofrojmë izolime të shtëpive tuaja me standarde europiane
          </h1>
        </div>
        <div className="relative flex h-[380px] w-[300px] flex-col items-center justify-center rounded-lg  shadow-2xl shadow-slate-400 hover:shadow-zinc-500	">
          <Image
            src={Dekorime}
            alt="Dekorime"
            objectFit="cover" // To ensure it covers the parent while maintaining aspect ratio
            className="rounded-lg"
          />
          <h1 className="text-[20px]">Dekorime</h1>
          <h1 className="text-center">
            Ofrojmë dekorime të shtëpive tuaja
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Cards;
