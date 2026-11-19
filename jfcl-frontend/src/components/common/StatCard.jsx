import React from 'react';

export const StatCard = ({ title, value, icon: Icon, change, trend = 'up', color = 'blue' }) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100'
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
        {change && (
          <p className={`text-xs mt-1 font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
      {Icon && (
        <div className={`p-3 rounded-lg border ${colorStyles[color] || colorStyles.blue}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
