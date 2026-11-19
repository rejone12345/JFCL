import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  GraduationCap, Award, BookOpen, Users, Bell, ArrowRight,
  Calendar, CheckCircle, Shield, FileText, ChevronRight
} from 'lucide-react';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { demoNotices, demoEvents, demoStats, demoTeachers } from '../../data/demoData';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white py-16 sm:py-24 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
              ★ {t('established')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Shaping Future Leaders with Discipline & Academic Rigor
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              JFCL School & College offers comprehensive primary, secondary and higher secondary education inside the secure and tranquil Jamuna Fertilizer campus. Consistently achieving benchmark board examination results.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/admission"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="border border-slate-400/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Discover Our Heritage
              </Link>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{demoStats.passRate}</p>
                <p className="text-xs text-slate-400">Board Pass Rate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{demoStats.gpa5Count}+</p>
                <p className="text-xs text-slate-400">GPA 5.00 Achievers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{demoStats.totalStudents}+</p>
                <p className="text-xs text-slate-400">Enrolled Students</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl">
              <PlaceholderImage label="Institution Main Campus & Academic Building" className="h-80 sm:h-96 w-full rounded-xl bg-slate-800 text-slate-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Notice Board Marquee / Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0">
            <Bell className="w-4 h-4 animate-bounce" /> LATEST NOTICES
          </div>
          <div className="flex-1 overflow-x-auto whitespace-nowrap text-xs text-slate-700 flex items-center gap-6 py-1">
            {demoNotices.slice(0, 3).map((notice) => (
              <Link key={notice.id} to={`/notices/${notice.id}`} className="hover:text-blue-900 font-medium flex items-center gap-2">
                <span className="text-slate-400">• [{notice.date}]</span>
                <span>{notice.title}</span>
              </Link>
            ))}
          </div>
          <Link to="/notices" className="text-xs font-bold text-blue-900 hover:underline shrink-0">
            All Notices →
          </Link>
        </div>
      </section>

      {/* About Institution & Principal's Message Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">ABOUT JFCL SCHOOL & COLLEGE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Three Decades of Educational Excellence & Moral Foundation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded in 1992 within the green and serene township of the Jamuna Fertilizer Company Limited at Sarishabari, Jamalpur, the institution has flourished into one of the most prominent educational institutions in the region.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Science & ICT Labs
                </h4>
                <p className="text-xs text-slate-500">Fully equipped Physics, Chemistry, Biology and high-speed Computer laboratories.</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Co-curricular Activities
                </h4>
                <p className="text-xs text-slate-500">Rover Scouts, Red Crescent, annual sports, debate clubs and science Olympiads.</p>
              </div>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 hover:text-blue-700 pt-2">
              Learn more about our institution history and governing body <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row gap-6 items-center">
              <PlaceholderImage label="Principal's Photo" className="w-36 h-48 shrink-0 rounded-xl" />
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Message from the Principal</span>
                <h3 className="text-base font-bold text-slate-900">Dr. M. Anwarul Haque</h3>
                <p className="text-xs text-slate-500">Principal, JFCL School & College</p>
                <p className="text-xs text-slate-600 italic leading-relaxed pt-2">
                  "Our philosophy is to nurture young intellects into responsible citizens with strong academic rigor, creative confidence and unwavering moral values."
                </p>
                <Link to="/about" className="text-xs font-semibold text-blue-900 hover:underline block pt-2">
                  Read full message →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="bg-slate-100 py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">CURRICULUM & STUDY SECTIONS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Academic Programs Offered</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              National Curriculum and Textbook Board (NCTB) approved curriculum for primary, secondary and higher secondary levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center font-bold mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Junior Secondary (Class 6 - 8)</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Foundational curriculum in general science, mathematics, Bangla, English, ICT and moral education to build strong analytic roots.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                <li>• Class 6: Sections A & B</li>
                <li>• Class 7: Sections A & B</li>
                <li>• Class 8: Junior Certificate Board Preparation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-xl flex items-center justify-center font-bold mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Secondary / SSC (Class 9 - 10)</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Specialized study groups under Dhaka Education Board. Rigorous preparation for Secondary School Certificate (SSC).
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                <li>• Science Group (Physics, Chem, Bio, Higher Math)</li>
                <li>• Business Studies Group (Accounting, Finance)</li>
                <li>• Humanities Group</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-900 rounded-xl flex items-center justify-center font-bold mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Higher Secondary / HSC (Class 11 - 12)</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Two-year collegiate program with premier lab facilities, academic seminars and university admission guidance.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                <li>• HSC Science Group</li>
                <li>• HSC Commerce / Business Studies</li>
                <li>• HSC Humanities Group</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Highlights Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">FACULTY & SCHOLARS</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Our Esteemed Teachers</h2>
          </div>
          <Link to="/teachers" className="text-xs font-bold text-blue-900 hover:underline">
            View All Teachers →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {demoTeachers.slice(0, 4).map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
              <PlaceholderImage label="Teacher Photo" className="h-40 w-full rounded-lg mb-3" />
              <h4 className="text-sm font-bold text-slate-900">{teacher.name}</h4>
              <p className="text-xs text-blue-900 font-medium">{teacher.designation}</p>
              <p className="text-[11px] text-slate-500 mt-1">{teacher.department}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events & Photo Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Upcoming Events & Activities</h3>
              <Link to="/events" className="text-xs font-semibold text-blue-900 hover:underline">
                View Calendar →
              </Link>
            </div>
            <div className="space-y-3">
              {demoEvents.map((ev) => (
                <div key={ev.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="bg-blue-50 border border-blue-200 text-blue-900 p-2.5 rounded-lg text-center shrink-0 w-16">
                    <Calendar className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <span className="text-[10px] font-bold block">{ev.date}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{ev.time} • {ev.location}</p>
                    <p className="text-xs text-slate-600 mt-1">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Campus Gallery</h3>
              <Link to="/gallery" className="text-xs font-semibold text-blue-900 hover:underline">
                View Gallery →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PlaceholderImage label="Main Gate & Campus" className="h-28 w-full rounded-lg" />
              <PlaceholderImage label="Science Lab Session" className="h-28 w-full rounded-lg" />
              <PlaceholderImage label="Annual Sports Field" className="h-28 w-full rounded-lg" />
              <PlaceholderImage label="Library & Reading Hall" className="h-28 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Admission Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold">Admissions Open for Session 2026-2027</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Applications are invited for Class 6, Class 9, and Class 11 (Science, Business Studies and Humanities). Secure your child's academic future.
            </p>
          </div>
          <Link
            to="/admission"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-transform hover:-translate-y-0.5 shadow-lg whitespace-nowrap"
          >
            Admission Procedure & Forms
          </Link>
        </div>
      </section>
    </div>
  );
};
