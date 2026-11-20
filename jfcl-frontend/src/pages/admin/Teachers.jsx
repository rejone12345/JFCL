import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../components/common/Toast';
import { Plus, Edit, Trash2, KeyRound, Copy } from 'lucide-react';

export const AdminTeachers = () => {
  const { addToast } = useToast();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [newlyCreated, setNewlyCreated] = useState(null);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: 'Physics',
    email: '',
    phone: '',
    qualification: '',
  });

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getTeachers();
      if (res.data) setTeachers(res.data);
    } catch (err) {
      addToast(err.message || 'Failed to fetch teachers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const filtered = teachers.filter(
    (t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.department?.toLowerCase().includes(search.toLowerCase()) ||
      t.teacherId?.toLowerCase().includes(search.toLowerCase()) ||
      t.id?.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setForm({
      name: '',
      designation: '',
      department: 'Physics',
      email: '',
      phone: '',
      qualification: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTeacher(t);
    setForm({
      name: t.name || '',
      designation: t.designation || '',
      department: t.department || 'Physics',
      email: t.email || '',
      phone: t.phone || '',
      qualification: t.qualification || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        const res = await adminApi.updateTeacher(editingTeacher.id || editingTeacher._id, form);
        addToast('Teacher details updated successfully!', 'success');
        setModalOpen(false);
        loadTeachers();
      } else {
        const res = await adminApi.createTeacher(form);
        const createdTeacher = res.data;
        addToast('New teacher added with activation code!', 'success');
        setModalOpen(false);
        setNewlyCreated(createdTeacher);
        loadTeachers();
      }
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher account?')) return;
    try {
      await adminApi.deleteTeacher(id);
      addToast('Teacher account removed.', 'info');
      loadTeachers();
    } catch (err) {
      addToast(err.message || 'Failed to delete teacher', 'error');
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied to clipboard!`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Faculty & Teacher Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Provision faculty accounts, issue Teacher IDs and Activation Codes
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
          Add Faculty Member
        </Button>
      </div>

      {/* New Teacher Created Banner / Alert */}
      {newlyCreated && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-700" />
              New Faculty Provisioned: {newlyCreated.name}
            </h4>
            <p className="text-xs text-emerald-800">
              Provide these credentials to the teacher so they can activate their account:
            </p>
            <div className="flex flex-wrap gap-4 pt-1 font-mono text-xs">
              <span className="bg-white px-2.5 py-1 rounded border border-emerald-300">
                Teacher ID: <strong>{newlyCreated.teacherId || newlyCreated.id}</strong>
              </span>
              <span className="bg-white px-2.5 py-1 rounded border border-amber-300 text-amber-900 font-bold">
                Activation Code: <strong>{newlyCreated.activationCode || 'Check in table'}</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Copy}
              onClick={() =>
                copyToClipboard(
                  `Teacher ID: ${newlyCreated.teacherId || newlyCreated.id}\nActivation Code: ${newlyCreated.activationCode}`,
                  'Teacher credentials'
                )
              }
            >
              Copy Credentials
            </Button>
            <button
              onClick={() => setNewlyCreated(null)}
              className="text-xs text-slate-400 hover:text-slate-700 font-semibold px-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search teacher by name, ID or department..." />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Teacher ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Designation</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 bg-amber-50/70 text-amber-950 border-l border-amber-200">
                Activation Code (Admin Only)
              </th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-slate-400">Loading faculty roster...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-slate-400">No teachers found.</td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id || t._id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono font-bold text-slate-900">
                    {t.teacherId || t.id}
                  </td>
                  <td className="px-6 py-3 font-semibold text-slate-900">{t.name}</td>
                  <td className="px-6 py-3">{t.designation}</td>
                  <td className="px-6 py-3">
                    <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-medium">
                      {t.department}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        t.isActivated !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.isActivated !== false ? 'Active & Activated' : 'Pending Activation'}
                    </span>
                  </td>
                  {/* Activation code visible strictly in admin portal */}
                  <td className="px-6 py-3 font-mono bg-amber-50/40 border-l border-amber-100">
                    {t.activationCode ? (
                      <span className="bg-amber-100 text-amber-950 font-bold px-2 py-0.5 rounded border border-amber-300">
                        {t.activationCode}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Activated (Cleared)</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(t)} className="text-slate-500 hover:text-blue-900" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id || t._id)}
                      className="text-slate-500 hover:text-rose-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTeacher ? 'Edit Teacher Record' : 'Add Faculty Member'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Dr. Mohammad Rafiq" />
          <Input label="Designation" required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="e.g. Senior Teacher / Lecturer" />
          <Select
            label="Department"
            options={['Administration', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT', 'Bangla', 'Business Studies']}
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
          <Input label="Official Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="e.g. rafiq@jfcl.edu.bd" />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 01711000000" />
          <Input label="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} placeholder="e.g. M.Sc in Mathematics" />
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Faculty</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
