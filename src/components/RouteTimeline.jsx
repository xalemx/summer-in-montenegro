const ROUTE = [
  { icon: '✈️', name: 'Podgorica', sub: 'Arrival — Podgorica Airport (TGD)', type: 'transit' },
  { icon: '🌲', name: 'Biogradska Gora', sub: 'Scenic stop en route north', type: 'stop' },
  { icon: '🏔', name: 'Gusinje', sub: '4 nights — Prokletije Mountains base', type: 'base', nights: 4 },
  { icon: '🦅', name: 'Lake Skadar', sub: 'Scenic transfer south', type: 'stop' },
  { icon: '🌊', name: 'Bar', sub: '3 nights — Adriatic Coast base', type: 'base', nights: 3 },
  { icon: '✈️', name: 'Podgorica', sub: 'Departure — Podgorica Airport (TGD)', type: 'transit' },
];

export default function RouteTimeline() {
  return (
    <section className="py-28 px-6 bg-secondary/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Friday to Friday</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Your Journey Through Montenegro
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-border" />

          <div className="space-y-3">
            {ROUTE.map((stop, i) => (
              <div key={i} className="relative flex items-start gap-5">
                {/* Icon dot */}
                <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm border ${
                  stop.type === 'base'
                    ? 'bg-primary border-primary/20 text-primary-foreground'
                    : stop.type === 'transit'
                    ? 'bg-foreground border-foreground/20 text-background'
                    : 'bg-card border-border'
                }`}>
                  {stop.icon}
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-2xl border p-5 shadow-sm mb-1 ${
                  stop.type === 'base' ? 'bg-card border-primary/20' : 'bg-card border-border'
                }`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-heading text-lg font-bold text-foreground">{stop.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{stop.sub}</p>
                    </div>
                    {stop.nights && (
                      <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/15">
                        🛏 {stop.nights} nights
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span>Base (overnight stay)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-foreground" />
            <span>Airport</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-border border border-border" />
            <span>En route stop</span>
          </div>
        </div>
      </div>
    </section>
  );
}