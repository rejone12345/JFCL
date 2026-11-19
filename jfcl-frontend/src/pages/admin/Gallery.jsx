import React, { useState } from 'react';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { Button } from '../../components/common/Button';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export const AdminGallery = () => {
  const { addToast } = useToast();
  const [items, setItems] = useState([
    { id: 1, title: 'Main Institutional Academic Building', category: 'Campus' },
    { id: 2, title: 'Annual Sports Parade & Flag Hoisting', category: 'Sports' },
    { id: 3, title: 'Senior Physics Practical Laboratory', category: 'Labs' },
    { id: 4, title: 'Victory Day Cultural Drama Performance', category: 'Cultural' }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Campus Gallery Management</h1>
          <p className="text-xs text-slate-500 mt-1">Upload and organize campus photos, laboratories, and sports albums</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => addToast('Upload dialog opened (demo)!', 'info')}>
          Upload Photo
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-3 space-y-2">
            <PlaceholderImage label={item.title} className="h-36 w-full rounded-xl" />
            <div className="flex justify-between items-center pt-1">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase">{item.category}</span>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</h4>
              </div>
              <button
                onClick={() => {
                  setItems(items.filter((i) => i.id !== item.id));
                  addToast('Photo removed.', 'info');
                }}
                className="text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
