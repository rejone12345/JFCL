import React, { useState } from 'react';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { demoTeachers } from '../../data/demoData';
import { Mail, Phone, GraduationCap, Search } from 'lucide-react';

export const Teachers = () => {
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [search, setSearch] = useState('');

  const departments = ['All', 'Administration', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'ICT'];

  const filtered = demoTeachers.filter((t) => {
    const matchesDept = departmentFilter === 'All' || t.department === departmentFilter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.designation.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">FACULTY DIRECTORY</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Our Esteemed Teachers</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Dedicated, experienced educators shaping the academic mindset and character of students.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                departmentFilter === dept
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-900"
          />
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5 flex flex-col text-center">
            <PlaceholderImage label="Teacher Photograph" className="h-44 w-full rounded-xl mb-4" />
            <h3 className="text-base font-bold text-slate-900">{teacher.name}</h3>
            <p className="text-xs font-semibold text-blue-900 mt-0.5">{teacher.designation}</p>
            <p className="text-[11px] text-amber-700 font-medium bg-amber-50 rounded px-2 py-0.5 inline-block mx-auto mt-1">
              {teacher.department}
            </p>
            <p className="text-xs text-slate-500 mt-2 italic flex-1">{teacher.qualification}</p>

            <div className="border-t border-slate-100 mt-4 pt-3 space-y-1 text-xs text-slate-500">
              <p className="flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {teacher.email}
              </p>
              <p className="flex items-center justify-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {teacher.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
