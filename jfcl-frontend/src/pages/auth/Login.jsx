import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { GraduationCap, Shield, User, MailCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';
import { useToast } from '../../components/common/Toast';

export const Login = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.role || 'admin');
  const [identifier, setIdentifier] = useState(location.state?.identifier || '');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Two-Factor Email OTP state (Teacher & Student)
  const [otpStep, setOtpStep] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const { login, verifyOtp, resendOtp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const navigateByRole = (role) => {
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'teacher') navigate('/teacher/dashboard');
    else if (role === 'student') navigate('/student/dashboard');
  };

  const resetOtpFlow = () => {
    setOtpStep(false);
    setTempToken('');
    setMaskedEmail('');
    setOtp('');
    setResendCooldown(0);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIdentifier('');
    setPassword('');
    resetOtpFlow();
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

    if (result.success && result.requires2FA) {
      setOtpStep(true);
      setTempToken(result.tempToken);
      setMaskedEmail(result.maskedEmail);
      setOtp('');
      setResendCooldown(60);
      addToast(`Verification code sent to ${result.maskedEmail}`, 'info');
      return;
    }

    if (result.success) {
      addToast(`Welcome back, ${result.user.name}!`, 'success');
      navigateByRole(activeTab);
    } else {
      addToast(result.message || 'Invalid email or password', 'error');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      addToast('Please enter the 6-digit verification code from your email.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const result = await verifyOtp(tempToken, otp);
    setIsSubmitting(false);

    if (result.success) {
      addToast(`Welcome back, ${result.user.name}!`, 'success');
      navigateByRole(result.user.role || activeTab);
    } else {
      addToast(result.message || 'Invalid verification code', 'error');
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isSubmitting) return;
    setIsSubmitting(true);
    const result = await resendOtp(tempToken);
    setIsSubmitting(false);

    if (result.success) {
      setOtp('');
      setResendCooldown(60);
      addToast(result.message || `New code sent to ${maskedEmail}`, 'success');
    } else {
      addToast(result.message || 'Could not resend verification code', 'error');
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
            <img
              src="/logo.jpg"
              alt="JFCL Logo"
              className="w-14 h-14 rounded-2xl object-contain mx-auto mb-3 shadow-md bg-white p-1"
            />
            <h2 className="text-xl font-bold">Institutional Portal Login</h2>
            <p className="text-xs text-slate-300 mt-1">
              {otpStep
                ? 'Two-Factor Email Verification Required'
                : 'Authorized credentials required for portal access'}
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
            <button
              type="button"
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
              type="button"
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
              type="button"
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

          {!otpStep ? (
            /* Step 1: Primary Credentials Form */
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
          ) : (
            /* Step 2: 6-Digit Email OTP Verification */
            <form onSubmit={handleVerifyOtp} className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center space-y-1.5">
                <div className="w-10 h-10 bg-blue-900 text-amber-300 rounded-full flex items-center justify-center mx-auto">
                  <MailCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Email Verification Required</h3>
                <p className="text-xs text-slate-600">
                  Enter the 6-digit code sent to <strong className="text-slate-900">{maskedEmail}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-center">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-center font-mono text-2xl font-bold tracking-[0.45em] text-slate-900 focus:border-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting || otp.length !== 6}
              >
                {isSubmitting ? 'Verifying Code...' : 'Verify & Sign In'}
              </Button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={resetOtpFlow}
                  className="text-slate-600 hover:text-blue-900 font-semibold inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to credentials
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || isSubmitting}
                  className={`font-semibold inline-flex items-center gap-1 ${
                    resendCooldown > 0
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-blue-900 hover:underline'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend verification code'}
                </button>
              </div>
            </form>
          )}

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
