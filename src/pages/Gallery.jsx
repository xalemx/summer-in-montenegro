import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const DRONE_VIDEO = 'https://media.base44.com/videos/public/6a14e6049e3182804fee97ce/50ede03d7_MontenegroDrone4K_BreathtakingLandscapesfromMountainstotheBay_720p.MP4';

const CATEGORIES = ['All', 'Landscape', 'People', 'Food', 'Accommodation'];

const REELS = [
  { id: 'r1', caption: 'Drone over Plav Lake', location: 'Plav, 900m', views: '142k', img: 'https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?w=600' },
  { id: 'r2', caption: 'Canyon descent', location: 'Tara River Canyon', views: '89k', img: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600' },
  { id: 'r3', caption: 'Zipline over the valley', location: 'Kolašin', views: '204k', img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600' },
  { id: 'r4', caption: 'Sunrise over Prokletije', location: 'Accursed Mountains', views: '317k', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600' },
  { id: 'r5', caption: 'Bay of Kotor from above', location: 'Kotor, 6am', views: '521k', img: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600' },
];

const PHOTOS = [
  { id: 1, category: 'Landscape', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200', caption: 'Prokletije at dawn', location: 'Accursed Mountains', tall: true },
  { id: 2, category: 'Landscape', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', caption: 'Above the clouds', location: 'Bobotov Kuk, 2525m' },
  { id: 3, category: 'People', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800', caption: 'Morning hike', location: 'Durmitor National Park' },
  { id: 4, category: 'Food', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', caption: 'Family dinner', location: 'Local guesthouse, Gusinje', tall: true },
  { id: 5, category: 'Landscape', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200', caption: 'Black Lake, midnight blue', location: 'Crno Jezero, Durmitor' },
  { id: 6, category: 'People', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800', caption: 'The group at the top', location: 'Kom, 2487m' },
  { id: 7, category: 'Accommodation', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800', caption: 'Morning coffee', location: 'Eco Lodge, Biogradska Gora', tall: true },
  { id: 8, category: 'Food', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', caption: 'Local lamb peka', location: 'Kolašin highlands' },
  { id: 9, category: 'Landscape', img: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=800', caption: 'Gorge at sunrise', location: 'Morača Canyon' },
  { id: 10, category: 'People', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', caption: 'Lakeside evening', location: 'Plav Lake', tall: true },
  { id: 11, category: 'Accommodation', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200', caption: 'Where you sleep', location: 'Boutique guesthouse, Gusinje' },
  { id: 12, category: 'Food', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', caption: 'Breakfast spread', location: 'Day 2, mountain guesthouse' },
  { id: 13, category: 'Landscape', img: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?w=800', caption: 'Ridge line at golden hour', location: 'Visitor peak trail', tall: true },
  { id: 14, category: 'People', img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800', caption: 'Travel companions', location: 'Day 3, Plav Valley' },
  { id: 15, category: 'Landscape', img: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800', caption: 'Monastery at dusk', location: 'Morača Monastery, 1200AD' },
];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? PHOTOS : PHOTOS.filter(p => p.category === active);
  const idx = lightbox !== null ? filtered.findIndex(p => p.id === lightbox) : -1;
  const current = filtered.find(p => p.id === lightbox);

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft' && idx > 0) setLightbox(filtered[idx - 1].id);
      if (e.key === 'ArrowRight' && idx < filtered.length - 1) setLightbox(filtered[idx + 1].id);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, idx, filtered]);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(220 15% 8%)' }}>

      {/* CINEMATIC VIDEO HERO */}
      <section className="relative h-[70vh] overflow-hidden flex items-end">
        <video
          src={DRONE_VIDEO}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 pb-20 w-full">
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-4">Montenegro, Unfiltered</p>
          <h1 className="font-heading text-6xl md:text-8xl font-light text-white leading-[1.0] mb-4 italic">
            The Gallery
          </h1>
          <p className="text-white/55 text-lg max-w-md leading-relaxed">
            Drone shots, real moments, mountain mornings, honest food. Seven days, unfiltered.
          </p>
        </div>
      </section>

      {/* REELS STRIP */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-8">Reels · Most Viewed</p>
          <div className="flex gap-3 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {REELS.map(reel => (
              <div key={reel.id} className="group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300" style={{ width: '180px', aspectRatio: '9/16' }}>
                <img src={reel.img} alt={reel.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <Play size={22} className="text-white fill-white ml-1" />
                </div>
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5 text-white/80 text-xs">{reel.views}</div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-xs leading-tight">{reel.caption}</p>
                  <p className="text-white/50 text-xs mt-0.5">{reel.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER */}
      <div className="sticky top-20 z-30 border-b border-white/8" style={{ background: 'hsl(220 15% 8% / 0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-medium tracking-[0.08em] uppercase transition-all ${
                active === cat ? 'bg-white text-black' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TRUE MASONRY */}
      <section className="py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-3">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setLightbox(item.id)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer mb-3 break-inside-avoid"
              style={{ aspectRatio: item.tall ? '2/3' : '4/3' }}
            >
              <img
                src={item.img}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-sm">{item.caption}</p>
                <p className="text-white/55 text-xs mt-0.5">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-28 px-6 text-center border-t border-white/8">
        <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">See This In Person</p>
        <h2 className="font-heading text-5xl md:text-6xl font-light italic text-white mb-6 leading-tight">
          These views are<br />
          <span className="text-amber-300 not-italic font-semibold">waiting for you.</span>
        </h2>
        <p className="text-white/40 mb-10 max-w-sm mx-auto">
          Fly from London. 7 days. Small group. Everything included except flights.
        </p>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-10 py-4 bg-amber-400 text-black font-bold rounded-full hover:brightness-105 transition-all"
        >
          Reserve Your Spot <ArrowRight size={16} />
        </Link>
      </section>

      {/* FULLSCREEN LIGHTBOX */}
      {lightbox !== null && current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.97)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={20} />
          </button>
          <p className="absolute top-6 left-6 text-white/30 text-xs tracking-[0.2em] uppercase">{idx + 1} / {filtered.length}</p>

          {idx > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(filtered[idx - 1].id); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {idx < filtered.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(filtered[idx + 1].id); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div className="max-w-5xl w-full px-20" onClick={e => e.stopPropagation()}>
            <img
              src={current.img}
              alt={current.caption}
              className="w-full rounded-2xl object-contain"
              style={{ maxHeight: '75vh' }}
            />
            <div className="mt-5 text-center">
              <p className="text-white font-heading text-xl font-light italic">{current.caption}</p>
              <p className="text-white/40 text-sm mt-1 tracking-wide">{current.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}