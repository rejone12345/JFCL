import React, { useState } from 'react';
import { demoClasses } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { Plus, Layers } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export const AdminClasses = () => {
  const { addToast } = useToast();
  const [classesList, setClassesList] = useState(demoClasses);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Classes & Sections Management</h1>
          <p className="text-xs text-slate-500 mt-1">Configure classes, assign sections, and manage batch capacities</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => addToast('Class creation dialog opened (demo)!', 'info')}
        >
          Add New Class
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classesList.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">{c.id}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
            <p className="text-xs text-slate-500">Student Strength: <strong>{c.studentsCount} Students</strong></p>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-semibold text-slate-600 mb-1.5">Designated Sections:</p>
              <div className="flex gap-1.5 flex-wrap">
                {c.sections.map((sec) => (
                  <span key={sec} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
