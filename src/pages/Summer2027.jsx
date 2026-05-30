import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ddc6cbee6_generated_image.png';
const COAST_IMG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80';
const LAKE_IMG = 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1400&q=80';

const INCLUDED = [
  '7 nights accommodation',
  'Daily breakfast',
  'Airport pickup from Podgorica',
  'Airport drop-off to Podgorica',
  'All local transport',
  'Expert local host throughout',
  'Hidden locations, no tourist map',
  'Small group — 4 to 8 people only',
];

const NOT_INCLUDED = ['Flights', 'Lunch and dinner', 'Optional activities', 'Personal expenses'];



export default function Summer2027() {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Montenegro 2027"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/90 text-xs font-semibold tracking-wide">Early Access — Summer 2027</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.02] mb-6">
            Reserve Next Summer<br /><em>Before It's Sold Out.</em>
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto leading-relaxed mb-8">
            Reserve your 2027 Montenegro escape early and spread the cost with flexible monthly payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl"
            >
              Join 2027 Early Access <ArrowRight size={16} />
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/40 text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-sm text-sm"
            >
              View 2026 Dates
            </Link>
          </div>
          <p className="mt-6 text-white/40 text-xs">Reserve your place early and spread the cost over time. All balances must be paid before travel.</p>
        </div>
      </section>

      {/* QUICK FACTS BAR */}
      <section className="py-8 px-4 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: '💷', label: 'From £999 pp', sub: 'Pay in full' },
              { icon: '✈️', label: 'Friday departures', sub: 'From London' },
              { icon: '👥', label: '4–8 guests only', sub: 'Intentionally small' },
              { icon: '🍳', label: 'Breakfast included', sub: 'Every morning' },
              { icon: '🚐', label: 'Airport transfers', sub: 'Both ways, included' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/50 border border-border">
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground leading-tight">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-36 md:py-44 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-heading text-4xl md:text-6xl font-light text-foreground leading-[1.08] italic">
            Most people spend more on a weekend in London than a week in the mountains.
          </p>
          <div className="mt-12 w-16 h-px bg-primary/20 mx-auto" />
          <p className="mt-10 text-muted-foreground text-xl max-w-xl mx-auto leading-[1.7]">
            Montenegro is still Europe's best-kept secret. For Summer 2027, lock in your place before anyone else — and pay it off like a Netflix subscription.
          </p>
        </div>
      </section>

      {/* PAYMENT PLAN */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Smarter Way to Book</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Reserve today.<br /><em>Pay it off monthly.</em>
            </h2>
          </div>

          {/* Pricing options */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Option 1 */}
            <div className="rounded-3xl p-10 bg-card border border-border text-center shadow-sm">
              <p className="text-xs tracking-[0.3em] uppercase font-semibold text-muted-foreground mb-4">Option 1</p>
              <p className="font-heading text-2xl font-semibold text-foreground mb-2">Pay in Full</p>
              <p className="font-heading text-6xl font-bold text-foreground mb-1">£999</p>
              <p className="text-muted-foreground text-sm">per person</p>
            </div>

            {/* Option 2 */}
            <div className="rounded-3xl p-10 border-2 border-primary text-center shadow-xl" style={{ background: 'hsl(155 43% 18%)' }}>
              <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/50 mb-4">Option 2</p>
              <p className="font-heading text-2xl font-semibold text-white mb-2">Flexible Payment Plan</p>
              <p className="font-heading text-6xl font-bold text-white mb-1">£1,099</p>
              <p className="text-white/60 text-sm mb-6">per person</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white/10 rounded-xl px-5 py-3">
                  <span className="text-white/70 text-sm">Reserve with</span>
                  <span className="font-bold text-white text-sm">£199 deposit</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 rounded-xl px-5 py-3">
                  <span className="text-white/70 text-sm">Then from</span>
                  <span className="font-bold text-white text-sm">£75 per month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
              <span className="text-primary text-sm">🔒</span>
              <span className="text-sm font-medium text-primary">Reserve your place with only a £199 deposit.</span>
            </div>
            <br />
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-lg"
            >
              Lock In 2027 — £199 Deposit <ArrowRight size={16} />
            </Link>
            <p className="mt-4 text-muted-foreground text-xs">Reserve your place early and spread the cost over time. All balances must be paid before travel.</p>
          </div>
        </div>
      </section>

      {/* INCLUSIONS */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Nothing Hidden</p>
            <h3 className="font-heading text-4xl font-bold text-foreground mb-8 leading-tight">
              What's <em>included.</em>
            </h3>
            <div className="space-y-3 mb-8">
              {INCLUDED.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Not included</p>
            <div className="flex flex-wrap gap-2">
              {NOT_INCLUDED.map((item, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs border border-border">{item}</span>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <img src={LAKE_IMG} alt="Montenegro — Plav Lake" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Summer 2027</p>
              <p className="font-heading text-2xl text-white font-semibold italic">Where the world ends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Is This For You?</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">Perfect For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
            {[
              { icon: '🧍', label: 'Solo travellers', desc: 'Come alone, leave with friends' },
              { icon: '💑', label: 'Couples', desc: 'An adventure to share together' },
              { icon: '👫', label: 'Friends', desc: 'The trip you keep saying you\'ll take' },
              { icon: '🌿', label: 'Nature lovers', desc: 'Mountains, lakes and wild landscapes' },
              { icon: '🧗', label: 'Adventure seekers', desc: 'Optional activities for every level' },
              { icon: '🙅', label: 'Tired of crowded resorts', desc: 'Real places, real people, no queues' },
              { icon: '🌍', label: 'Beyond Spain or Portugal', desc: 'Somewhere different, somewhere real' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-28 px-6" style={{ background: 'hsl(158 45% 12%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-300 text-xs font-semibold tracking-wide">Early access — 8 spots per week</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            2027 spaces<br /><em>are open now.</em>
          </h2>
          <p className="text-white/50 mb-10 text-lg">
            £199 holds your place. The rest follows on your schedule.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl"
          >
            Join Early Access <ArrowRight size={16} />
          </Link>
          <p className="mt-6 text-white/30 text-xs">From London · Fly direct · Summer 2027</p>
        </div>
      </section>

    </div>
  );
}