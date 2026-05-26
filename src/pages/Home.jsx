import { Link } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import { MapPin, Utensils, Mountain, Users, Car, Sun, Compass, Heart, Coffee } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/7b9ea40f4_generated_3080001c.png';
const COAST_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c477aa20c_generated_5ab95a92.png';
const MOUNTAIN_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1b071a013_generated_06324ee4.png';
const LAKE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/df13fa70f_generated_5bd1d860.png';
const VILLAGE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/786ac0f50_generated_df05bc13.png';
const SPRINGS_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/df17a8fc7_generated_0bc1160e.png';
const FOOD_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/f1c34b4b6_generated_0a69661e.png';
const HORSE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/8d8db3a11_generated_948706a3.png';

const INCLUDED = [
  { icon: Car, label: 'Airport pickup and drop-off from Podgorica' },
  { icon: MapPin, label: 'Accommodation' },
  { icon: Utensils, label: 'Breakfast and dinner' },
  { icon: Car, label: 'Local transport' },
  { icon: Compass, label: 'Guided activities' },
  { icon: Sun, label: 'South Montenegro arrival experience' },
  { icon: Mountain, label: 'Northern Montenegro adventure' },
  { icon: Heart, label: 'Local host support' },
  { icon: Users, label: 'Small-group experience' },
];

const HIGHLIGHTS = [
  { img: COAST_IMG, title: 'South Montenegro Coast' },
  { img: MOUNTAIN_IMG, title: 'Prokletije National Park' },
  { img: LAKE_IMG, title: 'Plav Lake' },
  { img: VILLAGE_IMG, title: 'Gusinje' },
  { img: SPRINGS_IMG, title: 'Ali Pasha Springs' },
  { img: FOOD_IMG, title: 'Traditional Balkan Food' },
  { img: HORSE_IMG, title: 'Horse Riding & Rafting' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <img src={HERO_IMG} alt="Montenegro landscape" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Discover the Wild Beauty of Montenegro
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl mx-auto">
            Small-group hosted adventures from London through Montenegro's coast, mountains, lakes and hidden landscapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CTAButton>Reserve Your Spot</CTAButton>
            <CTAButton to="/dates" variant="outline">View 2026 Dates</CTAButton>
          </div>
          <p className="text-white/60 text-sm">
            7-day hosted experiences • 4–8 guests per group • Flights not included
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Escape crowded resorts and discover a different side of Montenegro.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Summer in Montenegro is a hosted small-group travel experience designed for UK travellers who want nature, adventure, authentic food, local hospitality and unforgettable landscapes — without the stress of organising everything themselves.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-secondary/50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12">What's Included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INCLUDED.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-card rounded-2xl p-5 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-8 max-w-lg mx-auto">
            Flights are not included. Guests book their own flight to Podgorica Airport. Recommended London flight options are provided.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12">Experience Highlights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden shadow-sm bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={h.img} alt={h.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold">{h.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-primary text-primary-foreground px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-primary-foreground/50 mb-4">Limited Launch</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-3">Summer 2026 Founder Experience</h2>
          <p className="text-5xl md:text-6xl font-heading font-bold mb-4">From £899</p>
          <p className="text-primary-foreground/70 text-sm mb-2">per person</p>
          <p className="text-primary-foreground/70 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Limited founder launch pricing for Summer 2026. Includes accommodation, airport transfers, breakfast and dinner, guided activities, local transport and hosted support.
          </p>
          <CTAButton>Reserve Your Spot</CTAButton>
        </div>
      </section>

      {/* Group Size */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">Small Groups Only</h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            To keep the experience personal, relaxed and authentic, groups are organised in blocks of 4 guests.
          </p>
          <div className="flex justify-center gap-6 md:gap-10">
            {['4', '8', '12+'].map(n => (
              <div key={n} className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-card shadow-sm border border-border flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-heading font-bold text-primary">{n}</span>
                <span className="text-xs text-muted-foreground mt-1">guests</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">Minimum group: 4 guests</p>
        </div>
      </section>
    </div>
  );
}