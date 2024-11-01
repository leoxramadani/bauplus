import { useTheme } from '@/lib/contexts/ThemeContext';

function WhyUs() {
  const { isDarkMode } = useTheme();

  return (
    <div>
      <div className="mt-[70px] flex h-auto w-full flex-col items-center justify-center  px-[20px] sm:px-[20px]">
        <p
          className={`text-center font-serif text-[26px]   ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          } `}
        >
          Pse të zgjidhni BAUplus ?
        </p>

        <div className="w-[100%] sm:w-[50%]">
          <p
            className={`text-center font-serif ${
              isDarkMode ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            Zgjedhja e kompanisë sonë për shërbiminet tona do të thotë
            që po investoni në cilësi, siguri dhe profesionalizëm. Ne
            jemi të angazhuar për të ofruar shërbime që tejkalojnë
            pritshmëritë tuaja dhe që ndihmojnë në realizimin e
            projekteve tuaja me sukses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
