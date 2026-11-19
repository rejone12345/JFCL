import React, { useState } from 'react';
import { demoAdmissions } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { CheckCircle2, XCircle, FileText } from 'lucide-react';

export const AdminAdmissions = () => {
  const { addToast } = useToast();
  const [admissions, setAdmissions] = useState(demoAdmissions);

  const handleUpdate = (id, status) => {
    setAdmissions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    addToast(`Applicant ${id} status updated to ${status}!`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Online Admission Applications</h1>
        <p className="text-xs text-slate-500 mt-1">Review applicant profiles, guardian information, and grant admission approvals</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Tracking ID</th>
              <th className="px-6 py-3">Applicant Name</th>
              <th className="px-6 py-3">Applied Class</th>
              <th className="px-6 py-3">Guardian</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {admissions.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-mono font-bold text-slate-900">{a.id}</td>
                <td className="px-6 py-3 font-semibold text-slate-900">{a.applicantName}</td>
                <td className="px-6 py-3">{a.appliedClass}</td>
                <td className="px-6 py-3">{a.guardianName}</td>
                <td className="px-6 py-3">{a.contact}</td>
                <td className="px-6 py-3">{a.date}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                    a.status === 'Approved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : a.status === 'Pending'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right space-x-1">
                  {a.status !== 'Approved' && (
                    <button
                      onClick={() => handleUpdate(a.id, 'Approved')}
                      className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded font-semibold hover:bg-emerald-200"
                    >
                      Approve
                    </button>
                  )}
                  {a.status !== 'Rejected' && (
                    <button
                      onClick={() => handleUpdate(a.id, 'Rejected')}
                      className="px-2 py-1 text-xs bg-rose-100 text-rose-800 rounded font-semibold hover:bg-rose-200"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
