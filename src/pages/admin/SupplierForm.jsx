import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import MediaLibraryPicker from '@/components/media/MediaLibraryPicker';

const CATEGORIES = ['Hotel', 'Apartment', 'Villa', 'Transfer Company', 'Private Driver', 'Boat Operator', 'Activity Provider', 'Restaurant', 'Tour Guide', 'National Park', 'Other'];
const STATUSES = ['active', 'inactive', 'preferred', 'needs_review'];

export default function SupplierForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    supplier_name: '', category: 'Hotel', location: '', contact_name: '',
    email: '', phone: '', whatsapp: '', website: '',
    description: '', services: '', internal_notes: '',
    status: 'active', commission_percentage: 0, internal_pricing_notes: '',
    photos: [], documents: [],
  });
  const [loading, setLoading] = useState(isEdit);
  const [busy, setBusy] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const s = await base44.entities.Supplier.get(id);
        setForm({
          supplier_name: s.supplier_name || '', category: s.category || 'Hotel', location: s.location || '',
          contact_name: s.contact_name || '', email: s.email || '', phone: s.phone || '',
          whatsapp: s.whatsapp || '', website: s.website || '', description: s.description || '',
          services: s.services || '', internal_notes: s.internal_notes || '', status: s.status || 'active',
          commission_percentage: s.commission_percentage || 0, internal_pricing_notes: s.internal_pricing_notes || '',
          photos: s.photos || [], documents: s.documents || [],
        });
      } catch (e) { alert('Supplier not found'); navigate('/admin/suppliers'); } finally { setLoading(false); }
    })();
  }, [id]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const addUrl = (k) => setForm(p => ({ ...p, [k]: [...p[k], ''] }));
  const setUrl = (k, i, v) => setForm(p => {
    const arr = [...p[k]]; arr[i] = v; return { ...p, [k]: arr };
  });
  const removeUrl = (k, i) => setForm(p => {
    const arr = [...p[k]]; arr.splice(i, 1); return { ...p, [k]: arr };
  });

  const save = async () => {
    if (!form.supplier_name || !form.category) return;
    setBusy(true);
    const payload = {
      ...form,
      photos: form.photos.filter(u => u.trim()),
      documents: form.documents.filter(u => u.trim()),
      commission_percentage: Number(form.commission_percentage) || 0,
    };
    try {
      if (isEdit) {
        await base44.entities.Supplier.update(id, payload);
        navigate(`/admin/suppliers/${id}`);
      } else {
        const created = await base44.entities.Supplier.create(payload);
        navigate(`/admin/suppliers/${created.id}`);
      }
    } catch (e) { alert('Could not save supplier'); } finally { setBusy(false); }
  };

  if (loading) return <div className="py-32 text-center text-muted-foreground">Loading…</div>;

  return (
    <div className="py-8 px-4 md:px-6 min-h-screen bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to={isEdit ? `/admin/suppliers/${id}` : '/admin/suppliers'} className="p-2 rounded-lg hover:bg-muted">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-heading text-2xl font-bold">{isEdit ? 'Edit Supplier' : 'Add Supplier'}</h1>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Supplier name *</Label>
              <Input value={form.supplier_name} onChange={e => set('supplier_name', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Kotor, Budva..." />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm capitalize">
                {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Contact person</Label>
              <Input value={form.contact_name} onChange={e => set('contact_name', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>WhatsApp</Label>
              <Input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+382..." />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Website</Label>
            <Input value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://..." />
          </div>

          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Services offered</Label>
            <Textarea rows={2} value={form.services} onChange={e => set('services', e.target.value)} placeholder="e.g. Airport transfers, private tours..." />
          </div>

          {/* Pricing & commission (internal) */}
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Internal — not shown to customers</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Commission %</Label>
                <Input type="number" step="0.1" value={form.commission_percentage} onChange={e => set('commission_percentage', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Internal pricing notes</Label>
              <Textarea rows={2} value={form.internal_pricing_notes} onChange={e => set('internal_pricing_notes', e.target.value)} placeholder="Net rates, seasonal pricing, deals..." />
            </div>
            <div className="space-y-1.5">
              <Label>Internal notes</Label>
              <Textarea rows={2} value={form.internal_notes} onChange={e => set('internal_notes', e.target.value)} placeholder="General internal notes..." />
            </div>
          </div>

          {/* Photos */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Photos</Label>
              <button type="button" onClick={() => setShowPicker(true)} className="text-xs text-primary flex items-center gap-1 hover:underline"><Plus size={14} /> Add from Media Library</button>
            </div>
            {form.photos.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {form.photos.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted group">
                    <img src={url} className="w-full h-full object-cover" alt="" />
                    <button type="button" onClick={() => removeUrl('photos', i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No photos yet — pick from the shared library.</p>
            )}
          </div>

          <MediaLibraryPicker open={showPicker} onClose={() => setShowPicker(false)} exclude={form.photos} onSelect={(urls) => set('photos', Array.from(new Set([...form.photos, ...urls])))} />

          {/* Documents */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Documents (URLs)</Label>
              <button onClick={() => addUrl('documents')} className="text-xs text-primary flex items-center gap-1 hover:underline"><Plus size={14} /> Add document URL</button>
            </div>
            {form.documents.map((url, i) => (
              <div key={i} className="flex gap-2">
                <Input value={url} onChange={e => setUrl('documents', i, e.target.value)} placeholder="https://... contract.pdf" />
                <button onClick={() => removeUrl('documents', i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <Button variant="outline" onClick={() => navigate(isEdit ? `/admin/suppliers/${id}` : '/admin/suppliers')} className="rounded-full flex-1">Cancel</Button>
          <Button onClick={save} disabled={busy || !form.supplier_name} className="bg-primary text-primary-foreground rounded-full flex-1">
            <Save size={16} className="mr-1" /> {isEdit ? 'Save Changes' : 'Create Supplier'}
          </Button>
        </div>
      </div>
    </div>
  );
}