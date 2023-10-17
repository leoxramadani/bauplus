import {
  PropsWithChildren,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

export const defaultLocale = 'en';
export type locales = 'en' | 'mk' | 'al';

export type LanguageContext = [
  locale: locales,
  setLocale: Dispatch<SetStateAction<locales>>,
];

export const LanguageContext = createContext<LanguageContext>([
  defaultLocale,
  () => defaultLocale,
]);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = useState<locales>(defaultLocale);
  useEffect(() => {
    const value = localStorage.getItem('locale');
    if (value) {
      //@ts-ignore
      setLocale(value);
    } else {
      localStorage.setItem('locale', defaultLocale);
      setLocale(defaultLocale);
    }
  }, []);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
