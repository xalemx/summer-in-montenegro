import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const COAST_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c477aa20c_generated_5ab95a92.png';
const MTN_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1b071a013_generated_06324ee4.png';
const LAKE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/df13fa70f_generated_5bd1d860.png';
const HORSE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/8d8db3a11_generated_948706a3.png';
const SPRINGS_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/df17a8fc7_generated_0bc1160e.png';
const FOOD_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/f1c34b4b6_generated_0a69661e.png';

const ACTIVITIES = [
  { title: 'Horse Riding', desc: 'Mountain horse riding experiences through the Prokletije foothills and alpine meadows.', img: HORSE_IMG },
  { title: 'Kayaking', desc: 'Kayaking on Plav Lake with spectacular mountain views and crystal-clear water.', img: LAKE_IMG },
  { title: '4x4 Scenic Tours', desc: 'Off-road exploration through remote mountain villages and hidden landscapes.', img: COAST_IMG },
  { title: 'Guided Hiking', desc: 'Guided routes in Prokletije National Park — from easy scenic walks to more demanding trails.', img: MTN_IMG },
  { title: 'Local Food Experiences', desc: 'Traditional Montenegrin cuisine, home cooking and local food culture.', img: FOOD_IMG },
  { title: 'Lake Experiences', desc: 'Swimming, relaxing and exploring the shores of Plav Lake at 900m altitude.', img: LAKE_IMG },
];

export default function Activities() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-3">Pay Separately, Choose Your Own</p>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Optional Experiences</h1>
        <p className="text-center text-muted-foreground mb-6 max-w-lg mx-auto">
          Activities are flexible so guests can choose the experiences that suit their interests, budget and energy level.
        </p>

        <div className="mb-10 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800 text-center max-w-2xl mx-auto">
          Optional activities are arranged locally and paid separately by guests. They are not included in the base trip price.
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-base font-semibold mb-1">{a.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                <p className="mt-2 text-xs text-amber-700 font-medium">Paid separately</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            All base trips include accommodation, daily breakfast, airport transfers and local transport. Activities are optional extras chosen by each guest.
          </p>
          <Link to="/book" className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-105 transition-all shadow-lg">
            Reserve Your Spot <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}