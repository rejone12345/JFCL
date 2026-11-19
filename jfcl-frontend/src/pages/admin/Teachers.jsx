import React, { useState } from 'react';
import { demoTeachers } from '../../data/demoData';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../components/common/Toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminTeachers = () => {
  const { addToast } = useToast();
  const [teachers, setTeachers] = useState(demoTeachers);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: 'Physics',
    email: '',
    phone: '',
    qualification: ''
  });

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setForm({ name: '', designation: '', department: 'Physics', email: '', phone: '', qualification: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTeacher(t);
    setForm({ ...t });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      setTeachers(teachers.map((t) => (t.id === editingTeacher.id ? { ...t, ...form } : t)));
      addToast('Teacher updated successfully!', 'success');
    } else {
      const newT = { ...form, id: `TCH${Date.now()}`, status: 'Active' };
      setTeachers([...teachers, newT]);
      addToast('New teacher added!', 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Faculty & Teacher Management</h1>
          <p className="text-xs text-slate-500 mt-1">Manage teaching staff records, departments, and credentials</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
          Add Faculty Member
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search teacher by name or department..." />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Teacher ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Designation</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-mono font-bold text-slate-900">{t.id}</td>
                <td className="px-6 py-3 font-semibold text-slate-900">{t.name}</td>
                <td className="px-6 py-3">{t.designation}</td>
                <td className="px-6 py-3">
                  <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-medium">
                    {t.department}
                  </span>
                </td>
                <td className="px-6 py-3 text-[11px] text-slate-500">
                  {t.email}<br />{t.phone}
                </td>
                <td className="px-6 py-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(t)} className="text-slate-500 hover:text-blue-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setTeachers(teachers.filter((item) => item.id !== t.id));
                      addToast('Teacher record deleted (demo).', 'info');
                    }}
                    className="text-slate-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTeacher ? 'Edit Teacher Record' : 'Add Faculty Member'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Designation" required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Senior Teacher" />
          <Select
            label="Department"
            options={['Administration', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT']}
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} placeholder="e.g. M.Sc in Physics" />
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Faculty</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
