import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const Contact = () => {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Thank you! Your message has been received (demo mode).', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">GET IN TOUCH</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Contact JFCL School & College</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          We welcome inquiries from prospective guardians, alumni, and educational partners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-blue-950 text-white p-8 rounded-2xl shadow-md space-y-6">
            <h3 className="text-xl font-bold">Institutional Location</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Situated within the secure, well-guarded perimeter of Jamuna Fertilizer Company Limited campus at Tarakandi.
            </p>

            <div className="space-y-4 text-xs">
              <a
                href="https://www.google.com/maps/place/JFCL+School+and+College+Playground/@24.6739949,89.8268719,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                title="Click to view JFCL on Google Maps"
              >
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    Campus Address <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.2 rounded">Google Maps ↗</span>
                  </p>
                  <p className="text-slate-300">JFCL Campus, Tarakandi, Sarishabari, Jamalpur - 2055, Bangladesh</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Telephone & Mobile:</p>
                  <p className="text-slate-300">+880 2-9876543, +880 1711-223344</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Official Correspondence:</p>
                  <p className="text-slate-300">principal@jfcl.edu.bd, info@jfcl.edu.bd</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Administrative Working Hours:</p>
                  <p className="text-slate-300">Sunday - Thursday: 08:30 AM - 03:30 PM (Friday & Saturday Closed)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Send an Official Inquiry</h3>
          <p className="text-xs text-slate-500 mb-6">Fill in the form below and the administrative secretary will respond within two working days.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Mohammad Ali"
              />
              <Input
                label="Email Address"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. contact@example.com"
              />
            </div>

            <Input
              label="Subject"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="e.g. Admission inquiry for Class 9 Science"
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message Content <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-900"
                placeholder="Type your questions or inquiry here..."
              />
            </div>

            <Button type="submit" variant="primary" icon={Send} className="w-full sm:w-auto">
              Submit Message
            </Button>
          </form>
        </div>
      </div>

      {/* Embedded Google Map Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-900" /> Interactive Campus Map
            </h3>
            <p className="text-xs text-slate-500">Easily navigate to JFCL School & College inside the Jamuna Fertilizer township.</p>
          </div>
          <a
            href="https://www.google.com/maps/place/JFCL+School+and+College+Playground/@24.6739949,89.8268719,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Open in Google Maps App ↗
          </a>
        </div>
        <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200">
          <iframe
            title="JFCL School & College Location"
            src="https://maps.google.com/maps?q=24.6739949,89.8268719&hl=en&z=16&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
