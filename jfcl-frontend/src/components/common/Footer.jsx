import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.jpg"
                alt="JFCL Logo"
                className="w-9 h-9 rounded-lg object-contain bg-white p-0.5 shadow-sm"
              />
              <span className="text-base font-bold text-white tracking-tight">
                {t('institution_name')}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Established within the Jamuna Fertilizer campus, providing disciplined, premier school and college education with outstanding results in national board examinations.
            </p>
            <p className="text-xs font-semibold text-amber-400">
              {t('established')}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-amber-300 transition-colors">About Institutional History</Link></li>
              <li><Link to="/academics" className="hover:text-amber-300 transition-colors">Academic Programs & Curriculum</Link></li>
              <li><Link to="/teachers" className="hover:text-amber-300 transition-colors">Faculty Directory</Link></li>
              <li><Link to="/notices" className="hover:text-amber-300 transition-colors">Notices & Circulars</Link></li>
              <li><Link to="/admission" className="hover:text-amber-300 transition-colors">Admission Information</Link></li>
              <li><Link to="/results" className="hover:text-amber-300 transition-colors">Public Result Archive</Link></li>
            </ul>
          </div>

          {/* Col 3: Portal Access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Institutional Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">Administrative Portal <ExternalLink className="w-3 h-3 text-slate-500" /></Link></li>
              <li><Link to="/login" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">Teacher Evaluation Portal <ExternalLink className="w-3 h-3 text-slate-500" /></Link></li>
              <li><Link to="/login" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">Student & Parent Portal <ExternalLink className="w-3 h-3 text-slate-500" /></Link></li>
              <li><Link to="/student/signup" className="hover:text-amber-300 transition-colors">Student Online Registration</Link></li>
              <li><Link to="/account-activation" className="hover:text-amber-300 transition-colors">Account Activation</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>JFCL Campus, Tarakandi, Sarishabari, Jamalpur, Bangladesh</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+880 2-9876543, +880 1711-000000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>principal@jfcl.edu.bd</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} JFCL School & College. All rights reserved.</p>
          <p className="text-[11px] text-slate-500">
            Official Institution Management & Information System Frontend
          </p>
        </div>
      </div>
    </footer>
  );
};
