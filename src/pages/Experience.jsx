import { Link } from 'react-router-dom';

const steps = [
  ['1', 'Tell us what you want', 'Share your dates, group size, travel style, preferred places, activities and accommodation ideas.'],
  ['2', 'We design your trip', 'We look for suitable places to stay, things to do, transport options and local experiences.'],
  ['3', 'You receive a proposal', 'We send a personalised offer based on your wishes. You can accept it or request changes.'],
  ['4', 'We organise everything', 'Depending on what you need, we can help with accommodation, transport, activities or the full trip.'],
];

export default function Experience() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          How It Works
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          We do not sell fixed packages.
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We listen first, then create a Montenegro travel offer around your needs.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
        {steps.map(([n, title, text]) => (
          <div key={n} className="p-7 rounded-2xl border bg-card shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-5">
              {n}
            </div>
            <h2 className="font-heading text-2xl font-semibold mb-3">{title}</h2>
            <p className="text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Start Planning My Trip
        </Link>
      </div>
    </div>
  );
}