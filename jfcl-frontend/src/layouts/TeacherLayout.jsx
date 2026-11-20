import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Layers, BookOpen, Users, CheckSquare,
  Award, Bell, User, LogOut, Menu, X, GraduationCap, Edit3
} from 'lucide-react';
import { DemoBanner } from '../components/common/DemoBanner';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { useAuth } from '../hooks/useAuth';

export const TeacherLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { to: '/teacher/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/teacher/marks-entry', label: 'Marks Entry (Spreadsheet)', icon: Edit3, highlight: true },
    { to: '/teacher/classes', label: 'Assigned Classes', icon: Layers },
    { to: '/teacher/subjects', label: 'My Subjects', icon: BookOpen },
    { to: '/teacher/students', label: 'Student Directory', icon: Users },
    { to: '/teacher/attendance', label: 'Take Attendance', icon: CheckSquare },
    { to: '/teacher/results', label: 'Result Submissions', icon: Award },
    { to: '/teacher/notices', label: 'Faculty Notices', icon: Bell },
    { to: '/teacher/profile', label: 'My Profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      <DemoBanner />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 flex flex-col ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800">
            <Link to="/teacher/dashboard" className="flex items-center gap-2.5">
              <img
                src="/logo.jpg"
                alt="JFCL Logo"
                className="w-8 h-8 rounded-lg object-contain bg-white p-0.5"
              />
              <span className="font-bold text-white text-sm tracking-wide">Teacher Portal</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {menuItems.map((item) => {
              const active = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-blue-800 text-white font-semibold'
                      : item.highlight
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'hover:bg-slate-800 hover:text-white text-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-amber-400' : active ? 'text-blue-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Faculty Member'}</p>
                <p className="text-[10px] text-blue-400 uppercase font-mono">{user?.department || 'Department of Physics'}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-600">
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-base font-bold text-slate-800 hidden sm:block">
                Academic Faculty Evaluation & Mark Entry Portal
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
