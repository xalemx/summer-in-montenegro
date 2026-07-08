import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ProposalItemForm } from '@/components/proposals/ProposalItemForm';
import ItineraryBoard from '@/components/proposals/ItineraryBoard';
import Timeline from '@/components/admin/Timeline';
import AISuggestions from '@/components/admin/AISuggestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Send, Save, FileText, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const STATUS_COLORS = {
  planning: 'bg-blue-100 text-blue-700',
  proposal: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-slate-200 text-slate-700',
  closed: 'bg-slate-100 text-slate-500',
};

export default function ProposalBuilder() {
  const [projects, setProjects] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [project, setProject] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItemDay, setNewItemDay] = useState(1);
  const [me, setMe] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [genLoading, setGenLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [p, s] = await Promise.all([
          base44.entities.TravelProject.list('-created_date', 100),
          base44.entities.Supplier.filter({ status: 'active' }, '-created_date', 200),
        ]);
        setProjects(p);
        setSuppliers(s);
      } catch (e) { console.error(e); }
      try { const u = await base44.auth.me(); setMe(u); } catch (e2) {}
    })();
  }, []);

  useEffect(() => {
    if (!selectedProjectId) { setProject(null); setProposal(null); setItems([]); setTimeline([]); setRecommendations(null); return; }
    const loadTimeline = () => base44.entities.TimelineEvent.filter({ travel_project_id: selectedProjectId }, 'created_date', 200).then(setTimeline).catch(() => {});
    (async () => {
      setLoading(true);
      try {
        const p = await base44.entities.TravelProject.get(selectedProjectId);
        setProject(p);
        let recs = null;
        if (p.ai_recommendations) { try { recs = typeof p.ai_recommendations === 'string' ? JSON.parse(p.ai_recommendations) : p.ai_recommendations; } catch (e) {} }
        setRecommendations(recs);
        const props = await base44.entities.Proposal.filter({ travel_project_id: selectedProjectId }, '-created_date', 20);
        const draft = props.find(x => x.status === 'draft') || props[0] || null;
        setProposal(draft);
        if (draft) {
          const its = await base44.entities.ProposalItem.filter({ proposal_id: draft.id }, 'day_number', 500);
          setItems(its);
        } else {
          setItems([]);
        }
        await loadTimeline();
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
    const unsub = base44.entities.TimelineEvent.subscribe(() => loadTimeline());
    return () => unsub();
  }, [selectedProjectId]);

  const totals = items.reduce((acc, i) => {
    acc.cost += Number(i.internal_cost) || 0;
    acc.price += Number(i.customer_price) || 0;
    return acc;
  }, { cost: 0, price: 0 });
  totals.margin = totals.price - totals.cost;

  const createProposal = async () => {
    setBusy(true);
    try {
      const ref = `PROP-${Date.now().toString().slice(-6)}`;
      const np = await base44.entities.Proposal.create({
        travel_project_id: selectedProjectId,
        reference_number: ref,
        version: 1,
        status: 'draft',
        title: `${project.customer_name} — Montenegro Trip`,
        summary: '',
        total_internal_cost: 0,
        total_customer_price: 0,
        margin: 0,
        customer_notes: '',
        internal_notes: '',
      });
      await base44.entities.TravelProject.update(selectedProjectId, { status: 'proposal' });
      setProposal(np);
      setProject({ ...project, status: 'proposal' });
      logEvent('proposal_created', 'Proposal created');
    } catch (e) { toast.error('Could not create proposal'); } finally { setBusy(false); }
  };

  const persistTotals = async (newItems) => {
    const cost = newItems.reduce((s, i) => s + (Number(i.internal_cost) || 0), 0);
    const price = newItems.reduce((s, i) => s + (Number(i.customer_price) || 0), 0);
    await base44.entities.Proposal.update(proposal.id, {
      total_internal_cost: cost,
      total_customer_price: price,
      margin: price - cost,
    });
    setProposal({ ...proposal, total_internal_cost: cost, total_customer_price: price, margin: price - cost });
  };

  const handleReorder = async (newItems) => {
    setItems(newItems);
    try {
      await base44.entities.ProposalItem.bulkUpdate(
        newItems.map(i => ({ id: i.id, day_number: i.day_number, sort_order: i.sort_order }))
      );
    } catch (e) { console.error('Could not save order', e); }
  };

  const addItemToDay = (day) => {
    setEditingItem(null);
    setNewItemDay(day);
    setShowItemForm(true);
  };

  const logEvent = async (event_type, message) => {
    const actor = (me?.full_name || 'Consultant').split(' ')[0];
    try {
      const ev = await base44.entities.TimelineEvent.create({
        travel_project_id: selectedProjectId,
        reference_number: project?.reference_number || '',
        event_type, message, actor_name: actor,
      });
      setTimeline(prev => [...prev, ev]);
    } catch (e) { console.error('timeline log failed', e); }
  };

  const generateSuggestions = async () => {
    setGenLoading(true);
    try {
      const res = await base44.functions.invoke('generateRecommendations', { project_id: selectedProjectId });
      setRecommendations(res.data.recommendations);
    } catch (e) { toast.error('Could not generate suggestions'); } finally { setGenLoading(false); }
  };

  const itemTypeFromBucket = (bucket, rec) => {
    if (bucket === 'regions') return 'Experience';
    if (bucket === 'destinations') return 'Experience';
    if (bucket === 'routes') return 'Transfer';
    if (bucket === 'experiences') {
      const category = (rec.category || '').toLowerCase();

      if (category.includes('boat')) return 'Boat Trip';
      if (category.includes('food')) return 'Restaurant';
      if (category.includes('wine')) return 'Experience';
      if (category.includes('cultural')) return 'Guide';
      if (category.includes('adventure')) return 'Activity';

      return 'Experience';
    }
    if (bucket === 'beaches') return 'Experience';
    if (bucket === 'national_parks') return 'Activity';
    if (bucket === 'restaurants') return 'Restaurant';
    if (bucket === 'viewpoints') return 'Experience';

    if (bucket === 'suppliers') {
      const category = (rec.category || '').toLowerCase();

      if (category.includes('hotel') || category.includes('apartment') || category.includes('villa')) {
        return 'Accommodation';
      }

      if (category.includes('restaurant')) return 'Restaurant';
      if (category.includes('boat')) return 'Boat Trip';
      if (category.includes('guide')) return 'Guide';
      if (category.includes('driver') || category.includes('transfer')) return 'Transfer';

      return 'Activity';
    }

    return 'Experience';
  };

  const acceptSuggestion = async (rec, bucket = 'suppliers') => {
    if (!proposal) {
      toast.error('Create a proposal first, then add AI suggestions.');
      return;
    }

    const itemType = itemTypeFromBucket(bucket, rec);
    const dayNumber = Number(rec.suggested_day) || 1;

    try {
      await base44.entities.ProposalItem.create({
        proposal_id: proposal.id,
        travel_project_id: selectedProjectId,
        day_number: dayNumber,
        item_type: itemType,
        title: rec.name,
        supplier_id: bucket === 'suppliers' ? rec.id : '',
        location: rec.region_name || '',
        description: rec.reasons?.length
          ? `AI match: ${rec.reasons.join(' · ')}`
          : `AI suggested ${itemType.toLowerCase()} from ${bucket.replace('_', ' ')} recommendations.`,
        internal_cost: 0,
        customer_price: 0,
        notes: `Added from AI ${bucket} recommendation. Match score: ${rec.match_score || 0}%`,
        sort_order: 0,
      });

      const updatedItems = await base44.entities.ProposalItem.filter(
        { proposal_id: proposal.id },
        'day_number',
        500
      );

      setItems(updatedItems);
      await persistTotals(updatedItems);
      logEvent('item_added', `Added AI suggestion: ${rec.name}`);
    } catch (error) {
      console.error(error);
      toast.error('Could not add suggestion to proposal');
    }
  };

  const handleItemSave = async (form) => {
    try {
      if (editingItem) {
        await base44.entities.ProposalItem.update(editingItem.id, form);
      } else {
        await base44.entities.ProposalItem.create(form);
      }
      const its = await base44.entities.ProposalItem.filter({ proposal_id: proposal.id }, 'day_number', 500);
      setItems(its);
      await persistTotals(its);
      logEvent(editingItem ? 'item_updated' : 'item_added', `${editingItem ? 'Updated' : 'Added'} ${form.item_type}: ${form.title}`);
    } catch (e) { toast.error('Could not save item'); }
    setShowItemForm(false);
    setEditingItem(null);
  };

  const deleteItem = async (item) => {
    if (!confirm('Delete this item?')) return;
    try {
      await base44.entities.ProposalItem.delete(item.id);
      const its = await base44.entities.ProposalItem.filter({ proposal_id: proposal.id }, 'day_number', 500);
      setItems(its);
      await persistTotals(its);
      logEvent('item_removed', `Removed ${item.item_type}: ${item.title}`);
    } catch (e) { toast.error('Could not delete item'); }
  };

  const saveDraft = async () => {
    setBusy(true);
    try {
      const cost = items.reduce((s, i) => s + (Number(i.internal_cost) || 0), 0);
      const price = items.reduce((s, i) => s + (Number(i.customer_price) || 0), 0);
      await base44.entities.Proposal.update(proposal.id, {
        title: proposal.title,
        summary: proposal.summary,
        customer_notes: proposal.customer_notes,
        internal_notes: proposal.internal_notes,
        total_internal_cost: cost,
        total_customer_price: price,
        margin: price - cost,
      });
      toast.success('Draft saved');
      logEvent('proposal_updated', 'Updated proposal details');
    } catch (e) { toast.error('Could not save draft'); } finally { setBusy(false); }
  };

  const sendProposal = async () => {
    if (!confirm('Send this proposal to the customer? Status will change to Sent.')) return;
    setBusy(true);
    try {
      const sentDate = new Date().toISOString();
      await base44.entities.Proposal.update(proposal.id, { status: 'sent', sent_date: sentDate });
      setProposal({ ...proposal, status: 'sent', sent_date: sentDate });
      logEvent('proposal_sent', 'Proposal sent to customer');
      toast.success('Proposal sent!', { description: 'Customer portal: ' + window.location.origin + '/trip/' + project.reference_number });
    } catch (e) { toast.error('Could not send proposal'); } finally { setBusy(false); }
  };

  const createNewVersion = async () => {
    if (!confirm(`Create a new version (v${(proposal.version || 1) + 1})? This copies all current items and keeps the old version as history.`)) return;
    setBusy(true);
    try {
      const newVersion = (proposal.version || 1) + 1;
      const newProp = await base44.entities.Proposal.create({
        travel_project_id: selectedProjectId,
        reference_number: proposal.reference_number,
        version: newVersion,
        status: 'draft',
        title: proposal.title,
        summary: proposal.summary,
        total_internal_cost: 0,
        total_customer_price: 0,
        margin: 0,
        customer_notes: proposal.customer_notes || '',
        internal_notes: proposal.internal_notes || '',
      });
      if (items.length > 0) {
        await base44.entities.ProposalItem.bulkCreate(items.map(i => ({
          proposal_id: newProp.id,
          travel_project_id: selectedProjectId,
          day_number: i.day_number,
          item_type: i.item_type,
          title: i.title,
          description: i.description || '',
          supplier_id: i.supplier_id || '',
          location: i.location || '',
          start_time: i.start_time || '',
          end_time: i.end_time || '',
          internal_cost: Number(i.internal_cost) || 0,
          customer_price: Number(i.customer_price) || 0,
          notes: i.notes || '',
          sort_order: i.sort_order || 0,
        })));
      }
      setProposal(newProp);
      const its = await base44.entities.ProposalItem.filter({ proposal_id: newProp.id }, 'day_number', 500);
      setItems(its);
      await base44.entities.TravelProject.update(selectedProjectId, { status: 'proposal' });
      setProject({ ...project, status: 'proposal' });
      logEvent('version_created', `Created version v${newVersion}`);
    } catch (e) { toast.error('Could not create new version'); } finally { setBusy(false); }
  };

  return (
    <div className="py-10 px-4 md:px-6 min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-1">Admin</p>
            <h1 className="font-heading text-3xl font-bold">Proposal Builder</h1>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="/admin/calendar" className="text-muted-foreground hover:text-foreground">Calendar</Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground">← Back to site</Link>
          </div>
        </div>

        {/* Project selector */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6 shadow-sm">
          <Label className="mb-2 block">Select Travel Project</Label>
          <select
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            className="w-full md:w-96 h-11 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">— Choose a project —</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.reference_number || 'No ref'} · {p.customer_name} · {p.status}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-muted-foreground text-center py-10">Loading…</p>}

        {!loading && project && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: customer wishes */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-heading text-lg font-bold">Customer Wishes</h2>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[project.status] || 'bg-slate-100'}`}>{project.status}</span>
                </div>
                <dl className="space-y-2.5 text-sm">
                  <div><dt className="text-muted-foreground text-xs">Customer</dt><dd className="font-medium">{project.customer_name}</dd></div>
                  <div><dt className="text-muted-foreground text-xs">Email / WhatsApp</dt><dd className="font-medium">{project.email} · {project.whatsapp}</dd></div>
                  {project.country && <div><dt className="text-muted-foreground text-xs">Country</dt><dd>{project.country}</dd></div>}
                  <div><dt className="text-muted-foreground text-xs">Group</dt><dd>{project.adults} adults · {project.children} children</dd></div>
                  <div><dt className="text-muted-foreground text-xs">Dates</dt><dd>{project.arrival_date || '—'} → {project.departure_date || '—'} {project.flexible_dates && '(flexible)'}</dd></div>
                  <div><dt className="text-muted-foreground text-xs">Style / Budget</dt><dd className="capitalize">{project.travel_style || '—'} · {project.budget_range || '—'}</dd></div>
                  {project.preferred_regions && <div><dt className="text-muted-foreground text-xs">Regions</dt><dd>{project.preferred_regions}</dd></div>}
                  {project.accommodation_preferences && <div><dt className="text-muted-foreground text-xs">Accommodation</dt><dd>{project.accommodation_preferences}</dd></div>}
                  {project.activities && <div><dt className="text-muted-foreground text-xs">Activities</dt><dd>{project.activities}</dd></div>}
                  {project.services_required && <div><dt className="text-muted-foreground text-xs">Services</dt><dd>{project.services_required}</dd></div>}
                  {project.transport_required && <div><dt className="text-muted-foreground text-xs">Transport</dt><dd>{project.transport_required}</dd></div>}
                  {project.special_requests && <div><dt className="text-muted-foreground text-xs">Special requests</dt><dd>{project.special_requests}</dd></div>}
                </dl>
              </div>

              {project.ai_summary && (
                <div className="bg-primary/5 rounded-2xl border border-primary/20 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-primary" />
                    <h3 className="font-semibold text-sm">AI Summary</h3>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{project.ai_summary}</p>
                </div>
              )}

              <AISuggestions
                recommendations={recommendations}
                onGenerate={generateSuggestions}
                onAccept={acceptSuggestion}
                genLoading={genLoading}
                hasProposal={!!proposal}
              />

              <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <Label className="mb-2 block">Consultant notes</Label>
                <Textarea rows={3} value={project.consultant_notes || ''} onChange={e => setProject({ ...project, consultant_notes: e.target.value })} onBlur={async () => { await base44.entities.TravelProject.update(project.id, { consultant_notes: project.consultant_notes }); }} placeholder="Private notes..." />
              </div>

              <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                <h2 className="font-heading text-lg font-bold mb-3">Activity Timeline</h2>
                <Timeline events={timeline} />
              </div>
            </div>

            {/* Right: proposal editor */}
            <div className="lg:col-span-2 space-y-4">
              {!proposal ? (
                <div className="bg-card rounded-2xl border border-border p-10 text-center shadow-sm">
                  <FileText size={32} className="mx-auto text-muted-foreground mb-3" />
                  <h2 className="font-heading text-xl font-bold mb-2">No proposal yet</h2>
                  <p className="text-muted-foreground mb-5 text-sm">Create a new proposal for this travel project.</p>
                  <Button onClick={createProposal} disabled={busy} className="bg-primary text-primary-foreground rounded-full px-8">
                    <Plus size={18} className="mr-1" /> Create Proposal
                  </Button>
                </div>
              ) : (
                <>
                  {/* Proposal header */}
                  <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs text-muted-foreground">{proposal.reference_number} · v{proposal.version}</span>
                        <span className={`ml-2 text-xs px-2.5 py-1 rounded-full font-medium ${proposal.status === 'draft' ? 'bg-amber-100 text-amber-700' : proposal.status === 'sent' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100'}`}>{proposal.status}</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        {proposal.status !== 'draft' && (
                          <button onClick={createNewVersion} disabled={busy} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium hover:bg-primary/20 disabled:opacity-50">+ New Version</button>
                        )}
                        <Link to={`/proposal/${proposal.id}`} target="_blank" className="text-xs text-primary underline">View customer page ↗</Link>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>Trip title</Label>
                        <Input value={proposal.title || ''} onChange={e => setProposal({ ...proposal, title: e.target.value })} />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Summary (shown to customer)</Label>
                        <Textarea rows={3} value={proposal.summary || ''} onChange={e => setProposal({ ...proposal, summary: e.target.value })} placeholder="A short overview of the trip..." />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Important notes (shown to customer)</Label>
                        <Textarea rows={2} value={proposal.customer_notes || ''} onChange={e => setProposal({ ...proposal, customer_notes: e.target.value })} placeholder="What's included, terms, things to know..." />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Internal notes (private)</Label>
                        <Textarea rows={2} value={proposal.internal_notes || ''} onChange={e => setProposal({ ...proposal, internal_notes: e.target.value })} placeholder="Private notes not shown to customer..." />
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="font-heading text-lg font-bold">Day-by-day Itinerary</h2>
                        <Button onClick={() => addItemToDay(1)} className="bg-accent text-accent-foreground rounded-full text-sm">
                          <Plus size={16} className="mr-1" /> Add Item
                        </Button>
                      </div>
                      <ItineraryBoard
                        items={items}
                        suppliers={suppliers}
                        onAddItem={addItemToDay}
                        onEditItem={(item) => { setEditingItem(item); setShowItemForm(true); }}
                        onDeleteItem={deleteItem}
                        onReorder={handleReorder}
                      />
                    </div>

                  {/* Totals + actions */}
                  <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <div className="grid grid-cols-3 gap-4 mb-5 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Internal cost</p>
                        <p className="font-heading text-2xl font-bold">€{totals.cost.toFixed(0)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Customer price</p>
                        <p className="font-heading text-2xl font-bold text-primary">€{totals.price.toFixed(0)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Margin</p>
                        <p className={`font-heading text-2xl font-bold ${totals.margin >= 0 ? 'text-green-600' : 'text-destructive'}`}>€{totals.margin.toFixed(0)}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={saveDraft} disabled={busy} variant="outline" className="flex-1 rounded-full">
                        <Save size={16} className="mr-1" /> Save Draft
                      </Button>
                      <Button onClick={sendProposal} disabled={busy} className="flex-1 bg-primary text-primary-foreground rounded-full">
                        <Send size={16} className="mr-1" /> Send to Customer
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {!loading && !project && projects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>No travel projects yet. They appear here when customers submit trip requests.</p>
          </div>
        )}
      </div>

      {showItemForm && proposal && (
        <ProposalItemForm
          item={editingItem}
          proposalId={proposal.id}
          travelProjectId={selectedProjectId}
          suppliers={suppliers}
          defaultDay={newItemDay}
          onSave={handleItemSave}
          onClose={() => { setShowItemForm(false); setEditingItem(null); }}
        />
      )}
    </div>
  );
}