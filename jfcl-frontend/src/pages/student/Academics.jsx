import React from 'react';
import { demoSubjects } from '../../data/demoData';
import { BookOpen } from 'lucide-react';

export const StudentAcademics = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">My Enrolled Curriculum & Subjects</h1>
        <p className="text-xs text-slate-500 mt-1">Class 10 Science Group Syllabus Overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {demoSubjects.map((sub) => (
          <div key={sub.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-9 h-9 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400">CODE: {sub.code}</span>
              <h3 className="text-base font-bold text-slate-900">{sub.name}</h3>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span>Full Marks: {sub.fullMarks}</span>
              <span>Pass Marks: {sub.passMarks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
