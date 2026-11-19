import React, { useState } from 'react';
import { demoResultSubmissions } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { CheckCircle2, XCircle, Eye, Award } from 'lucide-react';

export const AdminResults = () => {
  const { addToast } = useToast();
  const [submissions, setSubmissions] = useState(demoResultSubmissions);

  const handleAction = (id, newStatus) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    addToast(`Submission ${id} marked as ${newStatus}!`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Result Approval & Publication Workflow</h1>
        <p className="text-xs text-slate-500 mt-1">
          Verify teacher marksheet submissions, approve grades, and publish to the student portal and public result archive
        </p>
      </div>

      <div className="space-y-4">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">ID: {sub.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  sub.status === 'Published'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : sub.status === 'Pending Approval'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  {sub.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {sub.subject} — {sub.class} ({sub.section})
              </h3>
              <p className="text-xs text-slate-500">
                Instructor: <strong>{sub.teacher}</strong> • Exam: <strong>{sub.exam}</strong> • Date: {sub.date}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => addToast(`Opening detailed evaluation for ${sub.subject}`, 'info')}
              >
                Inspect Marks
              </Button>
              {sub.status !== 'Published' && (
                <Button
                  variant="success"
                  size="sm"
                  icon={CheckCircle2}
                  onClick={() => handleAction(sub.id, 'Published')}
                >
                  Approve & Publish
                </Button>
              )}
              {sub.status === 'Pending Approval' && (
                <Button
                  variant="danger"
                  size="sm"
                  icon={XCircle}
                  onClick={() => handleAction(sub.id, 'Rejected / Sent Back')}
                >
                  Reject & Return
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
