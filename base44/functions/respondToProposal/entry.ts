import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { proposal_id, action, change_notes, change_areas, decline_reason } = body;

    const proposal = await base44.asServiceRole.entities.Proposal.get(proposal_id);
    if (!proposal) return Response.json({ error: 'Proposal not found' }, { status: 404 });

    const now = new Date().toISOString();
    let proposalUpdate = {};
    let projectStatus = '';

    if (action === 'accept') {
      proposalUpdate = { status: 'accepted', accepted_date: now };
      projectStatus = 'accepted';
    } else if (action === 'changes') {
      const parts = [];
      if (change_areas && change_areas.length) parts.push('Areas to change: ' + change_areas.join(', '));
      if (change_notes) parts.push(change_notes);
      proposalUpdate = { status: 'changes_requested', customer_response_notes: parts.join('\n') };
      projectStatus = 'changes_requested';
    } else if (action === 'decline') {
      proposalUpdate = { status: 'declined', declined_date: now, customer_response_notes: decline_reason || '' };
      projectStatus = 'declined';
    } else {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    await base44.asServiceRole.entities.Proposal.update(proposal_id, proposalUpdate);
    if (proposal.travel_project_id) {
      await base44.asServiceRole.entities.TravelProject.update(proposal.travel_project_id, { status: projectStatus });
    }

    return Response.json({ ok: true, status: proposalUpdate.status });
  } catch (error) {
    console.error('respondToProposal error', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});