import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import MonteMap from '../components/MonteMap';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1b071a013_generated_06324ee4.png';

const DAYS = [
  { day: 1, weekday: 'Friday', title: 'Arrival & South Montenegro', text: 'Guests arrive at Podgorica Airport. Airport pickup and transfer to South Montenegro. Relaxed welcome evening by the coast or scenic southern location.', note: null },
  { day: 2, weekday: 'Saturday', title: 'Scenic Road Trip North', text: 'Travel towards Plav and Gusinje with scenic stops, mountain views and local atmosphere.', note: null },
  { day: 3, weekday: 'Sunday', title: 'Prokletije National Park', text: 'Explore the wild beauty of Prokletije with scenic nature routes and optional guided walking/hiking depending on group level.', note: null },
  { day: 4, weekday: 'Monday', title: 'Plav Lake & Slow Travel', text: 'Relax around Plav Lake, enjoy cafés, views, swimming or optional local experiences.', note: null },
  { day: 5, weekday: 'Tuesday', title: 'Optional Adventure Day', text: 'Guests can choose optional activities such as horse riding, kayaking, 4x4 tours or guided hiking.', note: 'Optional activities are arranged locally and paid separately by guests.' },
  { day: 6, weekday: 'Wednesday', title: 'Authentic Montenegro', text: 'Local villages, viewpoints, traditional food options and cultural experiences.', note: null },
  { day: 7, weekday: 'Thursday', title: 'Return South', text: 'Scenic return towards South Montenegro with a relaxed final evening.', note: null },
  { day: 8, weekday: 'Friday', title: 'Airport Drop-Off', text: 'Transfer to Podgorica Airport for departure. Safe travels home.', note: null },
];

const INCLUDED = [
  '7 nights accommodation',
  'Daily breakfast',
  'Airport pickup from Podgorica',
  'Airport drop-off to Podgorica',
  'Local transport throughout',
  'Hosted group experience',
];

export default function Experience() {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Montenegro mountains" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 px-6 pb-14 max-w-4xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Friday to Friday · From London</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            8 Days in Montenegro
          </h1>
          <p className="text-white/60 text-lg">Coast, Mountains &amp; Hidden Places</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            A hosted journey combining Montenegro's southern charm with the wild beauty of the north. Friday flights from London — Friday return.
          </p>
          <div className="inline-flex items-center gap-2 py-3 px-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
            <span className="font-semibold">Note:</span> Optional activities on Day 5 are arranged locally and paid separately. Accommodation and daily breakfast are included throughout.
          </div>
        </div>
      </section>

      {/* ITINERARY TIMELINE */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-0">
            {DAYS.map((d, i) => (
              <div key={d.day} className="relative pl-14 pb-8 last:pb-0">
                {i < DAYS.length - 1 && <div className="absolute left-5 top-10 w-px h-full bg-border" />}
                <div className={`absolute left-0 top-0 w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm ${d.weekday === 'Friday' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
                  {d.day}
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">{d.weekday}</p>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Day {d.day} — {d.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{d.text}</p>
                  {d.note && (
                    <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{d.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUSIONS */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-10">
            <h4 className="font-heading text-2xl font-bold text-foreground mb-6">What's included in your trip</h4>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {INCLUDED.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">Not included: flights, lunch, dinner, optional activities, travel insurance, personal expenses.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'hsl(158 45% 12%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Ready to start planning?</h2>
          <p className="text-white/50 mb-8">Friday departures throughout Summer 2026.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl">
              Reserve Your Spot <ArrowRight size={16} />
            </Link>
            <Link to="/dates" className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all text-sm">
              View Departure Dates
            </Link>
          </div>
        </div>
      </section>

      <MonteMap />

      {/* Mobile padding */}
      <div className="md:hidden h-20" />
    </div>
  );
}