import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const AREAS = ['Accommodation', 'Activities', 'Transport', 'Dates', 'Budget', 'Other'];

export default function RequestChangesForm({ onSubmit, onClose }) {
  const [areas, setAreas] = useState([]);
  const [notes, setNotes] = useState('');

  const toggle = (a) => setAreas(p => p.includes(a) ? p.filter(x => x !== a) : [...p, a]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-heading text-lg font-bold">What would you like to change?</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg"><X size={20} /></button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <p className="text-sm font-medium mb-2">Select areas to adjust</p>
            <div className="flex flex-wrap gap-2">
              {AREAS.map(a => (
                <button
                  key={a}
                  onClick={() => toggle(a)}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${areas.includes(a) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Tell us more (optional)</p>
            <Textarea rows={4} value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. We'd prefer a villa instead of a hotel, or we need to move the dates by a few days..." />
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-full">Cancel</Button>
          <Button onClick={() => onSubmit(areas, notes)} className="flex-1 bg-primary text-primary-foreground rounded-full">Send Feedback</Button>
        </div>
      </div>
    </div>
  );
}