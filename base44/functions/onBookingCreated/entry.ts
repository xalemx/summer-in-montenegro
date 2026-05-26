import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const booking = payload.data;
    if (!booking || !booking.email) {
      return Response.json({ ok: true, skipped: 'no booking data' });
    }

    const { full_name, email, departure_date, guests, whatsapp } = booking;
    const firstName = full_name?.split(' ')[0] || full_name || 'there';
    const totalEstimate = guests ? `£${guests * 899}` : '£899+';
    const depositPaid = '£199';

    // --- CONFIRMATION EMAIL ---
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      from_name: 'Summer in Montenegro',
      subject: `You're on the list, ${firstName} 🏔️`,
      body: `
Hi ${firstName},

We've received your reservation request — and you've made a great call.

Here's a summary of what you submitted:

  • Departure: ${departure_date}
  • Guests: ${guests}
  • Estimated total: ${totalEstimate} (deposit: ${depositPaid})

WHAT HAPPENS NEXT
─────────────────
1. We'll message you on WhatsApp within 24 hours to confirm availability.
2. Once confirmed, we'll send a deposit link to hold your spot.
3. You'll receive the full itinerary, packing list and group details.

A TASTE OF WHAT'S COMING
─────────────────────────
Day 1 — Arrive in Tivat. Airport pickup. First meal together.
Day 2 — North to Prokletije. The mountains begin.
Day 3 — Plav Lake at dawn. 900 metres above sea level.
Day 4 — Durmitor. Bobotov Kuk. Views that change you.
Day 5 — Hidden villages. Local families. A meal you'll talk about for years.
Day 6 — The coast. Kotor. Golden hour on the walls.
Day 7 — Last morning. Slow breakfast. Back to London different.

INCLUDED IN YOUR PACKAGE
──────────────────────────
✓ 7 nights boutique accommodation
✓ Breakfast & dinner every day
✓ All in-country transport
✓ Airport pickup and drop-off
✓ Expert local host throughout
✗ Flights (direct from London Gatwick, Luton or Stansted)

Any questions? Just reply to this email or message us directly on WhatsApp.

See you in Montenegro,
The Summer in Montenegro Team

──
summerinmontenegro.com
WhatsApp: +44 7758 162004
Instagram: @summerinmontenegro_com
      `.trim(),
    });

    // --- ADMIN NOTIFICATION EMAIL ---
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'hello@summerinmontenegro.com',
      from_name: 'Summer in Montenegro Bookings',
      subject: `New reservation request — ${full_name} · ${departure_date}`,
      body: `
New booking request received.

Name: ${full_name}
Email: ${email}
WhatsApp: ${whatsapp || 'Not provided'}
Departure: ${departure_date}
Guests: ${guests}
Estimated value: ${totalEstimate}

Log in to the admin dashboard to view and manage this request.
      `.trim(),
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});