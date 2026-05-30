import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Calendar } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c477aa20c_generated_5ab95a92.png';
const MOUNTAIN_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1b071a013_generated_06324ee4.png';

const INCLUDED = [
  { icon: '🛏', label: 'Private Room', sub: '7 nights included' },
  { icon: '🍳', label: 'Daily breakfast', sub: 'Every morning' },
  { icon: '✈️', label: 'Airport pickup', sub: 'From Podgorica (TGD)' },
  { icon: '✈️', label: 'Airport drop-off', sub: 'To Podgorica (TGD)' },
  { icon: '🚐', label: 'Local transport', sub: 'Throughout the trip' },
  { icon: '🧭', label: 'Hosted experience', sub: 'Guided throughout' },
];

const NOT_INCLUDED = [
  'Flights',
  'Lunch',
  'Dinner',
  'Optional activities',
  'Travel insurance',
  'Personal expenses',
];

const DATES = [
  { dep: '17 Jul 2026', ret: '24 Jul 2026', spots: 2 },
  { dep: '24 Jul 2026', ret: '31 Jul 2026', spots: 3 },
  { dep: '31 Jul 2026', ret: '7 Aug 2026', spots: 6 },
  { dep: '7 Aug 2026', ret: '14 Aug 2026', spots: 8 },
  { dep: '14 Aug 2026', ret: '21 Aug 2026', spots: 8 },
  { dep: '21 Aug 2026', ret: '28 Aug 2026', spots: 8 },
  { dep: '28 Aug 2026', ret: '4 Sep 2026', spots: 7 },
  { dep: '4 Sep 2026', ret: '11 Sep 2026', spots: 8 },
];

function getStatus(spots) {
  if (spots === 0) return { label: 'Sold Out', badge: 'bg-red-100 text-red-700', dot: 'bg-red-500', pulse: false };
  if (spots <= 2) return { label: 'Almost Full', badge: 'bg-red-50 text-red-600', dot: 'bg-red-500', pulse: true };
  if (spots <= 4) return { label: 'Limited', badge: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', pulse: true };
  return { label: 'Open', badge: 'bg-green-50 text-green-700', dot: 'bg-green-500', pulse: false };
}

const HOST_POINTS = [
  "Small group — you'll actually like the people you travel with",
  'Places not on any tourist map',
  'Someone who knows Montenegro personally',
];

export default function Pricing() {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Montenegro coast" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 px-6 pb-14 max-w-4xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Summer 2026 · Founder Price</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            Everything you need.<br /><em>Nothing you don't.</em>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            One unforgettable week from London combining North Montenegro, Lake Skadar and the Adriatic Coast. 4 nights mountains, 3 nights coast. Private room every night.
          </p>
        </div>
      </section>

      {/* MAIN PRICE CARD */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">

            {/* Header */}
            <div className="px-10 py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6" style={{ background: 'hsl(158 45% 12%)' }}>
              <div>
                <span className="inline-block text-xs tracking-[0.3em] uppercase font-semibold text-white/40 mb-2">Summer 2026 · Founder Price</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">Mountains. Lakes. Coast.<br /><em>One Week from London.</em></h2>
                <p className="text-white/50 mt-2 text-sm">Friday to Friday · From London</p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Per person</p>
                <p className="font-heading text-6xl font-bold text-white leading-none">£899</p>
                <p className="text-white/40 text-sm mt-2">Deposit from £199</p>
              </div>
            </div>

            {/* Included / Not Included */}
            <div className="grid md:grid-cols-2 gap-0 bg-card divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="p-8 md:p-10">
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={11} className="text-green-600" />
                  </span>
                  What's Included
                </h3>
                <div className="space-y-4">
                  {INCLUDED.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-xl w-8 flex-shrink-0 text-center">{item.icon}</span>
                      <div>
                        <p className="font-medium text-sm text-foreground leading-tight">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 md:p-10">
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                    <X size={11} className="text-red-500" />
                  </span>
                  Not Included
                </h3>
                <div className="space-y-3">
                  {NOT_INCLUDED.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <X size={13} className="text-muted-foreground/50 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Flights not included.</strong> We recommend weekly Friday Ryanair flights from London to Podgorica (TGD). We'll advise on the best options once you reserve.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 divide-x divide-border bg-secondary/40 border-t border-border">
              {[
                { label: 'Deposit', value: '£199', sub: 'Secures your spot' },
                { label: 'Group size', value: '4–8', sub: 'Guests per departure' },
                { label: 'Trip length', value: '7 nights', sub: 'Friday to Friday' },
              ].map((s, i) => (
                <div key={i} className="py-6 px-4 text-center">
                  <p className="font-heading text-2xl font-bold text-primary">{s.value}</p>
                  <p className="font-medium text-xs text-foreground mt-0.5">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTURE DATES */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-3">Summer 2026</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">Choose Your Departure</h2>
            <p className="text-muted-foreground mt-3 text-sm">Weekly Friday departures from London · Spaces are limited</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {DATES.map((d, i) => {
              const s = getStatus(d.spots);
              const isFull = d.spots === 0;
              return (
                <Link
                  key={i}
                  to={isFull ? '#' : '/book'}
                  className={`group flex items-center justify-between p-5 rounded-2xl border bg-card transition-all ${isFull ? 'opacity-50 cursor-default' : 'hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Calendar size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{d.dep}</p>
                      <p className="text-xs text-muted-foreground">Returns {d.ret}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${s.pulse ? 'animate-pulse' : ''}`} />
                      {s.label}{d.spots > 0 && d.spots < 8 ? ` · ${d.spots} left` : ''}
                    </span>
                    {!isFull && <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-primary transition-colors" />}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 py-3 px-5 bg-amber-50 border border-amber-200 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
            <p className="text-amber-800 text-sm font-medium">Each departure requires a minimum of 4 guests · Maximum 8 guests per week</p>
          </div>
        </div>
      </section>

      {/* MEET YOUR HOST */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/5' }}>
              <img src={MOUNTAIN_IMG} alt="Your host in Montenegro" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Your Host</p>
                <p className="font-heading text-2xl font-semibold text-white italic">Summer in Montenegro</p>
              </div>
            </div>
            <div>
              <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Behind the Experience</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                A host,<br /><em>not a tour company.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We created Summer in Montenegro to help UK travellers discover the real Montenegro — beyond crowded resorts and typical tourist routes.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Your host coordinates everything: airport transfers, accommodation, the route, and local guidance. You show up. We handle the rest.
              </p>
              <div className="space-y-3 mb-8">
                {HOST_POINTS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-105 transition-all shadow-md text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
                Ask Us Anything on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA DESKTOP */}
      <section className="hidden md:block py-28 px-6" style={{ background: 'hsl(158 45% 12%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-300 text-xs font-semibold tracking-wide">Filling fast — 8 spots per departure</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Mountains. Lakes. Coast.<br /><em>One week from London.</em>
          </h2>
          <p className="text-white/50 mb-10 text-lg">From £199 deposit. Spaces are limited.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl">
              Reserve Your Spot <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer"
              className="px-10 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-105 transition-all">
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-white/25 text-xs">Friday departures · 4–8 guests only · From £899 pp · Accommodation included</p>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden px-4 pb-4 pt-3 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl">
        <div className="flex gap-3">
          <Link
            to="/book"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground font-bold rounded-2xl hover:brightness-105 transition-all text-sm shadow-lg"
          >
            Reserve Your Spot <ArrowRight size={14} />
          </Link>
          <a
            href="https://wa.me/447758162004"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 flex items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
          </a>
        </div>
      </div>

      {/* Mobile bottom padding */}
      <div className="md:hidden h-24" />

    </div>
  );
}