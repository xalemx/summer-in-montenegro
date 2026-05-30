import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import MonteMap from '../components/MonteMap';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/0ef631d34_alexey-malakhov-BEkKjGPmhrU-unsplash.jpg';
const GROUP_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/423ad25ba_adventure-albania-B2s-_MbHWf8-unsplash.jpg';
const COFFEE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1772e29aa_jinhui-chen-u1qsVkb8Lb8-unsplash.jpg';
const ROAD_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/a11b66f52_damien-checoury-ZhGbAXHq38A-unsplash.jpg';
const LAKESIDE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/9c815610c_laurynas-zizys-lZ7ra80csh4-unsplash.jpg';

const DAYS = [
  { day: 1, weekday: 'Friday', title: 'Arrival — Podgorica to Gusinje', text: 'Arrive at Podgorica Airport. Airport pickup and a scenic stop at Biogradska Gora National Park en route north. Transfer to Gusinje. Check in and settle in for the week.', note: null },
  { day: 2, weekday: 'Saturday', title: 'Ali Pasha Springs & Grlja Waterfall', text: 'Morning visit to the famous Ali Pasha Springs — crystal-clear glacial waters at the foot of the Prokletije range. Continue to Grlja Waterfall and explore the village of Vusanje.', note: null },
  { day: 3, weekday: 'Sunday', title: 'Prokletije National Park', text: 'A full day in Prokletije National Park. Explore Grebaje Valley — one of the most dramatic alpine landscapes in the Balkans. Optional guided hiking available depending on group preference.', note: 'Optional hiking is arranged locally and paid separately by guests.' },
  { day: 4, weekday: 'Monday', title: 'Plav Lake — Relaxed Day', text: 'A slower day around beautiful Plav Lake. Optional horse riding and rafting available for those who want activity. Otherwise, relax, swim, and take in the views at your own pace.', note: 'Optional activities are arranged locally and paid separately.' },
  { day: 5, weekday: 'Tuesday', title: 'Scenic Transfer South — Lake Skadar', text: 'Leave the north and head south on a scenic road trip. Stop at Lake Skadar — one of the largest lakes in Europe, surrounded by wildlife and mountain scenery. Arrive in Bar for the second half of the week.', note: null },
  { day: 6, weekday: 'Wednesday', title: 'Old Bar & The Coast', text: 'Morning in the ancient ruins of Old Bar, one of the most atmospheric historic sites in Montenegro. Afternoon on the beach — time to swim, relax and enjoy the Adriatic.', note: null },
  { day: 7, weekday: 'Thursday', title: 'Ulcinj & Ada Bojana', text: 'Day trip to Ulcinj, Montenegro\'s most southerly town. Visit Ada Bojana — a river island with a unique beach. Free time to explore, swim and watch the sunset over the Adriatic.', note: null },
  { day: 8, weekday: 'Friday', title: 'Airport Transfer — Departure', text: 'Transfer back to Podgorica Airport for departure. Safe travels home.', note: null },
];

const INCLUDED = [
  '7 nights accommodation (private room)',
  '4 nights mountains · 3 nights Adriatic coast',
  'Daily breakfast',
  'Airport pickup from Podgorica',
  'Airport drop-off to Podgorica',
  'Local transport throughout',
  'Hosted group experience',
];

export default function Experience() {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Montenegro mountains" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 px-6 pb-14 max-w-4xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Friday to Friday · From London</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            8 Days in Montenegro
          </h1>
          <p className="text-white/60 text-lg">4 Nights Mountains · 3 Nights Adriatic Coast · Private Room Included</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            One unforgettable week from London combining North Montenegro, Lake Skadar and the Adriatic Coast. 4 nights in the mountains, 3 nights on the Adriatic. Private room every night. Friday to Friday.
          </p>
          <div className="inline-flex items-center gap-2 py-3 px-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
            <span className="font-semibold">Note:</span> Optional activities on Day 5 are arranged locally and paid separately. Accommodation and daily breakfast are included throughout.
          </div>
        </div>
      </section>

      {/* ITINERARY TIMELINE */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-0">
            {DAYS.map((d, i) => (
              <div key={d.day} className="relative pl-14 pb-8 last:pb-0">
                {i < DAYS.length - 1 && <div className="absolute left-5 top-10 w-px h-full bg-border" />}
                <div className={`absolute left-0 top-0 w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm ${d.weekday === 'Friday' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
                  {d.day}
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">{d.weekday}</p>
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">Day {d.day} — {d.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{d.text}</p>
                  {d.note && (
                    <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{d.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE MOMENTS STRIP */}
      <section className="py-14 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs tracking-[0.4em] uppercase text-primary/70 font-semibold mb-8">Beyond the Itinerary</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridAutoRows: '200px' }}>
            <div className="rounded-2xl overflow-hidden group relative">
              <img src={GROUP_IMG} alt="Small group travelling together" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">Your Group</p>
            </div>
            <div className="rounded-2xl overflow-hidden group relative">
              <img src={COFFEE_IMG} alt="Morning coffee with views" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">Morning Coffee</p>
            </div>
            <div className="rounded-2xl overflow-hidden group relative">
              <img src={ROAD_IMG} alt="Road trip through Montenegro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">Road Trip North</p>
            </div>
            <div className="rounded-2xl overflow-hidden group relative">
              <img src={LAKESIDE_IMG} alt="Lakeside relaxation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">Lakeside Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUSIONS */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-10">
            <h4 className="font-heading text-2xl font-bold text-foreground mb-6">What's included in your trip</h4>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {INCLUDED.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">Not included: flights, lunch, dinner, optional activities, travel insurance, personal expenses.</p>
          </div>
        </div>
      </section>

      {/* MEET YOUR HOST */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Your Host</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-1 leading-tight">Alem Damjanovic</h2>
          <p className="text-muted-foreground font-medium mb-6">Founder</p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-xl mx-auto">
            Born in Montenegro and based between the UK and Montenegro.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto">
            I created Summer in Montenegro to help travellers discover the side of Montenegro most tourists never see.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            From airport pickup to local recommendations, every trip is personally coordinated to create an authentic Montenegro experience.
          </p>
          <a
            href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:brightness-105 transition-all shadow-lg text-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
            Chat With Alem
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'hsl(158 45% 12%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Ready to start planning?</h2>
          <p className="text-white/50 mb-8">Friday departures throughout Summer 2026.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl">
              Reserve Your Spot <ArrowRight size={16} />
            </Link>
            <Link to="/dates" className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all text-sm">
              View Departure Dates
            </Link>
          </div>
        </div>
      </section>

      <MonteMap />

      {/* Mobile padding */}
      <div className="md:hidden h-20" />
    </div>
  );
}