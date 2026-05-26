import { Link } from 'react-router-dom';
import TestimonialsSection from '../components/TestimonialsSection';
import { ArrowDown, ArrowRight, Play } from 'lucide-react';

const SOCIAL_POSTS = [
  { img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/ddc6cbee6_generated_image.png', caption: 'Top of the world 🏔️ #Montenegro #hiking', likes: '2.4k', type: 'reel' },
  { img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/69e8ce240_generated_image.png', caption: 'Day 3 in the mountains ✨ #travel #adventure', likes: '1.8k', type: 'reel' },
  { img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/e5d7ebd76_generated_image.png', caption: 'Dinner with the group 🍽️ pure magic #foodie', likes: '3.1k', type: 'photo' },
  { img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a7e672def_generated_image.png', caption: 'Plav Lake 💙 words cannot describe it', likes: '5.2k', type: 'reel' },
  { img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/4fefc5042_generated_image.png', caption: 'This road 😭 #coast #roadtrip #Montenegro', likes: '4.7k', type: 'reel' },
  { img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/6ec2ad059_generated_image.png', caption: 'Local breakfast 🧀 never eating at a hotel again', likes: '2.9k', type: 'photo' },
];

const TRUST_STATS = [
  { value: '4–8', label: 'Guests per group', sub: 'Intentionally small' },
  { value: '7', label: 'Days fully hosted', sub: 'From landing to farewell' },
  { value: '100%', label: 'Airport pickup included', sub: 'No logistics stress' },
  { value: '0', label: 'Tourist traps', sub: 'Hidden locations only' },
];

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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            <span className="text-white/90 text-xs font-semibold tracking-wide">Summer 2026 · Only 8 spots per departure</span>
          </div>
          <p className="text-white/55 tracking-[0.4em] text-xs uppercase mb-6 font-light">A Summer You Won’t Forget · From London</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white leading-[1.02] mb-6 md:mb-8">
            Escape London<br />this<br /><em>summer.</em>
          </h1>
          <p className="text-white/75 text-base md:text-xl max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
            Trade London stress for mountain air. 8 people. 7 days. One local host. Europe beyond the crowds.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center w-full sm:w-auto px-2 sm:px-0">
            <Link
              to="/book"
              className="w-full sm:w-auto px-10 py-5 bg-accent text-accent-foreground font-bold rounded-full text-base hover:brightness-105 transition-all shadow-2xl"
            >
              I’m In
            </Link>
            <Link
              to="/experience"
              className="w-full sm:w-auto px-10 py-4 border border-white/40 text-white font-medium rounded-full text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              See the Experience
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10 py-3 px-4 hidden sm:block">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
            <span className="text-white/50 text-xs tracking-wider">Not a holiday. A properly good summer.</span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-white/50 text-xs tracking-wider">Only 8 people.</span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-amber-400/80 text-xs tracking-wider font-medium">From London. Summer 2026.</span>
          </div>
        </div>
      </section>

      {/* STATEMENT — cinematic pull quote */}
      <section className="py-36 md:py-48 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.08] italic">
            The mountains don’t care
            <br />
            <span className="text-primary/70 not-italic font-semibold">how busy you are.</span>
          </p>
          <div className="mt-14 w-16 h-px bg-primary/20 mx-auto" />
          <p className="mt-10 text-muted-foreground text-xl max-w-xl mx-auto leading-[1.7]">
            Summer in Montenegro is a week with strangers who become friends, in places your Instagram algorithm will never find. Hosted, unhurried, and completely real.
          </p>
        </div>
      </section>

      {/* CINEMATIC SPLIT — silhouette landscape */}
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
              See the full itinerary <ArrowRight size={16} />
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

      {/* PRICING — dark cinematic */}
      <section
        className="relative py-40 px-6 text-center overflow-hidden"
        style={{ background: 'hsl(158 45% 12%)' }}
      >
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-white/40 tracking-[0.4em] text-xs uppercase mb-8">Flying from London · Summer 2026</p>
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
            <span className="text-red-300 text-xs font-semibold tracking-wide">Filling fast — weekly departures from July</span>
          </div>
          <h2 className="font-heading text-6xl md:text-7xl font-bold text-white mb-4">From £899</h2>
          <p className="text-white/45 text-sm mb-8">per person · fly from London · 7 days · all-inclusive except flights</p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:brightness-105 transition-all shadow-xl"
          >
            Reserve Your Spot <ArrowRight size={16} />
          </Link>
          <p className="mt-6 text-white/30 text-xs">Maximum 8 guests per departure · Spaces go fast · Minimum 4 to run</p>
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

      {/* SOCIAL PROOF */}
      <section className="py-36 md:py-44 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">What Makes It Different</p>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight">Not a tour company.<br /><em>A mindset.</em></h2>
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
              { icon: '🏔', title: 'Places people don’t go', desc: 'No tour buses. No Tripadvisor badges. Just the real Montenegro.' },
              { icon: '👥', title: 'A group you’ll actually like', desc: 'Max 8 people. Carefully designed to feel like you picked them yourself.' },
              { icon: '🍽️', title: 'Food that changes you', desc: 'Family tables, local ingredients, no menus. The kind of meal you remember forever.' },
              { icon: '🚐', title: 'Zero logistics stress', desc: 'We pick you up. We drop you off. Every night is sorted. You just show up.' },
              { icon: '📵', title: 'A week without your phone', desc: 'Not literally. But you won’t want it. The mountains will outcompete the feed.' },
              { icon: '⚡', title: 'Something changes', desc: 'People come back different. Lighter. People say: I didn’t know I needed this.' },
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
          <div className="mt-16 p-8 rounded-3xl bg-primary/5 border border-primary/10 text-center">
            <p className="font-heading text-2xl italic text-primary/80 mb-2">“I didn’t book a holiday. I joined a summer.”</p>
            <p className="text-muted-foreground text-sm">First reviews publishing after July 2026</p>
          </div>
        </div>
      </section>


      {/* INSTAGRAM / TIKTOK FEED */}
      <section className="py-32 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Follow the Journey</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Real Moments, Real Places</h2>
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/summerinmontenegro_com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-secondary transition-colors text-sm font-medium"
              >
                <span className="text-lg">📸</span> Instagram
              </a>
              <a
                href="https://www.tiktok.com/@summerinmontenegro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-secondary transition-colors text-sm font-medium"
              >
                <span className="text-lg">🎵</span> TikTok
              </a>
            </div>
          </div>

          {/* Feed — infinite auto-scroll */}
          <div className="overflow-hidden">
            <div
              className="flex gap-3"
              style={{ animation: 'socialScroll 32s linear infinite', width: 'max-content' }}
              onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
            >
              {[...SOCIAL_POSTS, ...SOCIAL_POSTS].map((post, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-300 hover:scale-105" style={{ aspectRatio: '9/16', width: '160px' }}>
                  <img src={post.img} alt={post.caption} className="w-full h-full object-cover transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {post.type === 'reel' && (
                    <div className="absolute top-3 right-3"><div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"><Play size={12} className="text-white fill-white" /></div></div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs leading-tight line-clamp-2">{post.caption}</p>
                    <p className="text-white/60 text-xs mt-1">❤️ {post.likes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-muted-foreground text-xs mt-8">
            Follow <strong>@summerinmontenegro_com</strong> on Instagram and <strong>@summerinmontenegro.com</strong> on TikTok for daily content
          </p>
        </div>
      </section>

      <TestimonialsSection />

      {/* SMALL GROUP ETHOS */}
      <section className="py-36 px-6 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary/70 text-xs tracking-[0.3em] uppercase font-semibold mb-4">The Philosophy</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Small enough<br />to be real.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Eight people is a dinner party. It’s a group that moves together, eats together, gets lost together. It’s the reason people come home and say: “that changed me.”
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