import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c57a4140f_generated_image.png';

const DATES = [
  '19 July 2026', '26 July 2026', '2 August 2026', '9 August 2026',
  '16 August 2026', '23 August 2026', '30 August 2026', '6 September 2026',
  '13 September 2026', '20 September 2026',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({});

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-4">Thank you for your interest in Summer in Montenegro.</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We have received your reservation request and will contact you shortly with availability, recommended flight information and next steps.
          </p>
          <a
            href="https://wa.me/447758162004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full text-sm hover:brightness-105 transition-all shadow-md"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Montenegro" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 px-6 pb-14 max-w-4xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Summer 2026</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            Reserve Your Spot
          </h1>
          <p className="text-white/60 text-lg">Complete the form and we'll be in touch shortly.</p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-600">Only 8 guests per departure — some dates already filling up</span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6 bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input required placeholder="Your full name" onChange={e => update('name', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input required type="email" placeholder="your@email.com" onChange={e => update('email', e.target.value)} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone / WhatsApp *</Label>
                <Input required placeholder="+44..." onChange={e => update('phone', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input placeholder="United Kingdom" onChange={e => update('country', e.target.value)} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Number of Guests</Label>
                <Select onValueChange={v => update('guests', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(n => <SelectItem key={n} value={String(n)}>{n} {n === 1 ? 'guest' : 'guests'}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Departure Date</Label>
                <Select onValueChange={v => update('date', v)}>
                  <SelectTrigger><SelectValue placeholder="Select date" /></SelectTrigger>
                  <SelectContent>
                    {DATES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Are you travelling from London/UK?</Label>
              <RadioGroup onValueChange={v => update('fromUK', v)} className="flex gap-6">
                <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="uk-yes" /><Label htmlFor="uk-yes" className="cursor-pointer">Yes</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="no" id="uk-no" /><Label htmlFor="uk-no" className="cursor-pointer">No</Label></div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Which airport are you likely flying from?</Label>
              <Input placeholder="e.g. London Luton" onChange={e => update('airport', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Activity Level</Label>
              <RadioGroup onValueChange={v => update('activityLevel', v)} className="flex gap-6">
                {['Easy', 'Moderate', 'Active'].map(l => (
                  <div key={l} className="flex items-center gap-2">
                    <RadioGroupItem value={l.toLowerCase()} id={`level-${l}`} />
                    <Label htmlFor={`level-${l}`} className="cursor-pointer">{l}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Dietary Requirements</Label>
              <Input placeholder="e.g. vegetarian, halal" onChange={e => update('dietary', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Allergies or Medical Notes</Label>
              <Input placeholder="Any allergies or medical conditions" onChange={e => update('medical', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Questions or Requests</Label>
              <Textarea placeholder="Anything else you'd like us to know" rows={3} onChange={e => update('notes', e.target.value)} />
            </div>

            <Button type="submit" className="w-full py-6 bg-accent text-accent-foreground hover:brightness-105 rounded-full font-bold text-base">
              Submit Reservation Request <ArrowRight size={16} className="ml-1" />
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Or chat with us first on{' '}
              <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">WhatsApp</a>
            </p>
          </form>
        </div>
      </section>

      <div className="md:hidden h-20" />
    </div>
  );
}