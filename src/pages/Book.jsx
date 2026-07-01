import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Calendar, Users, Compass, MapPin, MessageCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const REGIONS = ['Bay of Kotor', 'Budva Riviera', 'Lake Skadar', 'Durmitor', 'Prokletije & Gusinje', 'Bar & Ulcinj', 'Not sure yet'];
const SERVICES = ['Accommodation', 'Airport transfers', 'Car rental / driver', 'Activities & experiences', 'Full trip planning', 'Just advice'];

export default function Book() {
  const [form, setForm] = useState({
    customer_name: '',
    email: '',
    whatsapp: '',
    country: '',
    adults: 1,
    children: 0,
    arrival_date: '',
    departure_date: '',
    flexible_dates: true,
    travel_style: 'balanced',
    trip_type: 'couple',
    preferred_regions: [],
    accommodation_preferences: '',
    activities: '',
    services_required: [],
    budget_range: 'mid_range',
    special_requests: '',
    preferred_contact_method: 'whatsapp',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggleArray = (k, v) => setForm(p => {
    const arr = p[k] || [];
    return { ...p, [k]: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] };
  });

  const submit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        preferred_regions: form.preferred_regions.join(', '),
        services_required: form.services_required.join(', '),
        status: 'new',
      };
      await base44.entities.OfferRequest.create(payload);
      setDone(true);
    } catch (e) {
      alert('Something went wrong. Please try again or message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-4">Let's start planning.</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We've received your trip details. We'll review them and prepare a personalised Montenegro plan — then be in touch within 24 hours to start the conversation.
          </p>
          <a
            href={`https://wa.me/447758162004?text=Hi! I just started planning a Montenegro trip.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full text-sm hover:brightness-105 transition-all shadow-md"
          >
            <MessageCircle size={18} />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
            Trip Planner
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Let's plan your trip together.
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Tell us what you have in mind. We'll review it together and prepare a personalised Montenegro plan for you.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border space-y-8">

          {/* Contact details */}
          <section>
            <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
              <Users size={20} className="text-primary" /> Your Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Full Name *</Label>
                <Input value={form.customer_name} onChange={e => set('customer_name', e.target.value)} placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label>Email *</Label>
                <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="space-y-1.5">
                <Label>WhatsApp *</Label>
                <Input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+44..." />
              </div>
              <div className="space-y-1.5">
                <Label>Country</Label>
                <Input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. United Kingdom" />
              </div>
            </div>
            <div className="space-y-1.5 mt-4">
              <Label>Preferred contact method</Label>
              <div className="flex gap-3">
                {['whatsapp', 'email', 'phone'].map(m => (
                  <button
                    key={m}
                    onClick={() => set('preferred_contact_method', m)}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                      form.preferred_contact_method === m ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Group & dates */}
          <section>
            <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-primary" /> Group & Dates
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Adults</Label>
                <Input type="number" min="1" value={form.adults} onChange={e => set('adults', parseInt(e.target.value) || 1)} />
              </div>
              <div className="space-y-1.5">
                <Label>Children</Label>
                <Input type="number" min="0" value={form.children} onChange={e => set('children', parseInt(e.target.value) || 0)} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="space-y-1.5">
                <Label>Arrival date</Label>
                <Input type="date" value={form.arrival_date} onChange={e => set('arrival_date', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Departure date</Label>
                <Input type="date" value={form.departure_date} onChange={e => set('departure_date', e.target.value)} />
              </div>
            </div>
            <label className="flex items-center gap-2 mt-4 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={form.flexible_dates} onChange={e => set('flexible_dates', e.target.checked)} className="w-4 h-4 rounded" />
              My dates are flexible
            </label>
          </section>

          {/* Trip style */}
          <section>
            <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
              <Compass size={20} className="text-primary" /> Trip Style
            </h2>
            <div className="space-y-1.5 mb-4">
              <Label>Trip type</Label>
              <div className="flex flex-wrap gap-2">
                {['solo', 'couple', 'family', 'friends', 'group'].map(t => (
                  <button
                    key={t}
                    onClick={() => set('trip_type', t)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                      form.trip_type === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 mb-4">
              <Label>Travel style</Label>
              <div className="flex gap-3">
                {['relaxed', 'balanced', 'active'].map(l => (
                  <button
                    key={l}
                    onClick={() => set('travel_style', l)}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                      form.travel_style === l ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Budget range</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  ['budget', 'Budget'],
                  ['mid_range', 'Mid-range'],
                  ['premium', 'Premium'],
                  ['luxury', 'Luxury'],
                  ['unsure', 'Not sure yet'],
                ].map(([v, label]) => (
                  <button
                    key={v}
                    onClick={() => set('budget_range', v)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                      form.budget_range === v ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Regions & services */}
          <section>
            <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-primary" /> Regions & Services
            </h2>
            <div className="space-y-1.5 mb-4">
              <Label>Preferred regions (select any)</Label>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map(r => (
                  <button
                    key={r}
                    onClick={() => toggleArray('preferred_regions', r)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                      form.preferred_regions.includes(r) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 mb-4">
              <Label>What do you need help with?</Label>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleArray('services_required', s)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                      form.services_required.includes(s) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 mb-4">
              <Label>Accommodation preferences</Label>
              <Input value={form.accommodation_preferences} onChange={e => set('accommodation_preferences', e.target.value)} placeholder="e.g. boutique hotel, apartment, villa..." />
            </div>
            <div className="space-y-1.5">
              <Label>Activities you'd enjoy</Label>
              <Textarea rows={2} value={form.activities} onChange={e => set('activities', e.target.value)} placeholder="e.g. boat trips, hiking, wine tours, beach days..." />
            </div>
          </section>

          {/* Special requests */}
          <section>
            <h2 className="font-heading text-lg font-semibold mb-4">Anything else?</h2>
            <div className="space-y-1.5">
              <Label>Special requests or notes</Label>
              <Textarea rows={3} value={form.special_requests} onChange={e => set('special_requests', e.target.value)} placeholder="Dietary needs, accessibility, celebrations, questions..." />
            </div>
          </section>
        </div>

        <div className="mt-6">
          <Button
            onClick={submit}
            disabled={loading || !form.customer_name || !form.email || !form.whatsapp}
            className="w-full bg-accent text-accent-foreground hover:brightness-105 rounded-full py-4 text-base font-bold"
          >
            {loading ? 'Sending...' : 'Start Planning My Trip'}
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            No payment required. We'll prepare your personalised offer and contact you within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}