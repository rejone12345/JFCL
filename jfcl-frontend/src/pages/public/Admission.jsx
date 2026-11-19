import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../components/common/Toast';
import { CheckCircle, Download, FileText, HelpCircle } from 'lucide-react';

export const Admission = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    applicantName: '',
    appliedClass: 'Class 6',
    guardianName: '',
    phone: '',
    dob: '',
    gender: 'Male',
    previousSchool: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Demo Admission Application Submitted! Administration will review your credentials.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">ADMISSION INFORMATION</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Admission Procedure & Requirements</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Join the distinguished community of JFCL School & College for the 2026-2027 Academic Session.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-blue-950">1. Eligibility Criteria</h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• <strong>Class 6:</strong> Completion of Class 5 or equivalent primary education with good standing.</li>
            <li>• <strong>Class 9:</strong> Passed Class 8 / JSC equivalent with minimum GPA 3.50 for Science.</li>
            <li>• <strong>Class 11 (HSC):</strong> Minimum GPA 4.00 (Science) or 3.00 (Commerce/Arts) in SSC.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-blue-950">2. Required Documents</h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• Attested copy of Birth Certificate / NID.</li>
            <li>• Official Transfer Certificate (TC) & character certificate from previous institution.</li>
            <li>• 4 copies of passport-size recent color photographs.</li>
            <li>• SSC Marksheet copy (for HSC college admissions).</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-blue-950">3. Selection Method</h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li>• Written entrance examination in Bangla, English, and Mathematics (for Junior levels).</li>
            <li>• College admission via central online board system per Ministry guidelines.</li>
            <li>• Final viva with student and guardians.</li>
          </ul>
        </div>
      </div>

      {/* Online Application Form */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-md max-w-3xl mx-auto space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">Online Admission Application (Demo)</h2>
          <p className="text-xs text-slate-500 mt-1">Submit applicant preliminary details to generate an admission tracking number.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Applicant Full Name"
              required
              value={formData.applicantName}
              onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
              placeholder="e.g. Siam Mahmud"
            />
            <Select
              label="Applied Class"
              options={['Class 6', 'Class 7', 'Class 8', 'Class 9 (Science)', 'Class 9 (Business)', 'Class 11 Science', 'Class 11 Commerce', 'Class 11 Arts']}
              value={formData.appliedClass}
              onChange={(e) => setFormData({ ...formData, appliedClass: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Gender"
              options={['Male', 'Female']}
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
            <Input
              label="Contact Phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 01811000000"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Guardian's Full Name"
              required
              value={formData.guardianName}
              onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              placeholder="e.g. Mahmud Hasan"
            />
            <Input
              label="Previous School / Institution"
              value={formData.previousSchool}
              onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
              placeholder="e.g. Model Primary School"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" className="w-full">
              Submit Admission Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
