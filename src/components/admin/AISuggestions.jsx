import { Sparkles, Compass, Waves, Mountain, UtensilsCrossed, MapPin, Route, BedDouble, Eye, CalendarDays } from 'lucide-react';

const supplierItemType = (cat) => {
  const c = (cat || '').toLowerCase();
  if (['hotel', 'apartment', 'villa'].includes(c)) return 'Accommodation';
  if (c === 'restaurant') return 'Restaurant';
  if (c === 'boat operator') return 'Boat Trip';
  if (c === 'tour guide') return 'Guide';
  return 'Activity';
};

const SECTIONS = [
  { key: 'experiences', label: 'Experiences', icon: Compass, itemType: 'Experience' },
  { key: 'beaches', label: 'Beaches', icon: Waves, itemType: 'Activity' },
  { key: 'national_parks', label: 'National Parks', icon: Mountain, itemType: 'Activity' },
  { key: 'viewpoints', label: 'Viewpoints', icon: Eye, itemType: 'Activity' },
  { key: 'destinations', label: 'Destinations', icon: MapPin, itemType: 'Other' },
  { key: 'routes', label: 'Routes', icon: Route, itemType: 'Activity' },
  { key: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed, itemType: 'Restaurant' },
  { key: 'suppliers', label: 'Suppliers', icon: BedDouble, itemType: null },
  { key: 'regions', label: 'Regions', icon: MapPin, itemType: 'Other', displayOnly: true },
];

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
          {rec.category && <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{rec.category}</span>}
          {rec.suggested_day ? <span className="text-[10px] uppercase tracking-wider text-primary/70">Day {rec.suggested_day}</span> : null}
        </div>
        {rec.reasons && rec.reasons.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {rec.reasons.map((r, i) => <span key={i} className="text-[11px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{r}</span>)}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span className={`font-heading text-lg font-bold leading-none ${scoreColor(rec.match_score)}`}>{rec.match_score}%</span>
        {onAccept && (
          <button onClick={() => onAccept(rec)} disabled={disabled} className="text-xs bg-primary text-primary-foreground rounded-full px-3 py-1 font-medium hover:opacity-90 disabled:opacity-40">Accept</button>
        )}
      </div>
    </div>
  );
}

export default function AISuggestions({ recommendations, onGenerate, onAccept, genLoading, hasProposal }) {
  const recs = recommendations || {};
  const hasRecs = SECTIONS.some(s => recs[s.key]?.length) || recs.day_by_day_structure?.length || recs.consultant_summary || recs.suggested_route_overview;

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
      {!genLoading && !hasRecs && <p className="text-sm text-muted-foreground">Click Generate to get an AI-matched Montenegro plan — places, experiences, suppliers and a day-by-day outline.</p>}

      {hasRecs && !genLoading && (
        <div className="space-y-4">
          {recs.consultant_summary && (
            <p className="text-sm text-foreground/80 italic border-l-2 border-primary/30 pl-3">{recs.consultant_summary}</p>
          )}
          {recs.suggested_route_overview && (
            <p className="text-xs text-muted-foreground">{recs.suggested_route_overview}</p>
          )}

          {SECTIONS.filter(s => recs[s.key]?.length).map(section => {
            const Icon = section.icon;
            const items = recs[section.key].map(r => ({
              ...r,
              itemType: section.itemType || supplierItemType(r.category),
              supplier_id: section.key === 'suppliers' ? r.id : '',
            }));
            return (
              <div key={section.key}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><Icon size={13} /> {section.label}</p>
                <div className="space-y-2">
                  {items.map(rec => (
                    <RecCard key={rec.id} rec={rec} onAccept={section.displayOnly ? null : onAccept} disabled={!hasProposal} />
                  ))}
                </div>
              </div>
            );
          })}

          {recs.day_by_day_structure?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><CalendarDays size={13} /> Suggested Day-by-Day</p>
              <div className="space-y-2">
                {recs.day_by_day_structure.map((d, i) => (
                  <div key={i} className="border border-border rounded-xl p-3 bg-card">
                    <p className="text-sm font-semibold">Day {d.day_number}: {d.title}</p>
                    {d.description && <p className="text-xs text-muted-foreground mt-1">{d.description}</p>}
                    {d.recommended_place_names?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {d.recommended_place_names.map((p, j) => <span key={j} className="text-[11px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{p}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hasProposal && <p className="text-[11px] text-muted-foreground italic">Create a proposal first to accept suggestions into the itinerary.</p>}
        </div>
      )}
    </div>
  );
}