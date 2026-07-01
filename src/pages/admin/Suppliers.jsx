import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Plus, Search, Pencil, ArrowLeft } from 'lucide-react';

const CATEGORIES = ['Hotel', 'Apartment', 'Villa', 'Transfer Company', 'Private Driver', 'Boat Operator', 'Activity Provider', 'Restaurant', 'Tour Guide', 'National Park', 'Other'];
const STATUS_STYLE = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-slate-200 text-slate-600',
  preferred: 'bg-amber-100 text-amber-700',
  needs_review: 'bg-orange-100 text-orange-700',
};

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const s = await base44.entities.Supplier.list('-created_date', 500);
        setSuppliers(s);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, []);

  const filtered = suppliers.filter(s => {
    if (filterCat && s.category !== filterCat) return false;
    if (filterStatus && s.status !== filterStatus) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!(`${s.supplier_name} ${s.location || ''} ${s.contact_name || ''}`.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  return (
    <div className="py-8 px-4 md:px-6 min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-1">Admin</p>
            <h1 className="font-heading text-3xl font-bold">Suppliers</h1>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to site</Link>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-5 shadow-sm">
          <div className="grid sm:grid-cols-4 gap-3">
            <div className="relative sm:col-span-2">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, location, contact..." className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm" />
            </div>
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">All categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm capitalize">
              <option value="">All statuses</option>
              {['active', 'inactive', 'preferred', 'needs_review'].map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
          </div>
          <p className="text-xs text-muted-foreground mt-3">{filtered.length} of {suppliers.length} suppliers</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Link to="/admin/suppliers/new" className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold rounded-full px-5 py-2.5 text-sm shadow-sm hover:brightness-105">
            <Plus size={16} /> Add Supplier
          </Link>
          <Link to="/admin/proposal-builder" className="text-sm text-primary underline">Proposal Builder →</Link>
        </div>

        {loading && <p className="text-muted-foreground text-center py-10">Loading suppliers…</p>}

        {!loading && filtered.length === 0 && (
          <div className="bg-card rounded-2xl border border-border p-12 text-center shadow-sm">
            <p className="text-muted-foreground mb-4">No suppliers found.</p>
            <Link to="/admin/suppliers/new" className="text-primary underline">Add your first supplier</Link>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(s => (
              <Link key={s.id} to={`/admin/suppliers/${s.id}`} className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-lg font-bold leading-tight">{s.supplier_name}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLE[s.status] || 'bg-slate-100'}`}>{(s.status || '').replace('_', ' ')}</span>
                </div>
                <p className="text-xs text-primary font-medium mb-1">{s.category}</p>
                {s.location && <p className="text-sm text-muted-foreground mb-2">📍 {s.location}</p>}
                {s.contact_name && <p className="text-xs text-muted-foreground">Contact: {s.contact_name}</p>}
                {s.phone && <p className="text-xs text-muted-foreground">📞 {s.phone}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}