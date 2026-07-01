import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const HOTEL_CATS = ['Hotel', 'Apartment', 'Villa'];
const ACT_CATS = ['Activity Provider', 'Boat Operator', 'Tour Guide', 'National Park'];
const REST_CATS = ['Restaurant'];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    const projectId = body.project_id;
    if (!projectId) return Response.json({ error: 'project_id required' }, { status: 400 });

    const project = await base44.asServiceRole.entities.TravelProject.get(projectId);
    if (!project) return Response.json({ error: 'Project not found' }, { status: 404 });

    const [active, preferred] = await Promise.all([
      base44.asServiceRole.entities.Supplier.filter({ status: 'active' }, 'sort_order', 200),
      base44.asServiceRole.entities.Supplier.filter({ status: 'preferred' }, 'sort_order', 200),
    ]);
    const pool = [...(active || []), ...(preferred || [])];
    const bucketOf = (c) => HOTEL_CATS.includes(c) ? 'hotel' : ACT_CATS.includes(c) ? 'activity' : REST_CATS.includes(c) ? 'restaurant' : null;
    const candidates = pool.map(s => ({
      id: s.id, name: s.supplier_name, category: s.category, bucket: bucketOf(s.category),
      location: s.location, description: s.description, services: s.services, availability: s.availability_status,
    })).filter(c => c.bucket);

    const projLine = [
      `Customer: ${project.customer_name}`,
      `Group: ${project.adults || 1} adults, ${project.children || 0} children`,
      `Budget: ${project.budget_range || 'not specified'}`,
      `Travel style: ${project.travel_style || 'not specified'}`,
      `Preferred regions: ${project.preferred_regions || 'not specified'}`,
      `Dates: ${project.arrival_date || '?'} to ${project.departure_date || '?'}`,
      `Accommodation prefs: ${project.accommodation_preferences || 'not specified'}`,
      `Activities interest: ${project.activities || 'not specified'}`,
      `AI summary: ${project.ai_summary || ''}`,
    ].join('\n');

    const candLine = candidates.map(c => `#${c.id} | ${c.bucket} | ${c.name} (${c.category}) | loc: ${c.location || ''} | ${(c.description || '').slice(0, 200)} | services: ${(c.services || '').slice(0, 150)} | availability: ${c.availability || ''}`).join('\n');

    const prompt = `You are a senior Montenegro travel consultant AI. Based on the travel project below and the available suppliers, recommend the best-matching options grouped into hotels, activities and restaurants.\n\nScore each by how well it fits the group size, budget, travel style, regions and stated interests (0-100). Provide 3 short reason tags per pick (e.g. "Family", "Quiet", "Near Old Town"). Only recommend suppliers from the list, using their exact supplier_id. Return up to 5 per category, highest match first.\n\nPROJECT:\n${projLine}\n\nAVAILABLE SUPPLIERS (id | bucket | name (category) | details):\n${candLine}`;

    const schema = {
      type: 'object',
      properties: {
        hotels: { type: 'array', items: { type: 'object', properties: { supplier_id: { type: 'string' }, name: { type: 'string' }, category: { type: 'string' }, match_score: { type: 'integer' }, reasons: { type: 'array', items: { type: 'string' } } } } },
        activities: { type: 'array', items: { type: 'object', properties: { supplier_id: { type: 'string' }, name: { type: 'string' }, category: { type: 'string' }, match_score: { type: 'integer' }, reasons: { type: 'array', items: { type: 'string' } } } } },
        restaurants: { type: 'array', items: { type: 'object', properties: { supplier_id: { type: 'string' }, name: { type: 'string' }, category: { type: 'string' }, match_score: { type: 'integer' }, reasons: { type: 'array', items: { type: 'string' } } } } },
      },
    };

    const llmRes = await base44.asServiceRole.integrations.Core.InvokeLLM({ prompt, response_json_schema: schema });
    const out = (llmRes && llmRes.output) ? llmRes.output : (llmRes || {});

    const validIds = new Set(candidates.map(c => c.id));
    const clean = (arr) => (arr || []).filter(r => r.supplier_id && validIds.has(r.supplier_id)).slice(0, 5).map(r => ({
      supplier_id: r.supplier_id,
      name: r.name,
      category: r.category,
      match_score: Math.max(0, Math.min(100, Math.round(Number(r.match_score) || 0))),
      reasons: (r.reasons || []).slice(0, 3),
    }));
    const recs = { hotels: clean(out.hotels), activities: clean(out.activities), restaurants: clean(out.restaurants) };

    await base44.asServiceRole.entities.TravelProject.update(projectId, { ai_recommendations: JSON.stringify(recs) });
    return Response.json({ recommendations: recs });
  } catch (error) {
    console.error('generateRecommendations error', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});