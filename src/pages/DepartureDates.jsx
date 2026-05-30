import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import CTAButton from '../components/CTAButton';
import { Plane, Users, Calendar, Info } from 'lucide-react';

const DATES = [
  { dep: '17 July 2026', ret: '24 July 2026', spots: 2 },
  { dep: '24 July 2026', ret: '31 July 2026', spots: 3 },
  { dep: '31 July 2026', ret: '7 August 2026', spots: 6 },
  { dep: '7 August 2026', ret: '14 August 2026', spots: 8 },
  { dep: '14 August 2026', ret: '21 August 2026', spots: 8 },
  { dep: '21 August 2026', ret: '28 August 2026', spots: 8 },
  { dep: '28 August 2026', ret: '4 September 2026', spots: 7 },
  { dep: '4 September 2026', ret: '11 September 2026', spots: 8 },
  { dep: '11 September 2026', ret: '18 September 2026', spots: 8 },
  { dep: '18 September 2026', ret: '25 September 2026', spots: 8 },
];

function getStatus(spots) {
  if (spots === 0) return { label: 'Sold Out', classes: 'bg-red-100 text-red-700', dot: 'bg-red-500', pulse: false };
  if (spots <= 2) return { label: 'Almost Full', classes: 'bg-red-50 text-red-600', dot: 'bg-red-500', pulse: true };
  if (spots <= 4) return { label: 'Limited Availability', classes: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', pulse: true };
  return { label: 'Open', classes: 'bg-green-50 text-green-700', dot: 'bg-green-500', pulse: false };
}

const NOTES = [
  { icon: Plane, text: 'Weekly Friday Ryanair flights from London to Podgorica (TGD) — the recommended route' },
  { icon: Calendar, text: 'Friday-to-Friday structure — 8 days total including travel days' },
  { icon: Users, text: 'Minimum 4 guests required to run a departure · Maximum 8 guests per week' },
  { icon: Info, text: 'Flights not included — guests book independently · Airport pickup included on arrival' },
];

export default function DepartureDates() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.DepartureDate.list('departure').then(d => { setDates(d); setLoading(false); });
  }, []);

  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-3">Flying from London</p>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Summer 2026 Departures</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          Weekly Friday-to-Friday departures from London, from 17 July until late September 2026.
        </p>

        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden mb-10">
          <div className="grid grid-cols-3 bg-primary text-primary-foreground text-sm font-semibold">
            <div className="p-4">Departure</div>
            <div className="p-4">Return</div>
            <div className="p-4 text-center">Status</div>
          </div>
          {(loading ? [] : dates.length > 0 ? dates.map(d => ({ dep: d.departure, ret: d.return_date, spots: d.spots_remaining })) : DATES).map((d, i) => {
            const s = getStatus(d.spots);
            return (
            <div key={i} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}>
              <div className="p-4 font-medium">{d.dep}</div>
              <div className="p-4 text-muted-foreground">{d.ret}</div>
              <div className="p-4 text-center">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.classes}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${s.pulse ? 'animate-pulse' : ''}`}></span>
                  {s.label}
                </span>
                {d.spots > 0 && d.spots < 8 && (
                  <p className="text-xs text-muted-foreground mt-1">{d.spots} spot{d.spots !== 1 ? 's' : ''} left</p>
                )}
              </div>
            </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 bg-amber-50 border border-amber-200 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <p className="text-amber-800 text-sm font-semibold">Each departure requires a minimum of 4 guests and is limited to a maximum of 8 guests.</p>
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