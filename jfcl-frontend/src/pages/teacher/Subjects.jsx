import React from 'react';
import { demoSubjects } from '../../data/demoData';
import { BookOpen } from 'lucide-react';

export const TeacherSubjects = () => {
  const teacherSubjects = demoSubjects.filter((s) => ['SUB136', 'SUB137', 'SUB109'].includes(s.id));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">My Teaching Subjects</h1>
        <p className="text-xs text-slate-500 mt-1">Course modules under your instruction for this semester</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {teacherSubjects.map((sub) => (
          <div key={sub.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-900 rounded-xl flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400">CODE: {sub.code}</span>
              <h3 className="text-base font-bold text-slate-900">{sub.name}</h3>
            </div>
            <p className="text-xs text-slate-500">Allocated Level: <strong>{sub.class}</strong></p>
            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100 text-slate-600">
              <span>Full Marks: {sub.fullMarks}</span>
              <span>Pass Marks: {sub.passMarks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
