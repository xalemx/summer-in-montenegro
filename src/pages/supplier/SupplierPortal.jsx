import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';
import SupplierProfileTab from '@/components/supplier/SupplierProfileTab';
import SupplierAvailabilityTab from '@/components/supplier/SupplierAvailabilityTab';
import SupplierQuotesTab from '@/components/supplier/SupplierQuotesTab';

const TABS = [
  { key: 'profile', label: 'Profile & Photos' },
  { key: 'availability', label: 'Availability' },
  { key: 'quotes', label: 'Quote Requests' },
];

export default function SupplierPortal() {
  const [tab, setTab] = useState('profile');
  const [supplier, setSupplier] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await base44.functions.invoke('supplierPortal', { action: 'me' });
      setSupplier(res.data.supplier);
      setQuotes(res.data.quotes || []);
    } catch (e) {
      const status = e?.response?.status;
      const msg = e?.response?.data?.error;
      if (status === 401) { base44.auth.redirectToLogin('/supplier'); return; }
      setError(msg || 'Unable to load your supplier profile.');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="py-32 flex justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  if (error) return (
    <div className="py-32 px-4 text-center max-w-md mx-auto">
      <p className="font-heading text-xl font-bold mb-2">Supplier Portal</p>
      <p className="text-muted-foreground">{error}</p>
      <button onClick={() => base44.auth.logout('/')} className="mt-4 text-primary underline text-sm">Sign out</button>
    </div>
  );

  const pending = quotes.filter(q => q.status === 'requested').length;

  return (
    <div className="py-10 px-4 md:px-6 min-h-screen bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-1">Supplier Portal</p>
          <h1 className="font-heading text-3xl font-bold">{supplier.supplier_name}</h1>
          <p className="text-sm text-muted-foreground">{supplier.category}{supplier.location && ` · ${supplier.location}`}</p>
        </div>
        <div className="flex gap-1 mb-6 bg-card border border-border rounded-full p-1 w-fit max-w-full overflow-x-auto">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${tab === t.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {t.label}{t.key === 'quotes' && pending > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center text-[10px] bg-rose-500 text-white rounded-full px-1.5">{pending}</span>
              )}
            </button>
          ))}
        </div>
        {tab === 'profile' && <SupplierProfileTab supplier={supplier} onUpdate={s => setSupplier(s)} />}
        {tab === 'availability' && <SupplierAvailabilityTab supplier={supplier} onUpdate={s => setSupplier(s)} />}
        {tab === 'quotes' && <SupplierQuotesTab quotes={quotes} onRespond={() => load()} />}
        <div className="mt-8 text-center">
          <button onClick={() => base44.auth.logout('/')} className="text-xs text-muted-foreground hover:text-foreground underline">Sign out</button>
        </div>
      </div>
    </div>
  );
}