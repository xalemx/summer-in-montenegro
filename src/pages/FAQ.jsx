import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FAQS = [
  { q: 'Are flights included?', a: 'No. Guests book their own flights. The trip is designed around weekly Friday Ryanair flights from London to Podgorica. We can suggest the best options once you reserve.' },
  { q: 'What is included in the price?', a: '7 nights accommodation, daily breakfast, airport pickup and drop-off from Podgorica, local transport during the trip and a hosted group experience throughout.' },
  { q: 'Are activities included?', a: 'No. Optional activities such as rafting, horse riding, kayaking, hiking and 4x4 tours are paid separately. They are arranged locally at your own pace and preference.' },
  { q: 'Is lunch or dinner included?', a: 'No. Daily breakfast is included. Lunch and dinner are flexible so guests can explore local restaurants, cafés and food experiences at their own pace.' },
  { q: 'How many guests are in each group?', a: 'Minimum 4 guests and maximum 8 guests per departure. Groups are kept intentionally small so the experience feels personal, not like a tour.' },
  { q: 'What happens if fewer than 4 people book?', a: 'The departure may be moved, rescheduled or refunded depending on availability. We will always contact you in advance if this happens.' },
  { q: 'Is this all-inclusive?', a: 'No. This is a hosted small-group adventure experience, not an all-inclusive package holiday. Accommodation, breakfast and transfers are included. Flights, lunch, dinner and optional activities are not.' },
  { q: 'What airport should I fly to?', a: 'Podgorica Airport (TGD) is the recommended arrival airport. Friday Ryanair flights from London are typically the best option.' },
  { q: 'Is travel insurance required?', a: 'Yes. Travel insurance is strongly recommended for all guests.' },
  { q: 'How difficult is the trip?', a: 'The base trip is relaxed and accessible. Optional activities range from easy walks to more active adventures — you choose what suits your level.' },
  { q: 'Is Montenegro safe?', a: 'Yes. Montenegro is considered a safe and welcoming travel destination. Normal travel precautions apply as with any international trip.' },
  { q: 'Can I pay monthly?', a: 'Monthly payment plans are available for Summer 2027 early access bookings. For Summer 2026, a deposit secures your place with the balance due before departure.' },
];

export default function FAQ() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-center text-muted-foreground mb-12">Everything you need to know before booking.</p>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="bg-card rounded-2xl border border-border px-6 shadow-sm">
              <AccordionTrigger className="font-heading text-base font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
          <h3 className="font-heading text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">We&apos;re happy to chat on WhatsApp before you commit to anything.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-105 transition-all text-sm"
            >
              Chat on WhatsApp
            </a>
            <Link to="/book" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-semibold rounded-full hover:brightness-105 transition-all text-sm">
              Reserve Your Spot <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}