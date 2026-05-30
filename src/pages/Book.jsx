import { useState, useEffect } from 'react';
import PrivateRoomBadge from '../components/PrivateRoomBadge';
import { base44 } from '@/api/base44Client';
import { CheckCircle, ChevronRight, ChevronLeft, Calendar, Users, User, MessageCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const DATES = [
  { label: '17 Jul 2026', sub: 'Friday departure', spots: 2, guaranteed: false },
  { label: '24 Jul 2026', sub: 'Friday departure', spots: 3, guaranteed: false },
  { label: '31 Jul 2026', sub: 'Friday departure', spots: 6, guaranteed: false },
  { label: '7 Aug 2026', sub: 'Friday departure', spots: 8, guaranteed: false },
  { label: '14 Aug 2026', sub: 'Friday departure', spots: 8, guaranteed: false },
  { label: '21 Aug 2026', sub: 'Friday departure', spots: 8, guaranteed: false },
  { label: '28 Aug 2026', sub: 'Friday departure', spots: 7, guaranteed: false },
  { label: '4 Sep 2026', sub: 'Friday departure', spots: 8, guaranteed: false },
  { label: '11 Sep 2026', sub: 'Friday departure', spots: 8, guaranteed: false },
  { label: '18 Sep 2026', sub: 'Friday departure', spots: 8, guaranteed: false },
];

function getStatusLabel(spots) {
  if (spots === 0) return { text: 'Sold Out', color: 'text-red-600' };
  if (spots <= 2) return { text: spots + ' spot' + (spots !== 1 ? 's' : '') + ' left — Almost Full', color: 'text-red-500' };
  if (spots <= 4) return { text: spots + ' spots — Limited', color: 'text-amber-600' };
  return { text: spots + ' spots available', color: 'text-primary' };
}

const STEPS = [
  { icon: Calendar, label: 'Choose Date' },
  { icon: Users, label: 'Guests' },
  { icon: User, label: 'Your Details' },
  { icon: CheckCircle, label: 'Confirm' },
];

export default function Book() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'cancelled'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') setPaymentStatus('success');
    if (params.get('cancelled') === 'true') setPaymentStatus('cancelled');
  }, []);
  const [form, setForm] = useState({
    departure_date: '',
    guests: 1,
    full_name: '',
    email: '',
    whatsapp: '',
    country: '',
    airport: '',
    activity_level: 'balanced',
    dietary: '',
    medical_notes: '',
    notes: '',
    from_london: '',
    source: '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    setLoading(true);
    // Check if running inside an iframe (preview)
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app, not the editor preview.');
      setLoading(false);
      return;
    }
    const booking = await base44.entities.BookingRequest.create({ ...form, status: 'new' });
    const res = await base44.functions.invoke('createCheckoutSession', {
      departure_date: form.departure_date,
      guests: form.guests,
      full_name: form.full_name,
      email: form.email,
      booking_id: booking.id,
    });
    if (res.data?.url) {
      window.location.href = res.data.url;
    } else {
      setDone(true);
    }
    setLoading(false);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-green-600" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-3">You're booked!</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Payment received. We will contact you on WhatsApp within 24 hours to confirm your spot and send full trip details.
          </p>
          <a
            href="https://wa.me/447758162004"
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

  if (paymentStatus === 'cancelled') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="font-heading text-2xl font-bold mb-3">Payment cancelled</h2>
          <p className="text-muted-foreground mb-6">No charge was made. You can try again below.</p>
          <button
            onClick={() => setPaymentStatus(null)}
            className="px-8 py-3 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-110 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-3">{"You're on the list."}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Thank you for your reservation request. We have received your enquiry and will contact you shortly with availability, recommended flight information and next steps.
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Requested: <strong>{form.departure_date}</strong> &nbsp;&middot;&nbsp; Guests: <strong>{form.guests}</strong>
          </p>
          <a
            href={`https://wa.me/447758162004?text=Hi! I just submitted a booking request for ${encodeURIComponent(form.departure_date)} for ${form.guests} guest(s).`}
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

        {/* What happens next */}
        <div className="mb-10 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="font-heading text-lg font-semibold text-center mb-5">What Happens After You Submit?</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            {[
              { n: '1', label: 'Submit your enquiry', sub: 'Takes 2 minutes' },
              { n: '2', label: 'We confirm availability', sub: 'Within 24 hours' },
              { n: '3', label: 'Book your flight', sub: 'Friday London to Podgorica' },
              { n: '4', label: 'Receive trip info', sub: 'Full details & packing list' },
              { n: '5', label: 'Meet your group', sub: 'At the airport in Montenegro' },
            ].map((s, i, arr) => (
              <div key={i} className="flex sm:flex-col items-center sm:items-center flex-1 gap-3 sm:gap-2">
                <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center flex-shrink-0">{s.n}</div>
                <div className="sm:text-center">
                  <p className="font-semibold text-xs text-foreground leading-tight">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
                {i < arr.length - 1 && <div className="hidden sm:block w-full h-px bg-border flex-1" />}
              </div>
            ))}
          </div>
        </div>


        <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-2">Reserve Your Spot</h1>
        <div className="flex justify-center mb-3">
          <PrivateRoomBadge size="md" />
        </div>
        <p className="text-center text-muted-foreground text-sm mb-4">Summer 2026 · 4 Nights Mountains · 3 Nights Adriatic Coast</p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-semibold text-red-600">Only 8 guests per departure — some dates already filling up</span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? 'bg-primary text-primary-foreground' :
                i === step ? 'bg-accent text-accent-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-8 md:w-16 transition-all ${i < step ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border min-h-[340px]">

          {/* Step 0 - Choose Date */}
          {step === 0 && (
            <div>
              <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-primary" /> Choose Your Departure
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DATES.map(d => {
                  const status = getStatusLabel(d.spots);
                  return (
                    <button
                      key={d.label}
                      onClick={() => set('departure_date', d.label)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        form.departure_date === d.label
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground font-medium">{8 - d.spots} / 8 booked</span>
                          <span className="text-xs text-muted-foreground">{d.spots} left</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-green-500 transition-all"
                            style={{ width: `${((8 - d.spots) / 8) * 100}%` }}
                          />
                        </div>
                      </div>
                      {d.guaranteed && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-200 mb-1">
                          ✓ Guaranteed Departure
                        </span>
                      )}
                      <p className="font-semibold text-sm">{d.label}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
                        <span className="text-xs text-muted-foreground">&#10003; 4 Nights Mountains</span>
                        <span className="text-xs text-muted-foreground">&#10003; 3 Nights Coast</span>
                        <span className="text-xs text-muted-foreground">&#10003; Private Room</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground mt-1.5">£999 per person</p>
                      <p className={`text-xs mt-1 font-medium ${status.color}`}>{status.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 1 - Guests */}
          {step === 1 && (
            <div>
              <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Users size={20} className="text-primary" /> How Many Guests?
              </h2>
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[1,2,3,4,5,6,7,8].map(n => (
                  <button
                    key={n}
                    onClick={() => set('guests', n)}
                    className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${
                      form.guests === n ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground">
                <p>Total: <strong className="text-foreground">£{form.guests * 999}</strong> &nbsp;·&nbsp; £999 per person</p>
                <p className="text-xs mt-1 text-muted-foreground">Flexible payment options may be available at checkout through Klarna, subject to eligibility and approval. Summer in Montenegro does not provide finance directly.</p>
              </div>
              <div className="mt-6 space-y-2">
                <Label className="text-sm">Activity preference</Label>
                <div className="flex gap-3">
                  {['relaxed','balanced','active'].map(l => (
                    <button
                      key={l}
                      onClick={() => set('activity_level', l)}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                        form.activity_level === l ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Contact */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" /> Your Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full Name *</Label>
                  <Input required value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Your name" />
                </div>
                <div className="space-y-1.5">
                  <Label>Email *</Label>
                  <Input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>WhatsApp Number *</Label>
                  <Input required value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+44..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Country</Label>
                  <Input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. United Kingdom" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Are you travelling from London?</Label>
                  <Input value={form.from_london} onChange={e => set('from_london', e.target.value)} placeholder="Yes / No" />
                </div>
                <div className="space-y-1.5">
                  <Label>Which London airport?</Label>
                  <Input value={form.airport} onChange={e => set('airport', e.target.value)} placeholder="e.g. Luton, Stansted, Gatwick" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Dietary requirements</Label>
                <Input value={form.dietary} onChange={e => set('dietary', e.target.value)} placeholder="e.g. vegetarian, nut allergy" />
              </div>
              <div className="space-y-1.5">
                <Label>Medical notes or accessibility needs</Label>
                <Input value={form.medical_notes} onChange={e => set('medical_notes', e.target.value)} placeholder="Any relevant medical or accessibility information" />
              </div>
              <div className="space-y-1.5">
                <Label>How did you hear about us?</Label>
                <Select onValueChange={v => set('source', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {['TikTok','Instagram','Facebook','Google','Friend','Other'].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Anything else we should know?</Label>
                <Textarea rows={2} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Questions, requests..." />
              </div>
            </div>
          )}

          {/* Step 3 - Review */}
          {step === 3 && (
            <div>
              <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <CheckCircle size={20} className="text-primary" /> Review your booking
              </h2>
              <div className="space-y-3 mb-8">
                {[
                  ['Departure', form.departure_date],
                  ['Guests', `${form.guests} ${form.guests === 1 ? 'person' : 'people'}`],
                  ['Activity preference', form.activity_level],
                  ['Country', form.country || '—'],
                  ['From London?', form.from_london || '—'],
                  ['London airport', form.airport || '—'],
                  ['How did you hear about us?', form.source || '—'],
                  ['Name', form.full_name],
                  ['Email', form.email],
                  ['WhatsApp', form.whatsapp],
                  ['Dietary', form.dietary || '—'],
                  ['Medical / Accessibility', form.medical_notes || '—'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-border text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium capitalize">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-sm text-muted-foreground">
                You will be taken to a secure Stripe checkout to complete your payment. We will confirm your spot and send trip details once payment is received.
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6 sticky bottom-0 bg-background/95 backdrop-blur-sm pb-6 pt-3 -mx-4 px-4 sm:static sm:bg-transparent sm:pb-0 sm:pt-0 sm:mx-0 sm:px-0 border-t border-border sm:border-0">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 rounded-full">
              <ChevronLeft size={16} /> Back
            </Button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 0 && !form.departure_date}
              className="bg-accent text-accent-foreground hover:brightness-105 rounded-full px-8 flex items-center gap-1"
            >
              Continue <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={submit}
              disabled={loading || !form.full_name || !form.email || !form.whatsapp}
              className="bg-accent text-accent-foreground hover:brightness-105 rounded-full px-8"
            >
              {loading ? 'Processing...' : `Pay £${form.guests * 999} & Reserve`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}