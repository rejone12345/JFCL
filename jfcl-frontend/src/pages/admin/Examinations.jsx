import React, { useState } from 'react';
import { demoExams } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { Plus, CalendarCheck } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export const AdminExaminations = () => {
  const { addToast } = useToast();
  const [exams, setExams] = useState(demoExams);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Examination Sessions & Terms</h1>
          <p className="text-xs text-slate-500 mt-1">Create exam terms, manage mark entry deadlines, and publish status</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => addToast('Exam creation modal opened (demo)!', 'info')}
        >
          Create Examination Term
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-blue-100 text-blue-900 rounded-xl">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                exam.status === 'Published'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {exam.status}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{exam.name}</h3>
            <p className="text-xs text-slate-500">Session: <strong>{exam.session}</strong></p>
            <p className="text-xs text-slate-500">Scheduled: <strong>{exam.date}</strong></p>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <button
                onClick={() => addToast(`Toggled status for ${exam.name}`, 'info')}
                className="text-blue-900 font-semibold hover:underline"
              >
                {exam.status === 'Published' ? 'Unpublish' : 'Publish Results'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
