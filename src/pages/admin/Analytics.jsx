import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Users, Mail, FileText, CheckCircle2, PartyPopper, Repeat, ArrowLeft, TrendingUp, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

const STATUS_COLORS = ['#60a5fa', '#fbbf24', '#fb923c', '#34d399', '#10b981', '#fb7185', '#94a3b8', '#cbd5e1'];

export default function Analytics() {
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, pr, ev] = await Promise.all([
          base44.entities.TravelProject.list('-created_date', 1000),
          base44.entities.Proposal.list('-created_date', 1000),
          base44.entities.AnalyticsEvent.list('-created_date', 1000),
        ]);
        setProjects(p); setProposals(pr); setEvents(ev);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, []);

  const visitors = useMemo(() => new Set(events.map(e => e.visitor_id).filter(Boolean)).size, [events]);
  const enquiries = projects.length;
  const offers = proposals.filter(p => p.status && p.status !== 'draft').length;
  const accepted = projects.filter(p => ['accepted', 'confirmed'].includes(p.status)).length;
  const completed = projects.filter(p => p.status === 'completed').length;

  const emailMap = useMemo(() => {
    const m = {};
    projects.forEach(p => { const e = (p.email || '').toLowerCase().trim(); if (e) (m[e] = m[e] || []).push(p); });
    return m;
  }, [projects]);
  const repeat = Object.values(emailMap).filter(arr => arr.length > 1).length;

  const funnel = [
    { label: 'Visitors', value: visitors, icon: Users, color: 'bg-sky-500' },
    { label: 'Enquiries', value: enquiries, icon: Mail, color: 'bg-blue-500' },
    { label: 'Offers sent', value: offers, icon: FileText, color: 'bg-amber-500' },
    { label: 'Accepted', value: accepted, icon: CheckCircle2, color: 'bg-emerald-500' },
    { label: 'Completed', value: completed, icon: PartyPopper, color: 'bg-violet-500' },
    { label: 'Repeat customers', value: repeat, icon: Repeat, color: 'bg-rose-500' },
  ];
  const maxV = Math.max(...funnel.map(f => f.value), 1);

  const monthsData = useMemo(() => {
    const now = new Date();
    const arr = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      arr.push({ month: d.toLocaleString('en', { month: 'short' }), enquiries: projects.filter(p => (p.created_date || '').slice(0, 7) === key).length });
    }
    return arr;
  }, [projects]);

  const statusData = useMemo(() => {
    const m = {};
    projects.forEach(p => { const s = p.status || 'planning'; m[s] = (m[s] || 0) + 1; });
    return Object.entries(m).map(([name, value]) => ({ name: name.replace('_', ' '), value }));
  }, [projects]);

  const topRegions = useMemo(() => {
    const m = {};
    projects.forEach(p => (p.preferred_regions || 'Unspecified').split(',').forEach(r => { r = r.trim(); if (r) m[r] = (m[r] || 0) + 1; }));
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [projects]);

  const repeatList = useMemo(() => Object.entries(emailMap).filter(([, arr]) => arr.length > 1).sort((a, b) => b[1].length - a[1].length).slice(0, 8), [emailMap]);

  const conv = (a, b) => b > 0 ? Math.round((a / b) * 100) : 0;

  return (
    <div className="py-8 px-4 md:px-6 min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/admin/calendar" className="p-2 rounded-lg hover:bg-muted"><ArrowLeft size={20} /></Link>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-1">Admin</p>
              <h1 className="font-heading text-3xl font-bold">Analytics</h1>
            </div>
          </div>
          <Link to="/admin/proposal-builder" className="text-sm text-muted-foreground hover:text-foreground">← Builder</Link>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-16">Loading business intelligence…</p>
        ) : (
          <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {funnel.map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                    <div className={`w-9 h-9 rounded-xl ${f.color} text-white flex items-center justify-center mb-2`}><Icon size={18} /></div>
                    <p className="text-2xl font-heading font-bold">{f.value}</p>
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Funnel */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={18} className="text-primary" />
                <h2 className="font-heading text-xl font-bold">Conversion Funnel</h2>
              </div>
              <div className="space-y-3">
                {funnel.map((f, i) => {
                  const pct = Math.max(2, Math.round((f.value / maxV) * 100));
                  const rate = i > 0 && funnel[i - 1].value > 0 ? Math.round((f.value / funnel[i - 1].value) * 100) : null;
                  return (
                    <div key={f.label} className="flex items-center gap-3">
                      <div className="w-36 text-sm font-medium shrink-0">{f.label}</div>
                      <div className="flex-1 h-9 bg-muted rounded-lg overflow-hidden relative">
                        <div className={`h-full ${f.color} flex items-center px-3 text-white text-sm font-semibold`} style={{ width: `${pct}%` }}>{f.value}</div>
                      </div>
                      <div className="w-14 text-right text-xs text-muted-foreground shrink-0">{rate !== null ? `${rate}%` : ''}</div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-4">Overall visitor → accepted: <span className="font-semibold text-foreground">{conv(accepted, visitors)}%</span> · enquiry → accepted: <span className="font-semibold text-foreground">{conv(accepted, enquiries)}%</span></p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Enquiries trend */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold mb-4">Enquiries — last 6 months</h2>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={monthsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="opacity-30" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="enquiries" fill="#2f6f5e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Status breakdown */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold mb-4">Pipeline status</h2>
                {statusData.length === 0 ? <p className="text-muted-foreground text-sm">No projects yet.</p> : (
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width="55%" height={240}>
                      <PieChart>
                        <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                          {statusData.map((_, i) => <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-1.5 text-sm">
                      {statusData.map((s, i) => (
                        <div key={s.name} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: STATUS_COLORS[i % STATUS_COLORS.length] }} />
                          <span className="capitalize flex-1">{s.name}</span>
                          <span className="font-semibold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top regions */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2"><MapPin size={18} className="text-primary" /> Top requested regions</h2>
                {topRegions.length === 0 ? <p className="text-muted-foreground text-sm">No data yet.</p> : (
                  <div className="space-y-2">
                    {topRegions.map(([r, c]) => (
                      <div key={r} className="flex items-center gap-3">
                        <div className="w-40 text-sm truncate">{r}</div>
                        <div className="flex-1 h-6 bg-muted rounded-lg overflow-hidden"><div className="h-full bg-primary/70" style={{ width: `${(c / topRegions[0][1]) * 100}%` }} /></div>
                        <div className="w-8 text-right text-sm font-semibold">{c}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Repeat customers */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2"><Repeat size={18} className="text-rose-500" /> Repeat customers</h2>
                {repeatList.length === 0 ? <p className="text-muted-foreground text-sm">No repeat customers yet — these will appear once a guest books more than one trip.</p> : (
                  <div className="space-y-2">
                    {repeatList.map(([email, arr]) => (
                      <div key={email} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-2 last:pb-0">
                        <div>
                          <p className="font-medium">{arr[0].customer_name || email}</p>
                          <p className="text-xs text-muted-foreground">{email}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-semibold">{arr.length} trips</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2">Visitors tracked from public page views · funnel derived from enquiries, proposals & trip statuses.</p>
          </div>
        )}
      </div>
    </div>
  );
}