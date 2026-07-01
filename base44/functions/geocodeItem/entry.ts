import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const itemId = body.proposal_item_id;
    const query = (body.location || body.title || '').toString().trim();
    if (!itemId || !query) return Response.json({ error: 'proposal_item_id and location required' }, { status: 400 });

    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=en&countrycodes=me&viewbox=18.4,43.6,20.5,41.9&bounded=1&q=${encodeURIComponent(query)}`;
    const r = await fetch(url, { headers: { 'User-Agent': 'SummerInMontenegro/1.0 (travel proposal maps)' } });
    if (!r.ok) return Response.json({ error: 'Geocoder unavailable' }, { status: 502 });
    const data = await r.json();
    const hit = Array.isArray(data) && data[0];
    if (!hit) return Response.json({ lat: null, lon: null, not_found: true });

    const lat = parseFloat(hit.lat);
    const lon = parseFloat(hit.lon);
    try {
      await base44.asServiceRole.entities.ProposalItem.update(itemId, { latitude: lat, longitude: lon });
    } catch (e) {
      console.error('geocodeItem: could not persist coords', e);
    }
    return Response.json({ lat, lon });
  } catch (error) {
    console.error('geocodeItem error', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});