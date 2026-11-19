import React, { useState } from 'react';
import { demoAttendance } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { useToast } from '../../components/common/Toast';
import { CheckSquare, Save, Calendar } from 'lucide-react';

export const TeacherAttendance = () => {
  const { addToast } = useToast();
  const [attendance, setAttendance] = useState(demoAttendance);
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [date, setDate] = useState('2026-11-19');

  const updateStatus = (studentId, status) => {
    setAttendance((prev) =>
      prev.map((a) => (a.studentId === studentId ? { ...a, status } : a))
    );
  };

  const markAll = (status) => {
    setAttendance((prev) => prev.map((a) => ({ ...a, status })));
    addToast(`Marked all students as ${status}`, 'info');
  };

  const handleSave = () => {
    addToast('Attendance sheet saved successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Daily Attendance Registry</h1>
          <p className="text-xs text-slate-500 mt-1">Record and verify daily classroom attendance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => markAll('Present')}>
            Mark All Present
          </Button>
          <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
            Save Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <Select label="Class" options={['Class 9', 'Class 10', 'Class 11', 'Class 12']} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} />
        <Select label="Section" options={['A', 'B']} value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} />
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Roll</th>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-right">Quick Mark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {attendance.map((item) => (
              <tr key={item.studentId} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-mono font-bold text-slate-900">{item.roll}</td>
                <td className="px-6 py-3 font-semibold">{item.name}</td>
                <td className="px-6 py-3 text-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Late'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right space-x-1">
                  <button
                    onClick={() => updateStatus(item.studentId, 'Present')}
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      item.status === 'Present' ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    P
                  </button>
                  <button
                    onClick={() => updateStatus(item.studentId, 'Late')}
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      item.status === 'Late' ? 'bg-amber-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    L
                  </button>
                  <button
                    onClick={() => updateStatus(item.studentId, 'Absent')}
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      item.status === 'Absent' ? 'bg-rose-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    A
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
