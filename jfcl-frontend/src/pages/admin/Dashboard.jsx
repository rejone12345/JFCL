import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '../../components/common/StatCard';
import {
  Users, GraduationCap, Award, FileText, CheckSquare,
  Bell, Calendar, ArrowRight, Shield, Layers, BookOpen
} from 'lucide-react';
import { adminApi } from '../../services/api';
import { demoStats, demoAdmissions, demoResultSubmissions, demoNotices } from '../../data/demoData';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(demoStats);

  useEffect(() => {
    let active = true;
    adminApi
      .getStats()
      .then((res) => {
        if (active && res.data) {
          setStats((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {
        // fallback to default stats
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30">
            Command Center
          </span>
          <h1 className="text-xl font-bold mt-1">JFCL Institutional Management System</h1>
          <p className="text-xs text-slate-300 mt-0.5">Session 2026 • Affiliated with Dhaka Education Board • EIIN: 109823</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/admin/results"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shadow"
          >
            Review Result Submissions
          </Link>
          <Link
            to="/admin/admissions"
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs shadow"
          >
            New Admissions
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Enrolled Students" value={stats.totalStudents} icon={Users} color="blue" change="Live Roster" />
        <StatCard title="Faculty Members" value={stats.totalTeachers} icon={GraduationCap} color="purple" change="Active Faculty" />
        <StatCard title="Board Pass Rate" value={stats.passRate} icon={Award} color="emerald" change="Historic High" />
        <StatCard title="Pending Admissions" value="14 Applications" icon={FileText} color="amber" />
      </div>

      {/* Main Grid: Pending Results & Admissions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Result Submissions Approval Queue */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Teacher Mark Submissions Approval Queue
            </h3>
            <Link to="/admin/results" className="text-xs font-semibold text-blue-900 hover:underline">
              Manage All →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {demoResultSubmissions.map((sub) => (
              <div key={sub.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{sub.subject} — {sub.class} ({sub.section})</h4>
                  <p className="text-[11px] text-slate-500">Teacher: {sub.teacher} • {sub.exam}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    sub.status === 'Published'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {sub.status}
                  </span>
                  <Link
                    to="/admin/results"
                    className="text-xs font-semibold text-blue-900 hover:text-blue-700 bg-slate-100 px-2 py-1 rounded"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Admission Applications */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Recent Admissions</h3>
            <Link to="/admin/admissions" className="text-xs font-semibold text-blue-900 hover:underline">
              View All →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {demoAdmissions.map((adm) => (
              <div key={adm.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{adm.applicantName}</h4>
                  <p className="text-[11px] text-slate-500">{adm.appliedClass} • {adm.contact}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  adm.status === 'Approved'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : adm.status === 'Pending'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {adm.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
