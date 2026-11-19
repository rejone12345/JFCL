import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { demoStudents } from '../../data/demoData';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { useToast } from '../../components/common/Toast';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export const AdminStudents = () => {
  const { addToast } = useToast();
  const [students, setStudents] = useState(demoStudents);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [form, setForm] = useState({
    name: '',
    roll: '',
    class: 'Class 10',
    section: 'A',
    group: 'Science',
    contact: '',
    guardian: ''
  });

  const filtered = students.filter((s) => {
    const matchClass = classFilter === 'All' || s.class === classFilter;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    return matchClass && matchSearch;
  });

  const handleOpenAdd = () => {
    setCurrentStudent(null);
    setForm({ name: '', roll: '', class: 'Class 10', section: 'A', group: 'Science', contact: '', guardian: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (stu) => {
    setCurrentStudent(stu);
    setForm({ ...stu });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentStudent) {
      setStudents(students.map((s) => (s.id === currentStudent.id ? { ...s, ...form } : s)));
      addToast('Student details updated successfully (demo state)!', 'success');
    } else {
      const newStu = { ...form, id: `STU${Date.now()}`, status: 'Active' };
      setStudents([newStu, ...students]);
      addToast('New student added successfully (demo state)!', 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    setStudents(students.filter((s) => s.id !== studentToDelete.id));
    addToast('Student record removed.', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Directory & Records</h1>
          <p className="text-xs text-slate-500 mt-1">Manage enrolled student rosters, classes and profile credentials</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
          Add New Student
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by student name or roll..." className="flex-1" />
        <div className="w-full sm:w-48">
          <Select
            placeholder="All Classes"
            options={['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']}
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value || 'All')}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Roll</th>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Class & Section</th>
              <th className="px-6 py-3">Group</th>
              <th className="px-6 py-3">Guardian</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-mono font-bold text-slate-900">{s.roll}</td>
                <td className="px-6 py-3 font-semibold text-slate-900">{s.name}</td>
                <td className="px-6 py-3">{s.class} ({s.section})</td>
                <td className="px-6 py-3">{s.group}</td>
                <td className="px-6 py-3">{s.guardian}</td>
                <td className="px-6 py-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right space-x-2">
                  <Link
                    to={`/admin/students/${s.id}`}
                    className="p-1.5 text-slate-500 hover:text-blue-900 inline-block"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="p-1.5 text-slate-500 hover:text-amber-700 inline-block"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setStudentToDelete(s);
                      setDeleteDialogOpen(true);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-600 inline-block"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add / Edit */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentStudent ? 'Edit Student Record' : 'Add New Student'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Student Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Roll Number"
              required
              value={form.roll}
              onChange={(e) => setForm({ ...form, roll: e.target.value })}
            />
            <Select
              label="Class"
              options={['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']}
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Section"
              value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
            />
            <Select
              label="Group"
              options={['Science', 'Business Studies', 'Humanities', 'General']}
              value={form.group}
              onChange={(e) => setForm({ ...form, group: e.target.value })}
            />
          </div>
          <Input
            label="Guardian's Name"
            value={form.guardian}
            onChange={(e) => setForm({ ...form, guardian: e.target.value })}
          />
          <Input
            label="Emergency Contact Phone"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Student
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Student Record?"
        message={`Are you sure you want to remove ${studentToDelete?.name}? This action can be undone in demo state by refreshing.`}
        confirmText="Delete"
        isDanger
      />
    </div>
  );
};
