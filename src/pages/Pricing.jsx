import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';

const INCLUDED = [
  '7 nights accommodation',
  'Daily breakfast',
  'Airport pickup from Podgorica',
  'Airport drop-off to Podgorica',
  'Local transport during the trip',
  'Hosted group experience',
  'Coast and mountain itinerary',
  'Montenegro guidance and coordination',
];

const NOT_INCLUDED = [
  'Flights',
  'Lunch and dinner',
  'Optional activities',
  'Travel insurance',
  'Alcohol',
  'Personal expenses',
];

export default function Pricing() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-3">Transparent Pricing</p>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Pricing &amp; What&apos;s Included</h1>
        <p className="text-center text-muted-foreground mb-14 max-w-lg mx-auto">
          Simple, transparent pricing for a hosted 7-day Montenegro experience.
        </p>

        {/* Main pricing card */}
        <div className="bg-card rounded-3xl border-2 border-primary/20 shadow-lg overflow-hidden mb-10">
          <div className="p-8 md:p-10" style={{ background: 'hsl(158 45% 12%)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-2">Summer 2026</p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">Founder Experience</h2>
                <p className="text-white/60 mt-2">7 days · Friday to Friday · From London</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Founder Price</p>
                <p className="font-heading text-5xl font-bold text-white">£899</p>
                <p className="text-white/50 text-sm">per person</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-green-600" />
                  </span>
                  What&apos;s Included
                </h3>
                <div className="space-y-2.5">
                  {INCLUDED.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <X size={11} className="text-red-500" />
                  </span>
                  Not Included
                </h3>
                <div className="space-y-2.5">
                  {NOT_INCLUDED.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <X size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit info */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Deposit', value: '£199', sub: 'Secures your spot' },
            { label: 'Remaining balance', value: '£700+', sub: 'Due before departure' },
            { label: 'Group size', value: '4–8', sub: 'Guests per departure' },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{item.label}</p>
              <p className="font-heading text-3xl font-bold text-primary">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div className="mb-12 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <p className="font-semibold mb-1">This is not an all-inclusive package holiday.</p>
          <p>Summer in Montenegro is a premium hosted small-group adventure experience. Accommodation, daily breakfast, airport transfers and local transport are included. Flights, meals and optional activities are separate.</p>
        </div>

        {/* Flight info */}
        <div className="mb-14 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
          <h3 className="font-semibold text-foreground mb-2">Flight Information</h3>
          <p className="text-sm text-muted-foreground">The trip is designed around <strong className="text-foreground">weekly Friday Ryanair flights from London to Podgorica (TGD)</strong>. Guests book their own flights independently. We can advise on the best options once you reserve.</p>
        </div>

        <div className="text-center">
          <Link to="/book" className="inline-flex items-center gap-2 px-12 py-5 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl text-base">
            Reserve Your Spot <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-muted-foreground text-sm">
            Questions? <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Chat on WhatsApp</a>
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 py-16 px-8 rounded-3xl text-center" style={{ background: 'hsl(158 45% 12%)' }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to escape London and discover Montenegro?
          </h2>
          <p className="text-white/50 mb-8">Small-group Friday departures available throughout Summer 2026.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all">
              Reserve Your Spot
            </Link>
            <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer"
              className="px-10 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-105 transition-all">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}