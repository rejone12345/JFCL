import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { CheckSquare, Users, AlertTriangle } from 'lucide-react';
import { demoClasses } from '../../data/demoData';

export const AdminAttendance = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Institution Attendance Intelligence</h1>
        <p className="text-xs text-slate-500 mt-1">Cross-sectional attendance monitoring and absentee reporting</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Overall Attendance Today" value="95.2%" icon={CheckSquare} color="emerald" change="+1.2% vs yesterday" />
        <StatCard title="Total Students Present" value="1,352" icon={Users} color="blue" />
        <StatCard title="Absentees Reported" value="68" icon={AlertTriangle} color="amber" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Class Name</th>
              <th className="px-6 py-3">Enrolled Count</th>
              <th className="px-6 py-3">Present Today</th>
              <th className="px-6 py-3">Absent</th>
              <th className="px-6 py-3 text-right">Attendance Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {demoClasses.map((c) => {
              const present = Math.round(c.studentsCount * 0.95);
              const absent = c.studentsCount - present;
              return (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold text-slate-900">{c.name}</td>
                  <td className="px-6 py-3">{c.studentsCount}</td>
                  <td className="px-6 py-3 text-emerald-700 font-bold">{present}</td>
                  <td className="px-6 py-3 text-rose-600 font-bold">{absent}</td>
                  <td className="px-6 py-3 text-right font-mono font-bold text-blue-900">
                    {((present / c.studentsCount) * 100).toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
