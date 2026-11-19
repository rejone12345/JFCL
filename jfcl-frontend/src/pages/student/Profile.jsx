import React from 'react';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { demoStudentResults } from '../../data/demoData';
import { User, Phone, Mail, MapPin, Shield, Calendar } from 'lucide-react';

export const StudentProfile = () => {
  const result = demoStudentResults['STU1001'];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <PlaceholderImage label="Student Photo" className="w-32 h-40 rounded-xl shrink-0" />
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">
            Student ID: {result.studentId}
          </span>
          <h1 className="text-2xl font-bold text-slate-900">{result.name}</h1>
          <p className="text-xs font-semibold text-slate-600">
            {result.class} ({result.section}) • Roll: {result.roll} • {result.group}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 justify-center sm:justify-start">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> rahim.101@student.jfcl.edu.bd</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> 01711000101</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-900" /> Guardian & Family Details
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• <strong>Father / Guardian:</strong> Abdul Karim</li>
            <li>• <strong>Mother's Name:</strong> Rahima Begum</li>
            <li>• <strong>Emergency Contact:</strong> 01711000999</li>
            <li>• <strong>Residential Address:</strong> Sector 3, JFCL Colony, Sarishabari, Jamalpur</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" /> Academic Enrollment Info
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• <strong>Academic Session:</strong> 2025 - 2026</li>
            <li>• <strong>Curriculum Board:</strong> Dhaka Education Board</li>
            <li>• <strong>Student Status:</strong> Regular (Active)</li>
            <li>• <strong>Shift:</strong> Morning (Day Shift)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
