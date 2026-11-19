import React from 'react';
import { demoStudentResults } from '../../data/demoData';
import { Link } from 'react-router-dom';
import { Printer, Award } from 'lucide-react';

export const StudentResults = () => {
  const result = demoStudentResults['STU1001'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Term Results & Academic History</h1>
          <p className="text-xs text-slate-500 mt-1">Review your marks, grades, and grade point average across exams</p>
        </div>
        <Link
          to="/student/marksheets"
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg text-xs shadow inline-flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Open Printable Marksheet
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{result.exam}</h3>
            <p className="text-xs text-slate-500">Session: {result.session}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-emerald-700">GPA {result.gpa}</span>
            <p className="text-[11px] font-bold text-blue-900">Merit: {result.position}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Subject Name</th>
                <th className="p-3 text-center">Written</th>
                <th className="p-3 text-center">MCQ</th>
                <th className="p-3 text-center">Practical</th>
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center">Grade</th>
                <th className="p-3 text-center">Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {result.subjects.map((s) => (
                <tr key={s.code}>
                  <td className="p-3 font-mono">{s.code}</td>
                  <td className="p-3 font-semibold">{s.name}</td>
                  <td className="p-3 text-center">{s.written}</td>
                  <td className="p-3 text-center">{s.mcq}</td>
                  <td className="p-3 text-center">{s.practical}</td>
                  <td className="p-3 text-center font-bold text-slate-900">{s.total}</td>
                  <td className="p-3 text-center font-bold text-blue-900">{s.grade}</td>
                  <td className="p-3 text-center font-mono font-bold">{s.point.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
