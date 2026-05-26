const ACCOM_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/e99c73d8b_generated_b1ea0325.png';
const VILLAGE_IMG = 'https://media.base44.com/images/public/6a14e6049e3182804fee97ce/786ac0f50_generated_df05bc13.png';

const PARTNERS = [
  {
    name: 'Mountain View Resort',
    location: 'Gusinje',
    desc: 'Modern mountain accommodation with peaceful surroundings and scenic views.',
    img: ACCOM_IMG,
  },
  {
    name: 'Etno House Bektesevic',
    location: 'Gusinje',
    desc: 'Traditional atmosphere, local charm and authentic Balkan hospitality.',
    img: VILLAGE_IMG,
  },
];

export default function Accommodation() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Stay in Authentic Montenegro</h1>
        <p className="text-center text-muted-foreground mb-14 max-w-lg mx-auto">
          We work with trusted local accommodation partners in Gusinje and northern Montenegro, combining mountain views, local hospitality and authentic atmosphere.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {PARTNERS.map((p, i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{p.location}</p>
                <h3 className="font-heading text-xl font-semibold mb-2">{p.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Accommodation may vary depending on group size, departure date and availability.
        </p>
      </div>
    </div>
  );
}