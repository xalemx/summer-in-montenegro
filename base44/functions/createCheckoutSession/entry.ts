import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14';

const PRICE_FULL = 'price_1TcvHaPGf1Cd8sSEpfvPvwB4';       // £999 one-time (2026)
const PRICE_MONTHLY = 'price_1TcvKJPGf1Cd8sSErOwWpZbG';    // £99.90/month (2027)

Deno.serve(async (req) => {
  try {
    const { departure_date, guests, full_name, email, booking_id, payment_plan } = await req.json();

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
    const origin = req.headers.get('origin') || 'https://app.base44.com';

    const isMonthly = payment_plan === 'monthly';

    const sessionConfig = {
      payment_method_types: ['card'],
      customer_email: email || undefined,
      success_url: `${origin}/book?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?cancelled=true`,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        departure_date: departure_date || '',
        guests: String(guests || 1),
        full_name: full_name || '',
        booking_id: booking_id || '',
        payment_plan: payment_plan || 'full',
      },
    };

    if (isMonthly) {
      sessionConfig.mode = 'subscription';
      sessionConfig.line_items = [{
        price: PRICE_MONTHLY,
        quantity: guests || 1,
      }];
    } else {
      sessionConfig.mode = 'payment';
      sessionConfig.line_items = [{
        price: PRICE_FULL,
        quantity: guests || 1,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});