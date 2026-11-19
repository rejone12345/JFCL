import React from 'react';
import { CheckSquare } from 'lucide-react';

export const StudentAttendance = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Attendance History</h1>
        <p className="text-xs text-slate-500 mt-1">Monthly presence record and compliance statistics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Total Working Days</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">110 Days</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Days Present</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">104 Days</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
          <p className="text-xs text-slate-500 font-semibold uppercase">Overall Attendance</p>
          <h3 className="text-2xl font-bold text-blue-900 mt-1">94.5%</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Daily Logs</h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
            <span>2026-11-19 (Thursday)</span>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Present</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
            <span>2026-11-18 (Wednesday)</span>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Present</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
            <span>2026-11-17 (Tuesday)</span>
            <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Late (10 mins)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
            <span>2026-11-16 (Monday)</span>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Present</span>
          </div>
        </div>
      </div>
    </div>
  );
};
