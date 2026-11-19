import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';
import { Settings, Shield, Save } from 'lucide-react';

export const AdminSettings = () => {
  const { addToast } = useToast();
  const [config, setConfig] = useState({
    institutionName: 'JFCL School & College',
    tagline: 'Excellence in Education, Character and Innovation',
    eiin: '109823',
    code: '4920',
    board: 'Board of Intermediate and Secondary Education, Dhaka',
    phone: '+880 2-9876543',
    email: 'principal@jfcl.edu.bd',
    address: 'JFCL Campus, Tarakandi, Sarishabari, Jamalpur - 2055'
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Institutional configuration updated successfully (demo)!', 'success');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Institutional System Configuration</h1>
        <p className="text-xs text-slate-500 mt-1">Configure institutional identity, accreditation, and official headers</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
              General Institutional Identity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Institution Name"
                required
                value={config.institutionName}
                onChange={(e) => setConfig({ ...config, institutionName: e.target.value })}
              />
              <Input
                label="Tagline / Motto"
                value={config.tagline}
                onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
              />
            </div>
          </div>

          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
              Board Affiliation & Codes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="EIIN Number"
                required
                value={config.eiin}
                onChange={(e) => setConfig({ ...config, eiin: e.target.value })}
              />
              <Input
                label="School & College Code"
                required
                value={config.code}
                onChange={(e) => setConfig({ ...config, code: e.target.value })}
              />
              <Input
                label="Education Board"
                required
                value={config.board}
                onChange={(e) => setConfig({ ...config, board: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
              Official Contact & Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Telephone"
                value={config.phone}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
              />
              <Input
                label="Principal's Email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <Input
                label="Physical Address"
                value={config.address}
                onChange={(e) => setConfig({ ...config, address: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" icon={Save}>
              Save Configuration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
