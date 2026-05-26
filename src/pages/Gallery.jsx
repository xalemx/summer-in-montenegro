import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['All', 'Landscape', 'Food', 'People', 'Reels', 'Accommodation'];

const HERO_IMG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600';

const MEDIA = [
  {
    id: 1, category: 'Landscape', type: 'photo', span: 'col-span-2 row-span-2',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    caption: 'Prokletije at dawn', location: 'Accursed Mountains, North Montenegro',
  },
  {
    id: 2, category: 'Landscape', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    caption: 'Above the clouds', location: 'Bobotov Kuk, 2525m',
  },
  {
    id: 3, category: 'People', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    caption: 'Morning hike', location: 'Durmitor National Park',
  },
  {
    id: 4, category: 'Reels', type: 'reel', span: '',
    img: 'https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?w=800',
    caption: 'Drone over Plav Lake', location: 'Plav, 900m altitude',
    views: '142k',
  },
  {
    id: 5, category: 'Food', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    caption: 'Family dinner', location: 'Local guesthouse, Gusinje',
  },
  {
    id: 6, category: 'Landscape', type: 'photo', span: 'col-span-2',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200',
    caption: 'Black Lake, midnight blue', location: 'Crno Jezero, Durmitor',
  },
  {
    id: 7, category: 'People', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
    caption: 'The group at the top', location: 'Kom, 2487m',
  },
  {
    id: 8, category: 'Accommodation', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800',
    caption: 'Morning coffee', location: 'Eco Lodge, Biogradska Gora',
  },
  {
    id: 9, category: 'Reels', type: 'reel', span: '',
    img: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800',
    caption: 'Canyon descent', location: 'Tara River Canyon',
    views: '89k',
  },
  {
    id: 10, category: 'Food', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    caption: 'Local lamb peka', location: 'Kolašin highlands',
  },
  {
    id: 11, category: 'Landscape', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=800',
    caption: 'Gorge at sunrise', location: 'Morača Canyon',
  },
  {
    id: 12, category: 'People', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    caption: 'Lakeside evening', location: 'Plav Lake',
  },
  {
    id: 13, category: 'Accommodation', type: 'photo', span: 'col-span-2',
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200',
    caption: 'Where you sleep', location: 'Boutique guesthouse, Gusinje',
  },
  {
    id: 14, category: 'Reels', type: 'reel', span: '',
    img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
    caption: 'Zipline over the valley', location: 'Adventure park, Kolašin',
    views: '204k',
  },
  {
    id: 15, category: 'Food', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    caption: 'Breakfast spread', location: 'Day 2, mountain guesthouse',
  },
  {
    id: 16, category: 'Landscape', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?w=800',
    caption: 'Ridge line at golden hour', location: 'Visitor peak trail',
  },
  {
    id: 17, category: 'People', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800',
    caption: 'Travel companions', location: 'Day 3, Plav Valley',
  },
  {
    id: 18, category: 'Landscape', type: 'photo', span: '',
    img: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800',
    caption: 'Monastery at dusk', location: 'Morača Monastery, 1200AD',
  },
];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? MEDIA : MEDIA.filter(m => m.category === active);
  const lightboxIndex = lightbox !== null ? filtered.findIndex(m => m.id === lightbox) : -1;
  const current = filtered.find(m => m.id === lightbox);

  const prev = () => {
    if (lightboxIndex > 0) setLightbox(filtered[lightboxIndex - 1].id);
  };
  const next = () => {
    if (lightboxIndex < filtered.length - 1) setLightbox(filtered[lightboxIndex + 1].id);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden flex items-end">
        <img
          src={HERO_IMG}
          alt="Gallery hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 w-full">
          <p className="text-white/50 text-xs tracking-[0.35em] uppercase mb-3">Montenegro, Unfiltered</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            The Gallery
          </h1>
          <p className="text-white/60 text-lg max-w-md">
            Drone shots, real moments, mountain mornings and honest food. This is what seven days actually looks like.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MASONRY GRID */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item.id)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${item.span || ''}`}
            >
              <img
                src={item.img}
                alt={item.caption}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {item.type === 'reel' && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play size={13} className="text-white fill-white ml-0.5" />
                </div>
              )}
              {item.type === 'reel' && item.views && (
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs font-medium">
                  {item.views} views
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-sm leading-tight">{item.caption}</p>
                <p className="text-white/60 text-xs mt-0.5">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 px-6 text-center" style={{ background: 'hsl(158 45% 10%)' }}>
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">See This In Person</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          These views are<br />
          <span className="italic text-amber-300">waiting for you.</span>
        </h2>
        <p className="text-white/50 mb-10 max-w-sm mx-auto text-base">
          Fly from London. 7 days. Small group. Everything included except flights.
        </p>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-10 py-4 bg-amber-400 text-black font-bold rounded-full hover:brightness-105 transition-all shadow-xl"
        >
          Reserve Your Spot <ArrowRight size={16} />
        </Link>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && current && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          {lightboxIndex < filtered.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden">
              <img src={current.img} alt={current.caption} className="w-full object-contain" style={{ maxHeight: '70vh' }} />
              {current.type === 'reel' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Play size={28} className="text-white fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">{current.caption}</p>
              <p className="text-white/50 text-sm mt-1">{current.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}