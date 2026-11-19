import React from 'react';
import { demoNotices } from '../../data/demoData';
import { Bell, Calendar, Download } from 'lucide-react';

export const TeacherNotices = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Faculty & Institutional Notices</h1>
        <p className="text-xs text-slate-500 mt-1">Administrative announcements, meeting agendas, and examination memos</p>
      </div>

      <div className="space-y-4">
        {demoNotices.map((n) => (
          <div key={n.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                {n.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {n.date}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{n.title}</h3>
            <p className="text-xs text-slate-600">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
