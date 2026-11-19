import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { demoNotices } from '../../data/demoData';
import { Bell, Calendar, Download, FileText, ChevronRight } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const Notices = () => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const categories = ['All', 'Exam', 'Admission', 'Events', 'Academic'];

  const filtered = categoryFilter === 'All'
    ? demoNotices
    : demoNotices.filter((n) => n.category === categoryFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">OFFICIAL ANNOUNCEMENTS</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Institutional Notices & Circulars</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Stay informed about academic schedules, examinations, admission updates, and co-curricular programs.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 border-b border-slate-200 pb-4 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              categoryFilter === cat
                ? 'bg-blue-900 text-white font-bold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices list */}
      <div className="space-y-4">
        {filtered.map((notice) => (
          <div
            key={notice.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <Badge variant={notice.priority === 'High' ? 'danger' : 'primary'}>
                  {notice.category}
                </Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Published: {notice.date}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 hover:text-blue-900">
                <Link to={`/notices/${notice.id}`}>{notice.title}</Link>
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">{notice.content}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to={`/notices/${notice.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-900 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <span>Read Notice</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              {notice.file && (
                <button
                  type="button"
                  onClick={() => alert('Demo notice attachment. In live deployment, PDF would download.')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
