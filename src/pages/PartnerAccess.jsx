import { useState } from 'react';
import PartnerOffers from './PartnerOffers';
import { Lock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PIN = '2026';

export default function PartnerAccess() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('partner_access') === 'true');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === PIN) {
      sessionStorage.setItem('partner_access', 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
    }
  };

  if (unlocked) return <PartnerOffers />;

  return (
    <div className="py-24 px-4 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Lock size={24} className="text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-semibold mb-2">Partner Access</h2>
        <p className="text-muted-foreground text-sm mb-8">This page is for partners only. Please enter your access code.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            maxLength={6}
            placeholder="Enter PIN"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            className={`text-center text-lg tracking-widest ${error ? 'border-red-400' : ''}`}
          />
          {error && <p className="text-red-500 text-sm">Incorrect PIN. Please try again.</p>}
          <Button type="submit" className="w-full bg-primary text-primary-foreground rounded-full">Continue</Button>
        </form>
      </div>
    </div>
  );
}