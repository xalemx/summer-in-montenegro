import { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Calendar, Users, Compass, MapPin, MessageCircle, Bed, HelpCircle, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const REGIONS = ['Bay of Kotor', 'Budva Riviera', 'Lake Skadar', 'Durmitor', 'Prokletije & Gusinje', 'Bar & Ulcinj', 'Not sure yet'];
const SERVICES = ['Accommodation', 'Airport transfers', 'Car rental / driver', 'Activities & experiences', 'Full trip planning', 'Just advice'];

const STEPS = [
  { title: 'Who is travelling?', icon: Users, sub: 'Let’s start with your group.' },
  { title: 'When?', icon: Calendar, sub: 'Tell us your dates — even if they’re flexible.' },
  { title: 'What kind of trip?', icon: Compass, sub: 'Style, pace and the things you love.' },
  { title: 'Where do you want to stay?', icon: Bed, sub: 'Regions and accommodation you imagine.' },
  { title: 'What help do you need?', icon: HelpCircle, sub: 'Pick the services you’d like from us.' },
  { title: 'Your contact details', icon: MessageCircle, sub: 'So your travel specialist can reach you.' },
];

const Chip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
      active ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/40'
    }`}
  >
    {children}
  </button>
);

export default function Book() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    customer_name: '', email: '', whatsapp: '', country: '',
    adults: 1, children: 0,
    arrival_date: '', departure_date: '', flexible_dates: true,
    travel_style: 'balanced', trip_type: 'couple', budget_range: 'mid_range',
    preferred_regions: [], accommodation_preferences: '', activities: '',
    services_required: [], special_requests: '', preferred_contact_method: 'whatsapp',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState('');

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggleArray = (k, v) => setForm(p => {
    const arr = p[k] || [];
    return { ...p, [k]: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] };
  });

  const submit = async () => {
    setLoading(true);
    try {
      const response = await base44.functions.invoke('createTravelProject', { ...form });
      if (response?.data?.reference_number) setRef(response.data.reference_number);
      setDone(true);
    } catch (e) {
      alert('Something went wrong. Please try again or message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const next = () => { if (step < 6) setStep(step + 1); else submit(); };
  const back = () => setStep(Math.max(1, step - 1));

  const contactValid = form.customer_name.trim() && form.email.trim() && form.whatsapp.trim();
  const canContinue = step < 6 || contactValid;
  const current = STEPS[step - 1];
  const StepIcon = current.icon;

  if (done) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-4">Your trip request is in.</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We’ve received your details{ref && ` (ref: ${ref})`}. Your travel specialist will prepare a personal Montenegro proposal and be in touch within 24 hours.
          </p>
          {ref && (
            <Link
              to={`/trip/${ref}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:brightness-105 transition-all shadow-md mb-3"
            >
              View my trip page <ArrowRight size={18} />
            </Link>
          )}
          <div className="mt-3">
            <a
              href={`https://wa.me/447758162004?text=Hi! I just started planning a Montenegro trip (ref: ${ref}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] text-white font-semibold rounded-full text-sm hover:brightness-105 transition-all"
            >
              <MessageCircle size={18} /> Message us on WhatsApp
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Keep your trip page link — it updates as we build your proposal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-14 md:py-20 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
            Trip Planner
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Let’s plan your trip together.
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A few simple questions — then we’ll design a personal Montenegro plan for you.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((s, i) => {
              const n = i + 1;
              const reached = n <= step;
              return (
                <div key={n} className="flex-1 flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${
                    n < step ? 'bg-primary text-primary-foreground border-primary' :
                    n === step ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-md' :
                    'bg-card text-muted-foreground border-border'
                  }`}>
                    {n < step ? <Check size={15} /> : n}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 6) * 100}%` }} />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <StepIcon size={22} className="text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Step {step} of 6</p>
              <h2 className="font-heading text-xl font-bold leading-tight">{current.title}</h2>
            </div>
          </div>

          {/* Step 1: Who is travelling */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <Label className="mb-2 block">Who’s travelling?</Label>
                <div className="flex flex-wrap gap-2">
                  {['solo', 'couple', 'family', 'friends', 'group'].map(t => (
                    <Chip key={t} active={form.trip_type === t} onClick={() => set('trip_type', t)}>{t}</Chip>
                  ))}
                </div>
              </div>
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
              <p className="text-sm text-muted-foreground">{current.sub}</p>
            </div>
          )}

          {/* Step 2: When */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Arrival date</Label>
                  <Input type="date" value={form.arrival_date} onChange={e => set('arrival_date', e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Departure date</Label>
                  <Input type="date" value={form.departure_date} onChange={e => set('departure_date', e.target.value)} />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.flexible_dates} onChange={e => set('flexible_dates', e.target.checked)} className="w-4 h-4 rounded" />
                My dates are flexible
              </label>
              <p className="text-sm text-muted-foreground">{current.sub}</p>
            </div>
          )}

          {/* Step 3: What kind of trip */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <Label className="mb-2 block">Travel style</Label>
                <div className="flex flex-wrap gap-2">
                  {['relaxed', 'balanced', 'active'].map(l => (
                    <Chip key={l} active={form.travel_style === l} onClick={() => set('travel_style', l)}>{l}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Budget range</Label>
                <div className="flex flex-wrap gap-2">
                  {[['budget', 'Budget'], ['mid_range', 'Mid-range'], ['premium', 'Premium'], ['luxury', 'Luxury'], ['unsure', 'Not sure yet']].map(([v, label]) => (
                    <Chip key={v} active={form.budget_range === v} onClick={() => set('budget_range', v)}>{label}</Chip>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Activities you’d enjoy</Label>
                <Textarea rows={3} value={form.activities} onChange={e => set('activities', e.target.value)} placeholder="e.g. boat trips, hiking, wine tours, beach days, old towns..." />
              </div>
            </div>
          )}

          {/* Step 4: Where to stay */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <Label className="mb-2 block">Preferred regions</Label>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map(r => (
                    <Chip key={r} active={form.preferred_regions.includes(r)} onClick={() => toggleArray('preferred_regions', r)}>{r}</Chip>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Accommodation preferences</Label>
                <Input value={form.accommodation_preferences} onChange={e => set('accommodation_preferences', e.target.value)} placeholder="e.g. boutique hotel, seafront apartment, private villa..." />
              </div>
              <p className="text-sm text-muted-foreground">{current.sub}</p>
            </div>
          )}

          {/* Step 5: What help */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <Label className="mb-2 block">What do you need help with?</Label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(s => (
                    <Chip key={s} active={form.services_required.includes(s)} onClick={() => toggleArray('services_required', s)}>{s}</Chip>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Anything else?</Label>
                <Textarea rows={3} value={form.special_requests} onChange={e => set('special_requests', e.target.value)} placeholder="Dietary needs, accessibility, celebrations, questions..." />
              </div>
            </div>
          )}

          {/* Step 6: Contact details */}
          {step === 6 && (
            <div className="space-y-5">
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>WhatsApp *</Label>
                  <Input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+44..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Country</Label>
                  <Input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. United Kingdom" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Preferred contact method</Label>
                <div className="flex gap-3">
                  {['whatsapp', 'email', 'phone'].map(m => (
                    <Chip key={m} active={form.preferred_contact_method === m} onClick={() => set('preferred_contact_method', m)}>{m}</Chip>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nav buttons */}
        <div className="flex items-center gap-3 mt-6">
          {step > 1 && (
            <Button onClick={back} variant="outline" className="rounded-full px-6 py-3" disabled={loading}>
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
          )}
          <Button
            onClick={next}
            disabled={loading || !canContinue}
            className="flex-1 bg-accent text-accent-foreground hover:brightness-105 rounded-full py-4 text-base font-bold"
          >
            {loading ? 'Sending...' : step === 6 ? 'Submit my trip request' : 'Continue'}
            {step < 6 && <ArrowRight size={18} className="ml-1.5" />}
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          No payment required. We’ll prepare your personal proposal and contact you within 24 hours.
        </p>
      </div>
    </div>
  );
}