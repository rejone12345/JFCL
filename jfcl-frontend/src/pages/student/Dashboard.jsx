import React from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '../../components/common/StatCard';
import { Award, BookOpen, CheckSquare, Bell, Printer, ArrowRight } from 'lucide-react';
import { demoStudentResults, demoNotices } from '../../data/demoData';

export const StudentDashboard = () => {
  const result = demoStudentResults['STU1001'];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold">Welcome, {result.name}</h1>
          <p className="text-xs text-blue-200 mt-1">Class: {result.class} ({result.section}) • Roll: {result.roll} • Science Group</p>
        </div>
        <Link
          to="/student/marksheets"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shadow inline-flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> View Official Marksheet
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Latest Term GPA" value={`GPA ${result.gpa}`} icon={Award} color="emerald" change="Outstanding" />
        <StatCard title="Class Position" value={result.position} icon={Award} color="purple" />
        <StatCard title="Enrolled Subjects" value="9 Subjects" icon={BookOpen} color="blue" />
        <StatCard title="Attendance Rate" value="94.5%" icon={CheckSquare} color="amber" change="+2.1% this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Exam Performance Breakdown</h3>
            <Link to="/student/results" className="text-xs font-semibold text-blue-900 hover:underline">
              Detailed Result Sheet →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Code</th>
                  <th className="p-2.5">Subject</th>
                  <th className="p-2.5 text-center">Total</th>
                  <th className="p-2.5 text-center">Grade</th>
                  <th className="p-2.5 text-center">Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {result.subjects.slice(0, 5).map((s) => (
                  <tr key={s.code}>
                    <td className="p-2.5 font-mono">{s.code}</td>
                    <td className="p-2.5 font-medium">{s.name}</td>
                    <td className="p-2.5 text-center font-bold">{s.total}</td>
                    <td className="p-2.5 text-center font-bold text-blue-900">{s.grade}</td>
                    <td className="p-2.5 text-center font-mono">{s.point.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Latest Announcements</h3>
          <div className="space-y-3">
            {demoNotices.slice(0, 3).map((n) => (
              <div key={n.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-blue-900 block">{n.date}</span>
                <h4 className="text-xs font-semibold text-slate-800 mt-0.5">{n.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
