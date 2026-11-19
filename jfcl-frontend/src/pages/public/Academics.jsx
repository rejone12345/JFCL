import React from 'react';
import { BookOpen, Layers, Calendar, CheckCircle } from 'lucide-react';
import { demoClasses, demoSubjects } from '../../data/demoData';

export const Academics = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">ACADEMIC STRUCTURE</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Academic Programs & Curriculum</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Providing NCTB approved education across school and higher secondary collegiate sections with emphasis on sciences and analytic foundations.
        </p>
      </div>

      {/* School vs College Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-900 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">School Section (Class 6 - Class 10)</h2>
              <p className="text-xs text-slate-500">Secondary School Certificate (SSC) preparation</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The school curriculum emphasizes core competencies in language, quantitative analysis, introductory natural sciences and information technology. In Class 9 and 10, students choose their discipline (Science, Business Studies, or Humanities).
          </p>
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Offered Disciplines:</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• <strong>Science:</strong> Physics, Chemistry, Biology, Higher Mathematics</li>
              <li>• <strong>Business Studies:</strong> Accounting, Business Entrepreneurship, Finance & Banking</li>
              <li>• <strong>Humanities:</strong> History, Geography, Civics, Economics</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">College Section (Class 11 - Class 12)</h2>
              <p className="text-xs text-slate-500">Higher Secondary Certificate (HSC) program</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Two-year collegiate program under Dhaka Board designed to bridge secondary school and university education. Includes laboratory experiments, practical examinations and career admission mentoring.
          </p>
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Offered Disciplines:</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• <strong>Science Group:</strong> Physics 1st & 2nd, Chemistry 1st & 2nd, Biology, Higher Math</li>
              <li>• <strong>Commerce Group:</strong> Accounting, Management, Finance, Marketing</li>
              <li>• <strong>Arts Group:</strong> Social Welfare, Civics, Economics, Logic</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Class & Subject Distribution Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Sample Subject Distribution (Secondary Level)</h3>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Subject Code</th>
                <th className="px-6 py-3">Subject Title</th>
                <th className="px-6 py-3">Full Marks</th>
                <th className="px-6 py-3">Passing Marks</th>
                <th className="px-6 py-3">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {demoSubjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono font-medium text-slate-900">{sub.code}</td>
                  <td className="px-6 py-3 font-semibold text-slate-800">{sub.name}</td>
                  <td className="px-6 py-3">{sub.fullMarks}</td>
                  <td className="px-6 py-3">{sub.passMarks}</td>
                  <td className="px-6 py-3">{sub.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Academic Calendar Overview */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-900" />
          <h3 className="text-base font-bold text-slate-900">Academic Calendar Highlights (2026 Session)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="font-bold text-blue-900">First Term / Half-Yearly:</span>
            <p className="text-slate-600 mt-1">Commences June 10, 2026. Concludes June 25, 2026 with result publication on July 5.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="font-bold text-blue-900">Annual & Test Examinations:</span>
            <p className="text-slate-600 mt-1">Commences November 20, 2026. SSC / HSC model tests held in January.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="font-bold text-blue-900">Vacation & Holidays:</span>
            <p className="text-slate-600 mt-1">Summer recess, Eid-ul-Fitr, Eid-ul-Adha, and winter breaks observed as per Government notification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
