import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json();
    const { data, old_data } = body;

    // Only run when status changes to "confirmed"
    if (!data || data.status !== 'confirmed' || old_data?.status === 'confirmed') {
      return Response.json({ message: 'No action needed' });
    }

    const departureDateStr = data.departure_date;
    const guestsCount = data.guests || 1;

    if (!departureDateStr) {
      return Response.json({ error: 'No departure_date on booking' }, { status: 400 });
    }

    // Find the matching DepartureDate record
    const departureDates = await base44.asServiceRole.entities.DepartureDate.filter({
      departure: departureDateStr
    });

    if (!departureDates || departureDates.length === 0) {
      return Response.json({ error: 'Departure date not found: ' + departureDateStr }, { status: 404 });
    }

    const departure = departureDates[0];
    const newSpots = Math.max(0, (departure.spots_remaining || 8) - guestsCount);
    const newStatus = newSpots === 0 ? 'sold_out' : newSpots <= 2 ? 'almost_full' : newSpots <= 4 ? 'limited' : 'open';

    await base44.asServiceRole.entities.DepartureDate.update(departure.id, {
      spots_remaining: newSpots,
      status: newStatus,
    });

    return Response.json({
      message: 'Spots updated',
      departure: departureDateStr,
      spots_remaining: newSpots,
      status: newStatus,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});