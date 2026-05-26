import CTAButton from '../components/CTAButton';
import { Plane, Users, Calendar, Info } from 'lucide-react';

const DATES = [
  ['19 July 2026', '26 July 2026'],
  ['26 July 2026', '2 August 2026'],
  ['2 August 2026', '9 August 2026'],
  ['9 August 2026', '16 August 2026'],
  ['16 August 2026', '23 August 2026'],
  ['23 August 2026', '30 August 2026'],
  ['30 August 2026', '6 September 2026'],
  ['6 September 2026', '13 September 2026'],
  ['13 September 2026', '20 September 2026'],
  ['20 September 2026', '27 September 2026'],
];

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
          {DATES.map(([dep, ret], i) => (
            <div key={i} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}>
              <div className="p-4 font-medium">{dep}</div>
              <div className="p-4 text-muted-foreground">{ret}</div>
              <div className="p-4 text-center">
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">Open</span>
                <p className="text-muted-foreground text-xs mt-1">8 spots max</p>
              </div>
            </div>
          ))}
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
          <CTAButton>Reserve Your Spot</CTAButton>
        </div>
      </div>
    </div>
  );
}