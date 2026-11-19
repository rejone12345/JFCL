import React from 'react';
import { BookOpen, Layers, Award } from 'lucide-react';

export const AdminAcademics = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Academic Programs & Board Configuration</h1>
        <p className="text-xs text-slate-500 mt-1">Institutional curriculum tracks, academic wings, and certification programs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-900 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">School Wing (Class 6 - 10)</h2>
              <p className="text-xs text-slate-500">Junior Secondary & SSC Level</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Covers foundational schooling and secondary education. Dhaka Education Board syllabus with focus on Bangla, English, Mathematics, ICT and Sciences.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
            <p><strong>Affiliated Board:</strong> Board of Intermediate and Secondary Education, Dhaka</p>
            <p><strong>Sections:</strong> Science, Business Studies, Humanities</p>
            <p><strong>Grading Formula:</strong> Standard National 5.00 Scale</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">College Wing (Class 11 - 12)</h2>
              <p className="text-xs text-slate-500">Higher Secondary Certificate (HSC)</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Collegiate wing providing rigorous pre-university curriculum with advanced laboratory practical experiments and admission guidance.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
            <p><strong>Affiliated Board:</strong> Board of Intermediate and Secondary Education, Dhaka</p>
            <p><strong>Departments:</strong> Science, Commerce, Arts</p>
            <p><strong>Admissions:</strong> Central Ministry Online System</p>
          </div>
        </div>
      </div>
    </div>
  );
};
