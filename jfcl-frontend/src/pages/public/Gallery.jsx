import React, { useState } from 'react';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';

export const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Campus', 'Sports', 'Labs', 'Cultural', 'Academic'];

  const items = [
    { id: 1, title: 'Main Institutional Academic Building', category: 'Campus' },
    { id: 2, title: 'Annual Sports Parade & Flag Hoisting', category: 'Sports' },
    { id: 3, title: 'Senior Physics Practical Laboratory', category: 'Labs' },
    { id: 4, title: 'Victory Day Cultural Drama Performance', category: 'Cultural' },
    { id: 5, title: 'Chemistry Analytical Lab Session', category: 'Labs' },
    { id: 6, title: 'Inter-College Football Final', category: 'Sports' },
    { id: 7, title: 'Annual Science Fair Exhibition', category: 'Academic' },
    { id: 8, title: 'Computer Information Center Workstations', category: 'Labs' },
    { id: 9, title: 'Campus Green Boulevard & Playground', category: 'Campus' },
  ];

  const filtered = filter === 'All' ? items : items.filter((i) => i.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">VISUAL ARCHIVE</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Campus Photo Gallery</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Glimpses of academic life, campus infrastructure, sports competitions, and cultural celebrations.
        </p>
      </div>

      <div className="flex justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === c
                ? 'bg-blue-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <PlaceholderImage label={item.title} className="h-52 w-full rounded-none" />
            <div className="p-4">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">
                {item.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
