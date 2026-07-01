import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ROUTE = [
  { icon: '✈️', label: 'Podgorica', sub: 'Arrival', type: 'transit' },
  { icon: '🌲', label: 'Biogradska Gora', sub: 'National Park stop', type: 'stop' },
  { icon: '🏔', label: 'Gusinje', sub: '4 nights · Mountains', type: 'base', highlight: true },
  { icon: '🦅', label: 'Lake Skadar', sub: 'Scenic transfer stop', type: 'stop' },
  { icon: '🌊', label: 'Bar', sub: '3 nights · Adriatic Coast', type: 'base', highlight: true },
  { icon: '✈️', label: 'Podgorica', sub: 'Departure', type: 'transit' },
];

const DAYS = [
  {
    day: 1, weekday: 'Friday', title: 'Arrival Day',
    points: ['Arrival in Podgorica', 'Visit Biogradska Gora National Park', 'Transfer to Gusinje'],
  },
  {
    day: 2, weekday: 'Saturday', title: 'North Montenegro',
    points: ['Ali Pasha Springs', 'Grlja Waterfall', 'Vusanje'],
  },
  {
    day: 3, weekday: 'Sunday', title: 'Prokletije',
    points: ['Prokletije National Park', 'Grebaje Valley', 'Optional hiking'],
  },
  {
    day: 4, weekday: 'Monday', title: 'Plav Lake',
    points: ['Plav Lake', 'Optional activities'],
  },
  {
    day: 5, weekday: 'Tuesday', title: 'Journey South',
    points: ['Transfer south', 'Lake Skadar stop', 'Arrival in Bar'],
  },
  {
    day: 6, weekday: 'Wednesday', title: 'Old Bar & The Beach',
    points: ['Old Bar', 'Beach', 'Relaxation'],
  },
  {
    day: 7, weekday: 'Thursday', title: 'Ulcinj & Ada Bojana',
    points: ['Ulcinj', 'Ada Bojana', 'Free time'],
  },
  {
    day: 8, weekday: 'Friday', title: 'Departure Day',
    points: ['Airport transfer', 'Podgorica'],
  },
];

export default function JourneyTimeline() {
  return (
    <section className="py-28 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Friday to Friday · From London</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Your Journey Through Montenegro
          </h2>
        </div>

        {/* Route Overview */}
        <div className="flex flex-wrap items-center justify-center gap-0 mb-16">
          {ROUTE.map((stop, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex flex-col items-center text-center px-3 py-3 rounded-2xl transition-all ${
                stop.highlight
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card border border-border'
              }`} style={{ minWidth: '90px' }}>
                <span className="text-xl mb-1">{stop.icon}</span>
                <p className={`font-bold text-xs leading-tight ${stop.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {stop.label}
                </p>
                <p className={`text-xs mt-0.5 ${stop.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {stop.sub}
                </p>
              </div>
              {i < ROUTE.length - 1 && (
                <div className="flex flex-col items-center mx-1">
                  <div className="w-px h-4 bg-border" />
                  <span className="text-muted-foreground text-xs">↓</span>
                  <div className="w-px h-4 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Day Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {DAYS.map((d) => (
            <div key={d.day} className={`rounded-2xl p-5 border shadow-sm ${
              d.weekday === 'Friday' ? 'bg-accent/10 border-accent/30' : 'bg-card border-border'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  d.weekday === 'Friday' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
                }`}>
                  {d.day}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{d.weekday}</p>
                  <p className="font-semibold text-xs text-foreground leading-tight">{d.title}</p>
                </div>
              </div>
              <ul className="space-y-1">
                {d.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <span className="text-primary font-bold mt-0.5 flex-shrink-0">·</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/experience" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
            See the full itinerary <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}