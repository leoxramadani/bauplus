import nProgress from "nprogress";
import { useContext } from "react";

import {
  LanguageContext,
  defaultLocale,
  locales,
} from "~/lib/contexts/LanguageContext";
import { strings } from "~/lib/i18n";

/**
 * Custom hook to be used for internationalizating strings.
 * 
 * @returns t - Function to be used as: t("stringkey").
 *              Will return translated string if "stringkey" corresponds to a property in chosen langauge's object in ~/lib/i18n/*locale*.ts.
 *              Otherwise will return the corresponding string in fallback locale, in this case "en".
 *              If property "stringkey" doesn't exist in any locale object, 
 *              then the key ("stringkey") itself will be returned and a warning will be logged to the console.
 */
export default function useTranslation() {
  const [locale, setContextLocale] = useContext(LanguageContext);

  function t(key: any) {
    if (!strings[locale][key]) {
      console.error(`No string '${key}' for locale '${locale}'`);
    }

    return strings[locale][key] || strings[defaultLocale][key] || key;
  }

  /** Custom setLocale function to save the selected locale to localStorage
   * so that the locale is saved for the next visit
   */
  const setLocale = (locale: string) => {
    if (!window) return;
    nProgress.start();
    localStorage.setItem("locale", locale);
    //@ts-ignore
    setContextLocale(locale);
    nProgress.done();
  };

  return { t, locale, setLocale };
}
