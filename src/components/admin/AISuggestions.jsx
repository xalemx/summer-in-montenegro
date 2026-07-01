import { Sparkles, BedDouble, Waves, UtensilsCrossed, MapPin } from 'lucide-react';

const BUCKET_META = {
  hotels: { label: 'Hotels', icon: BedDouble },
  activities: { label: 'Activities', icon: Waves },
  restaurants: { label: 'Restaurants', icon: UtensilsCrossed },
};

function scoreColor(s) {
  if (s >= 90) return 'text-emerald-600';
  if (s >= 75) return 'text-primary';
  return 'text-amber-600';
}

function RecCard({ rec, onAccept, disabled }) {
  return (
    <div className="border border-border rounded-xl p-3 flex items-start gap-3 bg-card">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-sm truncate">{rec.name}</p>
          {(rec.category || rec.entity_type) && <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{rec.category || rec.entity_type}</span>}
        </div>
        {rec.reasons && rec.reasons.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {rec.reasons.map((r, i) => <span key={i} className="text-[11px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{r}</span>)}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span className={`font-heading text-lg font-bold leading-none ${scoreColor(rec.match_score)}`}>{rec.match_score}%</span>
        <button onClick={() => onAccept(rec)} disabled={disabled} className="text-xs bg-primary text-primary-foreground rounded-full px-3 py-1 font-medium hover:opacity-90 disabled:opacity-40">Accept</button>
      </div>
    </div>
  );
}

export default function AISuggestions({ recommendations, onGenerate, onAccept, genLoading, hasProposal }) {
  const hasRecs = recommendations && (recommendations.places?.length || recommendations.hotels?.length || recommendations.activities?.length || recommendations.restaurants?.length);
  return (
    <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          <h3 className="font-semibold text-sm">AI Suggestions</h3>
        </div>
        <button onClick={onGenerate} disabled={genLoading} className="text-xs text-primary font-medium hover:underline disabled:opacity-50">
          {genLoading ? 'Generating…' : hasRecs ? 'Regenerate' : 'Generate'}
        </button>
      </div>
      {genLoading && <p className="text-sm text-muted-foreground">Matching your trip to Montenegro destinations, experiences and suppliers…</p>}
      {!genLoading && !hasRecs && <p className="text-sm text-muted-foreground">Click Generate to get AI-matched places, experiences and suppliers for this trip.</p>}
      {hasRecs && (
        <div className="space-y-4">
          {(recommendations.places?.length > 0) && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><MapPin size={13} /> Places & Experiences</p>
              <div className="space-y-2">
                {recommendations.places.map(rec => <RecCard key={rec.entity_id} rec={rec} onAccept={onAccept} disabled={!hasProposal} />)}
              </div>
            </div>
          )}
          {['hotels', 'activities', 'restaurants'].map(bucket => {
            const recs = recommendations[bucket] || [];
            if (!recs.length) return null;
            const M = BUCKET_META[bucket];
            const Icon = M.icon;
            return (
              <div key={bucket}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Icon size={13} /> {M.label}</p>
                <div className="space-y-2">
                  {recs.map(rec => <RecCard key={rec.supplier_id} rec={rec} onAccept={onAccept} disabled={!hasProposal} />)}
                </div>
              </div>
            );
          })}
          {!hasProposal && <p className="text-[11px] text-muted-foreground italic">Create a proposal first to accept suggestions.</p>}
        </div>
      )}
    </div>
  );
}