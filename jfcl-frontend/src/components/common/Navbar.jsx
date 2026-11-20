import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Menu, X, GraduationCap, Lock } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/academics', label: t('nav.academics') },
    { to: '/teachers', label: t('nav.teachers') },
    { to: '/notices', label: t('nav.notices') },
    { to: '/admission', label: t('nav.admission') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/events', label: t('nav.events') },
    { to: '/results', label: t('nav.results') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a href="tel:+88029876543" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-400" /> +880 2-9876543
            </a>
            <a href="mailto:info@jfcl.edu.bd" className="hidden sm:flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> info@jfcl.edu.bd
            </a>
            <a
              href="https://www.google.com/maps/place/JFCL+School+and+College+Playground/@24.6739949,89.8268719,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 hover:text-amber-300 transition-colors"
              title="Open campus location on Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Jamuna Fertilizer Campus, Sarishabari, Jamalpur
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
              {t('established')}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Header / Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.jpg"
            alt="JFCL Logo"
            className="w-12 h-12 rounded-xl object-contain shadow-md border border-slate-200 bg-white p-0.5 group-hover:scale-105 transition-transform"
          />
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-blue-950 tracking-tight leading-tight">
              {t('institution_name')}
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </Link>

        {/* Action Button: Portal Login */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('nav.portal_login')}</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden lg:block bg-blue-950 text-white border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-3 text-xs font-medium tracking-wide transition-colors border-b-2 ${
                    active
                      ? 'border-amber-400 text-amber-300 bg-blue-900/40 font-bold'
                      : 'border-transparent text-slate-200 hover:text-white hover:bg-blue-900/20'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-t border-slate-800 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>{t('nav.portal_login')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
