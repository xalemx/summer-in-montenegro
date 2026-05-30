import CTAButton from '../components/CTAButton';
import MonteMap from '../components/MonteMap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DAYS = [
  { day: 1, weekday: 'Friday', title: 'Arrival & South Montenegro', text: 'Guests arrive at Podgorica Airport. Airport pickup and transfer to South Montenegro. Relaxed welcome evening by the coast or scenic southern location.', note: null },
  { day: 2, weekday: 'Saturday', title: 'Scenic Road Trip North', text: 'Travel towards Plav and Gusinje with scenic stops, mountain views and local atmosphere.', note: null },
  { day: 3, weekday: 'Sunday', title: 'Prokletije National Park', text: 'Explore the wild beauty of Prokletije with scenic nature routes and optional guided walking/hiking depending on group level.', note: null },
  { day: 4, weekday: 'Monday', title: 'Plav Lake & Slow Travel', text: 'Relax around Plav Lake, enjoy cafés, views, swimming or optional local experiences.', note: null },
  { day: 5, weekday: 'Tuesday', title: 'Optional Adventure Day', text: 'Guests can choose optional activities such as horse riding, 4x4 tours or guided hiking.', note: 'Optional activities are arranged locally and paid separately by guests.' },
  { day: 6, weekday: 'Wednesday', title: 'Authentic Montenegro', text: 'Local villages, viewpoints, traditional food options and cultural experiences.', note: null },
  { day: 7, weekday: 'Thursday', title: 'Return South', text: 'Scenic return towards South Montenegro with a relaxed final evening.', note: null },
  { day: 8, weekday: 'Friday', title: 'Airport Drop-Off', text: 'Transfer to Podgorica Airport for departure. Safe travels home.', note: null },
];

export default function Experience() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-3">Friday to Friday</p>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">
          8 Days in Montenegro
        </h1>
        <p className="font-heading text-xl md:text-2xl text-center text-muted-foreground mb-4">Coast, Mountains &amp; Hidden Places</p>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          A hosted journey combining Montenegro&apos;s southern charm with the wild beauty of the north. Friday flights from London — Friday return.
        </p>

        <div className="mb-10 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <strong>Note:</strong> Optional activities on Day 5 (and throughout) are arranged locally and paid separately by guests. Accommodation and daily breakfast are included throughout.
        </div>

        <div className="space-y-0">
          {DAYS.map((d, i) => (
            <div key={d.day} className="relative pl-12 pb-10 last:pb-0">
              {i < DAYS.length - 1 && <div className="absolute left-5 top-10 w-px h-full bg-border" />}
              <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${d.weekday === 'Friday' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
                {d.day}
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-1">{d.weekday}</p>
                <h3 className="font-heading text-xl font-semibold mb-2">Day {d.day} — {d.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{d.text}</p>
                {d.note && (
                  <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{d.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-primary/5 border border-primary/10 rounded-2xl text-sm">
          <h4 className="font-semibold text-foreground mb-3">What&apos;s included in your trip</h4>
          <div className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
            {['7 nights accommodation', 'Daily breakfast', 'Airport pickup from Podgorica', 'Airport drop-off to Podgorica', 'Local transport throughout', 'Hosted group experience', 'Montenegro route and coordination'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-primary font-bold text-xs">✓</span> {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground/70 italic">Not included: flights, lunch, dinner, optional activities, travel insurance, personal expenses.</p>
        </div>

        <div className="text-center mt-12">
          <CTAButton to="/book">Reserve Your Spot</CTAButton>
          <p className="mt-4">
            <Link to="/dates" className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">
              View 2026 departure dates <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </div>

      <MonteMap />
    </div>
  );
}