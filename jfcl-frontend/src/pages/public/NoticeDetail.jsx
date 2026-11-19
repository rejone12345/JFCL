import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { demoNotices } from '../../data/demoData';
import { Calendar, Download, ArrowLeft, FileText, Share2 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const NoticeDetail = () => {
  const { id } = useParams();
  const notice = demoNotices.find((n) => n.id === id) || demoNotices[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <Link to="/notices" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Notice Archive
      </Link>

      <article className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <Badge variant={notice.priority === 'High' ? 'danger' : 'primary'}>
              {notice.category}
            </Badge>
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Date of Publication: {notice.date}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {notice.title}
          </h1>
          <p className="text-xs text-slate-400 font-mono">Reference No: JFCL/ADM/NOT/{notice.id}/2026</p>
        </div>

        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
          <p>{notice.content}</p>
          <p>
            All respected students, guardians, and faculty members are advised to follow the stated directions carefully. For any further clarification, please get in touch with the Institutional Administrative Office during routine office hours.
          </p>
        </div>

        {notice.file && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-rose-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">{notice.file}</p>
                <p className="text-[11px] text-slate-400">Official Signed Notice Document (PDF • 1.2 MB)</p>
              </div>
            </div>
            <button
              onClick={() => alert('Demo file download. In live production this serves the authorized PDF.')}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-800 inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        )}

        <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-xs text-slate-500">
          <span>By order of the Principal, JFCL School & College</span>
          <button
            onClick={() => alert('Notice link copied to clipboard!')}
            className="flex items-center gap-1.5 hover:text-blue-900"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </article>
    </div>
  );
};
