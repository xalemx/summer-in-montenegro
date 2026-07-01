import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Clock, Check, X, Lock } from 'lucide-react';

const STATUS = {
  requested: { label: 'Awaiting your response', style: 'bg-amber-100 text-amber-700', icon: Clock },
  quoted: { label: 'You quoted', style: 'bg-blue-100 text-blue-700', icon: Check },
  declined: { label: 'Declined', style: 'bg-rose-100 text-rose-700', icon: X },
  booked: { label: 'Booked', style: 'bg-emerald-100 text-emerald-700', icon: Lock },
};

function QuoteCard({ q, onRespond }) {
  const [price, setPrice] = useState(q.supplier_price || '');
  const [notes, setNotes] = useState(q.supplier_notes || '');
  const [saving, setSaving] = useState(false);
  const st = STATUS[q.status] || STATUS.requested;
  const Icon = st.icon;
  const open = q.status === 'requested';

  const respond = async (status) => {
    setSaving(true);
    try {
      await base44.functions.invoke('supplierPortal', { action: 'respond_quote', quote_id: q.id, status, supplier_price: price, supplier_notes: notes });
      onRespond();
    } catch (e) { alert('Could not submit'); } finally { setSaving(false); }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-semibold">{q.item_title || 'Quote request'}</p>
          <p className="text-xs text-muted-foreground">{q.reference_number ? `Ref ${q.reference_number} · ` : ''}{q.requested_by ? `from ${q.requested_by}` : ''}{q.due_date ? ` · due ${q.due_date}` : ''}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 ${st.style}`}><Icon size={12} /> {st.label}</span>
      </div>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-3">{q.request_details}</p>
      {!open && (q.supplier_price || q.supplier_notes) && (
        <div className="text-sm bg-muted/40 rounded-lg p-3">
          {q.supplier_price ? <p><span className="text-muted-foreground">Your price:</span> <span className="font-semibold">{q.currency || 'EUR'} {q.supplier_price}</span></p> : null}
          {q.supplier_notes && <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{q.supplier_notes}</p>}
        </div>
      )}
      {open && (
        <div className="space-y-3 border-t border-border pt-3">
          <div><Label>Your price ({q.currency || 'EUR'})</Label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0" /></div>
          <div><Label>Notes for coordinator</Label><Textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} /></div>
          <div className="flex gap-2">
            <Button onClick={() => respond('quoted')} disabled={saving}>{saving ? <Loader2 className="animate-spin" size={16} /> : 'Submit quote'}</Button>
            <Button variant="outline" onClick={() => respond('declined')} disabled={saving}>Decline</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SupplierQuotesTab({ quotes, onRespond }) {
  if (!quotes || quotes.length === 0) return <p className="text-center text-muted-foreground py-10">No quote requests yet. The coordinator will send requests here.</p>;
  return <div className="space-y-4">{quotes.map(q => <QuoteCard key={q.id} q={q} onRespond={onRespond} />)}</div>;
}