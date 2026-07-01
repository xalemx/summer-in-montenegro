import { Link } from 'react-router-dom';

export default function Summer2027() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          Future Travel
        </p>

        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          Planning ahead for Montenegro?
        </h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          Whether you are thinking about this summer, next year, or a long-term stay,
          tell us your ideas and we can help shape your Montenegro travel plan.
        </p>

        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Start Future Planning
        </Link>
      </div>
    </div>
  );
}