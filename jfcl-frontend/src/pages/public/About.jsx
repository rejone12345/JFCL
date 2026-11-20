import React from 'react';
import { PlaceholderImage } from '../../components/common/PlaceholderImage';
import { Shield, Target, Compass, Award, Building, CheckCircle } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Overview */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">ABOUT THE INSTITUTION</span>
        <h1 className="text-3xl font-extrabold text-slate-900">JFCL School & College</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Established in 1992, JFCL School & College is situated inside the well-planned and secure township of the Jamuna Fertilizer Company Limited (JFCL), a state-owned enterprise under BCIC in Tarakandi, Sarishabari, Jamalpur.
        </p>
      </section>

      {/* History & Establishment */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="/schoolpic.jpg"
            alt="JFCL Campus Building"
            className="h-72 w-full object-cover rounded-2xl shadow-lg border border-slate-200 hover:scale-[1.01] transition-transform duration-300"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Historical Legacy</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The institution was founded primarily to provide quality education for children of factory personnel as well as students from the greater district of Jamalpur and adjoining areas. Over the past three decades, it has blossomed into an institution of premier academic standing with a reputation for discipline and merit.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-700">
            <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600" /> Established: 1992</p>
            <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600" /> EIIN: 109823 | School & College Code: 4920</p>
            <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600" /> Affiliated with Dhaka Education Board</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To impart high-standard education grounded in discipline, ethics, and modern pedagogical techniques, enabling every student to excel academically, mentally and culturally.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-xl flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To be recognized as a leading educational institution in Bangladesh that consistently inspires intellect, fosters civic responsibility, and produces leaders across sciences, humanities, and arts.
          </p>
        </div>
      </section>

      {/* Principal's Detailed Message */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center">
            <PlaceholderImage label="Principal Photograph" className="w-48 h-60 mx-auto rounded-xl shadow-md mb-3" />
            <h4 className="text-base font-bold text-slate-900">Dr. M. Anwarul Haque</h4>
            <p className="text-xs text-blue-900 font-semibold">Principal</p>
            <p className="text-[11px] text-slate-500">Ph.D in Education, M.Sc (Physics)</p>
          </div>
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Principal's Formal Address</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              "Welcome to JFCL School & College. For more than 30 years, our institution has stood as a beacon of academic rigor, integrity, and holistic student growth. We believe that true education extends beyond rote textbook learning — it empowers children with critical thinking, ethical fortitude, and mutual respect."
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              "With an experienced teaching staff, updated laboratory facilities, and a secure environment, our students continuously lead national competitions and university entrance tests. We thank all guardians and our patron organizations for their steadfast support."
            </p>
          </div>
        </div>
      </section>

      {/* Infrastructure & Facilities */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Campus Facilities & Infrastructure</h2>
          <p className="text-xs text-slate-500 mt-1">Modern educational amenities for a well-rounded student journey</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
            <Building className="w-8 h-8 text-blue-900 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Academic Buildings</h4>
            <p className="text-xs text-slate-500 mt-1">Multi-story well-ventilated classrooms with multimedia projection equipment.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
            <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Science Labs</h4>
            <p className="text-xs text-slate-500 mt-1">Independent specialized laboratories for Physics, Chemistry, and Biology.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
            <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Computer Center</h4>
            <p className="text-xs text-slate-500 mt-1">50+ networked desktop workstations with broadband internet for ICT curriculum.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
            <Compass className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Central Library</h4>
            <p className="text-xs text-slate-500 mt-1">10,000+ reference volumes, periodicals, encyclopedia and peaceful reading desks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
