import { useTheme } from '@/lib/contexts/ThemeContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Dekorime from './../../../public/decorating.webp';
import IzolimeImg from './../../../public/izolime.webp';
import SkeleImg from './../../../public/scaffolding_pic.png';

function Cards() {
  const { isDarkMode } = useTheme();

  // Intersection observer hooks for tracking visibility of each card
  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [ref3, inView3] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex h-auto w-full flex-col bg-red-300 bg-[url('/metal.png')]">
      <div
        className={`flex w-full flex-row flex-wrap items-center justify-center gap-10  ${
          isDarkMode ? 'bg-transparent' : 'text-slate-100'
        }  py-5 sm:my-[50px] sm:justify-around sm:gap-0 sm:py-0`}
      >
        {/* Card 1 */}
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={inView1 ? 'visible' : 'hidden'}
          variants={cardVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`card1 relative flex h-[180px] w-[300px] flex-row items-center justify-center `}
        >
          <Image
            src={SkeleImg}
            alt="SkeleImg"
            height={80}
            className="rounded-lg"
          />
          <div className="ml-2 flex flex-col justify-center">
            <h1
              className={`text-center font-sans text-[24px] font-medium ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Skele
            </h1>
            <h1
              className={`text-center font-sans font-normal ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Ofrojmë skele shumë praktike dhe me siguri te lartë për
              objektet tuaja
            </h1>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? 'visible' : 'hidden'}
          variants={cardVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`card2 relative flex h-[180px] w-[300px] flex-row items-center justify-center`}
        >
          <Image
            src={IzolimeImg}
            alt="Izolime"
            height={120}
            className="rounded-lg"
          />
          <div className="ml-2 flex flex-col justify-center">
            <h1
              className={`text-center font-sans text-[24px] ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Izolime
            </h1>
            <h1
              className={`text-center font-sans ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Ofrojmë izolime të shtëpive tuaja me standarde europiane
            </h1>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          ref={ref3}
          initial="hidden"
          animate={inView3 ? 'visible' : 'hidden'}
          variants={cardVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`card3 relative flex h-[180px] w-[300px] flex-row items-center justify-center `}
        >
          <Image
            src={Dekorime}
            alt="Dekorime"
            height={140}
            className="rounded-lg"
          />
          <div className="ml-2 flex flex-col justify-center">
            <h1
              className={`text-center font-sans text-[24px] ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Dekorime
            </h1>
            <h1
              className={`text-center font-sans ${
                isDarkMode ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              Ofrojmë dekorime të shtëpive tuaja
            </h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Cards;
