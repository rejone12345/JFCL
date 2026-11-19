import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { Award, FileBarChart, Users, TrendingUp } from 'lucide-react';
import { demoClasses } from '../../data/demoData';

export const AdminReports = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Academic Analytics & Institutional Reports</h1>
        <p className="text-xs text-slate-500 mt-1">Aggregated examination metrics, pass ratios, and annual progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Overall Board Pass Rate" value="98.6%" icon={Award} color="emerald" change="+1.4% vs 2024" />
        <StatCard title="GPA 5.00 Count" value="312 Students" icon={TrendingUp} color="blue" />
        <StatCard title="Enrollment Growth" value="+8.2%" icon={Users} color="purple" />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Batch-wise Academic Result Summary (Annual Exam 2025)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Class Level</th>
                <th className="px-6 py-3">Examinees</th>
                <th className="px-6 py-3">Passed</th>
                <th className="px-6 py-3">Failed</th>
                <th className="px-6 py-3">GPA 5.00</th>
                <th className="px-6 py-3 text-right">Pass Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {demoClasses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-semibold text-slate-900">{c.name}</td>
                  <td className="px-6 py-3">{c.studentsCount}</td>
                  <td className="px-6 py-3 text-emerald-700 font-bold">{Math.round(c.studentsCount * 0.98)}</td>
                  <td className="px-6 py-3 text-rose-600 font-bold">{Math.round(c.studentsCount * 0.02)}</td>
                  <td className="px-6 py-3 font-bold text-blue-900">{Math.round(c.studentsCount * 0.22)}</td>
                  <td className="px-6 py-3 text-right font-mono font-bold text-emerald-700">98.0%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
