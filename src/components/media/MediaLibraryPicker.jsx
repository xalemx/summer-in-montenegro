import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, Upload, Search, X, Check, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = ['Hotel', 'Restaurant', 'Boat', 'Beach', 'Activity', 'Room', 'Scenery', 'Food', 'Other'];

export default function MediaLibraryPicker({ open, onClose, onSelect, exclude = [] }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('');
  const [selected, setSelected] = useState([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const a = await base44.entities.MediaAsset.list('-created_date', 500);
      setAssets(a);
    } catch (e) { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { if (open) { load(); setSelected([]); } }, [open]);

  const filtered = assets.filter(a => {
    if (cat && a.category !== cat) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!(`${a.title || ''} ${a.tags || ''} ${a.category || ''}`.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const toggle = (url) => setSelected(s => s.includes(url) ? s.filter(u => u !== url) : [...s, url]);

  const onUpload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const up = await base44.integrations.Core.UploadFile({ file });
      const created = await base44.entities.MediaAsset.create({
        url: up.file_url,
        title: file.name.replace(/\.[^.]+$/, ''),
        category: cat || 'Other',
      });
      setAssets(prev => [created, ...prev]);
      setSelected(prev => [...prev, up.file_url]);
    } catch (err) { alert('Upload failed'); } finally { setUploading(false); e.target.value = ''; }
  };

  const confirm = () => { onSelect(selected); setSelected([]); onClose(); };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl border border-border shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-heading text-lg font-bold">Media Library</h3>
            <p className="text-xs text-muted-foreground">Shared photos — reuse across every supplier, no re-uploading.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted"><X size={18} /></button>
        </div>
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title or tag…" className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm" />
            </div>
            <select value={cat} onChange={e => setCat(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="">All categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="inline-flex items-center justify-center gap-2 text-sm bg-primary text-primary-foreground rounded-full px-4 py-2 cursor-pointer hover:bg-primary/90 whitespace-nowrap">
              {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />} Upload new
              <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">{loading ? 'Loading…' : `${filtered.length} photos in library · ${selected.length} selected`}</p>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground"><Loader2 className="animate-spin inline mr-2" size={18} /> Loading library…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground"><ImageIcon size={28} className="mx-auto mb-2" /> No photos yet — upload one to start your library.</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filtered.map(a => {
                const isSel = selected.includes(a.url);
                const used = exclude.includes(a.url);
                return (
                  <button key={a.id} type="button" onClick={() => toggle(a.url)} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition ${isSel ? 'border-primary ring-2 ring-primary' : 'border-border hover:border-primary/40'}`}>
                    <img src={a.url} alt={a.title} className="w-full h-full object-cover" />
                    {isSel && <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5"><Check size={14} /></div>}
                    {used && !isSel && <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">In use</div>}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 text-left">
                      <p className="text-[10px] text-white truncate">{a.title || a.category}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">Selected photos are reused from the library.</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="rounded-full">Cancel</Button>
            <Button onClick={confirm} disabled={selected.length === 0} className="rounded-full bg-primary text-primary-foreground">
              Add {selected.length > 0 ? `${selected.length} ` : ''}photo{selected.length === 1 ? '' : 's'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}