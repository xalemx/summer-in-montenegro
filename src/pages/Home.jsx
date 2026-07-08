import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Car, Home as HomeIcon, Compass, HeartHandshake, MessageSquare, FileText, Plane } from 'lucide-react';
import { PremiumCard } from '@/components/PremiumCard';
import SEO from '@/components/SEO';

const steps = [
  { icon: MessageSquare, title: 'Tell us your wishes', text: 'Share what you dream of — coast, mountains, lakes, villas or hidden villages.' },
  { icon: FileText, title: 'We design your proposal', text: 'Your travel specialist builds a personal plan with stays, transport and experiences.' },
  { icon: Plane, title: 'You approve and travel', text: 'Review, adjust and approve. Then enjoy Montenegro, your way.' },
];

const services = [
  { icon: HomeIcon, title: 'Accommodation', text: 'Hotels, apartments, villas, coastal stays and mountain retreats.' },
  { icon: Car, title: 'Transport', text: 'Airport transfers, private drivers, car rental and local transport.' },
  { icon: Compass, title: 'Activities', text: 'Boat trips, rafting, hiking, national parks, food, wine and hidden places.' },
  { icon: HeartHandshake, title: 'Full Trip Planning', text: 'Tell us what you want and we prepare a personal Montenegro plan for you.' },
];

export default function Home() {
  return (
    <div className="bg-background">
      <SEO
        title="Plan Your Montenegro Summer Trip"
        description="Private Montenegro travel planning for beaches, mountains, transfers, accommodation and local experiences."
      />
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <img
          src="https://media.base44.com/images/public/6a14e6049e3182804fee97ce/61df8e3be_petar-lazarevic-J6Ij4p87lD8-unsplash1.jpg"
          alt="Bay of Kotor in Montenegro"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="uppercase tracking-[0.35em] text-sm mb-5 text-white/80">
            Private Montenegro Travel
          </p>

          <h1 className="font-heading text-5xl md:text-7xl max-w-3xl leading-tight mb-6">
            Montenegro trips planned around you.
          </h1>

          <p className="text-lg md:text-xl max-w-2xl text-white/85 mb-8">
            Beaches, mountains, old towns, boat days and local experiences — designed into one personal summer plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/book"
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition"
            >
              Start Planning
            </Link>

            <Link
              to="/about-montenegro"
              className="px-8 py-4 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
              Explore Montenegro
            </Link>
          </div>
        </div>
      </section>

      {/* How it works — three steps */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
              How It Works
            </p>
            <h2 className="font-heading text-4xl font-bold">A simple, personal process</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <PremiumCard key={s.title} className="relative p-7 text-center">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <s.icon className="mx-auto mb-4 text-primary" size={30} />
                <h3 className="font-heading text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
            What We Can Organise
          </p>
          <h2 className="font-heading text-4xl font-bold mb-4">
            From one activity to a complete holiday
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You don't need to choose a fixed package. Tell us what you need and we build the right solution.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((item) => (
            <PremiumCard key={item.title} className="p-6">
              <item.icon className="mb-5 text-primary" size={28} />
              <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </PremiumCard>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <MapPin className="mx-auto mb-5" size={34} />
          <h2 className="font-heading text-4xl font-bold mb-5">
            Tell us your wishes. We design your proposal.
          </h2>
          <p className="text-primary-foreground/75 mb-8">
            Whether you need full trip planning or help booking only selected things, start with one simple request.
          </p>
          <Link to="/book" className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
            Start Planning Your Trip <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}