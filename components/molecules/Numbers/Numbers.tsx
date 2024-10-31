import HouseIcon from '@mui/icons-material/House';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function Numbers() {
  const [clients, setClients] = useState<number>(0);
  const [projects, setProjects] = useState<number>(0);
  const [objects, setObjects] = useState<number>(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    console.log('In view:', inView);
    if (inView) {
      const countUp = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        target: number
      ) => {
        let count = 0;
        const interval = setInterval(() => {
          if (count < target) {
            count += Math.ceil(target / 100);
            setter(count);
          } else {
            setter(target);
            clearInterval(interval);
          }
        }, 20);

        return () => clearInterval(interval);
      };

      countUp(setClients, 120);
      countUp(setProjects, 85);
      countUp(setObjects, 35);
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="flex flex-col items-center justify-around p-10"
    >
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-slate-600">
            {clients}+
          </div>
          <div className="text-lg text-slate-600">
            <SentimentSatisfiedAltIcon /> Klientë të kënaqur
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-slate-600">
            {projects}+
          </div>
          <div className="text-lg text-slate-600">
            <HouseIcon />
            Shtëpi private
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-slate-600">
            {objects}+
          </div>
          <div className="text-lg text-slate-600">
            <StorefrontIcon /> Objekte publike
          </div>
        </div>
      </div>

      <style jsx>{`
        section {
          opacity: 1;
          transform: translateY(20px);
          transition:
            opacity 0.5s ease,
            transform 0.5s ease;
        }

        section.in-view {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

export default Numbers;
