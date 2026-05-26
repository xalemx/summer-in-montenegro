import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: 'Are flights included?', a: 'No. Guests book their own flights to Podgorica Airport. We provide recommended flight options from London.' },
  { q: 'What airport should I fly to?', a: 'Podgorica Airport is recommended.' },
  { q: 'What is included?', a: 'Accommodation, airport transfers, breakfast and dinner, local transport, guided activities and hosted support.' },
  { q: 'What is not included?', a: 'Flights, travel insurance, alcohol, personal expenses and optional premium activities.' },
  { q: 'How many people are in each group?', a: 'Groups start from 4 guests and can be organised as 4, 8, 12 or more depending on demand.' },
  { q: 'Is travel insurance required?', a: 'Yes. Travel insurance is strongly recommended.' },
  { q: 'Is the trip difficult?', a: 'Most activities are beginner to moderate level. Optional harder activities may be available.' },
  { q: 'Is Montenegro safe?', a: 'Yes, Montenegro is considered a safe travel destination, but guests should follow normal travel precautions.' },
  { q: 'Can I pay monthly?', a: 'For 2026, payment is simple deposit/full payment. Monthly instalments are planned for Summer 2027 early access.' },
];

export default function FAQ() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-center text-muted-foreground mb-12">Everything you need to know before your trip.</p>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="bg-card rounded-2xl border border-border px-6 shadow-sm">
              <AccordionTrigger className="font-heading text-base font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}