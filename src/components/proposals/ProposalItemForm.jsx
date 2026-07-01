import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ITEM_TYPES = ['Accommodation', 'Transfer', 'Activity', 'Restaurant', 'Guide', 'Car Rental', 'Boat Trip', 'Experience', 'Other'];

export function ProposalItemForm({ item, proposalId, travelProjectId, suppliers, onSave, onClose }) {
  const [form, setForm] = useState({
    proposal_id: proposalId,
    travel_project_id: travelProjectId,
    day_number: 1,
    item_type: 'Accommodation',
    title: '',
    description: '',
    supplier_id: '',
    location: '',
    start_time: '',
    end_time: '',
    internal_cost: 0,
    customer_price: 0,
    notes: '',
    sort_order: 0,
  });

  useEffect(() => {
    if (item) setForm({ ...form, ...item });
  }, [item]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = () => {
    if (!form.title) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card rounded-t-2xl">
          <h3 className="font-heading text-lg font-bold">{item ? 'Edit Item' : 'Add Item'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg"><X size={20} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Item type</Label>
              <select value={form.item_type} onChange={e => set('item_type', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                {ITEM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Day number</Label>
              <Input type="number" min="1" value={form.day_number} onChange={e => set('day_number', parseInt(e.target.value) || 1)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Title *</Label>
            <Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Boutique hotel in Kotor" />
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} placeholder="What's included, details..." />
          </div>
          <div className="space-y-1.5">
            <Label>Supplier</Label>
            <select value={form.supplier_id} onChange={e => set('supplier_id', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">— None —</option>
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.supplier_name} ({s.category})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Kotor" />
            </div>
            <div className="space-y-1.5">
              <Label>Sort order</Label>
              <Input type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value) || 0)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Start time</Label>
              <Input value={form.start_time} onChange={e => set('start_time', e.target.value)} placeholder="14:00" />
            </div>
            <div className="space-y-1.5">
              <Label>End time</Label>
              <Input value={form.end_time} onChange={e => set('end_time', e.target.value)} placeholder="10:00" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Internal cost (€)</Label>
              <Input type="number" step="0.01" value={form.internal_cost} onChange={e => set('internal_cost', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer price (€)</Label>
              <Input type="number" step="0.01" value={form.customer_price} onChange={e => set('customer_price', parseFloat(e.target.value) || 0)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Internal notes..." />
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-border sticky bottom-0 bg-card rounded-b-2xl">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-full">Cancel</Button>
          <Button onClick={submit} disabled={!form.title} className="flex-1 bg-primary text-primary-foreground rounded-full">{item ? 'Save' : 'Add Item'}</Button>
        </div>
      </div>
    </div>
  );
}