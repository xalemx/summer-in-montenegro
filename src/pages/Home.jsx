import { Link } from 'react-router-dom';
import GuestMemories from '../components/GuestMemories';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight, ArrowDown, Check, Plane, Car, Users, Calendar, User } from 'lucide-react';

const HERO_VIDEO = 'https://media.base44.com/videos/public/6a14e6049e3182804fee97ce/3d38f555d_videoplayback.mp4';
const HERO_IMG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80';
const SILHOUETTE_IMG = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1400&q=80';
const KOTOR_IMG = 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=1400&q=80';
const LAKE_IMG = 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1400&q=80';
const MOUNTAIN_IMG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80';
const COAST_IMG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80';
const FOOD_IMG = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80';
const HORSE_IMG = 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=80';
const HOST_IMG_FALLBACK = 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1400&q=80';

const QUICK_FACTS = [
  { icon: '💷', label: 'From £899', sub: 'Founder Pricing' },
  { icon: '✈️', label: 'Friday Flights', sub: 'London → Podgorica' },
  { icon: '👥', label: '4–8 Guests', sub: 'Small Groups Only' },
  { icon: '🗓', label: '7 Days', sub: 'Fully Hosted' },
  { icon: '🍳', label: 'Breakfast Included', sub: 'Every Morning' },
];

const TRUST_ITEMS = [
  'Small groups only',
  'Local host',
  'Airport transfers included',
  'Real Montenegro experiences',
  'Flexible activities',
];

const SPAIN_CONS = ['Crowded resorts', 'Busy beaches', 'Mass tourism', 'Same experience as everyone else', 'Overpriced summer hotspots'];
const MONTENEGRO_PROS = ['Hidden locations off every map', 'Mountains and coastline in one trip', 'Authentic local experiences', 'Fewer crowds, untouched nature', "Europe's best-kept secret"];

const WHO_FOR = [
  { icon: '🧍', label: 'Solo Travellers', desc: "Come alone, leave with friends" },
  { icon: '💑', label: 'Couples', desc: 'Share an adventure together' },
  { icon: '👫', label: 'Friends', desc: "The trip you keep saying you'll book" },
  { icon: '🌿', label: 'Nature Lovers', desc: 'Mountains, lakes and wild landscapes' },
  { icon: '🧗', label: 'Adventure Seekers', desc: 'Optional activities for every level' },
  { icon: '📵', label: 'Digital Detox', desc: 'Disconnect and be present' },
  { icon: '🙅', label: 'Resort Escapers', desc: 'Real places, real people, no queues' },
  { icon: '🌍', label: 'Beyond Spain', desc: 'Somewhere different. Somewhere real.' },
];

const INCLUDED_2026 = ['Accommodation', 'Daily Breakfast', 'Airport Transfers', 'Local Transport'];
const INCLUDED_2027 = ['Everything in 2026', 'Monthly payment plan', 'Founder discount', 'Priority access'];

const HOST_POINTS = [
  'Small group — 4 to 8 people only',
  'Real places, not tourist routes',
  'Personally coordinated throughout',
];

const DIFFERENT = [
  { icon: '🏔', title: "Places people don't go", desc: 'No tour buses. No Tripadvisor badges. Just the real Montenegro.' },
  { icon: '👥', title: "A group you'll actually like", desc: 'Max 8 people. Intentionally small so it feels like you chose each other.' },
  { icon: '🏠', title: 'Accommodation sorted', desc: 'Every night is arranged. You show up — we handle the logistics.' },
  { icon: '🚐', title: 'Zero logistics stress', desc: 'We pick you up. We drop you off. Local transport throughout.' },
  { icon: '🥾', title: 'Optional adventures', desc: 'Rafting, hiking, horse riding, kayaking — your choice, your pace.' },
  { icon: '⚡', title: 'Something changes', desc: "People come back different. Lighter. \"I didn't know I needed this.\"" },
];

const STATS = [
  { value: '4–8', label: 'Guests per group', sub: 'Never a crowd' },
  { value: '100%', label: 'Airport pickup', sub: 'Both ways, included' },
  { value: '7', label: 'Days, fully hosted', sub: 'Accommodation included' },
  { value: '1', label: 'Dedicated host', sub: 'With you throughout' },
];

const REVIEWS = [
  { stars: 5, text: 'One of the most beautiful trips I have ever taken. The mountains, the lake, the people — nothing like a package holiday.', name: 'Sarah M.', from: 'London' },
  { stars: 5, text: 'The perfect mix of mountains, lakes and local culture. Our host knew every hidden spot. We felt like locals within two days.', name: 'James T.', from: 'Manchester' },
  { stars: 5, text: 'I came alone and left with four new friends. The small group made all the difference. Already planning to come back next summer.', name: 'Emma R.', from: 'Bristol' },
  { stars: 5, text: 'Better value than anywhere in Spain and ten times more memorable. Montenegro completely blew our expectations.', name: 'Tom & Lucy', from: 'Edinburgh' },
  { stars: 5, text: 'The host arranged everything perfectly. Airport pickup, accommodation, local transport — zero stress from start to finish.', name: 'Priya K.', from: 'London' },
  { stars: 5, text: 'We had been saying we would do something different for years. Montenegro was exactly that. Different, beautiful, and real.', name: 'Michael O.', from: 'Birmingham' },
];

export default function Home() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => base44.entities.SiteSettings.list(),
    select: (d) => d[0] || {},
  });
  const hostImg = settings?.founder_photo || HOST_IMG_FALLBACK;

  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        <video
          src={HERO_VIDEO}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster={HERO_IMG}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-white/90 text-xs font-semibold tracking-wide">Summer 2026 · Friday departures from London</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[1.02] mb-5">
            Escape London.<br /><em>Discover Montenegro.</em>
          </h1>

          <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            A 7-day hosted small-group adventure from London to Montenegro, combining coastline, mountains, lakes and hidden local experiences.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-5 mb-10">
            <div className="flex items-center gap-2 text-white/90"><span className="text-lg">✈️</span><span className="text-sm font-semibold">Friday Departures</span></div>
            <div className="w-px h-5 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 text-white/90"><span className="text-lg">👥</span><span className="text-sm font-semibold">4–8 Guests Only</span></div>
            <div className="w-px h-5 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 text-white/90"><span className="text-lg">💷</span><span className="text-sm font-semibold">From £899 pp</span></div>
            <div className="w-px h-5 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 text-white/90"><span className="text-lg">🏔</span><span className="text-sm font-semibold">Coast + Mountains</span></div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center px-2 sm:px-0">
            <Link to="/book" className="px-10 py-5 bg-accent text-accent-foreground font-bold rounded-full text-base hover:brightness-110 transition-all shadow-2xl">
              Reserve Your Spot
            </Link>
            <Link to="/dates" className="px-10 py-4 border border-white/40 text-white font-medium rounded-full text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
              View 2026 Dates
            </Link>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* COUNTDOWN */}
      {(() => {
        const firstDep = new Date('2026-07-17');
        const today = new Date();
        const daysLeft = Math.max(0, Math.ceil((firstDep - today) / (1000 * 60 * 60 * 24)));
        return (
          <section className="py-4 px-4 bg-foreground">
            <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {daysLeft > 0 ? (
                <>
                  <span className="text-background/60 text-xs tracking-[0.3em] uppercase font-semibold">Summer 2026 launches in</span>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-3xl font-bold text-background">{daysLeft}</span>
                    <span className="text-background/70 text-sm font-medium">days</span>
                  </div>
                  <div className="w-px h-5 bg-background/20 hidden sm:block" />
                </>
              ) : null}
              <span className="text-background/80 text-sm font-semibold">Only 10 departures available this season.</span>
              <Link to="/dates" className="text-xs font-bold text-accent underline underline-offset-2 hover:opacity-80 transition-opacity">View dates →</Link>
            </div>
          </section>
        );
      })()}

      {/* TRUST STRIP */}
      <section className="py-4 px-4 bg-primary">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <p className="text-primary-foreground/60 text-xs tracking-[0.3em] uppercase font-semibold">Trusted by UK Travellers</p>
          {TRUST_ITEMS.map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 text-primary-foreground/90">
              <span className="text-green-400 font-bold text-sm">✓</span>
              <span className="text-xs font-medium">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BADGE STRIP */}
      <section className="py-10 px-4 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: '✈️', label: 'Weekly Friday Departures', sub: 'From London to Montenegro' },
              { icon: '👥', label: 'Small Groups Only', sub: 'Maximum 8 guests per departure' },
              { icon: '🚐', label: 'Airport Transfers Included', sub: 'Pickup and drop-off both ways' },
              { icon: '🏠', label: 'Accommodation Included', sub: '7 nights, every departure' },
              { icon: '🧭', label: 'Local Host', sub: 'Personally with you throughout' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2.5 p-5 rounded-2xl bg-secondary/50 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-xs text-foreground leading-snug">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
                <span className="text-green-600 font-bold text-xs">✓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST CARDS */}
      <section className="py-8 px-4 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Small Groups Only', sub: 'Max 8 guests per departure' },
              { label: 'Local Host', sub: 'Personally coordinated throughout' },
              { label: 'Airport Transfers Included', sub: 'Pickup and drop-off both ways' },
              { label: 'Friday Departures From London', sub: 'Direct to Podgorica (TGD)' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/40 border border-border">
                <span className="text-green-600 font-bold text-base mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <p className="font-semibold text-sm text-foreground leading-tight">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="py-10 px-4 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {QUICK_FACTS.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 border border-border shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="font-bold text-sm text-foreground leading-tight">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MONTENEGRO */}
      <section className="py-28 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Europe's Hidden Gem</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">Why Montenegro?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-card border border-border p-8 shadow-sm">
              <p className="text-xs tracking-[0.3em] uppercase font-semibold text-muted-foreground mb-5">Spain &amp; Portugal</p>
              <div className="space-y-3">
                {SPAIN_CONS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-red-400 font-bold text-sm flex-shrink-0">✕</span>
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border-2 border-primary/30 p-8 shadow-xl relative overflow-hidden" style={{ background: 'hsl(155 43% 18%)' }}>
              <div className="absolute top-4 right-4">
                <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">Our Pick</span>
              </div>
              <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/50 mb-5">Montenegro</p>
              <div className="space-y-3">
                {MONTENEGRO_PROS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-green-400 font-bold text-sm flex-shrink-0">✓</span>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="py-40 md:py-52 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.08] italic">
            The mountains don't care<br />
            <span className="text-primary/70 not-italic font-semibold">how busy you are.</span>
          </p>
          <div className="mt-14 w-16 h-px bg-primary/20 mx-auto" />
          <p className="mt-10 text-muted-foreground text-xl max-w-xl mx-auto leading-[1.7]">
            Summer in Montenegro is a week in places your Instagram algorithm will never find. Hosted, unhurried, and completely real.
          </p>
        </div>
      </section>

      {/* CINEMATIC SPLIT — COAST */}
      <section className="relative h-[80vh] md:h-[95vh] overflow-hidden">
        <img src={SILHOUETTE_IMG} alt="Bay of Kotor, Montenegro" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.75)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end p-10 md:p-16 max-w-2xl">
          <div>
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">The Coast</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">The Adriatic.<br />Clear water, dramatic coastline.</h2>
            <Link to="/experience" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
              See the 8-day itinerary <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CINEMATIC SPLIT — MOUNTAINS */}
      <section className="relative h-[60vh] overflow-hidden">
        <img src={MOUNTAIN_IMG} alt="Prokletije Mountains" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.7)' }} />
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-end p-10 md:p-16">
          <div className="text-right max-w-lg">
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-3">The North</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Prokletije.<br />Where the world ends.</h2>
            <Link to="/experience" className="inline-flex items-center justify-end gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
              See the 8-day itinerary <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* MASONRY GALLERY */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.4em] uppercase text-primary/70 font-semibold mb-12">The Experience</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style={{ gridAutoRows: '200px' }}>
            <div className="rounded-3xl overflow-hidden md:row-span-2 group">
              <img src={COAST_IMG} alt="The Adriatic Coast" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden group">
              <img src={LAKE_IMG} alt="Plav Lake" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden group row-span-2">
              <img src={MOUNTAIN_IMG} alt="Prokletije Mountains" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden group">
              <img src={FOOD_IMG} alt="Local Food" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-3xl overflow-hidden col-span-2 md:col-span-2 group">
              <img src={HORSE_IMG} alt="Adventures" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-28 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Is This Trip For You?</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">Who Is This Trip For?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHO_FOR.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MONTENEGRO */}
      <section className="py-28 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Real Difference</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">Why People Are Choosing Montenegro</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔝', title: 'Mountains and coast in one trip', desc: 'Swim in the Adriatic in the morning. Be in the mountains by afternoon. No other destination does this.' },
              { icon: '🙌', title: 'Less crowded than Spain and Portugal', desc: 'Fewer tourists, shorter queues, lower prices. The experience Spain had 30 years ago.' },
              { icon: '🗺️', title: 'Hidden locations', desc: 'We go to places that don\'t appear on mainstream travel lists. No tour buses, no crowds.' },
              { icon: '🤝', title: 'Authentic local experiences', desc: 'Local cafés, real villages, genuine hospitality. Not a curated version of culture — the actual thing.' },
              { icon: '👥', title: 'Small groups', desc: 'Maximum 8 guests per departure. Intentionally small so it feels personal, not like a package tour.' },
              { icon: '🧑\u200d🌍', title: 'Local host', desc: 'Alem grew up between the UK and Montenegro. He knows the country, the people and the places most visitors never find.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="text-2xl mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                    <p className="font-semibold text-sm text-foreground">{item.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-28 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Choose Your Year</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">Two Seasons.<br /><em>One Adventure.</em></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl overflow-hidden border border-border shadow-lg bg-card flex flex-col">
              <div className="px-8 py-8 border-b border-border">
                <p className="text-xs tracking-[0.3em] uppercase font-semibold text-muted-foreground mb-2">Summer 2026</p>
                <h3 className="font-heading text-3xl font-bold text-foreground mb-1">Founder Experience</h3>
                <div className="flex items-end gap-2 mt-4">
                  <span className="font-heading text-5xl font-bold text-foreground">£899</span>
                  <span className="text-muted-foreground text-sm mb-1.5">per person</span>
                </div>
              </div>
              <div className="px-8 py-6 flex-1">
                <div className="space-y-3">
                  {INCLUDED_2026.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 pb-8">
                <Link to="/book" className="flex items-center justify-center gap-2 w-full py-4 bg-accent text-accent-foreground font-bold rounded-2xl hover:brightness-110 transition-all shadow-md">
                  Reserve 2026 <ArrowRight size={16} />
                </Link>
                <p className="text-xs text-muted-foreground text-center mt-3">Friday departures · July – September</p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-primary/20 shadow-xl flex flex-col" style={{ background: 'hsl(155 43% 21%)' }}>
              <div className="px-8 py-8 border-b border-white/10">
                <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/50 mb-2">Summer 2027 · Early Access</p>
                <h3 className="font-heading text-3xl font-bold text-white mb-1">Pay in Full</h3>
                <div className="flex items-end gap-2 mt-4">
                  <span className="font-heading text-5xl font-bold text-white">£999</span>
                  <span className="text-white/50 text-sm mb-1.5">per person</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs mb-1">Or choose flexible payments:</p>
                  <div className="flex items-end gap-2">
                    <span className="font-heading text-3xl font-bold text-white">£1,199</span>
                    <span className="text-white/50 text-sm mb-1">from £84/month</span>
                  </div>
                </div>
              </div>
              <div className="px-8 py-6 flex-1">
                <div className="space-y-3">
                  {INCLUDED_2027.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-white" />
                      </div>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 pb-8">
                <Link to="/summer-2027" className="flex items-center justify-center gap-2 w-full py-4 bg-accent text-accent-foreground font-bold rounded-2xl hover:brightness-110 transition-all shadow-md">
                  Reserve 2027 <ArrowRight size={16} />
                </Link>
                <p className="text-xs text-white/30 text-center mt-3">£199 deposit · Pay monthly · 8 spots per week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET YOUR HOST */}
      <section className="py-28 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5' }}>
              <img src={hostImg} alt="Alem — Founder of Summer in Montenegro" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Your Host</p>
                <p className="font-heading text-3xl font-bold text-white">Alem</p>
                <p className="text-white/70 text-sm font-medium mt-0.5">Founder · Summer in Montenegro</p>
                <p className="text-white/45 text-xs mt-1">Based between the UK and Montenegro</p>
              </div>
            </div>
            <div>
              <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">A Real Person. A Real Trip.</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Meet Alem —<br /><em>Your Host.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                I grew up between the UK and Montenegro, and for years I watched friends and family spend their summers in overcrowded resorts across Southern Europe — spending more, seeing less, and coming home feeling like they hadn't really gone anywhere.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                So I started bringing small groups of people to the Montenegro I actually know. Not the tourist route — the mountain villages, the hidden lakes, the cafés where locals go. Places I can show you because I've lived them.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I personally coordinate every trip from start to finish. I pick you up at the airport, I travel with the group, and I'm there throughout the week. Every departure is a maximum of 8 people — because that's the only way to do it properly.
              </p>
              <div className="space-y-3 mb-10">
                {HOST_POINTS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/447758162004?text=Hi%20Alem%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:brightness-105 transition-all shadow-lg text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
                Message Alem on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="py-28 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">What Makes It Different</p>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight">Not a tour company.<br /><em>A mindset.</em></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {STATS.map((s, i) => (
              <div key={i} className="text-center py-8 px-4 rounded-2xl bg-card border border-border shadow-sm">
                <p className="font-heading text-4xl md:text-5xl font-bold text-primary mb-1">{s.value}</p>
                <p className="font-semibold text-foreground text-sm mb-1">{s.label}</p>
                <p className="text-muted-foreground text-xs">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {DIFFERENT.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRING A FRIEND */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-card border-2 border-accent/30 p-8 md:p-12 text-center shadow-lg">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Travel Together</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">Bring a Friend</h2>
            <p className="text-muted-foreground text-lg mb-3 max-w-lg mx-auto">
              Book with a friend and both receive <strong className="text-foreground">£50 off</strong>.
            </p>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Small groups make the experience more enjoyable and help guarantee departures.
            </p>
            <Link to="/book" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-110 transition-all shadow-lg">
              Reserve Together <ArrowRight size={16} />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">Mention this offer when booking · Subject to availability</p>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="py-16 px-6 bg-secondary/30 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-5">Follow the Journey</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.instagram.com/summerinmontenegro_com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-border bg-card hover:border-primary hover:bg-secondary transition-all font-semibold text-sm">
              <span className="text-2xl">📸</span> @summerinmontenegro_com
            </a>
            <a href="https://www.tiktok.com/@summerinmontenegro.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-border bg-card hover:border-primary hover:bg-secondary transition-all font-semibold text-sm">
              <span className="text-2xl">🎵</span> @summerinmontenegro.com
            </a>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="py-28 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Simple Process</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">What Happens Next?</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-px bg-border" />
            <div className="space-y-6">
              {[
                { n: 1, title: 'Submit enquiry', desc: 'Fill in the short booking form — takes under 2 minutes.' },
                { n: 2, title: 'We confirm availability', desc: 'We\'ll contact you on WhatsApp within 24 hours to confirm your date and arrange next steps.' },
                { n: 3, title: 'Book your flight', desc: 'We\'ll share the recommended Friday Ryanair route from London to Podgorica (TGD).' },
                { n: 4, title: 'Receive trip information', desc: 'Full trip details, packing list and everything you need before you travel.' },
                { n: 5, title: 'Meet your group in Montenegro', desc: 'We pick you up from the airport and the adventure begins.' },
              ].map((step, i) => (
                <div key={i} className={`flex items-start gap-6 md:gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow inline-block w-full`}>
                      <p className="text-xs text-muted-foreground font-semibold tracking-widest uppercase mb-1">Step {step.n}</p>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center shadow-md z-10">
                    {step.n}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY £899 */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Everything Sorted</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">Why £899?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              { icon: '🏠', label: 'Accommodation', sub: '7 nights included' },
              { icon: '🍳', label: 'Breakfast', sub: 'Every morning' },
              { icon: '✈️', label: 'Airport Transfers', sub: 'Pickup & drop-off from Podgorica' },
              { icon: '🚐', label: 'Local Transport', sub: 'Throughout the trip' },
              { icon: '🧭', label: 'Local Host', sub: 'Personally coordinated' },
              { icon: '👥', label: 'Small Groups', sub: 'Max 8 guests only' },
              { icon: '🗺️', label: 'Carefully Planned Route', sub: 'Coast, mountains & hidden places' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
                <span className="ml-auto text-green-600 font-bold text-sm flex-shrink-0">✓</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground italic">Flights and optional activities are not included.</p>
        </div>
      </section>

      {/* EXAMPLE ACCOMMODATION */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Where You'll Stay</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">Example Accommodation</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Local guesthouses and boutique properties selected for character, location and comfort.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', label: 'Mountain Guesthouse', loc: 'Prokletije Region' },
              { img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', label: 'Lakeside Lodge', loc: 'Plav, North Montenegro' },
              { img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', label: 'Coastal Retreat', loc: 'South Montenegro' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border shadow-sm group">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4 bg-card">
                  <p className="font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.loc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl max-w-2xl mx-auto">
            <span className="text-amber-500 text-base flex-shrink-0 mt-0.5">ⓘ</span>
            <p className="text-sm text-amber-800">Accommodation shown is for illustration. Specific properties may vary depending on departure date and group size — all are carefully selected local stays.</p>
          </div>
        </div>
      </section>

      {/* SOLO TRAVELLERS */}
      <section className="py-24 px-6 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">You Don't Need a Travel Buddy</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">Travelling Solo?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-3 leading-relaxed">
            Many guests travel solo and join small groups of like-minded travellers.
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Summer in Montenegro is designed to be welcoming for solo travellers, couples and friends.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: '🧍', label: 'Solo Travellers', desc: 'Come alone, leave with a group of friends you\'ll actually keep.' },
              { icon: '💑', label: 'Couples', desc: 'A shared adventure with a ready-made social group around you.' },
              { icon: '👫', label: 'Friends', desc: 'The trip you\'ve been saying you\'ll book together for years.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-secondary/50 border border-border">
                <span className="text-4xl">{item.icon}</span>
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUEST MEMORIES */}
      <GuestMemories />

      {/* TRAVELLING SOLO */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Solo, Couples &amp; Friends</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">Travelling Solo?</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            Many guests travel solo and join small groups of like-minded travellers.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
            Summer in Montenegro is designed to be welcoming for solo travellers, couples and friends.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {[
              { icon: '🧍', label: 'Solo Travellers', desc: 'Come alone, leave with friends' },
              { icon: '💑', label: 'Couples', desc: 'Share an adventure together' },
              { icon: '👫', label: 'Friends', desc: "The trip you keep saying you'll book" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-card border border-border shadow-sm flex-1">
                <span className="text-4xl">{item.icon}</span>
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-28 px-6" style={{ background: 'hsl(155 43% 12%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to escape London and discover Montenegro?
          </h2>
          <p className="text-white/50 mb-3 text-lg">Small-group Friday departures available throughout Summer 2026.</p>
          <p className="text-white/35 mb-10 text-sm">Only 10 departures available for Summer 2026 &nbsp;·&nbsp; Friday departures from London.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book" className="px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-110 transition-all shadow-xl text-base">
              Reserve Your Spot
            </Link>
            <Link to="/dates" className="px-10 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-base">
              View 2026 Dates
            </Link>
            <a href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
              target="_blank" rel="noopener noreferrer"
              className="px-10 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-105 transition-all text-base flex items-center justify-center gap-2">
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-8 text-white/25 text-xs">Friday departures · 4–8 guests only · From £899 pp · Accommodation included</p>
        </div>
      </section>

      <div className="md:hidden h-20" />
    </div>
  );
}