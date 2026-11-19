import React from 'react';
import { demoClasses } from '../../data/demoData';
import { Layers, Users, BookOpen } from 'lucide-react';

export const TeacherClasses = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">My Assigned Classes</h1>
        <p className="text-xs text-slate-500 mt-1">Classes allocated to Dr. Shamsun Nahar for Session 2026</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {demoClasses.slice(3, 7).map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
            <p className="text-xs text-slate-500">Enrolled Students: <strong>{c.studentsCount}</strong></p>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-600">Active Sections:</p>
              <div className="flex gap-1.5 flex-wrap mt-1">
                {c.sections.map((sec) => (
                  <span key={sec} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
