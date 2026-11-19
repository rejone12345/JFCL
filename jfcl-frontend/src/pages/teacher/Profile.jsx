import React from 'react';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { Button } from '../../components/common/Button';
import { Mail, Phone, BookOpen, GraduationCap, Award } from 'lucide-react';

export const TeacherProfile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <PlaceholderImage label="Faculty Photo" className="w-32 h-40 rounded-xl shrink-0" />
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Teacher ID: TCH004
          </span>
          <h1 className="text-2xl font-bold text-slate-900">Dr. Shamsun Nahar</h1>
          <p className="text-xs font-semibold text-slate-600">Senior Teacher • Department of Physics</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 justify-center sm:justify-start">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> shamsun@jfcl.edu.bd</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> 01711122334</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-900" /> Educational Qualifications
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• <strong>Ph.D in Physics:</strong> University of Dhaka (2014)</li>
            <li>• <strong>M.Sc in Physics:</strong> First Class, University of Dhaka (2006)</li>
            <li>• <strong>B.Sc (Hons) in Physics:</strong> First Class, University of Dhaka (2005)</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" /> Academic Responsibilities
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• Head of Science Club & Annual Science Fair Coordinator</li>
            <li>• Chief Laboratory In-Charge (Physics Wing)</li>
            <li>• Member, Institutional Examination Committee</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
