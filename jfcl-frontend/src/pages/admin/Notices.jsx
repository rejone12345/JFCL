import React, { useState } from 'react';
import { demoNotices } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../components/common/Toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminNotices = () => {
  const { addToast } = useToast();
  const [notices, setNotices] = useState(demoNotices);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Exam', priority: 'High', content: '', date: '2026-11-19' });

  const handleSave = (e) => {
    e.preventDefault();
    const newNotice = { ...form, id: `NOT${Date.now()}` };
    setNotices([newNotice, ...notices]);
    addToast('Notice published successfully!', 'success');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Institutional Notice Management</h1>
          <p className="text-xs text-slate-500 mt-1">Publish notices to public website and respective portal dashboards</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          Publish New Notice
        </Button>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                {n.category} • Priority: {n.priority}
              </span>
              <h3 className="text-base font-bold text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-500">{n.content}</p>
              <p className="text-[10px] text-slate-400">Date: {n.date}</p>
            </div>
            <button
              onClick={() => {
                setNotices(notices.filter((item) => item.id !== n.id));
                addToast('Notice removed.', 'info');
              }}
              className="text-slate-400 hover:text-rose-600 p-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Publish Official Notice">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Notice Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" options={['Exam', 'Admission', 'Events', 'Academic', 'General']} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Select label="Priority" options={['High', 'Medium', 'Normal']} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Content</label>
            <textarea
              rows={4}
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-2 text-xs"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Publish Notice</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
