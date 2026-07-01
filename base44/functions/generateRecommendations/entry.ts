import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const safe = (v: any) => {
  if (Array.isArray(v)) return v.join(', ');
  return v || '';
};

const clampScore = (n: any) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const projectId = body.project_id;

    if (!projectId) {
      return Response.json({ error: 'project_id required' }, { status: 400 });
    }

    const project = await base44.asServiceRole.entities.TravelProject.get(projectId);

    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    const [
      regions,
      destinations,
      experiences,
      routes,
      beaches,
      nationalParks,
      restaurants,
      viewpoints,
      activeSuppliers,
      preferredSuppliers,
    ] = await Promise.all([
      base44.asServiceRole.entities.Region.list('sort_order', 100),
      base44.asServiceRole.entities.Destination.list('sort_order', 200),
      base44.asServiceRole.entities.Experience.list('sort_order', 200),
      base44.asServiceRole.entities.Route.list('sort_order', 100),
      base44.asServiceRole.entities.Beach.list('sort_order', 100),
      base44.asServiceRole.entities.NationalPark.list('sort_order', 100),
      base44.asServiceRole.entities.Restaurant.list('sort_order', 150),
      base44.asServiceRole.entities.Viewpoint.list('sort_order', 100),
      base44.asServiceRole.entities.Supplier.filter({ status: 'active' }, 'sort_order', 200),
      base44.asServiceRole.entities.Supplier.filter({ status: 'preferred' }, 'sort_order', 200),
    ]);

    const supplierPool = [...(activeSuppliers || []), ...(preferredSuppliers || [])];

    const projectText = [
      `Customer: ${project.customer_name}`,
      `Group: ${project.adults || 1} adults, ${project.children || 0} children`,
      `Dates: ${project.arrival_date || '?'} to ${project.departure_date || '?'}`,
      `Flexible dates: ${project.flexible_dates ? 'yes' : 'no'}`,
      `Travel style: ${project.travel_style || 'not specified'}`,
      `Traveller profile: ${project.traveller_profile || 'not specified'}`,
      `Budget: ${project.budget_range || 'not specified'}`,
      `Preferred regions: ${project.preferred_regions || 'not specified'}`,
      `Accommodation preferences: ${project.accommodation_preferences || 'not specified'}`,
      `Activities: ${project.activities || 'not specified'}`,
      `Services required: ${project.services_required || 'not specified'}`,
      `Transport required: ${project.transport_required || 'not specified'}`,
      `Special requests: ${project.special_requests || 'none'}`,
      `Existing AI summary: ${project.ai_summary || ''}`,
    ].join('\n');

    const regionText = (regions || []).map((r: any) =>
      `#${r.id} | ${r.name} | ${safe(r.overview).slice(0, 220)} | best for: ${safe(r.best_for)} | highlights: ${safe(r.highlights)} | season: ${safe(r.best_season)}`
    ).join('\n');

    const destinationText = (destinations || []).map((d: any) =>
      `#${d.id} | ${d.name} | region: ${d.region_name || ''} | type: ${d.type || ''} | ${safe(d.overview).slice(0, 220)} | best for: ${safe(d.best_for)} | lat:${d.latitude || ''} lng:${d.longitude || ''}`
    ).join('\n');

    const experienceText = (experiences || []).map((e: any) =>
      `#${e.id} | ${e.name} | category: ${e.category || ''} | region: ${e.region_name || ''} | destination: ${e.destination_name || ''} | ${safe(e.description).slice(0, 220)} | duration:${e.duration || ''} | suitable:${safe(e.suitable_for)} | price:${e.price_range || ''} | supplier:${e.supplier_id || ''}`
    ).join('\n');

    const routeText = (routes || []).map((r: any) =>
      `#${r.id} | ${r.name} | days:${r.duration_days || ''} | difficulty:${r.difficulty || ''} | transport:${r.transport_mode || ''} | regions:${safe(r.region_names)} | destinations:${safe(r.destination_names)} | highlights:${safe(r.highlights)} | ${safe(r.description).slice(0, 220)}`
    ).join('\n');

    const beachText = (beaches || []).map((b: any) =>
      `#${b.id} | ${b.name} | region:${b.region_name || ''} | destination:${b.destination_name || ''} | type:${b.type || ''} | best for:${safe(b.best_for)} | ${safe(b.description).slice(0, 180)} | lat:${b.latitude || ''} lng:${b.longitude || ''}`
    ).join('\n');

    const parkText = (nationalParks || []).map((p: any) =>
      `#${p.id} | ${p.name} | region:${p.region_name || ''} | ${safe(p.overview).slice(0, 220)} | highlights:${safe(p.highlights)} | activities:${safe(p.best_activities)} | lat:${p.latitude || ''} lng:${p.longitude || ''}`
    ).join('\n');

    const restaurantText = (restaurants || []).map((r: any) =>
      `#${r.id} | ${r.name} | region:${r.region_name || ''} | destination:${r.destination_name || ''} | cuisine:${r.cuisine || ''} | price:${r.price_range || ''} | dietary:${safe(r.dietary_options)} | ambience:${safe(r.ambience)} | ${safe(r.description).slice(0, 180)} | lat:${r.latitude || ''} lng:${r.longitude || ''}`
    ).join('\n');

    const viewpointText = (viewpoints || []).map((v: any) =>
      `#${v.id} | ${v.name} | region:${v.region_name || ''} | destination:${v.destination_name || ''} | best time:${v.best_time || ''} | access:${safe(v.access)} | ${safe(v.description).slice(0, 180)} | lat:${v.latitude || ''} lng:${v.longitude || ''}`
    ).join('\n');

    const supplierText = supplierPool.map((s: any) =>
      `#${s.id} | ${s.supplier_name} | category:${s.category || ''} | location:${s.location || ''} | services:${safe(s.services).slice(0, 180)} | ${safe(s.description).slice(0, 180)}`
    ).join('\n');

    const prompt = `
You are a senior Montenegro destination management consultant.

Analyse the TravelProject and recommend the best structured Montenegro plan using the knowledge base.

Return only valid JSON matching the schema.

Important:
- Recommend actual Region, Destination, Experience, Route, Beach, NationalPark, Restaurant, Viewpoint and Supplier records from the provided lists only.
- Use exact IDs from the data.
- Score each match 0-100.
- Give short consultant-friendly reasons.
- Suggest day numbers where useful.
- Keep recommendations internal-only.
- Consider allergies, children, budget, travel pace, transport and special requests.

TRAVEL PROJECT:
${projectText}

REGIONS:
${regionText}

DESTINATIONS:
${destinationText}

EXPERIENCES:
${experienceText}

ROUTES:
${routeText}

BEACHES:
${beachText}

NATIONAL PARKS:
${parkText}

RESTAURANTS:
${restaurantText}

VIEWPOINTS:
${viewpointText}

SUPPLIERS:
${supplierText}
`;

    const schema = {
      type: 'object',
      properties: {
        consultant_summary: { type: 'string' },
        suggested_route_overview: { type: 'string' },

        regions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        destinations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              region_name: { type: 'string' },
              suggested_day: { type: 'number' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        routes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              suggested_day: { type: 'number' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        experiences: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              category: { type: 'string' },
              suggested_day: { type: 'number' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        beaches: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              suggested_day: { type: 'number' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        national_parks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              suggested_day: { type: 'number' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        restaurants: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              suggested_day: { type: 'number' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        viewpoints: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              suggested_day: { type: 'number' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        suppliers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              category: { type: 'string' },
              suggested_day: { type: 'number' },
              match_score: { type: 'number' },
              reasons: { type: 'array', items: { type: 'string' } },
            },
          },
        },

        day_by_day_structure: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              day_number: { type: 'number' },
              title: { type: 'string' },
              description: { type: 'string' },
              recommended_place_names: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    };

    const llmRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: schema,
    });

    const raw = llmRes?.output || llmRes || {};

    const valid = {
      regions: new Set((regions || []).map((x: any) => x.id)),
      destinations: new Set((destinations || []).map((x: any) => x.id)),
      routes: new Set((routes || []).map((x: any) => x.id)),
      experiences: new Set((experiences || []).map((x: any) => x.id)),
      beaches: new Set((beaches || []).map((x: any) => x.id)),
      national_parks: new Set((nationalParks || []).map((x: any) => x.id)),
      restaurants: new Set((restaurants || []).map((x: any) => x.id)),
      viewpoints: new Set((viewpoints || []).map((x: any) => x.id)),
      suppliers: new Set(supplierPool.map((x: any) => x.id)),
    };

    const clean = (arr: any[], validSet: Set<string>) =>
      (arr || [])
        .filter((r) => r.id && validSet.has(r.id))
        .slice(0, 8)
        .map((r) => ({
          ...r,
          match_score: clampScore(r.match_score),
          suggested_day: Number(r.suggested_day) || 1,
          reasons: (r.reasons || []).slice(0, 4),
        }));

    const recommendations = {
      consultant_summary: raw.consultant_summary || '',
      suggested_route_overview: raw.suggested_route_overview || '',
      regions: clean(raw.regions, valid.regions),
      destinations: clean(raw.destinations, valid.destinations),
      routes: clean(raw.routes, valid.routes),
      experiences: clean(raw.experiences, valid.experiences),
      beaches: clean(raw.beaches, valid.beaches),
      national_parks: clean(raw.national_parks, valid.national_parks),
      restaurants: clean(raw.restaurants, valid.restaurants),
      viewpoints: clean(raw.viewpoints, valid.viewpoints),
      suppliers: clean(raw.suppliers, valid.suppliers),
      day_by_day_structure: (raw.day_by_day_structure || []).slice(0, 14),
    };

    await base44.asServiceRole.entities.TravelProject.update(projectId, {
      ai_recommendations: JSON.stringify(recommendations),
      recommended_regions: recommendations.regions.map((r: any) => r.name).join(', '),
      recommended_activities: [
        ...recommendations.experiences.map((x: any) => x.name),
        ...recommendations.beaches.map((x: any) => x.name),
        ...recommendations.national_parks.map((x: any) => x.name),
      ].join(', '),
      recommended_services: recommendations.suppliers.map((s: any) => s.name).join(', '),
    });

    return Response.json({ recommendations });
  } catch (error) {
    console.error('generateRecommendations error', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});