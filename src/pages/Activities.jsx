import { Link } from 'react-router-dom';

const activities = [
  'Boat Trips',
  'Rafting',
  'Hiking',
  'Kayaking',
  'Horse Riding',
  'National Parks',
  'Food Experiences',
  'Wine Tours',
  'Hidden Beaches',
  'Old Towns',
  'Photography Spots',
  'Family Activities',
  'Road Trips',
  'Local Villages',
  'Wellness & Spa',
];

export default function Activities() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          Activities & Experiences
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          Tell us what you like. We’ll find the right experiences.
        </h1>
        <p className="text-muted-foreground">
          From quiet lake days to mountain adventures, your offer is built around your interests.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((item) => (
          <div key={item} className="p-6 rounded-2xl border bg-card shadow-sm">
            <h2 className="font-heading text-xl font-semibold">{item}</h2>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Add Activities to My Trip
        </Link>
      </div>
    </div>
  );
}