import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { demoStudents, demoStudentResults } from '../../data/demoData';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { ArrowLeft, User, Phone, Mail, Award, BookOpen } from 'lucide-react';

export const StudentDetail = () => {
  const { id } = useParams();
  const student = demoStudents.find((s) => s.id === id) || demoStudents[0];
  const results = demoStudentResults[student.id] || demoStudentResults['STU1001'];

  return (
    <div className="space-y-6">
      <Link to="/admin/students" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Student Roster
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <PlaceholderImage label="Student Photo" className="w-32 h-40 rounded-xl shrink-0" />
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Student ID: {student.id}
          </span>
          <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
          <p className="text-xs font-semibold text-slate-600">
            {student.class} ({student.section}) • Roll: {student.roll} • {student.group} Group
          </p>
          <p className="text-xs text-slate-500">
            Guardian: <strong>{student.guardian}</strong> • Contact: {student.contact}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Recent Exam Marksheet Record
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Code</th>
                <th className="p-2.5">Subject</th>
                <th className="p-2.5 text-center">Written</th>
                <th className="p-2.5 text-center">MCQ</th>
                <th className="p-2.5 text-center">Practical</th>
                <th className="p-2.5 text-center">Total</th>
                <th className="p-2.5 text-center">Grade</th>
                <th className="p-2.5 text-center">Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.subjects.map((sub) => (
                <tr key={sub.code}>
                  <td className="p-2.5 font-mono">{sub.code}</td>
                  <td className="p-2.5 font-medium">{sub.name}</td>
                  <td className="p-2.5 text-center">{sub.written}</td>
                  <td className="p-2.5 text-center">{sub.mcq}</td>
                  <td className="p-2.5 text-center">{sub.practical}</td>
                  <td className="p-2.5 text-center font-bold text-slate-900">{sub.total}</td>
                  <td className="p-2.5 text-center font-bold text-blue-900">{sub.grade}</td>
                  <td className="p-2.5 text-center font-mono">{sub.point.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
