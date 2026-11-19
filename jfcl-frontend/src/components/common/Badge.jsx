import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    danger: 'bg-rose-100 text-rose-800 border-rose-200'
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
};
