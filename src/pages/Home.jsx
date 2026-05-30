import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Play, Check, Plane, Users, MapPin, Coffee, Car } from 'lucide-react';



const HERO_VIDEO = 'https://media.base44.com/videos/public/6a14e6049e3182804fee97ce/50ede03d7_MontenegroDrone4K_BreathtakingLandscapesfromMountainstotheBay_720p.MP4';
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

const QUICK_FACTS = [
  { icon: '£', label: 'From £899 pp', sub: '2026 Founder Price' },
  { icon: '✈️', label: 'Friday departures', sub: 'From London' },
  { icon: '👥', label: '4–8 guests only', sub: 'Intentionally small' },
  { icon: '🏠', label: 'Accommodation + breakfast', sub: 'Included' },
  { icon: '🚐', label: 'Airport transfers', sub: 'Included' },
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            <span className="text-white/90 text-xs font-semibold tracking-wide">Summer 2026 · Friday departures from London</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.02] mb-6 md:mb-8">
            Escape London.<br /><em>Discover Montenegro.</em>
          </h1>
          <p className="text-white/75 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
            A 7-day hosted small-group adventure from London to Montenegro, combining coastline, mountains, lakes and hidden local experiences.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center w-full sm:w-auto px-2 sm:px-0 mb-6">
            <Link
              to="/book"
              className="w-full sm:w-auto px-10 py-5 bg-accent text-accent-foreground font-bold rounded-full text-base hover:brightness-105 transition-all shadow-2xl"
            >
              Reserve Your Spot
            </Link>
            <Link
              to="/dates"
              className="w-full sm:w-auto px-10 py-4 border border-white/40 text-white font-medium rounded-full text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View 2026 Dates
            </Link>
          </div>
          <p className="text-white/50 text-xs tracking-wide">Friday departures &nbsp;·&nbsp; 4–8 guests only &nbsp;·&nbsp; From £899 pp</p>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* QUICK FACTS BAR */}
      <section className="py-8 px-4 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {QUICK_FACTS.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/50 border border-border">
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground leading-tight">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="py-36 md:py-48 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.08] italic">
            The mountains don't care
            <br />
            <span className="text-primary/70 not-italic font-semibold">how busy you are.</span>
          </p>
          <div className="mt-14 w-16 h-px bg-primary/20 mx-auto" />
          <p className="mt-10 text-muted-foreground text-xl max-w-xl mx-auto leading-[1.7]">
            Summer in Montenegro is a week in places your Instagram algorithm will never find. Hosted, unhurried, and completely real.
          </p>
        </div>
      </section>

      {/* CINEMATIC SPLIT */}
      <section className="relative h-[80vh] md:h-[95vh] overflow-hidden">
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
              See the 8-day itinerary <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SCROLLING SCENES */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-muted-foreground/60 text-xs tracking-[0.4em] uppercase mb-14">What Awaits You</p>
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

      {/* PRICING */}
      <section
        className="relative py-40 px-6 text-center overflow-hidden"
        style={{ background: 'hsl(158 45% 12%)' }}
      >
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-white/40 tracking-[0.4em] text-xs uppercase mb-8">Friday Departures · Summer 2026</p>
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
            <span className="text-red-300 text-xs font-semibold tracking-wide">Filling fast — weekly departures from July</span>
          </div>
          <p className="text-white/50 text-sm mb-2 tracking-widest uppercase">2026 Founder Price</p>
          <h2 className="font-heading text-6xl md:text-7xl font-bold text-white mb-4">From £899</h2>
          <p className="text-white/50 text-sm mb-3">per person</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left text-sm space-y-2">
            <p className="text-white/70">Includes: accommodation, daily breakfast, airport pickup &amp; drop-off, local transport and hosted Montenegro experience.</p>
            <p className="text-white/40 text-xs">Not included: flights, lunch, dinner and optional activities.</p>
          </div>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:brightness-105 transition-all shadow-xl"
          >
            Reserve Your Spot <ArrowRight size={16} />
          </Link>
          <p className="mt-6 text-white/30 text-xs">Minimum 4 guests · Maximum 8 guests per departure</p>
        </div>
      </section>

      {/* LAKE FULL BLEED */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
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

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="py-36 md:py-44 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">What Makes It Different</p>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight">Not a tour company.<br /><em>A mindset.</em></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '4–8', label: 'Guests per group', sub: 'Never a crowd' },
              { value: '100%', label: 'Airport pickup', sub: 'Both ways, included' },
              { value: '7', label: 'Days, fully hosted', sub: 'Accommodation included' },
              { value: '1', label: 'Dedicated host', sub: 'With you throughout' },
            ].map((s, i) => (
              <div key={i} className="text-center py-8 px-4 rounded-2xl bg-card border border-border shadow-sm">
                <p className="font-heading text-4xl md:text-5xl font-bold text-primary mb-1">{s.value}</p>
                <p className="font-semibold text-foreground text-sm mb-1">{s.label}</p>
                <p className="text-muted-foreground text-xs">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🏔', title: 'Places people don\'t go', desc: 'No tour buses. No Tripadvisor badges. Just the real Montenegro.' },
              { icon: '👥', title: 'A group you\'ll actually like', desc: 'Max 8 people. Intentionally small so it feels like you chose each other.' },
              { icon: '🏠', title: 'Accommodation sorted', desc: 'Every night is arranged. You show up — we handle the logistics.' },
              { icon: '🚐', title: 'Zero logistics stress', desc: 'We pick you up. We drop you off. Local transport throughout.' },
              { icon: '🥾', title: 'Optional adventures', desc: 'Rafting, hiking, horse riding, kayaking — your choice, your pace.' },
              { icon: '⚡', title: 'Something changes', desc: 'People come back different. Lighter. "I didn\'t know I needed this."' },
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

          <div className="mt-16 p-8 rounded-3xl bg-primary/5 border border-primary/10 text-center">
            <p className="font-heading text-2xl italic text-primary/80 mb-2">&ldquo;I didn&apos;t book a holiday. I joined a summer.&rdquo;</p>
            <p className="text-muted-foreground text-sm">First reviews publishing after July 2026</p>
          </div>
        </div>
      </section>

      {/* SOCIAL FEED */}
      <section className="py-32 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">Follow the Journey</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Find us on social media</h2>
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

      {/* WHO THIS IS FOR */}
      <section className="py-28 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary/60 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Is This For You?</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Who This Is For</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Summer in Montenegro is designed for people who want something real — not a resort, not a package tour.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { icon: '🧍', label: 'Solo travellers', desc: 'Come alone, leave with friends' },
              { icon: '💑', label: 'Couples', desc: 'An adventure to share together' },
              { icon: '👫', label: 'Friends groups', desc: 'The trip you keep saying you\'ll take' },
              { icon: '🌿', label: 'Nature lovers', desc: 'Mountains, lakes and wild landscapes' },
              { icon: '🧗', label: 'Adventure seekers', desc: 'Optional activities for every level' },
              { icon: '🌍', label: 'Curious travellers', desc: 'Somewhere beyond Spain and Portugal' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="font-heading text-2xl md:text-3xl text-foreground mb-6">This is your sign to discover Montenegro.</p>
            <Link to="/book" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-lg">
              Reserve Your Spot <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* MEET YOUR HOST */}
      <section className="py-28 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary/60 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Behind the Experience</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">Meet Your Host</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Summer in Montenegro was created to help UK travellers discover the real Montenegro — beyond crowded resorts and typical tourist routes.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                As your local host, we help coordinate your stay, airport transfers, accommodation, route, local guidance and optional experiences so you can enjoy Montenegro with confidence and comfort.
              </p>
              <a
                href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-105 transition-all shadow-md text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
                Chat With Us on WhatsApp
              </a>
            </div>
            <div className="relative rounded-3xl overflow-hidden bg-muted flex items-center justify-center" style={{ aspectRatio: '4/5' }}>
              <img src={MOUNTAIN_IMG} alt="Your host in Montenegro" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs tracking-widest uppercase text-white/60 mb-1">Your Host</p>
                <p className="font-heading text-xl font-semibold">Summer in Montenegro</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMALL GROUP ETHOS */}
      <section className="py-36 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary/70 text-xs tracking-[0.3em] uppercase font-semibold mb-4">The Philosophy</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Small enough<br />to be real.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Eight people is a dinner party. It's a group that moves together, gets lost together. It's the reason people come home and say: "that changed me."
              </p>
              <Link to="/experience" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm">
                See the 8-day journey <ArrowRight size={16} />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { number: '4', label: 'Minimum guests', sub: 'Every departure is guaranteed' },
                { number: '8', label: 'Maximum guests', sub: 'Never more than 8 per week' },
                { number: '1', label: 'Dedicated host', sub: 'With you from arrival to departure' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-5 rounded-2xl bg-card border border-border shadow-sm">
                  <span className="font-heading text-4xl font-bold text-primary flex-shrink-0 w-12 text-center">{item.number}</span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS ABOVE FOOTER */}
      <section className="py-16 px-6 bg-secondary/20 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Follow the Journey</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.instagram.com/summerinmontenegro_com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-border bg-card hover:border-primary hover:bg-secondary transition-all font-semibold text-sm">
              <span className="text-2xl">📸</span> Instagram &mdash; @summerinmontenegro_com
            </a>
            <a href="https://www.tiktok.com/@summerinmontenegro.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-border bg-card hover:border-primary hover:bg-secondary transition-all font-semibold text-sm">
              <span className="text-2xl">🎵</span> TikTok &mdash; @summerinmontenegro.com
            </a>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-28 px-6" style={{ background: 'hsl(158 45% 12%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to escape London and discover Montenegro?
          </h2>
          <p className="text-white/50 mb-10 text-lg">
            Small-group Friday departures available throughout Summer 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book"
              className="px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl text-base">
              Reserve Your Spot
            </Link>
            <a
              href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:brightness-105 transition-all text-base flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-8 text-white/25 text-xs">Friday departures · 4–8 guests only · From £899 pp · Accommodation included</p>
        </div>
      </section>

    </div>
  );
}