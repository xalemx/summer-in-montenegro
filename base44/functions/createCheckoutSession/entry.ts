import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14';

const DEPOSIT_PRICE_ID = 'price_1Tcvi180W0a1DrhVPVb6FXyW';

Deno.serve(async (req) => {
  try {
    const { departure_date, guests, full_name, email, booking_id } = await req.json();

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const origin = req.headers.get('origin') || 'https://app.base44.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: DEPOSIT_PRICE_ID,
        quantity: guests || 1,
      }],
      mode: 'payment',
      customer_email: email || undefined,
      success_url: `${origin}/book?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?cancelled=true`,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        departure_date: departure_date || '',
        guests: String(guests || 1),
        full_name: full_name || '',
        booking_id: booking_id || '',
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});