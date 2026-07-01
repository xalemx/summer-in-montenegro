import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const event_type = (body.event_type || 'page_view').toString().slice(0, 40);
    const visitor_id = (body.visitor_id || '').toString().slice(0, 64);
    const path = (body.path || '').toString().slice(0, 200);
    if (!visitor_id) return Response.json({ ok: false, error: 'visitor_id required' }, { status: 400 });
    await base44.asServiceRole.entities.AnalyticsEvent.create({ event_type, visitor_id, path });
    return Response.json({ ok: true });
  } catch (error) {
    console.error('trackEvent error', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});