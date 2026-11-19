import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';

export const StudentSettings = () => {
  const { addToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    addToast('Password updated successfully (demo mode)!', 'success');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage portal password and communication preferences</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Change Password</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            label="New Password"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};
