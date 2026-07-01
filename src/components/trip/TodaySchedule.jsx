import ProposalMap from '@/components/proposals/ProposalMap';
import { Bed, Car, Compass, Utensils, MapPin, Sailboat, Sparkles, Calendar } from 'lucide-react';

const TYPE_ICON = {
  Accommodation: Bed, Transfer: Car, Activity: Compass, Restaurant: Utensils,
  Guide: MapPin, 'Car Rental': Car, 'Boat Trip': Sailboat, Experience: Sparkles, Other: MapPin,
};

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : '';

export default function TodaySchedule({ items, dayNumber, arrivalDate }) {
  const todays = items.filter(i => (i.day_number || 1) === dayNumber).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const date = arrivalDate ? new Date(arrivalDate + 'T00:00:00') : null;
  const dayDate = date ? new Date(date.getTime() + (dayNumber - 1) * 86400000) : null;

  return (
    <div className="bg-gradient-to-br from-primary to-[#234d3f] text-primary-foreground rounded-2xl border border-primary/30 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-1 opacity-80">
          <Calendar size={15} />
          <span className="text-xs uppercase tracking-widest font-semibold">Today · Day {dayNumber} of your trip</span>
        </div>
        <h2 className="font-heading text-2xl font-bold mb-1">{dayDate ? fmt(dayDate) : `Day ${dayNumber}`}</h2>
        <p className="text-sm opacity-90 mb-4">Here's what's happening today. Have a wonderful time in Montenegro!</p>
        {todays.length === 0 ? (
          <p className="text-sm opacity-90 bg-white/10 rounded-xl p-4">Nothing formally scheduled today — enjoy a relaxed day, or message your travel team for ideas.</p>
        ) : (
          <div className="space-y-2">
            {todays.map(it => {
              const Icon = TYPE_ICON[it.item_type] || MapPin;
              return (
                <div key={it.id} className="flex gap-3 bg-white/10 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0"><Icon size={16} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm">{it.title}</p>
                      {it.start_time && <span className="text-[11px] opacity-80">{it.start_time}{it.end_time ? `–${it.end_time}` : ''}</span>}
                    </div>
                    {it.location && <p className="text-xs opacity-80 flex items-center gap-1"><MapPin size={11} /> {it.location}</p>}
                    {it.description && <p className="text-xs opacity-80 mt-0.5 leading-relaxed">{it.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {todays.length > 0 && (
        <div className="bg-white/5 p-4 border-t border-white/10">
          <p className="text-xs uppercase tracking-wide opacity-70 mb-2 font-semibold">Today on the map</p>
          <div className="rounded-xl overflow-hidden border border-white/20"><ProposalMap items={todays} /></div>
        </div>
      )}
    </div>
  );
}