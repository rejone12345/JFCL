import React from 'react';

export const Input = ({
  label,
  error,
  type = 'text',
  className = '',
  required = false,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 mb-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        required={required}
        className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900 disabled:bg-slate-100 ${
          error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
};
