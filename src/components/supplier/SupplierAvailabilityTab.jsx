import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Circle, AlertCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const OPTIONS = [
  { value: 'available', label: 'Available — accepting new bookings', icon: Circle, color: 'text-green-600' },
  { value: 'limited', label: 'Limited availability', icon: AlertCircle, color: 'text-amber-600' },
  { value: 'fully_booked', label: 'Fully booked', icon: XCircle, color: 'text-rose-600' },
];

export default function SupplierAvailabilityTab({ supplier, onUpdate }) {
  const [status, setStatus] = useState(supplier.availability_status || 'available');
  const [notes, setNotes] = useState(supplier.availability_notes || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await base44.functions.invoke('supplierPortal', { action: 'update_availability', availability_status: status, availability_notes: notes });
      onUpdate(res.data.supplier);
      toast.success('Availability updated');
    } catch (e) { toast.error('Could not save availability'); } finally { setSaving(false); }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4">
      <h2 className="font-heading text-lg font-bold">Availability</h2>
      <p className="text-sm text-muted-foreground">Let the coordinator know your current capacity for new bookings.</p>
      <div className="space-y-2">
        {OPTIONS.map(o => {
          const Icon = o.icon;
          return (
            <button key={o.value} onClick={() => setStatus(o.value)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${status === o.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}`}>
              <Icon className={o.color} size={18} />
              <span className="text-sm font-medium">{o.label}</span>
            </button>
          );
        })}
      </div>
      <div><Label>Notes (optional)</Label><Textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Fully booked 10–17 Aug; availability after 20 Aug" /></div>
      <Button onClick={save} disabled={saving}>{saving ? <Loader2 className="animate-spin" size={16} /> : 'Save availability'}</Button>
    </div>
  );
}