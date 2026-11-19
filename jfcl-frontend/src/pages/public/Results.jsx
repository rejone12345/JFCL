import React, { useState } from 'react';
import { demoStudentResults, demoExams } from '../../data/demoData';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Search, Award, Printer, CheckCircle } from 'lucide-react';

export const Results = () => {
  const [roll, setRoll] = useState('101');
  const [exam, setExam] = useState('Annual Examination 2025');
  const [searchedResult, setSearchedResult] = useState(demoStudentResults['STU1001']);

  const handleSearch = (e) => {
    e.preventDefault();
    if (roll === '101') {
      setSearchedResult(demoStudentResults['STU1001']);
    } else {
      setSearchedResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">PUBLIC PORTAL</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Institutional Result Archive</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enter student roll number and examination session to view published institutional results.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Student Roll Number"
              required
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              placeholder="e.g. 101"
            />
            <Select
              label="Examination"
              options={['Annual Examination 2025', 'SSC Test Examination 2026', 'Half-Yearly Examination 2026']}
              value={exam}
              onChange={(e) => setExam(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" icon={Search} className="w-full">
            Search Marksheet
          </Button>
          <p className="text-[11px] text-slate-500 text-center">
            * Demo Tip: Search with Roll <strong>101</strong> to preview full sample result.
          </p>
        </form>
      </div>

      {/* Result Display */}
      {searchedResult ? (
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase">
                {searchedResult.status}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">{searchedResult.name}</h2>
              <p className="text-xs text-slate-500">
                Class: {searchedResult.class} | Section: {searchedResult.section} | Roll: {searchedResult.roll} | Group: {searchedResult.group}
              </p>
            </div>
            <div className="text-right sm:text-right">
              <p className="text-xs text-slate-500">Grade Point Average</p>
              <h3 className="text-3xl font-extrabold text-blue-900">GPA {searchedResult.gpa}</h3>
              <p className="text-[11px] text-amber-600 font-semibold">Position: {searchedResult.position}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Written</th>
                  <th className="px-4 py-3">MCQ</th>
                  <th className="px-4 py-3">Practical</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {searchedResult.subjects.map((sub) => (
                  <tr key={sub.code} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-mono">{sub.code}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{sub.name}</td>
                    <td className="px-4 py-2.5">{sub.written}</td>
                    <td className="px-4 py-2.5">{sub.mcq}</td>
                    <td className="px-4 py-2.5">{sub.practical}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">{sub.total}</td>
                    <td className="px-4 py-2.5 font-bold text-blue-900">{sub.grade}</td>
                    <td className="px-4 py-2.5 font-bold">{sub.point.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
            >
              <Printer className="w-4 h-4" /> Print Result Sheet
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
          No published result found for roll {roll} in {exam}.
        </div>
      )}
    </div>
  );
};
