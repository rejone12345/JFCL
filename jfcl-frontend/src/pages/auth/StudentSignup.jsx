import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useToast } from '../../components/common/Toast';
import { UserCheck } from 'lucide-react';

export const StudentSignup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    class: 'Class 10',
    roll: '',
    dob: '',
    guardianName: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Sample Registration Submitted! You can now log in using demo credentials.', 'success');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-blue-950 p-6 text-white text-center">
          <UserCheck className="w-10 h-10 text-amber-400 mx-auto mb-2" />
          <h2 className="text-xl font-bold">Student Online Registration</h2>
          <p className="text-xs text-slate-300">Enroll your account with your institutional roll and credentials</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Student Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rahim Ahmed" />
            <Input label="Email Address" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="e.g. student@example.com" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select label="Class" options={['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11 (HSC)', 'Class 12 (HSC)']} value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} />
            <Input label="Roll Number" required value={formData.roll} onChange={(e) => setFormData({...formData, roll: e.target.value})} placeholder="e.g. 101" />
            <Input label="Date of Birth" type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Guardian's Name" required value={formData.guardianName} onChange={(e) => setFormData({...formData, guardianName: e.target.value})} placeholder="e.g. Abdul Karim" />
            <Input label="Contact Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="e.g. 01711000000" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Password" type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <Input label="Confirm Password" type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          </div>
          <Button type="submit" variant="primary" className="w-full mt-4">
            Submit Registration
          </Button>
          <div className="text-center text-xs text-slate-500 pt-2">
            Already registered? <Link to="/login" className="text-blue-900 font-semibold hover:underline">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
