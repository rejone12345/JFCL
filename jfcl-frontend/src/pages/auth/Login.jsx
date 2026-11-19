import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { GraduationCap, Shield, User, Lock } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';
import { useToast } from '../../components/common/Toast';

export const Login = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIdentifier('');
    setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      addToast('Please enter your credentials', 'warning');
      return;
    }

    setIsSubmitting(true);
    const result = await login(identifier, password, activeTab);
    setIsSubmitting(false);

    if (result.success) {
      addToast(`Welcome back, ${result.user.name}!`, 'success');
      if (activeTab === 'admin') navigate('/admin/dashboard');
      else if (activeTab === 'teacher') navigate('/teacher/dashboard');
      else if (activeTab === 'student') navigate('/student/dashboard');
    } else {
      addToast(result.message || 'Invalid email or password', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between">
      <div className="p-4 flex justify-between items-center max-w-6xl mx-auto w-full">
        <Link to="/" className="text-white text-xs font-semibold hover:text-amber-300">
          ← Back to Public Website
        </Link>
        <LanguageSwitcher />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-950 p-6 text-white text-center">
            <div className="w-12 h-12 bg-blue-900 text-amber-400 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Institutional Portal Login</h2>
            <p className="text-xs text-slate-300 mt-1">
              Authorized credentials required for portal access
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
            <button
              onClick={() => handleTabChange('admin')}
              className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'admin'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Admin
            </button>
            <button
              onClick={() => handleTabChange('teacher')}
              className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'teacher'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Teacher
            </button>
            <button
              onClick={() => handleTabChange('student')}
              className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'student'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Student
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <Input
              label={
                activeTab === 'student'
                  ? 'Student Roll Number or Email'
                  : activeTab === 'teacher'
                  ? 'Teacher ID or Email'
                  : 'Admin Email or Username'
              }
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={
                activeTab === 'student'
                  ? 'e.g. 101 or student@jfcl.edu.bd'
                  : activeTab === 'teacher'
                  ? 'e.g. TCH004 or teacher@jfcl.edu.bd'
                  : 'e.g. admin@jfcl.edu.bd'
              }
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <Link to="/forgot-password" className="text-blue-900 font-semibold hover:underline">
                Forgot password?
              </Link>
              <Link to="/account-activation" className="text-slate-600 hover:text-blue-900">
                Activate account
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : `Sign In as ${activeTab.toUpperCase()}`}
            </Button>
          </form>

          {/* Footer note */}
          <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-500">
            Need student registration?{' '}
            <Link to="/student/signup" className="text-blue-900 font-bold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} JFCL School & College Institutional Information System
      </div>
    </div>
  );
};
