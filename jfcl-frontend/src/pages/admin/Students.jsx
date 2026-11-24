import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
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
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [form, setForm] = useState({
    name: '',
    roll: '',
    email: '',
    class: 'Class 10',
    section: 'A',
    group: 'Science',
    contact: '',
    guardian: '',
  });

  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getStudents();
      if (res.data) setStudents(res.data);
    } catch (err) {
      addToast(err.message || 'Failed to fetch student roster', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = students.filter((s) => {
    const matchClass = classFilter === 'All' || s.class === classFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.roll?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.studentId?.toLowerCase().includes(q);
    return matchClass && matchSearch;
  });

  const handleOpenAdd = () => {
    setCurrentStudent(null);
    setForm({
      name: '',
      roll: '',
      email: '',
      class: 'Class 10',
      section: 'A',
      group: 'Science',
      contact: '',
      guardian: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (stu) => {
    setCurrentStudent(stu);
    setForm({
      name: stu.name || '',
      roll: stu.roll || '',
      email: stu.email || '',
      class: stu.class || 'Class 10',
      section: stu.section || 'A',
      group: stu.group || 'Science',
      contact: stu.contact || stu.phone || '',
      guardian: stu.guardian || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentStudent) {
        await adminApi.updateStudent(currentStudent.id || currentStudent._id, form);
        addToast('Student details updated successfully!', 'success');
      } else {
        const res = await adminApi.createStudent(form);
        const codeMsg = res.data?.activationCode ? ` Activation Code: ${res.data.activationCode}` : '';
        addToast(`New student added!${codeMsg}`, 'success');
      }
      setModalOpen(false);
      loadStudents();
    } catch (err) {
      const firstFieldError = err.errors ? Object.values(err.errors)[0] : null;
      addToast(firstFieldError || err.message || 'Failed to save student record', 'error');
    }
  };

  const handleDelete = async () => {
    if (!studentToDelete) return;
    try {
      await adminApi.deleteStudent(studentToDelete.id || studentToDelete._id);
      addToast('Student record removed from database.', 'info');
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
      loadStudents();
    } catch (err) {
      addToast(err.message || 'Failed to delete student record', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Directory & Records</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage registered and enrolled student rosters, classes, and profile credentials
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
          Add New Student
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by student name, roll, ID or email..."
          className="flex-1"
        />
        <div className="w-full sm:w-48">
          <Select
            placeholder="All Classes"
            options={['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']}
            value={classFilter === 'All' ? '' : classFilter}
            onChange={(e) => setClassFilter(e.target.value || 'All')}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Roll / ID</th>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Class & Section</th>
              <th className="px-6 py-3">Group</th>
              <th className="px-6 py-3">Guardian & Contact</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-slate-400">
                  Loading student directory...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-slate-400">
                  No student records found.
                </td>
              </tr>
            ) : (
              filtered.map((s) => {
                const recordId = s.id || s._id;
                const isActivated = s.isActivated !== false;
                return (
                  <tr key={recordId} className="hover:bg-slate-50">
                    <td className="px-6 py-3">
                      <span className="font-mono font-bold text-slate-900 block">{s.roll || '—'}</span>
                      <span className="text-[10px] font-mono text-slate-400">{s.studentId || recordId}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-semibold text-slate-900 block">{s.name}</span>
                      {s.email && <span className="text-[11px] text-slate-500">{s.email}</span>}
                    </td>
                    <td className="px-6 py-3">
                      {s.class || '—'} ({s.section || 'A'})
                    </td>
                    <td className="px-6 py-3">{s.group || 'General'}</td>
                    <td className="px-6 py-3">
                      <span className="block font-medium text-slate-800">{s.guardian || '—'}</span>
                      {(s.contact || s.phone) && (
                        <span className="text-[11px] text-slate-500">{s.contact || s.phone}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 space-y-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          isActivated
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isActivated ? 'Active' : 'Pending Activation'}
                      </span>
                      {!isActivated && s.activationCode && (
                        <span className="block font-mono text-[10px] text-amber-900 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded w-fit">
                          Code: {s.activationCode}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right space-x-2 whitespace-nowrap">
                      <Link
                        to={`/admin/students/${recordId}`}
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
                );
              })
            )}
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
          <Input
            label="Student Email Address (Used for 2FA OTP)"
            type="email"
            required={!currentStudent}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="e.g. student@jfcl.edu.bd"
          />
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
        message={`Are you sure you want to permanently remove ${studentToDelete?.name} from the database?`}
        confirmText="Delete"
        isDanger
      />
    </div>
  );
};
