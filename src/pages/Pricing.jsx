import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          Personalised Offers
        </p>

        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          We do not show fixed prices.
        </h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          Every Montenegro trip is different. Your offer depends on your dates, group size,
          accommodation style, transport needs, activities and level of service required.
        </p>

        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Ask for My Offer
        </Link>
      </div>
    </div>
  );
}