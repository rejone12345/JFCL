import React from 'react';
import { Link } from 'react-router-dom';
import { demoEvents } from '../../data/demoData';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

export const Events = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">CO-CURRICULAR & ACADEMIC</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Events & Institutional Activities</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Enriching student experience through debate, sports, science fairs and cultural commemoration.
        </p>
      </div>

      <div className="space-y-6">
        {demoEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-900 p-4 rounded-xl text-center shrink-0 w-24">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <span className="text-xs font-bold block">{event.date}</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mt-1">{event.description}</p>
              </div>
            </div>

            <Link
              to={`/events/${event.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-800 text-xs font-semibold rounded-lg transition-colors shrink-0"
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
