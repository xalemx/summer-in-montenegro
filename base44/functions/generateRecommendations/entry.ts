import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const HOTEL_CATS = ['Hotel', 'Apartment', 'Villa'];
const ACT_CATS = ['Activity Provider', 'Boat Operator', 'Tour Guide', 'National Park'];
const REST_CATS = ['Restaurant'];

const trunc = (s, n) => (s || '').toString().slice(0, n);
const clampScore = (v) => Math.max(0, Math.min(100, Math.round(Number(v) || 0)));

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

    const e = base44.asServiceRole.entities;
    const [
      active, preferred,
      regions, destinations, experiences, beaches, parks, attractions, restaurants, viewpoints, routes,
    ] = await Promise.all([
      e.Supplier.filter({ status: 'active' }, 'sort_order', 200),
      e.Supplier.filter({ status: 'preferred' }, 'sort_order', 200),
      e.Region.list('sort_order', 60),
      e.Destination.list('sort_order', 120),
      e.Experience.list('sort_order', 120),
      e.Beach.list('sort_order', 120),
      e.NationalPark.list('sort_order', 60),
      e.Attraction.list('sort_order', 120),
      e.Restaurant.list('sort_order', 120),
      e.Viewpoint.list('sort_order', 60),
      e.Route.list('sort_order', 60),
    ]);

    // ---- Suppliers (bookable) ----
    const pool = [...(active || []), ...(preferred || [])];
    const bucketOf = (c) => HOTEL_CATS.includes(c) ? 'hotel' : ACT_CATS.includes(c) ? 'activity' : REST_CATS.includes(c) ? 'restaurant' : null;
    const suppliers = pool.map(s => ({
      id: s.id, name: s.supplier_name, category: s.category, bucket: bucketOf(s.category),
      location: s.location, description: s.description, services: s.services, availability: s.availability_status,
    })).filter(c => c.bucket);

    const supplierLine = suppliers.map(c =>
      `#${c.id} | ${c.bucket} | ${c.name} (${c.category}) | loc: ${c.location || ''} | ${trunc(c.description, 180)} | services: ${trunc(c.services, 120)} | availability: ${c.availability || ''}`
    ).join('\n');

    // ---- Knowledge base (places & experiences) ----
    const kb = [];
    const addKB = (arr, type, fn) => (arr || []).forEach(x => { const line = fn(x); if (line) kb.push(`${x.id} | ${type} | ${line}`); });

    addKB(regions, 'region', r => `${r.name} | best_for: ${trunc(r.best_for, 90)} | season: ${trunc(r.best_season, 60)} | airport: ${trunc(r.travel_time_from_airport, 50)}`);
    addKB(destinations, 'destination', d => `${d.name} | region: ${d.region_name || ''} | type: ${d.type || ''} | best_for: ${trunc(d.best_for, 90)} | highlights: ${trunc(d.highlights, 130)}`);
    addKB(experiences, 'experience', x => `${x.name} | category: ${x.category || ''} | region: ${x.region_name || ''} | dest: ${x.destination_name || ''} | price: ${x.price_range || ''} | duration: ${x.duration || ''} | suitable: ${trunc(x.suitable_for, 90)}`);
    addKB(beaches, 'beach', b => `${b.name} | region: ${b.region_name || ''} | dest: ${b.destination_name || ''} | type: ${b.type || ''} | best_for: ${trunc(b.best_for, 90)}`);
    addKB(parks, 'national_park', p => `${p.name} | region: ${p.region_name || ''} | activities: ${trunc(p.best_activities, 110)} | entry: ${p.entry_fee || ''}`);
    addKB(attractions, 'attraction', a => `${a.name} | category: ${a.category || ''} | region: ${a.region_name || ''} | dest: ${a.destination_name || ''} | best_time: ${a.best_time || ''} | duration: ${a.duration || ''}`);
    addKB(restaurants, 'restaurant', r => `${r.name} | region: ${r.region_name || ''} | dest: ${r.destination_name || ''} | cuisine: ${r.cuisine || ''} | price: ${r.price_range || ''} | speciality: ${trunc(r.speciality, 90)}`);
    addKB(viewpoints, 'viewpoint', v => `${v.name} | region: ${v.region_name || ''} | dest: ${v.destination_name || ''} | best_time: ${v.best_time || ''} | access: ${v.access || ''}`);
    addKB(routes, 'route', r => `${r.name} | days: ${r.duration_days || ''} | difficulty: ${r.difficulty || ''} | transport: ${r.transport_mode || ''} | regions: ${r.region_names || ''} | highlights: ${trunc(r.highlights, 130)}`);

    const kbLine = kb.join('\n');

    const projLine = [
      `Customer: ${project.customer_name}`,
      `Group: ${project.adults || 1} adults, ${project.children || 0} children`,
      `Trip type: ${project.trip_type || 'not specified'}`,
      `Budget: ${project.budget_range || 'not specified'}`,
      `Travel style: ${project.travel_style || 'not specified'}`,
      `Preferred regions: ${project.preferred_regions || 'not specified'}`,
      `Dates: ${project.arrival_date || '?'} to ${project.departure_date || '?'}`,
      `Accommodation prefs: ${project.accommodation_preferences || 'not specified'}`,
      `Activities interest: ${project.activities || 'not specified'}`,
      `Services needed: ${project.services_required || 'not specified'}`,
    ].join('\n');

    const prompt = `You are a senior Montenegro travel consultant AI. Using the trip details below, the Montenegro knowledge base (regions, destinations, experiences, beaches, national parks, attractions, restaurants, viewpoints, routes) and the available bookable suppliers, produce TWO sets of recommendations:

1) PLACES — the best-matching knowledge-base entries to shape the itinerary: which regions, destinations, experiences, beaches, national parks, attractions, restaurants and viewpoints fit the group size, budget, travel style, preferred regions and stated interests. Recommend up to 12, highest match first. Use the exact entity_id and entity_type from the knowledge base.
2) SUPPLIERS — the best bookable suppliers grouped into hotels, activities and restaurants (up to 5 each), using the exact supplier_id.

Score every pick 0-100 and give 3 short reason tags (e.g. "Family", "Quiet", "Near Old Town", "Great value"). Only use ids that appear in the provided lists — never invent ids.

TRIP:
${projLine}

KNOWLEDGE BASE (id | type | details):
${kbLine}

AVAILABLE SUPPLIERS (id | bucket | name (category) | details):
${supplierLine}`;

    const arrItem = (extra) => ({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          supplier_id: { type: 'string' },
          name: { type: 'string' },
          category: { type: 'string' },
          match_score: { type: 'integer' },
          reasons: { type: 'array', items: { type: 'string' } },
          ...extra,
        },
      },
    });

    const schema = {
      type: 'object',
      properties: {
        places: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              entity_type: { type: 'string' },
              entity_id: { type: 'string' },
              name: { type: 'string' },
              match_score: { type: 'integer' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },
        hotels: arrItem(),
        activities: arrItem(),
        restaurants: arrItem(),
      },
    };

    const llmRes = await base44.asServiceRole.integrations.Core.InvokeLLM({ prompt, response_json_schema: schema });
    const out = (llmRes && llmRes.output) ? llmRes.output : (llmRes || {});

    const supplierIds = new Set(suppliers.map(s => s.id));
    const kbIds = new Set();
    [regions, destinations, experiences, beaches, parks, attractions, restaurants, viewpoints, routes]
      .forEach(arr => (arr || []).forEach(x => kbIds.add(x.id)));

    const cleanSuppliers = (arr) => (arr || [])
      .filter(r => r.supplier_id && supplierIds.has(r.supplier_id))
      .slice(0, 5)
      .map(r => ({
        supplier_id: r.supplier_id,
        name: r.name,
        category: r.category,
        match_score: clampScore(r.match_score),
        reasons: (r.reasons || []).slice(0, 3),
      }));

    const cleanPlaces = (arr) => (arr || [])
      .filter(r => r.entity_id && kbIds.has(r.entity_id))
      .slice(0, 12)
      .map(r => ({
        entity_type: r.entity_type,
        entity_id: r.entity_id,
        name: r.name,
        match_score: clampScore(r.match_score),
        reasons: (r.reasons || []).slice(0, 3),
      }));

    const recs = {
      places: cleanPlaces(out.places),
      hotels: cleanSuppliers(out.hotels),
      activities: cleanSuppliers(out.activities),
      restaurants: cleanSuppliers(out.restaurants),
    };

    await base44.asServiceRole.entities.TravelProject.update(projectId, { ai_recommendations: JSON.stringify(recs) });
    return Response.json({ recommendations: recs });
  } catch (error) {
    console.error('generateRecommendations error', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});