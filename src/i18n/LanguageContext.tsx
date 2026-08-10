import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "./translations";

type Language = "EN" | "AR";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    // Update global direction and lang attributes
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
    document.documentElement.lang = language === "AR" ? "ar" : "en";
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = translations[language];
    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation missing for key: ${key} in lang: ${language}`);
        return key;
      }
      current = current[k];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
