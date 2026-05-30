import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/8d8db3a11_generated_948706a3.png';
const COAST_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c477aa20c_generated_5ab95a92.png';
const MTN_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1b071a013_generated_06324ee4.png';
const LAKE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/df13fa70f_generated_5bd1d860.png';
const HORSE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/8d8db3a11_generated_948706a3.png';
const SPRINGS_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/df17a8fc7_generated_0bc1160e.png';
const FOOD_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/f1c34b4b6_generated_0a69661e.png';

const ACTIVITIES = [
  { title: 'Horse Riding', desc: 'Mountain horse riding experiences through the Prokletije foothills and alpine meadows.', img: HORSE_IMG, level: 'Moderate' },
  { title: 'Kayaking', desc: 'Kayaking on Plav Lake with spectacular mountain views and crystal-clear water.', img: LAKE_IMG, level: 'Easy' },
  { title: 'Guided Hiking', desc: 'Guided routes in Prokletije National Park — from easy scenic walks to more demanding trails.', img: MTN_IMG, level: 'All levels' },
  { title: '4x4 Scenic Tours', desc: 'Off-road exploration through remote mountain villages and hidden landscapes.', img: COAST_IMG, level: 'Easy' },
  { title: 'Lake Experiences', desc: 'Swimming, relaxing and exploring the shores of Plav Lake at 900m altitude.', img: SPRINGS_IMG, level: 'Easy' },
  { title: 'Local Food Experiences', desc: 'Traditional Montenegrin cuisine, home cooking and local food culture.', img: FOOD_IMG, level: 'All levels' },
];

export default function Activities() {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Montenegro activities" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 px-6 pb-14 max-w-4xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Choose Your Own Adventure</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            Optional Experiences
          </h1>
          <p className="text-white/60 text-lg">Pay separately. Choose what suits you.</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              Activities are flexible so guests can choose the experiences that suit their interests, budget and energy level.
            </p>
            <div className="inline-flex items-center gap-2 py-3 px-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
              Optional activities are arranged locally and paid separately — not included in the base trip price.
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITY CARDS */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="group bg-card rounded-3xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-foreground">{a.level}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="font-heading text-lg font-semibold text-white">{a.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{a.desc}</p>
                <span className="text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200 rounded-full px-3 py-1">Paid separately · Arranged locally</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'hsl(158 45% 12%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Your adventure.<br /><em>Your pace.</em>
          </h2>
          <p className="text-white/50 mb-3 text-lg">All base trips include accommodation, daily breakfast, airport transfers and local transport.</p>
          <p className="text-white/30 text-sm mb-8">Activities are optional extras chosen by each guest.</p>
          <Link to="/book" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-xl">
            Reserve Your Spot <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <div className="md:hidden h-20" />
    </div>
  );
}