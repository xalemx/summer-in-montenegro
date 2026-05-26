import CTAButton from '../components/CTAButton';
import { Plane, Users, Calendar, Info } from 'lucide-react';

const DATES = [
  { dep: '19 July 2026', ret: '26 July 2026', spots: 2 },
  { dep: '26 July 2026', ret: '2 August 2026', spots: 3 },
  { dep: '2 August 2026', ret: '9 August 2026', spots: 6 },
  { dep: '9 August 2026', ret: '16 August 2026', spots: 8 },
  { dep: '16 August 2026', ret: '23 August 2026', spots: 8 },
  { dep: '23 August 2026', ret: '30 August 2026', spots: 8 },
  { dep: '30 August 2026', ret: '6 September 2026', spots: 7 },
  { dep: '6 September 2026', ret: '13 September 2026', spots: 8 },
  { dep: '13 September 2026', ret: '20 September 2026', spots: 8 },
  { dep: '20 September 2026', ret: '27 September 2026', spots: 8 },
];

function getStatus(spots) {
  if (spots === 0) return { label: 'Sold Out', classes: 'bg-red-100 text-red-700', dot: 'bg-red-500', pulse: false };
  if (spots <= 2) return { label: 'Almost Full', classes: 'bg-red-50 text-red-600', dot: 'bg-red-500', pulse: true };
  if (spots <= 4) return { label: 'Limited Availability', classes: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', pulse: true };
  return { label: 'Open', classes: 'bg-green-50 text-green-700', dot: 'bg-green-500', pulse: false };
}

const NOTES = [
  { icon: Plane, text: 'Direct flights from London to Tivat or Podgorica — available Tuesday, Wednesday, Friday and Sunday' },
  { icon: Calendar, text: 'Sunday-to-Sunday is the main group structure' },
  { icon: Users, text: 'Minimum 4 guests required • Groups organised in 4-person blocks' },
  { icon: Plane, text: 'Flights not included — fly from London Gatwick, Luton or Stansted · Airport pickup included on arrival' },
];

export default function DepartureDates() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-3">Flying from London</p>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Summer 2026 Departures</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          Weekly Sunday-to-Sunday departures from London, 19 July until late September 2026.
        </p>

        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden mb-10">
          <div className="grid grid-cols-3 bg-primary text-primary-foreground text-sm font-semibold">
            <div className="p-4">Departure</div>
            <div className="p-4">Return</div>
            <div className="p-4 text-center">Status</div>
          </div>
          {DATES.map(([dep, ret, status], i) => (
            <div key={i} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}>
              <div className="p-4 font-medium">{dep}</div>
              <div className="p-4 text-muted-foreground">{ret}</div>
              <div className="p-4 text-center">
                {status === 'filling' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>Filling Fast
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">Open</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-amber-50 border border-amber-200 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <p className="text-amber-800 text-sm font-semibold">Maximum 8 guests per departure. Once full, that week is closed.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {NOTES.map((n, i) => (
            <div key={i} className="flex gap-3 p-4 bg-card rounded-xl border border-border">
              <n.icon size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{n.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton>Reserve Your Spot — Spaces Are Limited</CTAButton>
        </div>
      </div>
    </div>
  );
}