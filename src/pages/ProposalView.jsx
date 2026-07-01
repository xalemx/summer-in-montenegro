import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import RequestChangesForm from '@/components/proposals/RequestChangesForm';
import { Button } from '@/components/ui/button';
import { Check, MessageSquare, XCircle, Calendar, Users, MapPin, Bed, Car, Compass, Utensils } from 'lucide-react';

const TYPE_ICON = {
  Accommodation: Bed,
  Transfer: Car,
  Activity: Compass,
  Restaurant: Utensils,
  Guide: Compass,
  'Car Rental': Car,
  'Boat Trip': Compass,
  Experience: Compass,
  Other: MapPin,
};

export default function ProposalView() {
  const { id } = useParams();
  const [proposal, setProposal] = useState(null);
  const [project, setProject] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [showChangesForm, setShowChangesForm] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const p = await base44.entities.Proposal.get(id);
        setProposal(p);
        if (p.travel_project_id) {
          try { setProject(await base44.entities.TravelProject.get(p.travel_project_id)); } catch {}
        }
        const its = await base44.entities.ProposalItem.filter({ proposal_id: id }, 'day_number', 500);
        setItems(its);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, [id]);

  const act = async (action, payload = {}) => {
    setActing(true);
    try {
      await base44.functions.invoke('respondToProposal', { proposal_id: id, action, ...payload });
      const updated = await base44.entities.Proposal.get(id);
      setProposal(updated);
      if (updated.travel_project_id) {
        try { setProject(await base44.entities.TravelProject.get(updated.travel_project_id)); } catch {}
      }
    } catch (e) { alert('Something went wrong'); } finally { setActing(false); }
  };

  if (loading) return <div className="py-32 text-center text-muted-foreground">Loading your proposal…</div>;
  if (!proposal) return <div className="py-32 text-center"><p className="text-muted-foreground mb-4">Proposal not found.</p><Link to="/" className="text-primary underline">Back to home</Link></div>;

  const itemsByDay = items.reduce((acc, i) => {
    const d = i.day_number || 1;
    (acc[d] = acc[d] || []).push(i);
    return acc;
  }, {});
  const days = Object.keys(itemsByDay).sort((a, b) => a - b);

  const sections = {
    Accommodation: items.filter(i => i.item_type === 'Accommodation'),
    Transport: items.filter(i => ['Transfer', 'Car Rental'].includes(i.item_type)),
    Activities: items.filter(i => ['Activity', 'Boat Trip', 'Experience', 'Guide'].includes(i.item_type)),
    Restaurants: items.filter(i => i.item_type === 'Restaurant'),
  };

  const statusBadge = {
    draft: { label: 'Draft', class: 'bg-amber-100 text-amber-700' },
    sent: { label: 'Awaiting your response', class: 'bg-blue-100 text-blue-700' },
    changes_requested: { label: 'Changes requested', class: 'bg-amber-100 text-amber-700' },
    accepted: { label: 'Accepted — thank you!', class: 'bg-green-100 text-green-700' },
    declined: { label: 'Declined', class: 'bg-slate-200 text-slate-600' },
    cancelled: { label: 'Cancelled', class: 'bg-slate-200 text-slate-500' },
  }[proposal.status] || { label: proposal.status, class: 'bg-slate-100' };

  const showActions = proposal.status === 'sent' || proposal.status === 'changes_requested';

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-3">Your Montenegro Trip</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">{proposal.title}</h1>
          {proposal.summary && <p className="text-primary-foreground/80 leading-relaxed max-w-2xl">{proposal.summary}</p>}
          <span className={`inline-block mt-4 text-sm px-3 py-1.5 rounded-full font-medium ${statusBadge.class}`}>{statusBadge.label}</span>
        </div>
      </section>

      {/* Trip overview */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-2xl border border-border p-5 text-center shadow-sm">
              <Calendar size={22} className="mx-auto text-primary mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Travel dates</p>
              <p className="font-semibold text-sm">{project?.arrival_date || 'TBC'} → {project?.departure_date || 'TBC'}</p>
              {project?.flexible_dates && <p className="text-xs text-muted-foreground mt-1">Dates flexible</p>}
            </div>
            <div className="bg-card rounded-2xl border border-border p-5 text-center shadow-sm">
              <Users size={22} className="mx-auto text-primary mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Travellers</p>
              <p className="font-semibold text-sm">{project?.adults || 0} adults · {project?.children || 0} children</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5 text-center shadow-sm">
              <MapPin size={22} className="mx-auto text-primary mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Regions</p>
              <p className="font-semibold text-sm">{project?.preferred_regions || 'Montenegro'}</p>
            </div>
          </div>

          {/* Day-by-day */}
          {days.length > 0 && (
            <div className="mb-10">
              <h2 className="font-heading text-2xl font-bold mb-5">Day-by-day Itinerary</h2>
              <div className="space-y-4">
                {days.map(day => (
                  <div key={day} className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-primary mb-3">Day {day}</h3>
                    <div className="space-y-3">
                      {itemsByDay[day].sort((a,b) => (a.sort_order||0) - (b.sort_order||0)).map(item => {
                        const Icon = TYPE_ICON[item.item_type] || MapPin;
                        return (
                          <div key={item.id} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon size={18} className="text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-sm">{item.title}</h4>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.item_type}</span>
                              </div>
                              {item.description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>}
                              <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
                                {item.location && <span>📍 {item.location}</span>}
                                {item.start_time && <span>⏰ {item.start_time}{item.end_time ? `–${item.end_time}` : ''}</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary sections */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {sections.Accommodation.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2"><Bed size={18} className="text-primary" /> Accommodation</h3>
                <ul className="space-y-2 text-sm">
                  {sections.Accommodation.map(i => <li key={i.id}><span className="font-medium">{i.title}</span>{i.location && <span className="text-muted-foreground"> · {i.location}</span>}</li>)}
                </ul>
              </div>
            )}
            {sections.Activities.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2"><Compass size={18} className="text-primary" /> Activities</h3>
                <ul className="space-y-2 text-sm">
                  {sections.Activities.map(i => <li key={i.id}><span className="font-medium">{i.title}</span>{i.location && <span className="text-muted-foreground"> · {i.location}</span>}</li>)}
                </ul>
              </div>
            )}
            {sections.Transport.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2"><Car size={18} className="text-primary" /> Transport</h3>
                <ul className="space-y-2 text-sm">
                  {sections.Transport.map(i => <li key={i.id}><span className="font-medium">{i.title}</span>{i.location && <span className="text-muted-foreground"> · {i.location}</span>}</li>)}
                </ul>
              </div>
            )}
            {sections.Restaurants.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2"><Utensils size={18} className="text-primary" /> Dining</h3>
                <ul className="space-y-2 text-sm">
                  {sections.Restaurants.map(i => <li key={i.id}><span className="font-medium">{i.title}</span>{i.location && <span className="text-muted-foreground"> · {i.location}</span>}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* Important notes */}
          {proposal.customer_notes && (
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5 mb-8">
              <h3 className="font-heading text-lg font-bold mb-2">Important Notes</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{proposal.customer_notes}</p>
            </div>
          )}

          {/* Actions */}
          {showActions ? (
            <div className="text-center bg-card rounded-2xl border border-border p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-2">How does this look?</h3>
              <p className="text-muted-foreground text-sm mb-6">Let us know — we're happy to adjust anything.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => act('accept')} disabled={acting} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8">
                  <Check size={18} className="mr-1" /> Accept Proposal
                </Button>
                <Button onClick={() => setShowChangesForm(true)} disabled={acting} variant="outline" className="rounded-full px-8">
                  <MessageSquare size={18} className="mr-1" /> Request Changes
                </Button>
                <Button onClick={() => { const reason = prompt('Optional — tell us why, so we can improve:'); if (reason !== null) act('decline', { decline_reason: reason }); }} disabled={acting} variant="outline" className="rounded-full px-8 text-destructive border-destructive/40 hover:bg-destructive/10">
                  <XCircle size={18} className="mr-1" /> Decline
                </Button>
              </div>
            </div>
          ) : (
            <div className={`text-center rounded-2xl border p-8 ${proposal.status === 'accepted' ? 'bg-green-50 border-green-200' : proposal.status === 'declined' ? 'bg-slate-50 border-slate-200' : 'bg-amber-50 border-amber-200'}`}>
              {proposal.status === 'accepted' && <Check size={28} className="mx-auto text-green-600 mb-2" />}
              {proposal.status === 'declined' && <XCircle size={28} className="mx-auto text-slate-500 mb-2" />}
              {proposal.status === 'changes_requested' && <MessageSquare size={28} className="mx-auto text-amber-600 mb-2" />}
              <h3 className="font-heading text-xl font-bold mb-1">
                {proposal.status === 'accepted' && 'Proposal accepted!'}
                {proposal.status === 'declined' && 'Proposal declined'}
                {proposal.status === 'changes_requested' && 'Changes requested — thank you'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {proposal.status === 'accepted' && "We'll be in touch shortly to confirm the details and next steps."}
                {proposal.status === 'declined' && 'Thank you for letting us know. We hope to help plan a future trip.'}
                {proposal.status === 'changes_requested' && "We've received your feedback and will send an updated proposal soon."}
              </p>
              {proposal.customer_response_notes && proposal.status !== 'accepted' && (
                <p className="text-xs text-muted-foreground mt-3 bg-muted/50 rounded-lg p-3 text-left whitespace-pre-wrap">Your notes: {proposal.customer_response_notes}</p>
              )}
            </div>
          )}

          {showChangesForm && (
            <RequestChangesForm
              onSubmit={async (areas, notes) => { await act('changes', { change_areas: areas, change_notes: notes }); setShowChangesForm(false); }}
              onClose={() => setShowChangesForm(false)}
            />
          )}
        </div>
      </section>
    </div>
  );
}