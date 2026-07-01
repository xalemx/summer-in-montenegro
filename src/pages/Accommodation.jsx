import { Link } from 'react-router-dom';

const stays = [
  'Hotels',
  'Apartments',
  'Luxury Villas',
  'Boutique Hotels',
  'Mountain Chalets',
  'Eco Lodges',
  'Beach Stays',
  'Family Accommodation',
  'Romantic Stays',
  'Long Stays',
];

export default function Accommodation() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          Accommodation Ideas
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          Stay where your trip makes sense.
        </h1>
        <p className="text-muted-foreground">
          Tell us your style and we help find accommodation that fits your route, comfort level and travel plans.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stays.map((item) => (
          <div key={item} className="p-6 rounded-2xl border bg-card shadow-sm">
            <h2 className="font-heading text-xl font-semibold">{item}</h2>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Ask for Accommodation Help
        </Link>
      </div>
    </div>
  );
}