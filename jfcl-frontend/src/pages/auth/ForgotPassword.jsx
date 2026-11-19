import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';
import { HelpCircle } from 'lucide-react';

export const ForgotPassword = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Password reset link sent to demo email address.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-xl flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Reset Password</h2>
          <p className="text-xs text-slate-500 mt-1">Enter your registered email to receive recovery instructions</p>
        </div>
        {submitted ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              A recovery link has been dispatched to <strong>{email}</strong>.
            </p>
            <Link to="/login" className="inline-block text-xs font-semibold text-blue-900 hover:underline">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Registered Institutional Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. user@jfcl.edu.bd" />
            <Button type="submit" variant="primary" className="w-full">Send Recovery Instructions</Button>
            <div className="text-center text-xs text-slate-500 pt-2">
              <Link to="/login" className="text-blue-900 hover:underline">Back to Login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
