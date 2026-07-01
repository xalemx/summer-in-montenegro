import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TYPE_COLORS = {
  arrival: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  departure: 'bg-amber-100 text-amber-700 border-amber-300',
  supplier: 'bg-blue-100 text-blue-700 border-blue-300',
};

function fmtKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${da}`;
}

export default function MonthCalendar({ monthDate, events, onPrev, onNext }) {
  const year = monthDate.getFullYear();
  const m = monthDate.getMonth();
  const first = new Date(year, m, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const gridStart = new Date(year, m, 1 - startOffset);
  const cells = [];
  for (let i = 0; i < 42; i++) cells.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));

  const eventsByDate = events.reduce((acc, e) => { (acc[e.date] = acc[e.date] || []).push(e); return acc; }, {});
  const monthLabel = monthDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl font-bold capitalize">{monthLabel}</h2>
        <div className="flex gap-1">
          <button onClick={onPrev} className="p-2 rounded-lg hover:bg-muted"><ChevronLeft size={18} /></button>
          <button onClick={onNext} className="p-2 rounded-lg hover:bg-muted"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map(w => (<div key={w} className="text-[10px] font-semibold uppercase text-muted-foreground text-center py-1">{w}</div>))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          const key = fmtKey(d);
          const inMonth = d.getMonth() === m;
          const dayEvents = eventsByDate[key] || [];
          return (
            <div key={i} className={`min-h-[72px] rounded-lg border p-1 ${inMonth ? 'border-border bg-background' : 'border-transparent bg-muted/20'}`}>
              <div className={`text-xs font-medium mb-1 ${inMonth ? 'text-foreground' : 'text-muted-foreground/40'}`}>{d.getDate()}</div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((e, idx) => (
                  <div key={idx} className={`text-[10px] px-1 py-0.5 rounded border truncate ${TYPE_COLORS[e.type] || TYPE_COLORS.supplier}`} title={e.label}>
                    {e.label}
                  </div>
                ))}
                {dayEvents.length > 3 && <div className="text-[10px] text-muted-foreground px-1">+{dayEvents.length - 3} more</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}