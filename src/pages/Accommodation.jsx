import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1400&q=80';

const BASES = [
  {
    title: 'North Montenegro Base',
    location: 'Gusinje',
    nights: 4,
    desc: 'Your mountain base for the first half of the trip. Set at the foot of the Prokletije range, Gusinje is one of the most dramatic and unspoiled valleys in the Balkans.',
    img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/4b9c461a7_kenneth-sonntag-_fnQwAsQ28A-unsplash.jpg',
    tag: 'Mountains',
  },
  {
    title: 'South Montenegro Base',
    location: 'Bar',
    nights: 3,
    desc: 'Your coastal base for the second half of the trip. Bar sits on the Adriatic coast — a gateway to Old Bar, Ulcinj and Ada Bojana.',
    img: 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/62be0a92d_maria-ivanova-uf_VKwoqAJQ-unsplash.jpg',
    tag: 'Coast',
  },
];

const PARTNERS = [{
    name: 'MountainView Resort',
    location: 'Gusinje',
    desc: 'Modern mountain resort hotel with scenic views of the surrounding peaks. Rated 4.6 on Google.',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFeW9ASqU_DhNHDYKP5WIFSx8d2TeGZcws-7JfrK7CTefSbswpjg1l59qxQYWKbqLtQG4GscJj6xmDv7bz15H3XK3ipyDzEZxv94n3QPw6c3JD-OPKGUKDmxX3v7b4xrrJg3mHRZMC3Sa3a=w800-h600-k-no',
    mapsUrl: 'https://maps.app.goo.gl/8wdCPiDfpc42xSbPA',
    rating: '4.6',
  },
  {
    name: 'Ethno House Bektesevic',
    location: 'Kruševo, Gusinje area',
    desc: 'Traditional Montenegrin guesthouse with authentic local charm. Rated 5.0 on Google.',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFfDmokcnJtlj6zGo8FucnUPtpAHbaSIAT6hGwo5iY-TdoH1nc5294Xq_gjBiVJm9X28cQg0Om9lFBXYkKvOSqW-n91v3h9uC-D_P3korpIunXjTacYWsK5Xh_8Wot9mVu6Nps6aZ_H6us=w800-h1067-k-no',
    mapsUrl: 'https://maps.app.goo.gl/iG6eJUg2KMrfbEA17',
    rating: '5.0',
  },
  {
    name: 'Beach Bar Hemingway',
    location: 'Šušanj, Bar',
    desc: 'Iconic coastal bar in Bar — a great base for the first night on the Adriatic.',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH54ZrbWqqF0_fFU_vaHQVzX2DdxA-nGzCSk3jqLrLo2TPEShvZyBeXyB7jgN3ZwIMEbOQLnfO2rLf3Zxn0hHrX7J196oVmzVSGpDhlyJUf2rWPxdqXHuxQNnZe_uvX0iOMiAKCkEkTbvzh=w800-h600-k-no',
    mapsUrl: 'https://maps.app.goo.gl/cwLUfVLbh1exaAXZ7',
    rating: null,
  },
  {
    name: 'Eko Katun ROSI – Old Tower',
    location: 'Vusanje, Gusinje area',
    desc: 'Authentic mountain agritourism stay in a historic old tower setting. Rated 4.7 on Google.',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEt3kT2NIHhokUjGfwzj4tP7Yn7xHptLTHkjHc8PLrPd_upfmVeEunZKuWYd_V593Fqq8OtPUKMJoAB37hoCHPXDkQopVYgXJGwXjRcBM19lYdU0y1YztYdNER-Vd-KhQJ0j3M=w800-h534-k-no',
    mapsUrl: 'https://maps.app.goo.gl/PV3CUZhUmjiV2mdR9',
    rating: '4.7',
  },
];

export default function Accommodation() {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Montenegro accommodation" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 px-6 pb-14 max-w-4xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Where You'll Stay</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            Authentic Montenegro
          </h1>
          <p className="text-white/60 text-lg max-w-xl">Coast, mountains and lakes — local character and genuine hospitality wherever you stay.</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            From coastal arrivals on the Adriatic to mountain guesthouses in the north, every night is arranged in carefully selected local stays.
          </p>
        </div>
      </section>

      {/* TWO BASES */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {BASES.map((b, i) => (
              <div key={i} className="group rounded-3xl overflow-hidden shadow-sm border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">{b.tag}</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">{b.nights} nights</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">{b.title}</h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin size={12} className="text-primary flex-shrink-0" />
                    <p className="text-xs text-muted-foreground font-medium">{b.location}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="flex-shrink-0 w-1 rounded-full bg-primary/30 self-stretch" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Private room included every night.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Accommodation may vary depending on availability, but all guests receive a private room. We work with carefully selected local accommodation partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER CARDS */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border/60 shadow-sm">
            <div className="flex-shrink-0 w-1 rounded-full bg-primary/30 self-stretch" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Example accommodation shown.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Accommodation may vary depending on departure date, group size and availability.
                We only work with trusted local accommodation partners.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {PARTNERS.map((p, i) => (
            <div key={i} className="group bg-card rounded-3xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.rating && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-foreground shadow">
                    ⭐ {p.rating}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading text-xl font-semibold text-foreground leading-tight">{p.name}</h3>
                </div>
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin size={12} className="text-primary flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">{p.location}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:gap-2.5 transition-all">
                  View on Google Maps <ArrowRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'hsl(158 45% 12%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Stay somewhere real.</h2>
          <p className="text-white/50 mb-8">Accommodation is included in your trip price. Reserve your spot and we'll handle the rest.</p>
          <Link to="/book" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl">
            Reserve Your Spot <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <div className="md:hidden h-20" />
    </div>
  );
}