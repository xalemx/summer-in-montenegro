import { Link } from 'react-router-dom';

const faqs = [
  ['Do you show prices online?', 'No. Every request is different, so we prepare a personalised offer based on your wishes.'],
  ['Can you organise the full trip?', 'Yes. We can help with accommodation, transport, activities and itinerary planning.'],
  ['Can I ask only for one thing?', 'Yes. You can ask only for accommodation, airport transfer, activities or selected bookings.'],
  ['Do I have to know exactly where I want to go?', 'No. Tell us your travel style and we can suggest suitable regions and experiences.'],
  ['How will you contact me?', 'Usually by WhatsApp or email, depending on your preferred contact method.'],
];

export default function FAQ() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          Questions before planning?
        </h1>
        <p className="text-muted-foreground">
          Here are the most common questions about personalised Montenegro travel planning.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map(([q, a]) => (
          <div key={q} className="p-6 rounded-2xl border bg-card">
            <h2 className="font-heading text-xl font-semibold mb-2">{q}</h2>
            <p className="text-muted-foreground">{a}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Start Planning
        </Link>
      </div>
    </div>
  );
}