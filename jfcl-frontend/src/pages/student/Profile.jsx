import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { studentApi } from '../../services/api';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { User, Phone, Mail, Shield, Calendar } from 'lucide-react';

export const StudentProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    let active = true;
    studentApi
      .getProfile()
      .then((res) => {
        if (active && res.data) setProfile(res.data);
      })
      .catch(() => {
        // Fallback to auth context user
      });
    return () => {
      active = false;
    };
  }, []);

  const current = profile || user || {};

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <PlaceholderImage label="Student Photo" className="w-32 h-40 rounded-xl shrink-0" />
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">
            Student ID: {current.studentId || current.id || 'STU-PORTAL'}
          </span>
          <h1 className="text-2xl font-bold text-slate-900">{current.name || 'Student'}</h1>
          <p className="text-xs font-semibold text-slate-600">
            {current.class || '—'} ({current.section || 'A'}) • Roll: {current.roll || '—'} • {current.group || 'General'}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 justify-center sm:justify-start">
            {current.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {current.email}
              </span>
            )}
            {(current.contact || current.phone) && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> {current.contact || current.phone}
              </span>
            )}
            {current.dob && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> DOB: {current.dob}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-900" /> Guardian & Family Details
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• <strong>Father / Guardian:</strong> {current.guardian || 'Not specified'}</li>
            <li>• <strong>Emergency Contact:</strong> {current.contact || current.phone || 'Not specified'}</li>
            <li>• <strong>Email Address:</strong> {current.email || 'Not specified'}</li>
            {current.dob && <li>• <strong>Date of Birth:</strong> {current.dob}</li>}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" /> Academic Enrollment Info
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• <strong>Academic Session:</strong> 2026</li>
            <li>• <strong>Class & Section:</strong> {current.class || '—'} ({current.section || 'A'})</li>
            <li>• <strong>Academic Group:</strong> {current.group || 'General'}</li>
            <li>• <strong>Student Status:</strong> Regular ({current.status || 'Active'})</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
