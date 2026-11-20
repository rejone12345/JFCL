import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { Mail, Phone, GraduationCap, Award, ShieldCheck } from 'lucide-react';

export const TeacherProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <PlaceholderImage label="Faculty Photo" className="w-32 h-40 rounded-xl shrink-0" />
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md">
              Teacher ID: {user?.teacherId || user?.id || 'TCH-CURRENT'}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Faculty Member
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{user?.name || 'Faculty Member'}</h1>
          <p className="text-xs font-semibold text-slate-600">
            {user?.designation || 'Instructor'} • Department of {user?.department || 'Academics'}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 justify-center sm:justify-start">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-900" /> {user?.email || 'email@jfcl.edu.bd'}
            </span>
            {user?.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-900" /> {user.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-900" /> Educational Qualifications
          </h3>
          <p className="text-xs text-slate-600">
            {user?.qualification || 'M.Sc / Ph.D in Subject Area'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" /> Institutional Status
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• <strong>Account Status:</strong> Active</li>
            <li>• <strong>System Role:</strong> Certified Faculty (Teacher)</li>
            <li>• <strong>Institution:</strong> JFCL School & College</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
