import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Trash2, Loader2, Library } from 'lucide-react';
import MediaLibraryPicker from '@/components/media/MediaLibraryPicker';

export default function SupplierProfileTab({ supplier, onUpdate }) {
  const [f, setF] = useState({
    supplier_name: supplier.supplier_name || '',
    contact_name: supplier.contact_name || '',
    phone: supplier.phone || '',
    whatsapp: supplier.whatsapp || '',
    website: supplier.website || '',
    location: supplier.location || '',
    description: supplier.description || '',
    services: supplier.services || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await base44.functions.invoke('supplierPortal', { action: 'update_profile', fields: f });
      onUpdate(res.data.supplier);
      alert('Profile saved');
    } catch (e) { alert('Could not save'); } finally { setSaving(false); }
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const up = await base44.integrations.Core.UploadFile({ file });
      const res = await base44.functions.invoke('supplierPortal', { action: 'upload_photo', photo_url: up.file_url });
      onUpdate(res.data.supplier);
    } catch (err) { alert('Upload failed'); } finally { setUploading(false); e.target.value = ''; }
  };

  const removePhoto = async (i) => {
    try {
      const res = await base44.functions.invoke('supplierPortal', { action: 'remove_photo', index: i });
      onUpdate(res.data.supplier);
    } catch (e) { alert('Could not remove'); }
  };

  const pickFromLibrary = async (urls) => {
    for (const url of urls) {
      try {
        const res = await base44.functions.invoke('supplierPortal', { action: 'upload_photo', photo_url: url });
        onUpdate(res.data.supplier);
      } catch (e) { /* ignore */ }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4">
        <h2 className="font-heading text-lg font-bold">Profile details</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Supplier name</Label><Input value={f.supplier_name} onChange={e => setF({ ...f, supplier_name: e.target.value })} /></div>
          <div><Label>Contact name</Label><Input value={f.contact_name} onChange={e => setF({ ...f, contact_name: e.target.value })} /></div>
          <div><Label>Phone</Label><Input value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} /></div>
          <div><Label>WhatsApp</Label><Input value={f.whatsapp} onChange={e => setF({ ...f, whatsapp: e.target.value })} /></div>
          <div><Label>Website</Label><Input value={f.website} onChange={e => setF({ ...f, website: e.target.value })} /></div>
          <div><Label>Location</Label><Input value={f.location} onChange={e => setF({ ...f, location: e.target.value })} /></div>
        </div>
        <div><Label>Description</Label><Textarea rows={3} value={f.description} onChange={e => setF({ ...f, description: e.target.value })} /></div>
        <div><Label>Services offered</Label><Textarea rows={3} value={f.services} onChange={e => setF({ ...f, services: e.target.value })} /></div>
        <Button onClick={save} disabled={saving}>{saving ? <Loader2 className="animate-spin" size={16} /> : 'Save profile'}</Button>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <h2 className="font-heading text-lg font-bold mb-3">Photos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {(supplier.photos || []).map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted group">
              <img src={url} className="w-full h-full object-cover" alt="" />
              <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="inline-flex items-center gap-2 text-sm bg-secondary text-secondary-foreground rounded-full px-4 py-2 cursor-pointer hover:opacity-90">
            {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
            Upload photo
            <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
          <button onClick={() => setShowPicker(true)} className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-full px-4 py-2 hover:bg-primary/90">
            <Library size={16} /> Pick from Media Library
          </button>
        </div>
      </div>

      <MediaLibraryPicker open={showPicker} onClose={() => setShowPicker(false)} exclude={supplier.photos || []} onSelect={(urls) => pickFromLibrary(urls)} />
    </div>
  );
}