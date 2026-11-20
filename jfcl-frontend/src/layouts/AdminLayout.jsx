import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Layers,
  CalendarCheck, Award, FileText, Calendar, Image, FileBarChart,
  Settings, LogOut, Menu, X, Shield, Bell, CheckSquare
} from 'lucide-react';
import { DemoBanner } from '../components/common/DemoBanner';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/students', label: 'Students', icon: Users },
    { to: '/admin/teachers', label: 'Teachers', icon: GraduationCap },
    { to: '/admin/academics', label: 'Academic Programs', icon: BookOpen },
    { to: '/admin/classes', label: 'Classes & Sections', icon: Layers },
    { to: '/admin/subjects', label: 'Subjects', icon: BookOpen },
    { to: '/admin/examinations', label: 'Examinations', icon: CalendarCheck },
    { to: '/admin/results', label: 'Result Approvals', icon: Award },
    { to: '/admin/attendance', label: 'Attendance', icon: CheckSquare },
    { to: '/admin/admissions', label: 'Admissions', icon: FileText },
    { to: '/admin/notices', label: 'Notices', icon: Bell },
    { to: '/admin/events', label: 'Events', icon: Calendar },
    { to: '/admin/gallery', label: 'Gallery', icon: Image },
    { to: '/admin/reports', label: 'Reports', icon: FileBarChart },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 flex flex-col ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Brand */}
          <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <img
                src="/logo.jpg"
                alt="JFCL Logo"
                className="w-8 h-8 rounded-lg object-contain bg-white p-0.5"
              />
              <span className="font-bold text-white text-sm tracking-wide">JFCL Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
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
                      : 'hover:bg-slate-800 hover:text-white text-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom user card */}
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-amber-400 uppercase font-mono">Role: Super Admin</p>
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Topbar */}
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-slate-600 hover:text-slate-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-base font-bold text-slate-800 hidden sm:block">
                Institution Administrative Command
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                to="/"
                target="_blank"
                className="text-xs font-semibold text-blue-900 hover:underline hidden sm:inline"
              >
                Visit Public Site ↗
              </Link>
            </div>
          </header>

          {/* Page Body */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
