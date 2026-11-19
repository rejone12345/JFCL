import React, { useState } from 'react';
import { demoSubjects } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { Plus, BookOpen } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export const AdminSubjects = () => {
  const { addToast } = useToast();
  const [subjects, setSubjects] = useState(demoSubjects);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Subject Master List</h1>
          <p className="text-xs text-slate-500 mt-1">Manage institutional subjects, pass mark requirements and syllabuses</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => addToast('Add subject modal opened (demo)!', 'info')}
        >
          Add Subject
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Subject Code</th>
              <th className="px-6 py-3">Subject Name</th>
              <th className="px-6 py-3">Class Level</th>
              <th className="px-6 py-3 text-center">Full Marks</th>
              <th className="px-6 py-3 text-center">Pass Marks</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {subjects.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-mono font-bold text-slate-900">{sub.code}</td>
                <td className="px-6 py-3 font-semibold text-slate-900">{sub.name}</td>
                <td className="px-6 py-3">{sub.class}</td>
                <td className="px-6 py-3 text-center font-bold">{sub.fullMarks}</td>
                <td className="px-6 py-3 text-center font-bold text-emerald-700">{sub.passMarks}</td>
                <td className="px-6 py-3 text-right">
                  <button
                    onClick={() => addToast(`Edit ${sub.name} (demo)`, 'info')}
                    className="text-xs font-semibold text-blue-900 hover:underline"
                  >
                    Configure
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
