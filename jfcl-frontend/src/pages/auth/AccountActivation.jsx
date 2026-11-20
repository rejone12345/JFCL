import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';
import { authApi } from '../../services/api';
import { KeyRound, ShieldCheck } from 'lucide-react';

export const AccountActivation = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [idOrIdentifier, setIdOrIdentifier] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleActivate = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      addToast('Password must be at least 8 characters long.', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    try {
      setLoading(true);
      await authApi.activateAccount({
        idOrIdentifier: idOrIdentifier.trim(),
        activationCode: activationCode.trim(),
        password,
        confirmPassword,
      });

      addToast('Account activated successfully! You may now sign in with your password.', 'success');
      navigate('/login');
    } catch (err) {
      addToast(err.message || 'Activation failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mx-auto mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Activate Institutional Account</h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your Teacher ID / Student ID and the Activation Code provided by administration
          </p>
        </div>

        <form onSubmit={handleActivate} className="space-y-4">
          <Input
            label="Teacher ID / Student ID / Email"
            required
            value={idOrIdentifier}
            onChange={(e) => setIdOrIdentifier(e.target.value)}
            placeholder="e.g. TCH17424... or STU1001 or name@jfcl.edu.bd"
          />
          <Input
            label="Activation Code"
            required
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            placeholder="e.g. JFCL-TCH-ABCD or JFCL-DEMO-5555"
          />
          <Input
            label="Set New Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
          />
          <Input
            label="Confirm New Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
          />

          <Button type="submit" variant="primary" className="w-full mt-2" disabled={loading}>
            {loading ? 'Activating Account...' : 'Activate Account'}
          </Button>

          <div className="text-center text-xs text-slate-500 pt-2">
            <Link to="/login" className="text-blue-900 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
