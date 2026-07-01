import { Link } from 'react-router-dom';

export default function DepartureDates() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          Flexible Travel Dates
        </p>

        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          Travel when it works for you.
        </h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          We no longer use fixed departure dates. Tell us your preferred travel dates and whether
          they are flexible. We will build your Montenegro offer around your timing.
        </p>

        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Choose My Dates
        </Link>
      </div>
    </div>
  );
}