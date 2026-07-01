import {
  Sparkles,
  Map,
  MapPin,
  Route,
  Waves,
  Trees,
  UtensilsCrossed,
  Camera,
  Building2,
  Plus
} from 'lucide-react';

const BUCKETS = [
  { key: 'regions', label: 'Regions', icon: Map },
  { key: 'destinations', label: 'Destinations', icon: MapPin },
  { key: 'routes', label: 'Routes', icon: Route },
  { key: 'experiences', label: 'Experiences', icon: Sparkles },
  { key: 'beaches', label: 'Beaches', icon: Waves },
  { key: 'national_parks', label: 'National Parks', icon: Trees },
  { key: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
  { key: 'viewpoints', label: 'Viewpoints', icon: Camera },
  { key: 'suppliers', label: 'Suppliers', icon: Building2 },
];

function scoreColor(score) {
  if (score >= 90) return 'text-emerald-600';
  if (score >= 75) return 'text-primary';
  return 'text-amber-600';
}

function RecCard({ rec, bucket, onAccept, disabled }) {
  return (
    <div className="border border-border rounded-xl p-3 bg-card">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm truncate">{rec.name}</p>

            {rec.category && (
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {rec.category}
              </span>
            )}

            {rec.region_name && (
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {rec.region_name}
              </span>
            )}

            {rec.suggested_day && (
              <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                Day {rec.suggested_day}
              </span>
            )}
          </div>

          {rec.reasons?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {rec.reasons.map((reason, index) => (
                <span
                  key={index}
                  className="text-[11px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
                >
                  {reason}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`font-heading text-lg font-bold leading-none ${scoreColor(rec.match_score)}`}>
            {rec.match_score}%
          </span>

          <button
            onClick={() => onAccept(rec, bucket)}
            disabled={disabled}
            className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground rounded-full px-3 py-1 font-medium hover:opacity-90 disabled:opacity-40"
          >
            <Plus size={11} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AISuggestions({
  recommendations,
  onGenerate,
  onAccept,
  genLoading,
  hasProposal
}) {
  const hasRecs = recommendations && BUCKETS.some(({ key }) => recommendations[key]?.length);

  return (
    <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          <h3 className="font-semibold text-sm">AI Destination Suggestions</h3>
        </div>

        <button
          onClick={onGenerate}
          disabled={genLoading}
          className="text-xs text-primary font-medium hover:underline disabled:opacity-50"
        >
          {genLoading ? 'Generating…' : hasRecs ? 'Regenerate' : 'Generate'}
        </button>
      </div>

      {genLoading && (
        <p className="text-sm text-muted-foreground">
          Analysing the travel project, Montenegro knowledge base and suppliers…
        </p>
      )}

      {!genLoading && !hasRecs && (
        <p className="text-sm text-muted-foreground">
          Generate structured recommendations for regions, destinations, routes, experiences, restaurants and suppliers.
        </p>
      )}

      {hasRecs && (
        <div className="space-y-5">
          {recommendations.consultant_summary && (
            <div className="bg-background/70 border border-border rounded-xl p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Consultant summary
              </p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {recommendations.consultant_summary}
              </p>
            </div>
          )}

          {recommendations.suggested_route_overview && (
            <div className="bg-background/70 border border-border rounded-xl p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Suggested route
              </p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {recommendations.suggested_route_overview}
              </p>
            </div>
          )}

          {recommendations.day_by_day_structure?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                AI day structure
              </p>

              <div className="space-y-2">
                {recommendations.day_by_day_structure.map((day) => (
                  <div key={day.day_number} className="bg-background/70 border border-border rounded-xl p-3">
                    <p className="font-semibold text-sm">
                      Day {day.day_number}: {day.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {BUCKETS.map(({ key, label, icon: Icon }) => {
            const recs = recommendations[key] || [];
            if (!recs.length) return null;

            return (
              <div key={key}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Icon size={13} />
                  {label}
                </p>

                <div className="space-y-2">
                  {recs.map((rec) => (
                    <RecCard
                      key={`${key}-${rec.id}`}
                      rec={rec}
                      bucket={key}
                      onAccept={onAccept}
                      disabled={!hasProposal}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {!hasProposal && (
            <p className="text-[11px] text-muted-foreground italic">
              Create a proposal first to add AI suggestions.
            </p>
          )}
        </div>
      )}
    </div>
  );
}