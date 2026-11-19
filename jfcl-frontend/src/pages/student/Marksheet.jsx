import React, { useRef } from 'react';
import { demoStudentResults } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { Printer, Download, Award, GraduationCap, CheckCircle } from 'lucide-react';

export const StudentMarksheet = () => {
  const result = demoStudentResults['STU1001'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top action toolbar (hidden on print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Official Academic Transcript & Marksheet</h1>
          <p className="text-xs text-slate-500 mt-1">Official printable A4 institutional progress report</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" icon={Printer} onClick={handlePrint}>
            Print Official Marksheet
          </Button>
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div className="max-w-[850px] mx-auto bg-white border border-slate-300 p-8 sm:p-12 shadow-md print:shadow-none print:border-none print:p-0 print:m-0 print:w-full">
        {/* Institutional Header */}
        <div className="text-center border-b-2 border-blue-950 pb-4 space-y-1">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-950 text-amber-400 rounded-lg flex items-center justify-center font-bold">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-blue-950 tracking-tight uppercase">
                JFCL School & College
              </h2>
              <p className="text-[11px] font-semibold text-slate-700 tracking-wide">
                Jamuna Fertilizer Campus, Sarishabari, Jamalpur, Bangladesh
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                EIIN: 109823 • Institution Code: 4920 • Board: Dhaka
              </p>
            </div>
          </div>
          <div className="inline-block bg-blue-950 text-white px-6 py-1 rounded text-xs font-bold uppercase tracking-widest mt-1">
            Academic Transcript / Marksheet
          </div>
          <p className="text-xs font-bold text-slate-800 pt-1">
            {result.exam} — Session {result.session}
          </p>
        </div>

        {/* Student Bio & Exam Meta */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
          <div className="space-y-1">
            <p><span className="text-slate-500 font-medium">Student Name:</span> <strong className="text-slate-900 font-bold">{result.name}</strong></p>
            <p><span className="text-slate-500 font-medium">Student ID:</span> <strong className="font-mono text-slate-900">{result.studentId}</strong></p>
            <p><span className="text-slate-500 font-medium">Class & Section:</span> <strong className="text-slate-900">{result.class} ({result.section})</strong></p>
            <p><span className="text-slate-500 font-medium">Study Group:</span> <strong className="text-slate-900">{result.group}</strong></p>
          </div>
          <div className="space-y-1 text-right sm:text-right">
            <p><span className="text-slate-500 font-medium">Class Roll:</span> <strong className="font-mono text-slate-900">{result.roll}</strong></p>
            <p><span className="text-slate-500 font-medium">Merit Position:</span> <strong className="text-blue-900 font-bold">{result.position}</strong></p>
            <p><span className="text-slate-500 font-medium">Grade Point Average:</span> <strong className="text-emerald-700 font-black text-sm">GPA {result.gpa}</strong></p>
            <p><span className="text-slate-500 font-medium">Final Result:</span> <strong className="text-emerald-700 font-bold uppercase">{result.status}</strong></p>
          </div>
        </div>

        {/* Grading Scale Reference */}
        <div className="py-2.5 my-2 bg-slate-50 border border-slate-200 rounded text-[9px] text-slate-600 flex justify-around text-center">
          <div><strong>80 - 100:</strong> A+ (5.00)</div>
          <div><strong>70 - 79:</strong> A (4.00)</div>
          <div><strong>60 - 69:</strong> A- (3.50)</div>
          <div><strong>50 - 59:</strong> B (3.00)</div>
          <div><strong>40 - 49:</strong> C (2.00)</div>
          <div><strong>33 - 39:</strong> D (1.00)</div>
          <div><strong>0 - 32:</strong> F (0.00)</div>
        </div>

        {/* Academic Marks Table */}
        <div className="mt-3">
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 font-bold text-slate-800 border-b border-slate-300 text-[11px]">
              <tr>
                <th className="p-2 border-r border-slate-300 w-12 text-center">Code</th>
                <th className="p-2 border-r border-slate-300">Name of Subjects</th>
                <th className="p-2 border-r border-slate-300 text-center w-16">Written</th>
                <th className="p-2 border-r border-slate-300 text-center w-16">MCQ</th>
                <th className="p-2 border-r border-slate-300 text-center w-16">Prac</th>
                <th className="p-2 border-r border-slate-300 text-center w-16">Total</th>
                <th className="p-2 border-r border-slate-300 text-center w-16">Grade</th>
                <th className="p-2 text-center w-16">Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {result.subjects.map((sub) => (
                <tr key={sub.code}>
                  <td className="p-2 border-r border-slate-200 text-center font-mono text-[11px]">{sub.code}</td>
                  <td className="p-2 border-r border-slate-200 font-medium">{sub.name}</td>
                  <td className="p-2 border-r border-slate-200 text-center">{sub.written}</td>
                  <td className="p-2 border-r border-slate-200 text-center">{sub.mcq}</td>
                  <td className="p-2 border-r border-slate-200 text-center">{sub.practical}</td>
                  <td className="p-2 border-r border-slate-200 text-center font-bold">{sub.total}</td>
                  <td className="p-2 border-r border-slate-200 text-center font-bold text-blue-900">{sub.grade}</td>
                  <td className="p-2 text-center font-mono font-bold">{sub.point.toFixed(2)}</td>
                </tr>
              ))}
              {/* Summary Row */}
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                <td colSpan="5" className="p-2 border-r border-slate-300 text-right pr-4 uppercase text-[11px]">
                  Total Obtained Marks & GPA:
                </td>
                <td className="p-2 border-r border-slate-300 text-center text-blue-950 font-black">
                  {result.totalMarks}
                </td>
                <td className="p-2 border-r border-slate-300 text-center text-emerald-700 font-black">
                  A+
                </td>
                <td className="p-2 text-center font-mono text-emerald-700 font-black">
                  {result.gpa}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Remarks and Signatures */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <p><strong>Remarks:</strong> Outstanding academic performance. Passed with Distinction.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-16 text-center text-xs">
          <div>
            <div className="border-t border-slate-800 pt-1 font-semibold text-slate-800">
              Prepared by / Class Teacher
            </div>
          </div>
          <div>
            <div className="border-t border-slate-800 pt-1 font-semibold text-slate-800">
              Exam Controller
            </div>
          </div>
          <div>
            <div className="border-t border-slate-800 pt-1 font-semibold text-slate-800">
              Principal Signature & Seal
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 text-[9px] text-slate-400 text-center">
          Computer generated official transcript. Date of Issue: 2026-11-19 • JFCL Academic Portal
        </div>
      </div>
    </div>
  );
};
