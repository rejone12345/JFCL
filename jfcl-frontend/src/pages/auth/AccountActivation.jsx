import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';
import { KeyRound } from 'lucide-react';

export const AccountActivation = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [studentId, setStudentId] = useState('');
  const [activationCode, setActivationCode] = useState('');

  const handleActivate = (e) => {
    e.preventDefault();
    addToast('Account activated successfully! You may now sign in.', 'success');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mx-auto mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Activate Institutional Account</h2>
          <p className="text-xs text-slate-500 mt-1">Enter your assigned ID and the verification token provided by administration</p>
        </div>
        <form onSubmit={handleActivate} className="space-y-4">
          <Input label="Student ID / Teacher ID" required value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. STU1001 or TCH004" />
          <Input label="Activation Code" required value={activationCode} onChange={(e) => setActivationCode(e.target.value)} placeholder="e.g. JFCL-8923-SEC" />
          <Button type="submit" variant="primary" className="w-full">Activate Account</Button>
          <div className="text-center text-xs text-slate-500 pt-2">
            <Link to="/login" className="text-blue-900 hover:underline">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
