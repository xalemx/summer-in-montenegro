import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { addDays, format } from 'date-fns';
import MonthCalendar from '@/components/admin/MonthCalendar';
import { Building2, Plane, UserCheck } from 'lucide-react';

const STATUS_DOT = {
  planning: 'bg-blue-400',
  proposal: 'bg-amber-400',
  changes_requested: 'bg-orange-400',
  accepted: 'bg-green-400',
  confirmed: 'bg-emerald-500',
  declined: 'bg-rose-400',
  completed: 'bg-slate-400',
  closed: 'bg-slate-300',
};

export default function Calendar() {
  const [projects, setProjects] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthDate, setMonthDate] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });

  useEffect(() => {
    (async () => {
      try {
        const [p, s, its] = await Promise.all([
          base44.entities.TravelProject.list('-created_date', 300),
          base44.entities.Supplier.list('-created_date', 300),
          base44.entities.ProposalItem.filter({}, 'day_number', 500),
        ]);
        setProjects(p);
        setSuppliers(s);
        setItems(its.filter(i => i.supplier_id));
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, []);

  const supplierById = useMemo(() => { const m = {}; suppliers.forEach(s => m[s.id] = s); return m; }, [suppliers]);

  const events = useMemo(() => {
    const evs = [];
    projects.forEach(pr => {
      if (pr.arrival_date) evs.push({ date: pr.arrival_date, type: 'arrival', label: `↓ ${pr.customer_name}` });
      if (pr.departure_date) evs.push({ date: pr.departure_date, type: 'departure', label: `↑ ${pr.customer_name}` });
    });
    const projById = {}; projects.forEach(p => projById[p.id] = p);
    items.forEach(it => {
      const pr = projById[it.travel_project_id];
      if (!pr || !pr.arrival_date) return;
      const d = format(addDays(new Date(pr.arrival_date), (it.day_number || 1) - 1), 'yyyy-MM-dd');
      const sup = supplierById[it.supplier_id];
      evs.push({ date: d, type: 'supplier', label: `🚐 ${sup ? sup.supplier_name : 'Supplier'}` });
    });
    return evs;
  }, [projects, items, supplierById]);

  const consultants = useMemo(() => {
    const map = {};
    projects.forEach(p => { const c = p.assigned_consultant || 'Unassigned'; (map[c] = map[c] || []).push(p); });
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [projects]);

  const monthKey = format(monthDate, 'yyyy-MM');
  const monthStats = useMemo(() => {
    let arrivals = 0, departures = 0, supplierBookings = 0;
    events.forEach(e => {
      if (!e.date.startsWith(monthKey)) return;
      if (e.type === 'arrival') arrivals++;
      else if (e.type === 'departure') departures++;
      else supplierBookings++;
    });
    return { arrivals, departures, supplierBookings };
  }, [events, monthKey]);

  const activeThisMonth = useMemo(() => {
    const mStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const mEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    return projects.filter(p => p.arrival_date && p.departure_date && new Date(p.arrival_date) <= mEnd && new Date(p.departure_date) >= mStart);
  }, [projects, monthDate]);

  const inMonth = (p) => {
    const mStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const mEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    return p.arrival_date && p.departure_date && new Date(p.arrival_date) <= mEnd && new Date(p.departure_date) >= mStart;
  };

  const prevMonth = () => setMonthDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setMonthDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <div className="py-10 px-4 md:px-6 min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-1">Admin</p>
            <h1 className="font-heading text-3xl font-bold">Calendar & Availability</h1>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="/admin/proposal-builder" className="text-muted-foreground hover:text-foreground">← Builder</Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground">← Back to site</Link>
          </div>
        </div>

        {loading ? <p className="text-muted-foreground text-center py-10">Loading…</p> : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <StatCard icon={Plane} label="Arrivals" value={monthStats.arrivals} color="text-emerald-600" />
                <StatCard icon={Plane} label="Departures" value={monthStats.departures} color="text-amber-600" />
                <StatCard icon={Building2} label="Supplier bookings" value={monthStats.supplierBookings} color="text-blue-600" />
              </div>
              <MonthCalendar monthDate={monthDate} events={events} onPrev={prevMonth} onNext={nextMonth} />
              <div className="flex gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" /> Arrival</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" /> Departure</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-300" /> Supplier booking</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <h2 className="font-heading text-lg font-bold mb-1 flex items-center gap-2"><UserCheck size={18} className="text-primary" /> Consultant Workload</h2>
                <p className="text-xs text-muted-foreground mb-4">{activeThisMonth.length} trips active this month</p>
                <div className="space-y-4">
                  {consultants.length === 0 && <p className="text-sm text-muted-foreground">No consultants assigned yet.</p>}
                  {consultants.map(([name, trips]) => {
                    const active = trips.filter(inMonth);
                    return (
                      <div key={name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-sm">{name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{trips.length} trips · {active.length} now</span>
                        </div>
                        <div className="space-y-1">
                          {trips.slice(0, 5).map(t => (
                            <div key={t.id} className="flex items-center gap-2 text-xs">
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[t.status] || 'bg-slate-300'}`} />
                              <span className="flex-1 truncate">{t.customer_name}</span>
                              <span className="text-muted-foreground whitespace-nowrap">{t.arrival_date || '—'} → {t.departure_date || '—'}</span>
                            </div>
                          ))}
                          {trips.length > 5 && <p className="text-[11px] text-muted-foreground pl-4">+{trips.length - 5} more</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 shadow-sm flex items-center gap-3">
      <Icon size={22} className={color} />
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="font-heading text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}