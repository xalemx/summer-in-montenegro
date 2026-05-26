import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';

const HERO_VIDEO = 'https://media.base44.com/videos/public/6a14e6049e3182804fee97ce/046226db5_generated_video.mp4';
const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c57a4140f_generated_image.png';
const SILHOUETTE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/404e10428_generated_image.png';
const LAKE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/d2e76465c_generated_image.png';
const MOUNTAIN_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1b071a013_generated_06324ee4.png';
const COAST_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c477aa20c_generated_5ab95a92.png';
const FOOD_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/f1c34b4b6_generated_0a69661e.png';
const HORSE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/8d8db3a11_generated_948706a3.png';

const SCENES = [
  { img: MOUNTAIN_IMG, label: 'Prokletije' },
  { img: LAKE_IMG, label: 'Plav Lake' },
  { img: COAST_IMG, label: 'The Coast' },
  { img: FOOD_IMG, label: 'Local Food' },
  { img: HORSE_IMG, label: 'Adventures' },
];

export default function Home() {
  return (
    <div className="bg-background">

      {/* HERO — fullscreen video */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster={HERO_IMG}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-white/60 tracking-[0.3em] text-xs uppercase mb-6 font-medium">Montenegro · Small-Group Adventures</p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
            Discover the<br />Wild Beauty of<br />Montenegro
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Small-group hosted journeys through coast, mountains and hidden landscapes. From London.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-full text-sm hover:brightness-105 transition-all shadow-lg"
            >
              Reserve Your Spot
            </Link>
            <Link
              to="/dates"
              className="px-10 py-4 border border-white/40 text-white font-medium rounded-full text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View 2026 Dates
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/10 py-3 px-6">
          <p className="text-center text-white/50 text-xs tracking-wider">
            7-day hosted experiences &nbsp;·&nbsp; 4–8 guests per group &nbsp;·&nbsp; Flights not included
          </p>
        </div>
      </section>

      {/* STATEMENT — cinematic pull quote */}
      <section className="py-28 md:py-36 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
            "This isn't a package holiday.
            <br />
            <span className="text-primary/70 italic">It's the trip you'll talk about forever."</span>
          </p>
          <div className="mt-10 w-12 h-px bg-primary/30 mx-auto" />
          <p className="mt-8 text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            We take small groups of 4–8 people from the UK through Montenegro's most extraordinary landscapes — with a local host, authentic food, real adventure and zero stress.
          </p>
        </div>
      </section>

      {/* CINEMATIC SPLIT — silhouette landscape */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <img
          src={SILHOUETTE_IMG}
          alt="Montenegro adventure"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.75)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end p-10 md:p-16 max-w-2xl">
          <div>
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">The North</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Prokletije.<br />Where the world ends.
            </h2>
            <Link to="/experience" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
              See the full itinerary <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SCROLLING SCENES */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-muted-foreground text-xs tracking-[0.3em] uppercase mb-10">What Awaits You</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {SCENES.map((s, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 md:col-span-2 row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? '1/1.2' : '3/4' }}
              >
                <img src={s.img} alt={s.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 text-white font-heading font-semibold text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING — dark cinematic */}
      <section
        className="relative py-28 px-6 text-center overflow-hidden"
        style={{ background: 'hsl(158 45% 12%)' }}
      >
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-white/40 tracking-[0.3em] text-xs uppercase mb-6">Summer 2026 · Founder Launch</p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-3">From £899</h2>
          <p className="text-white/50 text-sm mb-6">per person · 7 days · all-inclusive except flights</p>
          <p className="text-white/65 mb-10 leading-relaxed max-w-sm mx-auto">
            Accommodation, transfers, breakfast and dinner, guided activities, local transport and your host — included.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:brightness-105 transition-all shadow-xl"
          >
            Reserve Your Spot <ArrowRight size={16} />
          </Link>
          <p className="mt-6 text-white/30 text-xs">Limited spots per departure · Minimum 4 guests</p>
        </div>
      </section>

      {/* LAKE FULL BLEED */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={LAKE_IMG}
          alt="Plav Lake"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.8)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 right-0 text-center pb-12 px-6">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-2">Day 4</p>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-white">Plav Lake, 900m above sea level</h3>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">Why Travellers Choose This</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Built differently.<br />By design.</h2>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '4–8', label: 'Guests per group', sub: 'Never a crowd' },
              { value: '100%', label: 'Local partners', sub: 'Authentic experiences' },
              { value: '7', label: 'Days, all-inclusive', sub: 'Except flights' },
              { value: '1', label: 'Dedicated host', sub: 'With you throughout' },
            ].map((s, i) => (
              <div key={i} className="text-center py-8 px-4 rounded-2xl bg-card border border-border shadow-sm">
                <p className="font-heading text-4xl md:text-5xl font-bold text-primary mb-1">{s.value}</p>
                <p className="font-semibold text-foreground text-sm mb-1">{s.label}</p>
                <p className="text-muted-foreground text-xs">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Trust checklist */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Hidden locations only', desc: 'Places most tourists never find — shared by people who live there.' },
              { icon: '🚐', title: 'Airport pickup included', desc: 'We meet you at Tivat or Podgorica. You relax from minute one.' },
              { icon: '🏡', title: 'Boutique accommodation', desc: 'Small guesthouses and eco-lodges. Never a chain hotel.' },
              { icon: '🍽️', title: 'Breakfast & dinner every day', desc: 'Home-cooked local food, family tables. No tourist menus.' },
              { icon: '🥾', title: 'Flexible activity levels', desc: 'Easy strolls or serious hikes — the choice is always yours.' },
              { icon: '📵', title: 'Genuinely off-grid', desc: 'No social media noise. Just mountains, silence and good people.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-secondary/40 border border-border">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Future testimonials placeholder */}
          <div className="mt-16 p-8 rounded-3xl border-2 border-dashed border-border text-center">
            <p className="text-muted-foreground/50 text-sm italic">⭐⭐⭐⭐⭐ · Real guest reviews coming Summer 2026</p>
          </div>
        </div>
      </section>

      {/* SMALL GROUP ETHOS */}
      <section className="py-24 px-6 bg-secondary/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-4">The Experience</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                4 to 8 people.<br />That's it.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                No coach tours. No crowds. A local host who knows every hidden road, every honest restaurant and every view that doesn't appear on Google.
              </p>
              <Link to="/experience" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm">
                See the 7-day journey <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['4', '8', '12+'].map(n => (
                <div key={n} className="aspect-square rounded-2xl bg-card shadow-sm border border-border flex flex-col items-center justify-center">
                  <span className="text-4xl font-heading font-bold text-primary">{n}</span>
                  <span className="text-xs text-muted-foreground mt-1">guests</span>
                </div>
              ))}
              <div className="col-span-3 bg-primary/5 border border-primary/10 rounded-2xl p-4 text-center">
                <p className="text-sm text-muted-foreground">Every experience includes a <strong className="text-foreground">dedicated local host</strong> for the full 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}