import React, { useState } from 'react';
import { demoEvents } from '../../data/demoData';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';
import { Plus, Calendar, Trash2 } from 'lucide-react';

export const AdminEvents = () => {
  const { addToast } = useToast();
  const [events, setEvents] = useState(demoEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', time: '', location: '', description: '' });

  const handleSave = (e) => {
    e.preventDefault();
    const newEv = { ...form, id: `EV${Date.now()}` };
    setEvents([newEv, ...events]);
    addToast('Event created successfully!', 'success');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Event & Activity Management</h1>
          <p className="text-xs text-slate-500 mt-1">Schedule and publish extracurricular, sports and academic competitions</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          Create Event
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {ev.date} • {ev.time} • {ev.location}
              </span>
              <h3 className="text-base font-bold text-slate-900">{ev.title}</h3>
              <p className="text-xs text-slate-500">{ev.description}</p>
            </div>
            <button
              onClick={() => {
                setEvents(events.filter((item) => item.id !== ev.id));
                addToast('Event deleted.', 'info');
              }}
              className="text-slate-400 hover:text-rose-600 p-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Event">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Event Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Input label="Time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 10:00 AM" />
          </div>
          <Input label="Location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Main Auditorium" />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-2 text-xs"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Event</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
