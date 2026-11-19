import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { demoEvents } from '../../data/demoData';
import { Calendar, MapPin, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';

export const EventDetail = () => {
  const { id } = useParams();
  const event = demoEvents.find((e) => e.id === id) || demoEvents[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <Link to="/events" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to All Events
      </Link>

      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <PlaceholderImage label={`Banner: ${event.title}`} className="h-64 w-full rounded-xl" />

        <div className="space-y-3">
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="flex items-center gap-1 font-semibold text-blue-900">
              <Calendar className="w-4 h-4 text-blue-600" /> {event.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-600" /> {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-600" /> {event.location}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {event.title}
          </h1>
        </div>

        <div className="text-sm text-slate-700 leading-relaxed space-y-4">
          <p>{event.description}</p>
          <p>
            Participation is open to all enrolled students according to group designations. Respective house masters and club coordinators will supervise rehearsals and schedule alignments.
          </p>
          <p>
            For registration or further details, please communicate with the student affairs office or respective club heads.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-xs text-slate-500">
          <span>Organized by: JFCL Extra-Curricular Directorate</span>
          <button onClick={() => alert('Event link copied!')} className="flex items-center gap-1.5 hover:text-blue-900">
            <Share2 className="w-4 h-4" /> Share Event
          </button>
        </div>
      </div>
    </div>
  );
};
