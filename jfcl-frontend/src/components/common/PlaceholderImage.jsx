import React from 'react';
import { Image } from 'lucide-react';

export const PlaceholderImage = ({ label = 'Photo Placeholder', className = 'h-48 w-full', textClass = 'text-xs' }) => {
  return (
    <div className={`bg-slate-200 border border-dashed border-slate-300 rounded flex flex-col items-center justify-center text-slate-500 p-4 select-none ${className}`}>
      <Image className="w-8 h-8 opacity-40 mb-1" />
      <span className={`font-medium tracking-wide uppercase opacity-70 ${textClass}`}>{label}</span>
    </div>
  );
};
