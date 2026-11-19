import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DemoBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-inner no-print">
      <AlertCircle className="w-4 h-4 shrink-0 text-slate-900" />
      <span>{t('common.demo_mode')}</span>
    </div>
  );
};
