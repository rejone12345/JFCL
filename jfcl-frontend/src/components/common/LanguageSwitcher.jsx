import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 transition-colors bg-white text-slate-800"
      title="Toggle Language (English / বাংলা)"
    >
      <Globe className="w-3.5 h-3.5 text-sky-600" />
      <span>{i18n.language === 'en' ? 'বাংলা' : 'English'}</span>
    </button>
  );
};
