import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Search records...', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 shadow-sm"
      />
    </div>
  );
};
