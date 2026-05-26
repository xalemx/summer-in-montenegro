const COAST_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/c477aa20c_generated_5ab95a92.png';
const MTN_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/1b071a013_generated_06324ee4.png';
const LAKE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/df13fa70f_generated_5bd1d860.png';
const HORSE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/8d8db3a11_generated_948706a3.png';
const SPRINGS_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/df17a8fc7_generated_0bc1160e.png';
const FOOD_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/f1c34b4b6_generated_0a69661e.png';

const ACTIVITIES = [
  { title: 'South Montenegro Experience', desc: 'Coastal scenery, historic towns, Lake Skadar or scenic southern stops depending on route and timing.', img: COAST_IMG },
  { title: 'Hiking', desc: 'Guided beginner-to-moderate hiking in Prokletije National Park.', img: MTN_IMG },
  { title: 'Plav Lake', desc: 'Swimming, kayaking, relaxing and lakeside views.', img: LAKE_IMG },
  { title: 'Horse Riding', desc: 'Optional mountain horse riding experiences.', img: HORSE_IMG },
  { title: 'Waterfalls and Springs', desc: 'Ali Pasha Springs, Grlja Waterfall and hidden nature spots.', img: SPRINGS_IMG },
  { title: 'Traditional Food', desc: 'Homemade meals, local flavours and authentic hospitality.', img: FOOD_IMG },
];

export default function Activities() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">{"Activities & Experiences"}</h1>
        <p className="text-center text-muted-foreground mb-14 max-w-lg mx-auto">
          Each trip combines nature, adventure and authentic local culture.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}