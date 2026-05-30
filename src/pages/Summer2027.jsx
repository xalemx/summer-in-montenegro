import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ddc6cbee6_generated_image.png';
const MOUNTAIN_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1b071a013_generated_06324ee4.png';

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

const NOT_INCLUDED_2027 = ['Flights', 'Lunch and dinner', 'Optional activities', 'Personal expenses'];

const INSTALMENTS = [
  { step: '01', label: 'Today', amount: '£199', sub: 'Reserve your place' },
  { step: '02', label: 'Monthly', amount: '£100–£250', sub: 'Pay at your own pace' },
  { step: '03', label: 'Departure', amount: '£0 due', sub: 'You arrive fully paid' },
];

const PRICING_ROWS = [
  { label: 'Pay in full', value: '£999 pp' },
  { label: 'Flexible payment plan', value: '£1,199 pp' },
  { label: 'Deposit to secure', value: '£199 non-refundable' },
  { label: 'Monthly from', value: '£84 / month' },
];

export default function Summer2027() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0a' }}>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Montenegro 2027"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.2 }}
        />
        {/* Gold vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center top, rgba(251,191,36,0.04) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-8 pb-24 pt-36">
          <div className="inline-flex items-center gap-2 border border-amber-400/20 bg-amber-400/5 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400/90 text-xs tracking-[0.2em] uppercase font-medium">Early Access — Summer 2027</span>
          </div>
          <h1 className="font-heading font-light leading-[1.0] mb-8" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}>
            The trip you've<br />
            been{' '}
            <em className="text-amber-300">putting off.</em>
          </h1>
          <p className="text-white/40 text-xl max-w-lg leading-relaxed mb-10">
            Reserve your 2027 Montenegro escape early and spread the cost with flexible monthly payments.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 font-semibold rounded-full text-black transition-all hover:brightness-110 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #f6d860 0%, #f0a500 100%)', boxShadow: '0 0 60px rgba(251,191,36,0.25)' }}
          >
            Join 2027 Early Access <ArrowRight size={18} />
          </Link>
          <p className="mt-5 text-white/20 text-xs">£199 deposit · all balances fully paid before travel confirmation · flights not included</p>
        </div>

        {/* Horizontal divider line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.2), transparent)' }} />
      </section>

      {/* MANIFESTO */}
      <section className="py-36 px-8 text-center" style={{ background: '#080808' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-heading text-4xl md:text-6xl font-light leading-[1.1] text-white/80 italic mb-10">
            Most people spend more on a weekend in London than a week in the mountains.
          </p>
          <div className="w-12 h-px mx-auto mb-10" style={{ background: 'rgba(251,191,36,0.4)' }} />
          <p className="text-white/35 text-lg leading-relaxed">
            Montenegro is still{' '}
            <span className="text-white/60 font-medium">Europe's best-kept secret</span>.
            Stunning doesn't cover it. And for Summer 2027, you can lock in your place before anyone else — and pay it off like a Netflix subscription.
          </p>
        </div>
      </section>

      {/* INSTALMENT SPOTLIGHT */}
      <section className="py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-amber-400/50 text-xs tracking-[0.4em] uppercase mb-4">The Smarter Way to Book</p>
            <h2 className="font-heading text-5xl md:text-6xl font-light text-white leading-tight">
              Reserve today.<br />
              <span className="text-amber-300 italic">Pay it off monthly.</span>
            </h2>
          </div>

          {/* 3-step flow */}
          <div className="grid md:grid-cols-3 gap-px mb-16 rounded-2xl overflow-hidden" style={{ background: 'rgba(251,191,36,0.1)' }}>
            {INSTALMENTS.map((s, i) => (
              <div
                key={i}
                className="relative px-8 py-12 flex flex-col gap-3"
                style={{
                  background: i === 1
                    ? 'linear-gradient(135deg, #f6d860 0%, #e09a00 100%)'
                    : '#111111',
                }}
              >
                <p className={`text-xs tracking-[0.3em] uppercase font-medium mb-1 ${i === 1 ? 'text-black/40' : 'text-amber-400/40'}`}>{s.step}</p>
                <p className={`text-xs tracking-widest uppercase ${i === 1 ? 'text-black/50' : 'text-white/30'}`}>{s.label}</p>
                <p
                  className="font-heading font-bold leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: i === 1 ? '#000' : '#fff' }}
                >
                  {s.amount}
                </p>
                <p className={`text-sm ${i === 1 ? 'text-black/60' : 'text-white/35'}`}>{s.sub}</p>
                {i === 1 && (
                  <div className="absolute top-4 right-4 bg-black/15 rounded-full px-3 py-1 text-xs text-black/60 font-semibold">
                    Most popular
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="max-w-md mx-auto rounded-2xl overflow-hidden border mb-12" style={{ borderColor: 'rgba(251,191,36,0.12)', background: '#111' }}>
            {PRICING_ROWS.map((row, i) => (
              <div
                key={i}
                className={`flex justify-between px-7 py-4 text-sm ${i === PRICING_ROWS.length - 1 ? 'border-t' : ''}`}
                style={{
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                  borderColor: i === PRICING_ROWS.length - 1 ? 'rgba(251,191,36,0.15)' : 'transparent',
                }}
              >
                <span className="text-white/35">{row.label}</span>
                <span className={`font-semibold ${i === PRICING_ROWS.length - 1 ? 'text-amber-300' : 'text-white/80'}`}>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-12 py-5 font-bold rounded-full text-black text-base transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #f6d860 0%, #f0a500 100%)', boxShadow: '0 0 80px rgba(251,191,36,0.2)' }}
            >
              Lock In 2027 — £199 Deposit <ArrowRight size={18} />
            </Link>
            <p className="mt-4 text-white/20 text-xs">Flights and optional activities not included · All balances must be fully paid before travel confirmation</p>
          </div>
        </div>
      </section>

      {/* SPLIT — image + inclusions */}
      <section className="py-24 px-8 border-t" style={{ borderColor: 'rgba(251,191,36,0.07)', background: '#080808' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400/50 text-xs tracking-[0.4em] uppercase mb-6">Nothing Hidden</p>
            <h3 className="font-heading text-4xl font-light text-white mb-6 leading-tight">
              What&apos;s<br />
              <em className="text-amber-300">included.</em>
            </h3>
            <div className="space-y-3">
              {INCLUDED.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
                    <Check size={11} className="text-amber-400" />
                  </div>
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <img src={MOUNTAIN_IMG} alt="Montenegro" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Summer 2027</p>
              <p className="font-heading text-2xl text-white font-light italic">Where the world ends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-36 px-8 text-center relative overflow-hidden" style={{ background: '#050505' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.04) 0%, transparent 65%)' }} />
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400/90 text-xs font-semibold tracking-widest uppercase">Early access — 8 spots per week</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-light text-white leading-tight mb-6">
            2027 spaces<br />
            <em className="text-amber-300">are open now.</em>
          </h2>
          <p className="text-white/30 mb-14 text-lg leading-relaxed">
            £199 holds your place. The rest follows on your schedule.
            <br />
            <span className="text-white/20 text-sm">Most people wait. The people on this trip didn't.</span>
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 font-bold rounded-full text-black text-base transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #f6d860 0%, #f0a500 100%)', boxShadow: '0 0 100px rgba(251,191,36,0.18)' }}
          >
            Join Early Access <ArrowRight size={18} />
          </Link>
          <p className="mt-6 text-white/15 text-xs">From London · Fly direct · Summer 2027</p>
        </div>
      </section>

    </div>
  );
}