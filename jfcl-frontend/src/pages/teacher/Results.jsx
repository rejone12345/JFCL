import React from 'react';
import { demoResultSubmissions } from '../../data/demoData';
import { Award, CheckCircle2, Clock } from 'lucide-react';

export const TeacherResults = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Marksheet & Result Submissions</h1>
        <p className="text-xs text-slate-500 mt-1">Review the publication and administrative approval status of your submitted grade sheets</p>
      </div>

      <div className="space-y-4">
        {demoResultSubmissions.map((sub) => (
          <div key={sub.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400">SUBMISSION ID: {sub.id}</span>
              <h3 className="text-base font-bold text-slate-900">{sub.subject} — {sub.class} ({sub.section})</h3>
              <p className="text-xs text-slate-500">{sub.exam} • Submitted on {sub.date}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                sub.status === 'Published'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : sub.status === 'Pending Approval'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}>
                {sub.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
