import { Link } from 'react-router-dom';

const regions = [
  ['Bay of Kotor', 'Old towns, sea views, boat trips and romantic coastal stays.'],
  ['Budva Riviera', 'Beaches, nightlife, restaurants and summer atmosphere.'],
  ['Lake Skadar', 'Nature, boats, wine, birds and peaceful villages.'],
  ['Durmitor', 'Mountains, lakes, rafting and dramatic landscapes.'],
  ['Prokletije & Gusinje', 'Wild mountains, hiking, local food and authentic stays.'],
  ['Bar & Ulcinj', 'Coast, long beaches, history and relaxed southern energy.'],
];

export default function AboutMontenegro() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          Explore Montenegro
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          Coast, mountains, lakes and hidden places.
        </h1>
        <p className="text-muted-foreground">
          Montenegro is small enough to explore, but rich enough to feel like several holidays in one.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {regions.map(([title, text]) => (
          <div key={title} className="p-7 rounded-2xl border bg-card shadow-sm">
            <h2 className="font-heading text-2xl font-semibold mb-3">{title}</h2>
            <p className="text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Plan My Montenegro Route
        </Link>
      </div>
    </div>
  );
}