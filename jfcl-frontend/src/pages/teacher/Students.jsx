import React, { useState } from 'react';
import { demoStudents } from '../../data/demoData';
import { SearchBar } from '../../components/common/SearchBar';
import { Select } from '../../components/common/Select';
import { Users } from 'lucide-react';

export const TeacherStudents = () => {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  const filtered = demoStudents.filter((s) => {
    const matchClass = selectedClass === 'All' || s.class === selectedClass;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    return matchClass && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Enrolled student rosters across your designated classes</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <SearchBar value={search} onChange={setSearch} placeholder="Search student by name or roll..." className="flex-1" />
        <div className="w-full sm:w-48">
          <Select
            placeholder="All Classes"
            options={['Class 9', 'Class 10', 'Class 11', 'Class 12']}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value || 'All')}
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
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-mono font-bold text-slate-900">{s.roll}</td>
                <td className="px-6 py-3 font-semibold text-slate-800">{s.name}</td>
                <td className="px-6 py-3">{s.class} ({s.section})</td>
                <td className="px-6 py-3">{s.group}</td>
                <td className="px-6 py-3">{s.guardian}</td>
                <td className="px-6 py-3">{s.contact}</td>
                <td className="px-6 py-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
