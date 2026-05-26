import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ddc6cbee6_generated_image.png';

const INCLUDED = [
  '7 nights boutique accommodation',
  'Breakfast & dinner every day',
  'All in-country transport',
  'Airport pickup & drop-off',
  'Expert local host throughout',
  'Guided hikes & activities',
  'Hidden locations off the tourist map',
  'Small group — 4 to 8 people only',
];

const MONTHS = [
  { month: 'Now', amount: '£199', label: 'Secure your place' },
  { month: 'Monthly', amount: '£100–£250', label: 'Spread the cost your way' },
  { month: 'Travel', amount: '£0', label: 'Arrive fully paid' },
];

export default function Summer2027() {
  return (
    <div style={{ background: 'hsl(158 45% 9%)' }} className="min-h-screen text-white">

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Montenegro 2027"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-20 pt-32">
          <p className="text-amber-400/80 tracking-[0.35em] text-xs uppercase font-semibold mb-5">Early Access · Summer 2027</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
            The trip you've been<br />
            <span className="italic text-amber-300">putting off.</span><br />
            Book it now.
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            Montenegro. 7 days. 4–8 people. A summer that changes how you think about travel.
          </p>
        </div>
      </section>

      {/* INSTALMENTS HERO FEATURE */}
      <section className="py-24 px-6" style={{ background: 'hsl(158 45% 7%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400/70 tracking-[0.3em] text-xs uppercase font-medium mb-6">The Smartest Way to Book</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Reserve today.<br />Pay it off monthly.
          </h2>
          <p className="text-white/45 text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
            We're the only hosted Montenegro experience that lets you spread the full cost over monthly instalments — so nothing stands between you and the trip of the summer.
          </p>

          {/* Payment flow */}
          <div className="grid md:grid-cols-3 gap-0.5 rounded-2xl overflow-hidden mb-12">
            {MONTHS.map((m, i) => (
              <div
                key={i}
                className={`py-10 px-8 ${i === 1 ? 'bg-amber-400 text-black' : 'bg-white/5'}`}
              >
                <p className={`text-xs tracking-widest uppercase mb-3 ${i === 1 ? 'text-black/50' : 'text-white/40'}`}>{m.month}</p>
                <p className={`font-heading text-4xl md:text-5xl font-bold mb-2 ${i === 1 ? 'text-black' : 'text-white'}`}>{m.amount}</p>
                <p className={`text-sm ${i === 1 ? 'text-black/70' : 'text-white/40'}`}>{m.label}</p>
              </div>
            ))}
          </div>

          {/* Pricing detail */}
          <div className="max-w-sm mx-auto rounded-2xl border border-white/10 overflow-hidden mb-10">
            {[
              { label: 'Total package price', value: '£1,199 per person' },
              { label: 'Deposit to reserve', value: '£199' },
              { label: 'Remaining balance', value: '£1,000' },
              { label: 'Monthly instalments from', value: '£100 / month' },
            ].map((row, i) => (
              <div key={i} className={`flex justify-between px-6 py-4 text-sm ${i % 2 === 0 ? 'bg-white/5' : 'bg-white/3'}`}>
                <span className="text-white/50">{row.label}</span>
                <span className="text-white font-semibold">{row.value}</span>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-amber-400 text-black font-bold rounded-full text-base hover:brightness-105 transition-all shadow-xl shadow-amber-400/20"
          >
            Join 2027 Early Access <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-white/25 text-xs">Flights not included · Full payment required before departure</p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-white/30 text-xs tracking-[0.3em] uppercase mb-12">Everything Included</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {INCLUDED.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 px-4 rounded-xl bg-white/4 border border-white/8">
                <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={11} className="text-amber-400" />
                </div>
                <span className="text-white/75 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-24 px-6 text-center border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            2027 spaces are filling now.
          </h2>
          <p className="text-white/40 mb-10">
            £199 holds your place. Everything else follows on your schedule.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 border border-amber-400/50 text-amber-300 font-semibold rounded-full hover:bg-amber-400/10 transition-all text-sm"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}