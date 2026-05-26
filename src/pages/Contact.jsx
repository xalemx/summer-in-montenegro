import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

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
      <div className="py-24 px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold mb-4">Thank you for your interest in Summer in Montenegro.</h2>
          <p className="text-muted-foreground">
            We have received your reservation request and will contact you shortly with availability, recommended flight information and next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Reserve Your Spot</h1>
        <p className="text-center text-muted-foreground mb-12">Complete the form below and we'll be in touch shortly.</p>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6 bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
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

          <Button type="submit" className="w-full py-6 bg-accent text-accent-foreground hover:brightness-105 rounded-full font-semibold text-base">
            Submit Reservation Request
          </Button>
        </form>
      </div>
    </div>
  );
}