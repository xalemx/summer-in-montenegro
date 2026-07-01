import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Pencil, ArrowLeft, Mail, Phone, Globe, MapPin, User, FileText, Percent, UserPlus } from 'lucide-react';

const STATUS_STYLE = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-slate-200 text-slate-600',
  preferred: 'bg-amber-100 text-amber-700',
  needs_review: 'bg-orange-100 text-orange-700',
};

function Field({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

export default function SupplierDetail() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ item_title: '', request_details: '', due_date: '' });
  const [me, setMe] = useState(null);
  const [creatingQuote, setCreatingQuote] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [s, qs] = await Promise.all([
          base44.entities.Supplier.get(id),
          base44.entities.SupplierQuote.filter({ supplier_id: id }, '-created_date', 100),
        ]);
        setSupplier(s);
        setQuotes(qs);
      } catch (e) { console.error(e); } finally { setLoading(false); }
      try { const u = await base44.auth.me(); setMe(u); } catch (e2) {}
    })();
  }, [id]);

  const inviteSupplier = async () => {
    if (!supplier.email) { alert('Add an email to this supplier first.'); return; }
    try {
      await base44.users.inviteUser(supplier.email, 'user');
      alert(`Invitation sent to ${supplier.email}. They can log in and open the Supplier Portal.`);
    } catch (e) { alert('Could not invite: ' + (e?.response?.data?.error || e.message)); }
  };

  const createQuote = async () => {
    if (!quoteForm.request_details) { alert('Add request details.'); return; }
    setCreatingQuote(true);
    try {
      await base44.entities.SupplierQuote.create({
        supplier_id: supplier.id,
        supplier_name: supplier.supplier_name,
        request_details: quoteForm.request_details,
        item_title: quoteForm.item_title,
        due_date: quoteForm.due_date,
        requested_by: (me?.full_name || 'Coordinator').split(' ')[0],
        status: 'requested',
        currency: 'EUR',
      });
      setQuoteForm({ item_title: '', request_details: '', due_date: '' });
      setShowQuoteForm(false);
      setQuotes(await base44.entities.SupplierQuote.filter({ supplier_id: id }, '-created_date', 100));
    } catch (e) { alert('Could not create quote request'); } finally { setCreatingQuote(false); }
  };

  if (loading) return <div className="py-32 text-center text-muted-foreground">Loading…</div>;
  if (!supplier) return <div className="py-32 text-center"><p className="text-muted-foreground mb-4">Supplier not found.</p><Link to="/admin/suppliers" className="text-primary underline">Back to suppliers</Link></div>;

  return (
    <div className="py-8 px-4 md:px-6 min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/admin/suppliers" className="p-2 rounded-lg hover:bg-muted"><ArrowLeft size={20} /></Link>
          <div className="flex-1">
            <h1 className="font-heading text-2xl font-bold">{supplier.supplier_name}</h1>
            <p className="text-sm text-primary">{supplier.category}{supplier.location && ` · ${supplier.location}`}</p>
          </div>
          <Link to={`/admin/suppliers/${id}/edit`} className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90">
            <Pencil size={15} /> Edit
          </Link>
          <button onClick={inviteSupplier} className="inline-flex items-center gap-2 border border-primary text-primary rounded-full px-4 py-2 text-sm font-semibold hover:bg-primary/5">
            <UserPlus size={15} /> Invite to portal
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Status + overview */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_STYLE[supplier.status] || 'bg-slate-100'}`}>{(supplier.status || '').replace('_', ' ')}</span>
              {supplier.commission_percentage > 0 && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Percent size={15} className="text-primary" /> {supplier.commission_percentage}% commission
                </span>
              )}
            </div>
            {supplier.description && <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{supplier.description}</p>}
          </div>

          {/* Contact */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <h2 className="font-heading text-lg font-bold mb-4">Contact</h2>
            <div className="space-y-3 text-sm">
              {supplier.contact_name && <div className="flex items-center gap-2"><User size={16} className="text-muted-foreground" /> {supplier.contact_name}</div>}
              {supplier.phone && <div className="flex items-center gap-2"><Phone size={16} className="text-muted-foreground" /> {supplier.phone}</div>}
              {supplier.whatsapp && <div className="flex items-center gap-2"><Phone size={16} className="text-green-600" /> {supplier.whatsapp}</div>}
              {supplier.email && <div className="flex items-center gap-2"><Mail size={16} className="text-muted-foreground" /> {supplier.email}</div>}
              {supplier.website && <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline"><Globe size={16} /> {supplier.website}</a>}
              {supplier.location && <div className="flex items-center gap-2"><MapPin size={16} className="text-muted-foreground" /> {supplier.location}</div>}
            </div>
          </div>

          {/* Services */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <h2 className="font-heading text-lg font-bold mb-4">Services</h2>
            {supplier.services ? <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{supplier.services}</p> : <p className="text-sm text-muted-foreground italic">No services listed.</p>}
          </div>

          {/* Internal info */}
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5 md:col-span-2">
            <h2 className="font-heading text-lg font-bold mb-4 text-primary">Internal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Commission %" value={supplier.commission_percentage ? `${supplier.commission_percentage}%` : ''} />
              {supplier.internal_pricing_notes && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Internal pricing notes</p>
                  <p className="text-sm whitespace-pre-wrap">{supplier.internal_pricing_notes}</p>
                </div>
              )}
              {supplier.internal_notes && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Internal notes</p>
                  <p className="text-sm whitespace-pre-wrap">{supplier.internal_notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quote requests */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold">Quote Requests</h2>
              <button onClick={() => setShowQuoteForm(v => !v)} className="text-sm text-primary font-medium hover:underline">+ New request</button>
            </div>
            {showQuoteForm && (
              <div className="space-y-3 mb-4 p-4 rounded-xl bg-muted/30">
                <input className="w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="Item / service title (optional)" value={quoteForm.item_title} onChange={e => setQuoteForm({ ...quoteForm, item_title: e.target.value })} />
                <textarea className="w-full rounded-md border border-input px-3 py-2 text-sm" rows={3} placeholder="What do you need? Dates, pax, specifics…" value={quoteForm.request_details} onChange={e => setQuoteForm({ ...quoteForm, request_details: e.target.value })} />
                <div className="flex items-center gap-3">
                  <input type="date" className="rounded-md border border-input px-3 py-2 text-sm" value={quoteForm.due_date} onChange={e => setQuoteForm({ ...quoteForm, due_date: e.target.value })} />
                  <button onClick={createQuote} disabled={creatingQuote} className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50">{creatingQuote ? 'Sending…' : 'Send request'}</button>
                </div>
              </div>
            )}
            {quotes.length === 0 ? <p className="text-sm text-muted-foreground italic">No quote requests sent to this supplier yet.</p> : (
              <div className="space-y-3">
                {quotes.map(q => (
                  <div key={q.id} className="border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{q.item_title || 'Quote request'}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${q.status === 'quoted' ? 'bg-blue-100 text-blue-700' : q.status === 'declined' ? 'bg-rose-100 text-rose-700' : q.status === 'booked' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{q.status.replace('_', ' ')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{q.request_details}</p>
                    {q.due_date && <p className="text-xs text-muted-foreground mt-1">Due: {q.due_date}</p>}
                    {q.status !== 'requested' && (
                      <div className="mt-2 text-sm bg-muted/40 rounded-lg p-2">
                        {q.supplier_price ? <p>Supplier quote: <span className="font-semibold">{q.currency || 'EUR'} {q.supplier_price}</span></p> : null}
                        {q.supplier_notes && <p className="text-muted-foreground whitespace-pre-wrap">{q.supplier_notes}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Photos */}
          {supplier.photos && supplier.photos.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm md:col-span-2">
              <h2 className="font-heading text-lg font-bold mb-4">Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {supplier.photos.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="aspect-square rounded-xl overflow-hidden bg-muted">
                    <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {supplier.documents && supplier.documents.length > 0 && (
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm md:col-span-2">
              <h2 className="font-heading text-lg font-bold mb-4">Documents</h2>
              <div className="space-y-2">
                {supplier.documents.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline p-2 rounded-lg hover:bg-muted">
                    <FileText size={16} /> {url.split('/').pop() || `Document ${i + 1}`}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}