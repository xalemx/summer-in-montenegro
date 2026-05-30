import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80';
const LAKE_IMG = 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1200&q=80';
const COAST_IMG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80';

const WHY_NOT_SPAIN = [
  { con: 'Packed beaches in July and August', note: 'Benidorm, Magaluf, Ibiza — you already know what it looks like.' },
  { con: 'Mass tourism infrastructure', note: 'All-inclusive hotels, airport transfers to identical resorts, same experience as last year.' },
  { con: 'Sky-high prices in peak summer', note: 'Spain is no longer the "budget" option it once was. Hotels, restaurants and flights all reflect this.' },
  { con: 'No mountains from the coast', note: 'The Spanish coast is flat. There is no dramatic alpine scenery within a day\'s drive of Barcelona.' },
  { con: 'You\'ve already been', note: 'Statistically, if you\'re a British traveller in your 20s or 30s, you\'ve done Spain at least twice.' },
];

const WHY_NOT_PORTUGAL = [
  { con: 'Overtourism in Lisbon and Algarve', note: 'Lisbon is the new Barcelona — beautiful, but heaving. The Algarve is booked out by March.' },
  { con: 'Limited dramatic landscapes', note: 'Portugal is a wonderful country but it is largely coastal and flat. There are no mountains like the Balkans.' },
  { con: 'Rising costs across the board', note: 'Post-pandemic, Portugal has seen significant price increases. It is no longer the affordable hidden gem it was.' },
  { con: 'Trendy, not authentic', note: 'Lisbon and Porto have become Instagram destinations. The "authentic" version is harder to find.' },
];

const MONTENEGRO_REASONS = [
  {
    icon: '🏔',
    title: 'Mountains and coast in the same country',
    body: 'Montenegro is one of the few countries in Europe where you can go from a dramatic alpine national park to a stunning coastline within two hours. The Bay of Kotor is a UNESCO World Heritage site. Prokletije National Park is referred to as "The Accursed Mountains" — one of the last truly wild mountain ranges in Europe.',
  },
  {
    icon: '👥',
    title: 'Fewer tourists. Genuinely.',
    body: 'Montenegro receives roughly 2.5 million tourists per year. Spain receives over 80 million. Portugal receives around 25 million. The mathematics of this is simple: the crowds you experience in Montenegro are incomparable. You will visit places where you are the only non-local in the room.',
  },
  {
    icon: '💶',
    title: 'Still affordable',
    body: 'Montenegro is not a budget destination, but it is considerably more affordable than Western Europe. Restaurant meals, local accommodation and activities cost a fraction of what you would pay in Spain or Portugal — without any reduction in quality.',
  },
  {
    icon: '🌍',
    title: 'Europe\'s genuinely hidden gem',
    body: 'Montenegro is not undiscovered — but it is undervisited. It has not yet been through the cycle of mass tourism that transformed Croatia, Spain and Portugal. The infrastructure exists. The food is excellent. The landscapes are extraordinary. What\'s missing is the crowd.',
  },
  {
    icon: '🤝',
    title: 'Genuine local hospitality',
    body: 'Montenegrin culture is centred on hospitality. Guests are welcomed with food, coffee and conversation. This is not a performance for tourists — it is how locals interact with anyone who comes through their door. You will feel this difference within the first 24 hours.',
  },
  {
    icon: '🧭',
    title: 'An itinerary that is actually different',
    body: 'Our trip visits places not featured in standard travel guides: remote villages in Prokletije, Plav and Gusinje, mountain roads with no traffic, lakes where swimming is still free. This is not a rebranded package tour — it is a week that will feel genuinely unlike anything you have done before.',
  },
];

const COMPARE = [
  { label: 'Coastline', spain: '✓', portugal: '✓', montenegro: '✓' },
  { label: 'Alpine Mountains', spain: '—', portugal: '—', montenegro: '✓' },
  { label: 'Under 3M tourists/year', spain: '✕', portugal: '✕', montenegro: '✓' },
  { label: 'UNESCO Heritage', spain: '✓', portugal: '✓', montenegro: '✓' },
  { label: 'Affordable dining', spain: '~', portugal: '~', montenegro: '✓' },
  { label: 'Feels undiscovered', spain: '✕', portugal: '✕', montenegro: '✓' },
  { label: 'Wild national parks', spain: '~', portugal: '—', montenegro: '✓' },
  { label: 'No mass tourism', spain: '✕', portugal: '✕', montenegro: '✓' },
];

export default function AboutMontenegro() {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Montenegro mountains" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 px-6 pb-16 max-w-4xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Europe's Best Kept Secret</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            Why Montenegro?
          </h1>
          <p className="text-white/65 text-lg max-w-xl">The Balkans country most British travellers haven't visited yet — and why that's exactly the point.</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Short Answer</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            Montenegro is where Europe used to be.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Before mass tourism turned the Mediterranean into a series of identical resorts. Before Spain meant Magaluf and Portugal meant a £400/night Airbnb in Lisbon. Before "authentic local experiences" became a marketing phrase used to sell package holidays.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Montenegro is a small country on the Adriatic coast of the Western Balkans. It has mountains that would make Swiss tourists jealous, a coastline that rivals Croatia at a fraction of the price, national parks that remain genuinely wild, and a culture of hospitality that is not yet performing for visitors.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            It receives approximately 2.5 million tourists per year. Spain receives 83 million. The comparison tells you everything you need to know.
          </p>
        </div>
      </section>

      {/* WHY NOT SPAIN */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Honest Comparison</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">Why Not Spain?</h2>
            <p className="text-muted-foreground mt-3 max-w-xl">Spain is a great country. It is also the most visited country in Europe. That is the problem.</p>
          </div>
          <div className="space-y-4">
            {WHY_NOT_SPAIN.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                <span className="text-red-400 font-bold text-lg flex-shrink-0 mt-0.5">✕</span>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">{item.con}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-primary/5 border border-primary/15 rounded-2xl">
            <p className="text-sm text-foreground leading-relaxed">
              <strong>None of this makes Spain bad.</strong> It makes Spain exactly what it is — a highly developed, heavily visited tourist destination. If that is what you want, Spain delivers it reliably. If you want something different, you need to go somewhere different.
            </p>
          </div>
        </div>
      </section>

      {/* WHY NOT PORTUGAL */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Honest Comparison</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">Why Not Portugal?</h2>
            <p className="text-muted-foreground mt-3 max-w-xl">Portugal is a genuinely beautiful country that has suffered significantly from its own popularity.</p>
          </div>
          <div className="space-y-4">
            {WHY_NOT_PORTUGAL.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                <span className="text-red-400 font-bold text-lg flex-shrink-0 mt-0.5">✕</span>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">{item.con}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Side by Side</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">The Comparison</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-card">
            <div className="grid grid-cols-4 bg-primary text-primary-foreground px-5 py-3 text-xs font-semibold uppercase tracking-wider">
              <div>Feature</div>
              <div className="text-center">Spain</div>
              <div className="text-center">Portugal</div>
              <div className="text-center">Montenegro</div>
            </div>
            {COMPARE.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 px-5 py-3.5 text-sm border-t border-border ${i % 2 === 0 ? '' : 'bg-secondary/20'}`}>
                <div className="font-medium text-foreground text-xs">{row.label}</div>
                <div className={`text-center font-bold text-sm ${row.spain === '✓' ? 'text-green-600' : row.spain === '✕' ? 'text-red-400' : 'text-muted-foreground'}`}>{row.spain}</div>
                <div className={`text-center font-bold text-sm ${row.portugal === '✓' ? 'text-green-600' : row.portugal === '✕' ? 'text-red-400' : 'text-muted-foreground'}`}>{row.portugal}</div>
                <div className={`text-center font-bold text-sm ${row.montenegro === '✓' ? 'text-green-600' : row.montenegro === '✕' ? 'text-red-400' : 'text-muted-foreground'}`}>{row.montenegro}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MONTENEGRO */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Six Reasons</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">Why Montenegro Is Europe's Hidden Gem</h2>
          </div>
          <div className="space-y-6">
            {MONTENEGRO_REASONS.map((item, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO SPLIT */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl overflow-hidden h-72 relative group">
            <img src={LAKE_IMG} alt="Plav Lake, Montenegro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-0.5">The North</p>
              <p className="font-heading text-xl font-bold text-white">Plav Lake</p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden h-72 relative group">
            <img src={COAST_IMG} alt="Montenegro coastline" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-0.5">The South</p>
              <p className="font-heading text-xl font-bold text-white">The Adriatic Coast</p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING STATEMENT */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-[1.1] mb-8">
            Montenegro is not the alternative to a good holiday.<br />
            <em className="text-primary">It is the better one.</em>
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            For the same price as a week in Spain, you can spend a week in a country that most of your friends haven't visited, doing things that won't appear on your social feed for years, in places that will actually stay with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-110 transition-all shadow-xl text-base inline-flex items-center gap-2">
              Reserve Your Spot <ArrowRight size={16} />
            </Link>
            <Link to="/dates" className="px-10 py-4 border border-border text-foreground font-semibold rounded-full hover:bg-secondary transition-all text-base">
              View 2026 Dates
            </Link>
          </div>
        </div>
      </section>

      <div className="md:hidden h-20" />
    </div>
  );
}