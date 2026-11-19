import React from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '../../components/common/StatCard';
import { demoClasses, demoSubjects, demoResultSubmissions, demoNotices } from '../../data/demoData';
import { Layers, BookOpen, Edit3, Award, Users, CheckSquare, Bell, ArrowRight } from 'lucide-react';

export const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold">Welcome back, Dr. Shamsun Nahar</h1>
          <p className="text-xs text-blue-200 mt-1">Senior Teacher, Department of Physics • Academic Session 2026</p>
        </div>
        <Link
          to="/teacher/marks-entry"
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shadow inline-flex items-center gap-2"
        >
          <Edit3 className="w-4 h-4" /> Go to Marks Entry
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Classes" value="4 Classes" icon={Layers} color="blue" />
        <StatCard title="Teaching Subjects" value="3 Subjects" icon={BookOpen} color="purple" />
        <StatCard title="Total Students" value="210 Students" icon={Users} color="emerald" />
        <StatCard title="Submissions Pending" value="1 Exam" icon={Award} color="amber" />
      </div>

      {/* Quick shortcuts & submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">My Result Submissions</h3>
            <Link to="/teacher/results" className="text-xs font-semibold text-blue-900 hover:underline">
              View All Submissions →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {demoResultSubmissions.map((sub) => (
              <div key={sub.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{sub.subject} — {sub.class} ({sub.section})</h4>
                  <p className="text-[11px] text-slate-500">{sub.exam} • Submitted: {sub.date}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  sub.status === 'Published'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : sub.status === 'Pending Approval'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Faculty Notices</h3>
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
