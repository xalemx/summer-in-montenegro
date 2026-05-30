import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Plane, Users, Calendar, Info, ArrowRight } from 'lucide-react';

const DATES = [
  { dep: '17 July 2026', ret: '24 July 2026', spots: 2, guaranteed: false },
  { dep: '24 July 2026', ret: '31 July 2026', spots: 3, guaranteed: false },
  { dep: '31 July 2026', ret: '7 August 2026', spots: 6, guaranteed: false },
  { dep: '7 August 2026', ret: '14 August 2026', spots: 8, guaranteed: false },
  { dep: '14 August 2026', ret: '21 August 2026', spots: 8, guaranteed: false },
  { dep: '21 August 2026', ret: '28 August 2026', spots: 8, guaranteed: false },
  { dep: '28 August 2026', ret: '4 September 2026', spots: 7, guaranteed: false },
  { dep: '4 September 2026', ret: '11 September 2026', spots: 8, guaranteed: false },
  { dep: '11 September 2026', ret: '18 September 2026', spots: 8, guaranteed: false },
  { dep: '18 September 2026', ret: '25 September 2026', spots: 8, guaranteed: false },
];

function getStatus(spots) {
  if (spots === 0) return { label: 'Sold Out', classes: 'bg-red-100 text-red-700 border border-red-200', dot: 'bg-red-500', pulse: false, disabled: true };
  if (spots <= 2) return { label: `Only ${spots} spot${spots !== 1 ? 's' : ''} remaining`, classes: 'bg-red-50 text-red-600 border border-red-200', dot: 'bg-red-500', pulse: true, disabled: false };
  if (spots <= 4) return { label: `Only ${spots} of 8 places remaining`, classes: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500', pulse: true, disabled: false };
  return { label: `${spots} of 8 places remaining`, classes: 'bg-green-50 text-green-700 border border-green-200', dot: 'bg-green-500', pulse: false, disabled: false };
}

const NOTES = [
  { icon: Plane, text: 'Weekly Friday Ryanair flights from London to Podgorica (TGD) — the recommended route' },
  { icon: Calendar, text: 'Friday-to-Friday — 8 days total including travel days' },
  { icon: Users, text: 'Minimum 4 guests to run · Maximum 8 guests per week' },
  { icon: Info, text: 'Flights not included — guests book independently · Airport pickup included on arrival' },
];

export default function DepartureDates() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.DepartureDate.list('departure').then(d => {
      setDates(d);
      setLoading(false);
    });
  }, []);

  const displayDates = loading
    ? []
    : dates.length > 0
      ? dates.map(d => ({ dep: d.departure, ret: d.return_date, spots: d.spots_remaining, guaranteed: d.guaranteed_departure || false }))
      : DATES;

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="py-20 md:py-28 px-6 text-center border-b border-border">
        <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Flying from London</p>
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight">Summer 2026 Departures</h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-6">
          Weekly Friday-to-Friday departures from London. 4 nights mountains, 3 nights Adriatic coast. Private room included. From 17 July until late September 2026.
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-semibold text-red-600">Only 8 guests per departure — some dates filling quickly</span>
        </div>
      </section>

      {/* Booking Cards */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
            </div>
          )}

          {!loading && (
            <div className="space-y-4">
              {displayDates.map((d, i) => {
                const s = getStatus(d.spots);
                return (
                  <div key={i} className={`bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all ${s.disabled ? 'border-border opacity-60' : 'border-border hover:border-primary/30'}`}>
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          {/* Booking progress bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground font-medium">{8 - d.spots} / 8 booked</span>
                              <span className="text-xs text-muted-foreground">{d.spots} left</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-green-500 transition-all"
                                style={{ width: `${((8 - d.spots) / 8) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {d.guaranteed && (
                              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">
                                ✓ Guaranteed Departure
                              </span>
                            )}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.classes}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${s.pulse ? 'animate-pulse' : ''}`} />
                              {s.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-foreground">
                            <span className="font-heading text-xl font-bold">{d.dep}</span>
                            <span className="text-muted-foreground text-sm">→</span>
                            <span className="text-muted-foreground font-medium">{d.ret}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">7 nights · 4 Mountains + 3 Coast · Max 8 guests</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right hidden sm:block">
                            <p className="font-heading text-2xl font-bold text-foreground">£999</p>
                            <p className="text-xs text-muted-foreground">per person</p>
                          </div>
                          {s.disabled ? (
                            <span className="px-6 py-3 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed">
                              Sold Out
                            </span>
                          ) : (
                            <Link
                              to={`/book?date=${encodeURIComponent(d.dep)}`}
                              className="px-6 py-3 bg-accent text-accent-foreground font-bold rounded-full text-sm hover:brightness-110 transition-all shadow-md whitespace-nowrap flex items-center gap-1.5"
                            >
                              Reserve This Departure <ArrowRight size={14} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-amber-800 text-sm font-semibold">Each departure requires a minimum of 4 guests and is capped at 8. Guaranteed Departure badge appears when minimum is met.</p>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {NOTES.map((n, i) => (
              <div key={i} className="flex gap-3 p-4 bg-card rounded-xl border border-border">
                <n.icon size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{n.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/book" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-110 transition-all shadow-xl">
              Reserve Your Spot <ArrowRight size={16} />
            </Link>
            <p className="mt-3 text-xs text-muted-foreground">Or <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">chat on WhatsApp</a> before you commit</p>
          </div>
        </div>
      </section>

      <div className="md:hidden h-20" />
    </div>
  );
}