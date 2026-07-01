import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const data = await req.json();

    const arr = (v) => Array.isArray(v) ? v.join(', ') : (v || '');
    const lines = [];
    if (data.customer_name) lines.push(`Customer: ${data.customer_name}`);
    if (data.country) lines.push(`Country: ${data.country}`);
    lines.push(`Group: ${data.adults || 1} adults, ${data.children || 0} children`);
    lines.push(`Trip type: ${data.trip_type || 'not specified'}`);
    lines.push(`Travel style: ${data.travel_style || 'not specified'}`);
    lines.push(`Budget: ${data.budget_range || 'not specified'}`);
    if (data.arrival_date) lines.push(`Arrival: ${data.arrival_date}`);
    if (data.departure_date) lines.push(`Departure: ${data.departure_date}`);
    lines.push(`Flexible dates: ${data.flexible_dates ? 'yes' : 'no'}`);
    if (data.preferred_regions) lines.push(`Preferred regions: ${arr(data.preferred_regions)}`);
    if (data.accommodation_preferences) lines.push(`Accommodation preferences: ${data.accommodation_preferences}`);
    if (data.activities) lines.push(`Activities interest: ${data.activities}`);
    if (data.services_required) lines.push(`Services needed: ${arr(data.services_required)}`);
    if (data.special_requests) lines.push(`Special requests: ${data.special_requests}`);

    const ref = `SIM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create the project immediately so the enquiry is never lost, even if AI fails.
    const project = await base44.asServiceRole.entities.TravelProject.create({
      reference_number: ref,
      customer_name: data.customer_name,
      email: data.email,
      whatsapp: data.whatsapp,
      country: data.country,
      status: 'planning',
      arrival_date: data.arrival_date,
      departure_date: data.departure_date,
      flexible_dates: data.flexible_dates,
      adults: Number(data.adults) || 1,
      children: Number(data.children) || 0,
      travel_style: data.travel_style,
      budget_range: data.budget_range,
      preferred_regions: arr(data.preferred_regions),
      accommodation_preferences: data.accommodation_preferences,
      activities: data.activities,
      services_required: arr(data.services_required),
      special_requests: data.special_requests,
    });

    await base44.asServiceRole.entities.TimelineEvent.create({
      travel_project_id: project.id,
      reference_number: ref,
      event_type: 'trip_created',
      message: `Trip request received from ${data.customer_name || 'customer'}`,
      actor_name: data.customer_name || 'Customer',
    });

    // Generate the internal AI summary for the consultant.
    let aiSummary = '';
    let travellerProfile = '';
    let recommendedRegions = '';
    let recommendedActivities = '';
    let recommendedServices = '';
    try {
      const prompt = `You are a senior Montenegro travel consultant. Analyse this new trip enquiry and produce an internal summary to help a consultant prepare a personalised proposal quickly.\n\nEnquiry details:\n${lines.join('\n')}\n\nProvide: traveller type, main interests, suggested regions in Montenegro, suggested accommodation style, suggested activities, suggested transport needs, travel pace, potential concerns, consultant notes, and suggested next steps. Be concise, practical and specific to Montenegro.`;

      const schema = {
        type: 'object',
        properties: {
          traveller_type: { type: 'string' },
          main_interests: { type: 'string' },
          suggested_regions: { type: 'array', items: { type: 'string' } },
          suggested_accommodation_style: { type: 'string' },
          suggested_activities: { type: 'array', items: { type: 'string' } },
          suggested_transport: { type: 'string' },
          travel_pace: { type: 'string' },
          potential_concerns: { type: 'string' },
          consultant_notes: { type: 'string' },
          suggested_next_steps: { type: 'array', items: { type: 'string' } },
        },
      };

      const llmRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: schema,
      });

      const ai = (llmRes && llmRes.output) ? llmRes.output : (llmRes || {});

      travellerProfile = [ai.traveller_type, ai.main_interests].filter(Boolean).join(' · ');
      recommendedRegions = (ai.suggested_regions || []).join(', ');
      recommendedActivities = (ai.suggested_activities || []).join(', ');
      recommendedServices = ai.suggested_transport || '';

      aiSummary = [
        `TRAVELLER TYPE: ${ai.traveller_type || ''}`,
        `MAIN INTERESTS: ${ai.main_interests || ''}`,
        `SUGGESTED REGIONS: ${(ai.suggested_regions || []).join(', ')}`,
        `SUGGESTED ACCOMMODATION: ${ai.suggested_accommodation_style || ''}`,
        `SUGGESTED ACTIVITIES: ${(ai.suggested_activities || []).join(', ')}`,
        `SUGGESTED TRANSPORT: ${ai.suggested_transport || ''}`,
        `TRAVEL PACE: ${ai.travel_pace || ''}`,
        `POTENTIAL CONCERNS: ${ai.potential_concerns || ''}`,
        `CONSULTANT NOTES: ${ai.consultant_notes || ''}`,
        `SUGGESTED NEXT STEPS: ${(ai.suggested_next_steps || []).join('; ')}`,
      ].join('\n\n');

      await base44.asServiceRole.entities.TravelProject.update(project.id, {
        ai_summary: aiSummary,
        traveller_profile: travellerProfile,
        recommended_regions: recommendedRegions,
        recommended_activities: recommendedActivities,
        recommended_services: recommendedServices,
        transport_required: recommendedServices,
      });

      await base44.asServiceRole.entities.TimelineEvent.create({
        travel_project_id: project.id,
        reference_number: ref,
        event_type: 'summary_created',
        message: 'AI created summary',
        actor_name: 'AI',
      });
    } catch (aiError) {
      console.error('AI summary generation failed (project still created):', aiError);
    }

    return Response.json({ id: project.id, reference_number: ref });
  } catch (error) {
    console.error('createTravelProject error', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});