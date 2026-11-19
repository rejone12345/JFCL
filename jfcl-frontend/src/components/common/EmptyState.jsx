import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ title = 'No data found', description = 'Try adjusting your filters or search keywords.', action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-slate-300 my-4">
      <div className="p-3 bg-slate-50 rounded-full text-slate-400 mb-3">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mt-1">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
