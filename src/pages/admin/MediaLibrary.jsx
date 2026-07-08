import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Loader2, Upload, Search, Trash2, ImageIcon, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = ['Hotel', 'Restaurant', 'Boat', 'Beach', 'Activity', 'Room', 'Scenery', 'Food', 'Other'];

export default function MediaLibrary() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('');
  const [uploadCat, setUploadCat] = useState('Other');
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setAssets(await base44.entities.MediaAsset.list('-created_date', 500)); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onUpload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const up = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.MediaAsset.create({ url: up.file_url, title: file.name.replace(/\.[^.]+$/, ''), category: uploadCat });
      load();
    } catch (err) { toast.error('Upload failed'); } finally { setUploading(false); e.target.value = ''; }
  };

  const remove = async (id) => {
    if (!confirm('Remove this photo from the library? Suppliers using it will keep their reference.')) return;
    try { await base44.entities.MediaAsset.delete(id); setAssets(prev => prev.filter(a => a.id !== id)); }
    catch (e) { toast.error('Could not delete photo'); }
  };

  const filtered = assets.filter(a => {
    if (cat && a.category !== cat) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!(`${a.title || ''} ${a.tags || ''} ${a.category || ''}`.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  return (
    <div className="py-8 px-4 md:px-6 min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/admin/suppliers" className="p-2 rounded-lg hover:bg-muted"><ArrowLeft size={20} /></Link>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-1">Admin</p>
            <h1 className="font-heading text-3xl font-bold">Media Library</h1>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4 mb-5 shadow-sm">
          <p className="text-sm text-muted-foreground mb-3">Upload a photo once. Every supplier can reuse it from the picker — no re-uploading.</p>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <select value={uploadCat} onChange={e => setUploadCat(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="inline-flex items-center justify-center gap-2 text-sm bg-primary text-primary-foreground rounded-full px-5 py-2.5 cursor-pointer hover:bg-primary/90">
              {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />} Upload photo
              <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
            </label>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4 mb-5 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search title or tag…" className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm" />
            </div>
            <select value={cat} onChange={e => setCat(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">All categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <p className="text-xs text-muted-foreground mt-3">{filtered.length} of {assets.length} photos</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground"><Loader2 className="animate-spin inline mr-2" size={18} /> Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center shadow-sm">
            <ImageIcon size={32} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">No photos in the library yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(a => (
              <div key={a.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm group">
                <div className="relative aspect-square bg-muted">
                  <img src={a.url} alt={a.title} className="w-full h-full object-cover" />
                  <button onClick={() => remove(a.id)} className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"><Trash2 size={14} /></button>
                  <span className="absolute top-2 left-2 text-[10px] bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full">{a.category}</span>
                </div>
                <div className="p-2.5">
                  <p className="text-sm font-medium truncate">{a.title || 'Untitled'}</p>
                  {a.tags && <p className="text-xs text-muted-foreground truncate">{a.tags}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}