import React from 'react';

export const Select = ({
  label,
  options = [],
  error,
  required = false,
  className = '',
  id,
  placeholder = 'Select an option...',
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700 mb-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        required={required}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900 ${
          error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' : ''
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
};
