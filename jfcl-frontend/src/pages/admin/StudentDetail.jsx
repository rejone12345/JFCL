import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { demoStudentResults } from '../../data/demoData';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { useToast } from '../../components/common/Toast';
import { ArrowLeft, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react';

export const StudentDetail = () => {
  const { id } = useParams();
  const { addToast } = useToast();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await adminApi.getStudent(id);
        if (active && res.data) {
          setStudent(res.data);
        }
      } catch (err) {
        if (active) addToast(err.message || 'Failed to load student details', 'error');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Link to="/admin/students" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Student Roster
        </Link>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center text-xs text-slate-500">
          Loading student profile...
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="space-y-6">
        <Link to="/admin/students" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Student Roster
        </Link>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center text-xs text-slate-500">
          Student record not found.
        </div>
      </div>
    );
  }

  const results = demoStudentResults[student.studentId || student.id] || null;
  const isActivated = student.isActivated !== false;

  return (
    <div className="space-y-6">
      <Link to="/admin/students" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Student Roster
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <PlaceholderImage label="Student Photo" className="w-32 h-40 rounded-xl shrink-0" />
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="text-[10px] font-mono font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
              Student ID: {student.studentId || student.id}
            </span>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded inline-flex items-center gap-1 ${
                isActivated ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {isActivated ? 'Active (Registered)' : 'Pending Activation'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
          <p className="text-xs font-semibold text-slate-600">
            {student.class || '—'} ({student.section || 'A'}) • Roll: {student.roll || '—'} • {student.group || 'General'} Group
          </p>
          <p className="text-xs text-slate-500">
            Guardian: <strong>{student.guardian || '—'}</strong> • Contact: {student.contact || student.phone || '—'}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1 justify-center sm:justify-start">
            {student.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-900" /> {student.email}
              </span>
            )}
            {(student.contact || student.phone) && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-900" /> {student.contact || student.phone}
              </span>
            )}
            {student.dob && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-900" /> DOB: {student.dob}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Recent Exam Marksheet Record
        </h3>
        {results ? (
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
        ) : (
          <p className="text-xs text-slate-500 py-4">
            No published examination marksheets recorded for this student yet.
          </p>
        )}
      </div>
    </div>
  );
};
