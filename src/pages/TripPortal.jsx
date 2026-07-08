import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import TripProgressTracker from '@/components/trip/TripProgressTracker';
import TodaySchedule from '@/components/trip/TodaySchedule';
import ProposalMap from '@/components/proposals/ProposalMap';
import RequestChangesForm from '@/components/proposals/RequestChangesForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Check, MessageSquare, XCircle, Calendar, Users, Compass, MapPin,
  Bed, Car, Utensils, Sailboat, Sparkles, Send, Clock, Plane, Star, Camera
} from 'lucide-react';
import { toast } from 'sonner';

const STATUS_STYLE = {
  planning: 'bg-blue-100 text-blue-700',
  proposal: 'bg-accent/20 text-accent-foreground',
  changes_requested: 'bg-amber-100 text-amber-700',
  accepted: 'bg-green-100 text-green-700',
  confirmed: 'bg-green-100 text-green-700',
  declined: 'bg-slate-200 text-slate-600',
  completed: 'bg-primary/10 text-primary',
  closed: 'bg-slate-200 text-slate-600',
};

const TYPE_ICON = {
  Accommodation: Bed, Transfer: Car, Activity: Compass, Restaurant: Utensils,
  Guide: MapPin, 'Car Rental': Car, 'Boat Trip': Sailboat, Experience: Sparkles, Other: MapPin,
};

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const stripTime = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };

export default function TripPortal() {
  const { reference_number } = useParams();
  const [project, setProject] = useState(null);
  const [latestProposal, setLatestProposal] = useState(null);
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [acting, setActing] = useState(false);
  const [showChangesForm, setShowChangesForm] = useState(false);
  const [msg, setMsg] = useState({ message_type: 'message', subject: '', message: '' });
  const [sendingMsg, setSendingMsg] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [review, setReview] = useState('');
  const [reviewSent, setReviewSent] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const projs = await base44.entities.TravelProject.filter({ reference_number });
        const p = projs[0];
        if (!p) { setNotFound(true); return; }
        setProject(p);
        const props = await base44.entities.Proposal.filter({ travel_project_id: p.id }, '-version', 50);
        const sent = props.filter(pr => pr.status !== 'draft').sort((a, b) => (b.version || 0) - (a.version || 0))[0];
        setLatestProposal(sent || null);
        if (sent) setItems(await base44.entities.ProposalItem.filter({ proposal_id: sent.id }, 'day_number', 500));
        setMessages(await base44.entities.TripMessage.filter({ travel_project_id: p.id }, '-created_date', 50));
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [reference_number]);

  const reload = async (p) => {
    const props = await base44.entities.Proposal.filter({ travel_project_id: p.id }, '-version', 50);
    const sent = props.filter(pr => pr.status !== 'draft').sort((a, b) => (b.version || 0) - (a.version || 0))[0];
    setLatestProposal(sent || null);
    setItems(sent ? await base44.entities.ProposalItem.filter({ proposal_id: sent.id }, 'day_number', 500) : []);
    setProject(await base44.entities.TravelProject.get(p.id));
  };

  const act = async (action, payload = {}) => {
    if (!latestProposal) return;
    setActing(true);
    try {
      await base44.functions.invoke('respondToProposal', { proposal_id: latestProposal.id, action, ...payload });
      await reload(project);
    } catch (e) { toast.error('Something went wrong'); } finally { setActing(false); }
  };

  const submitMessage = async (override = {}) => {
    const data = { ...msg, ...override };
    if (!data.message.trim()) return;
    setSendingMsg(true);
    try {
      await base44.entities.TripMessage.create({
        travel_project_id: project.id,
        reference_number: project.reference_number,
        customer_name: project.customer_name,
        message_type: data.message_type,
        subject: data.subject,
        message: data.message,
        status: 'new',
      });
      setMsg({ message_type: 'message', subject: '', message: '' });
      setMsgSent(true);
      setMessages(await base44.entities.TripMessage.filter({ travel_project_id: project.id }, '-created_date', 50));
    } catch (e) { toast.error('Could not send message'); } finally { setSendingMsg(false); }
  };

  const submitReview = async () => {
    if (!review.trim()) return;
    setSendingMsg(true);
    try {
      await base44.entities.TripMessage.create({
        travel_project_id: project.id,
        reference_number: project.reference_number,
        customer_name: project.customer_name,
        message_type: 'message',
        subject: 'Trip review',
        message: review,
        status: 'new',
      });
      setReview('');
      setReviewSent(true);
      setMessages(await base44.entities.TripMessage.filter({ travel_project_id: project.id }, '-created_date', 50));
    } catch (e) { toast.error('Could not submit review'); } finally { setSendingMsg(false); }
  };

  if (loading) {
    return (
      <div className="py-24 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="py-24 px-4 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
          <MapPin size={28} className="text-muted-foreground" />
        </div>
        <h1 className="font-heading text-2xl font-bold mb-2">Trip not found</h1>
        <p className="text-muted-foreground">We couldn't find a trip with that reference. Please check your link or contact us.</p>
      </div>
    );
  }

  // Journey stage
  const status = project.status;
  const today = stripTime(new Date());
  const arr = project.arrival_date ? stripTime(project.arrival_date) : null;
  const dep = project.departure_date ? stripTime(project.departure_date) : null;
  const duringTravel = arr && dep && today >= arr && today <= dep;
  const dayNumber = duringTravel ? Math.floor((today - arr) / 86400000) + 1 : null;
  const postTravel = status === 'completed' || (dep && today > dep);
  const hasProposal = !!latestProposal;
  const isPreProposal = !hasProposal;
  const isProposalStage = hasProposal && ['proposal', 'changes_requested', 'sent'].includes(status) && latestProposal.status === 'sent';
  const isAccepted = ['accepted', 'confirmed'].includes(status);
  const isDeclined = status === 'declined';

  const byDay = items.reduce((acc, it) => { const d = it.day_number || 1; (acc[d] = acc[d] || []).push(it); return acc; }, {});
  const days = Object.keys(byDay).sort((a, b) => a - b);
  const accommodation = items.filter(i => i.item_type === 'Accommodation');
  const activities = items.filter(i => ['Activity', 'Boat Trip', 'Experience', 'Guide', 'Restaurant'].includes(i.item_type));
  const transport = items.filter(i => ['Transfer', 'Car Rental'].includes(i.item_type));

  const Itinerary = () => (
    <>
      {days.length > 0 && (
        <div className="space-y-5 mb-6">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground">Day-by-day Itinerary</h3>
          {days.map(d => (
            <div key={d} className="border-l-2 border-primary/30 pl-4">
              <p className="font-heading text-sm font-bold text-primary mb-2">Day {d}</p>
              <div className="space-y-3">
                {byDay[d].map(it => {
                  const Icon = TYPE_ICON[it.item_type] || MapPin;
                  return (
                    <div key={it.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Icon size={16} className="text-primary" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{it.title}</p>
                        {it.description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{it.description}</p>}
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[11px] text-muted-foreground">
                          {it.location && <span className="flex items-center gap-0.5"><MapPin size={11} /> {it.location}</span>}
                          {it.start_time && <span>{it.start_time}{it.end_time ? `–${it.end_time}` : ''}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      {(accommodation.length > 0 || activities.length > 0 || transport.length > 0) && (
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {[{ label: 'Accommodation', icon: Bed, list: accommodation }, { label: 'Activities', icon: Compass, list: activities }, { label: 'Transport', icon: Car, list: transport }].map(col => col.list.length > 0 && (
            <div key={col.label} className="bg-muted/40 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5"><col.icon size={13} /> {col.label}</p>
              <ul className="space-y-1.5">{col.list.map(i => <li key={i.id} className="text-xs leading-snug">{i.title}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <div className="mb-6">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Your Route on the Map</h3>
          <ProposalMap items={items} />
        </div>
      )}
    </>
  );

  return (
    <div className="py-10 md:py-14 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Hero header */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-primary text-primary-foreground px-6 py-7">
            <p className="text-[11px] tracking-[0.25em] uppercase opacity-70 font-semibold mb-1">Your Montenegro Trip</p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-2">{project.customer_name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm opacity-90">
              <span className="font-mono tracking-wide bg-white/10 px-2.5 py-1 rounded-full text-xs">{project.reference_number}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLE[project.status] || 'bg-white/10'}`}>{project.status.replace(/_/g, ' ')}</span>
            </div>
          </div>
          <div className="p-6"><TripProgressTracker status={project.status} /></div>
        </div>

        {/* Trip details */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h2 className="font-heading text-sm font-semibold flex items-center gap-2 mb-3 text-muted-foreground uppercase tracking-wide"><Calendar size={16} className="text-primary" /> Travel Dates</h2>
            <p className="font-heading text-lg font-semibold">{fmtDate(project.arrival_date)} <span className="text-muted-foreground mx-1">→</span> {fmtDate(project.departure_date)}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Users size={14} /> {project.adults || 1} adults{project.children ? ` · ${project.children} children` : ''}</span>
              {project.flexible_dates && <span className="flex items-center gap-1"><Clock size={14} /> Flexible</span>}
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h2 className="font-heading text-sm font-semibold flex items-center gap-2 mb-3 text-muted-foreground uppercase tracking-wide"><Compass size={16} className="text-primary" /> Traveller Profile</h2>
            <p className="text-sm leading-relaxed">{project.traveller_profile || `${project.travel_style || 'balanced'} style trip`}</p>
            {project.preferred_regions && <p className="text-xs text-muted-foreground mt-2">Regions: {project.preferred_regions}</p>}
          </div>
        </div>

        {/* DURING TRAVEL — today's schedule */}
        {duringTravel && hasProposal && (
          <TodaySchedule items={items} dayNumber={dayNumber} arrivalDate={project.arrival_date} />
        )}

        {/* PRE-PROPOSAL */}
        {isPreProposal && (
          <div className="bg-card rounded-2xl border border-border shadow-sm p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><Plane size={24} className="text-primary" /></div>
            <h2 className="font-heading text-xl font-bold mb-2">We're preparing your personalised Montenegro proposal.</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">Your trip details are with our team. We'll have your tailored itinerary ready soon — check back here or watch your messages.</p>
          </div>
        )}

        {/* PROPOSAL STAGE */}
        {hasProposal && !isAccepted && !postTravel && !isDeclined && (
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-heading text-xl font-bold">{latestProposal.title || 'Your Proposal'}</h2>
              <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full font-medium">v{latestProposal.version || 1}</span>
            </div>
            {latestProposal.summary && <p className="text-muted-foreground text-sm leading-relaxed mb-6">{latestProposal.summary}</p>}
            <Itinerary />
            {(latestProposal.customer_notes || project.special_requests) && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <h3 className="font-heading text-sm font-semibold text-amber-800 mb-1.5 flex items-center gap-1.5"><Sparkles size={14} /> Important Notes</h3>
                {latestProposal.customer_notes && <p className="text-sm text-amber-900 leading-relaxed mb-1">{latestProposal.customer_notes}</p>}
                {project.special_requests && <p className="text-xs text-amber-700 leading-relaxed">{project.special_requests}</p>}
              </div>
            )}
            {isProposalStage ? (
              <div className="text-center bg-muted/30 rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold mb-1">How does this look?</h3>
                <p className="text-muted-foreground text-sm mb-5">Let us know — we're happy to adjust anything.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => act('accept')} disabled={acting} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-7"><Check size={18} className="mr-1" /> Accept Proposal</Button>
                  <Button onClick={() => setShowChangesForm(true)} disabled={acting} variant="outline" className="rounded-full px-7"><MessageSquare size={18} className="mr-1" /> Request Changes</Button>
                  <Button onClick={() => { const r = prompt('Optional — tell us why:'); if (r !== null) act('decline', { decline_reason: r }); }} disabled={acting} variant="outline" className="rounded-full px-7 text-destructive border-destructive/40 hover:bg-destructive/10"><XCircle size={18} className="mr-1" /> Decline</Button>
                </div>
              </div>
            ) : (
              <div className={`text-center rounded-xl p-6 ${latestProposal.status === 'changes_requested' ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50 border border-slate-200'}`}>
                <MessageSquare size={26} className="mx-auto text-amber-600 mb-2" />
                <h3 className="font-heading text-lg font-bold mb-0.5">Changes requested — thank you</h3>
                <p className="text-muted-foreground text-sm">We'll prepare an updated proposal for you soon.</p>
                {latestProposal.customer_response_notes && <p className="text-xs text-muted-foreground mt-3 bg-white/60 rounded-lg p-3 text-left whitespace-pre-wrap">Your notes: {latestProposal.customer_response_notes}</p>}
              </div>
            )}
          </div>
        )}

        {/* ACCEPTED / CONFIRMED — booking details */}
        {isAccepted && !postTravel && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <Check size={28} className="mx-auto text-green-600 mb-2" />
              <h2 className="font-heading text-xl font-bold mb-1">Your trip is accepted — here come the details</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">We're confirming your bookings with our suppliers. This page will update with confirmation details and final timings as everything locks in.</p>
            </div>
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold">{latestProposal?.title || 'Your Itinerary'}</h2>
                {latestProposal && <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">Accepted</span>}
              </div>
              <Itinerary />
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-2">
                <h3 className="font-heading text-sm font-semibold mb-2 flex items-center gap-1.5"><Sparkles size={14} className="text-primary" /> What happens next</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                  <li>We confirm availability with each hotel and supplier.</li>
                  <li>You'll receive final timings and contact details here before you travel.</li>
                  <li>During your trip, this page becomes your live daily schedule.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* POST-TRAVEL — archive + reviews */}
        {postTravel && hasProposal && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold">Trip Archive</h2>
                <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">Completed</span>
              </div>
              <Itinerary />
            </div>
            {!reviewSent ? (
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <h2 className="font-heading text-xl font-bold mb-1 flex items-center gap-2"><Star size={18} className="text-amber-500" /> How was your trip?</h2>
                <p className="text-muted-foreground text-sm mb-4">We'd love to hear about your experience — your review helps other travellers and our team.</p>
                <Textarea rows={4} value={review} onChange={e => setReview(e.target.value)} placeholder="Tell us about your Montenegro adventure..." />
                <Button onClick={submitReview} disabled={sendingMsg || !review.trim()} className="mt-3 bg-primary text-primary-foreground rounded-full px-6"><Send size={16} className="mr-1.5" /> {sendingMsg ? 'Sending...' : 'Submit review'}</Button>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Camera size={16} /> Share your photos on <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer" className="text-primary underline">WhatsApp</a> — we'd love to feature them.
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <Check size={26} className="mx-auto text-green-600 mb-2" />
                <h2 className="font-heading text-xl font-bold mb-1">Thank you for your review!</h2>
                <p className="text-muted-foreground text-sm">We truly appreciate you taking the time. We hope to welcome you back to Montenegro again.</p>
              </div>
            )}
          </div>
        )}

        {/* DECLINED */}
        {isDeclined && (
          <div className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center">
            <XCircle size={28} className="mx-auto text-slate-500 mb-2" />
            <h2 className="font-heading text-xl font-bold mb-1">Proposal declined</h2>
            <p className="text-muted-foreground text-sm">Thank you for letting us know. We hope to help plan a future trip — just message us anytime.</p>
          </div>
        )}

        {/* Messages / changes */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h2 className="font-heading text-xl font-bold mb-1">Need to update something?</h2>
          <p className="text-muted-foreground text-sm mb-5">Send us a message or a change request — we'll get back to you.</p>
          {messages.length > 0 && (
            <div className="space-y-3 mb-5">
              {messages.map(m => (
                <div key={m.id} className="bg-muted/40 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.subject === 'Trip review' ? 'Your review' : m.message_type === 'change_request' ? 'Change Request' : 'Message'}</span>
                    <span className="text-[11px] text-muted-foreground">{new Date(m.created_date).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {m.subject && m.subject !== 'Trip review' && <p className="font-medium text-sm mb-0.5">{m.subject}</p>}
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{m.message}</p>
                  {m.admin_reply && <div className="mt-2 pt-2 border-t border-border text-sm"><p className="text-xs font-semibold text-primary mb-0.5">Our reply:</p><p className="text-muted-foreground whitespace-pre-wrap">{m.admin_reply}</p></div>}
                </div>
              ))}
            </div>
          )}
          {msgSent ? (
            <div className="text-center py-4">
              <Check size={24} className="mx-auto text-green-600 mb-2" />
              <p className="font-medium text-sm">Thanks — your message has been sent.</p>
              <button onClick={() => setMsgSent(false)} className="text-xs text-primary underline mt-2">Send another</button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                {[['message', 'Message', MessageSquare], ['change_request', 'Change Request', Compass]].map(([v, label, Icon]) => (
                  <button key={v} onClick={() => setMsg(p => ({ ...p, message_type: v }))} className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium flex items-center justify-center gap-1.5 transition-all ${msg.message_type === v ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'}`}>
                    <Icon size={15} /> {label}
                  </button>
                ))}
              </div>
              <Input value={msg.subject} onChange={e => setMsg(p => ({ ...p, subject: e.target.value }))} placeholder="Subject (optional)" />
              <Textarea rows={3} value={msg.message} onChange={e => setMsg(p => ({ ...p, message: e.target.value }))} placeholder={msg.message_type === 'change_request' ? "Tell us what you'd like to change..." : "Your message..."} />
              <Button onClick={() => submitMessage()} disabled={sendingMsg || !msg.message.trim()} className="w-full bg-primary text-primary-foreground rounded-full py-3"><Send size={16} className="mr-1.5" /> {sendingMsg ? 'Sending...' : 'Send to your travel team'}</Button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground pt-2">This is your private trip page — keep this link safe. Questions? <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer" className="text-primary underline">Message us on WhatsApp</a>.</p>
      </div>

      {showChangesForm && (
        <RequestChangesForm
          onSubmit={async (areas, notes) => { await act('changes', { change_areas: areas, change_notes: notes }); setShowChangesForm(false); }}
          onClose={() => setShowChangesForm(false)}
        />
      )}
    </div>
  );
}