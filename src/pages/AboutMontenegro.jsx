import { Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80';
const LAKE_IMG = 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1200&q=80';
const COAST_IMG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80';

const SPAIN_CONS = [
  { label: 'Overcrowded beaches in July and August', detail: 'Benidorm, Lloret de Mar and Ibiza attract tens of millions of tourists every summer. Finding space on a beach — let alone a quiet one — is nearly impossible.' },
  { label: 'Mass tourism infrastructure', detail: 'All-inclusive hotels, chain restaurants and tourist traps dominate coastal areas. The "local experience" is engineered for mass consumption.' },
  { label: 'Expensive in peak season', detail: 'A budget room in Barcelona or Marbella in July can cost more than a full week in Montenegro including accommodation and transfers.' },
  { label: 'You\'ve probably already been', detail: 'Spain and Portugal are the default. If you\'ve done them before, you know what to expect. Another trip will give you more of the same.' },
];

const PORTUGAL_CONS = [
  { label: 'Lisbon and Porto are now tourist hotspots', detail: 'Both cities have seen unprecedented tourist volumes since 2018. The "hidden gem" narrative no longer applies to most of Portugal.' },
  { label: 'Algarve = British tourist corridor', detail: 'The Algarve coast is dominated by UK package tourists every summer. It\'s closer to a British resort than an authentic Portuguese experience.' },
  { label: 'Rising prices year on year', detail: 'Portugal has become one of the fastest-rising cost destinations in Southern Europe as demand has surged beyond supply.' },
  { label: 'Limited natural diversity', detail: 'Portugal is largely flat coastal terrain. If you\'re looking for mountains, dramatic landscapes and varied geography, Montenegro offers far more.' },
];

const MONTENEGRO_WINS = [
  { icon: '🏔', title: 'Mountains and coast in one week', body: 'Montenegro is one of the only countries in Europe where you can swim in a warm sea and be surrounded by alpine mountain scenery within a single day. The Prokletije range in the north rivals the Albanian Alps in dramatic beauty — and almost nobody from the UK goes there.' },
  { icon: '🧭', title: 'Europe\'s fastest-growing hidden gem', body: 'Montenegro has been quietly gaining a reputation among experienced travellers in the last five years. National Geographic, Lonely Planet and Condé Nast have all featured it. But the crowds haven\'t followed yet. Now is the time to go.' },
  { icon: '💷', title: 'Better value than anywhere in Western Europe', body: 'A full week in Montenegro — accommodation, daily breakfast, all transfers — costs less than a long weekend in Barcelona. Local restaurants, cafés and activities are priced for local incomes, not tourist budgets.' },
  { icon: '🌿', title: 'Untouched nature and genuine wilderness', body: 'Montenegro has five national parks covering nearly a third of the country. Durmitor, Biogradska Gora, Prokletije — these are real wilderness areas. Not manicured tourist parks. Actual wild country.' },
  { icon: '🤝', title: 'Genuine local hospitality', body: 'Montenegro has a strong culture of hospitality — locals will invite you into their homes, share food and stories, and treat guests with a warmth that mass tourism destinations rarely offer. When the host is local, you access a completely different country.' },
  { icon: '📵', title: 'A real digital detox', body: 'The north of Montenegro — where we spend most of the week — has limited connectivity and an unhurried pace. No notifications. No deadlines. Just mountains, lakes and proper disconnection. Guests consistently say they didn\'t realise how much they needed it.' },
];

const COMPARISON_ROWS = [
  { cat: 'Crowds', spain: 'Extremely crowded in summer', portugal: 'High season overrun with tourists', mne: 'Genuinely uncrowded, even in August' },
  { cat: 'Landscape', spain: 'Flat coastal terrain and resorts', portugal: 'Mostly flat and coastal', mne: 'Mountains, lakes, coast and wilderness' },
  { cat: 'Authenticity', spain: 'Mass tourism infrastructure', portugal: 'Rapidly commercialised', mne: 'Real local culture, off the tourist track' },
  { cat: 'Value', spain: 'Expensive in peak season', portugal: 'Rising prices year on year', mne: 'Excellent value, local prices' },
  { cat: 'Uniqueness', spain: 'Most UK travellers have been', portugal: 'Very popular UK destination', mne: 'Few UK travellers have visited' },
];

export default function AboutMontenegro() {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Montenegro mountains and landscape" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="relative z-10 px-6 pb-16 max-w-4xl mx-auto w-full">
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">Europe's Hidden Gem</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
            Why Montenegro?
          </h1>
          <p className="text-white/65 text-lg max-w-xl">The honest answer to why experienced travellers are quietly choosing Montenegro over Spain, Portugal and the rest.</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Short Version</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            You've done Spain. You've done Portugal.<br /><em>You know what to expect.</em>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Montenegro is what Spain was thirty years ago. Before the all-inclusives. Before the tour buses. Before the beach clubs playing commercial house music at 11am.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            It's a country where the mountains come down to the sea. Where you can hike in genuine alpine wilderness in the morning and swim in warm, clear water in the afternoon. Where a local restaurant will serve you grilled trout from the river and refuse to let you leave without trying the homemade rakija.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            It's different. And for a growing number of UK travellers who've exhausted the usual options, that's exactly what they came for.
          </p>
        </div>
      </section>

      {/* FULL WIDTH IMAGE */}
      <section className="h-[50vh] overflow-hidden">
        <img src={LAKE_IMG} alt="Plav Lake, Montenegro" className="w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
      </section>

      {/* WHY NOT SPAIN */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-3">The Honest Assessment</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">Why Not Spain?</h2>
            <p className="text-muted-foreground mt-3 text-lg">Spain is a fine country. But as a summer holiday destination for UK travellers in 2026, it has some real problems.</p>
          </div>
          <div className="space-y-4">
            {SPAIN_CONS.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm">
                <X size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">{item.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOT PORTUGAL */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-3">The Honest Assessment</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">Why Not Portugal?</h2>
            <p className="text-muted-foreground mt-3 text-lg">Portugal earned its reputation. But the word got out — and it shows.</p>
          </div>
          <div className="space-y-4">
            {PORTUGAL_CONS.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm">
                <X size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">{item.label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MONTENEGRO WINS */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Six Reasons</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Why Montenegro Is<br /><em>Europe's Hidden Gem</em>
            </h2>
          </div>
          <div className="space-y-6">
            {MONTENEGRO_WINS.map((item, i) => (
              <div key={i} className="flex gap-5 p-7 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={14} className="text-green-600 flex-shrink-0" />
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Side by Side</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">Montenegro vs Spain vs Portugal</h2>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 bg-primary text-primary-foreground text-xs font-bold tracking-wide uppercase">
              <div className="p-4">Category</div>
              <div className="p-4">Spain</div>
              <div className="p-4">Portugal</div>
              <div className="p-4 bg-accent text-accent-foreground">Montenegro</div>
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 text-sm ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}>
                <div className="p-4 font-semibold text-foreground border-r border-border">{row.cat}</div>
                <div className="p-4 text-muted-foreground border-r border-border">{row.spain}</div>
                <div className="p-4 text-muted-foreground border-r border-border">{row.portugal}</div>
                <div className="p-4 text-foreground font-medium bg-accent/5">{row.mne}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COAST IMAGE */}
      <section className="h-[45vh] overflow-hidden">
        <img src={COAST_IMG} alt="Montenegro coastline" className="w-full h-full object-cover" />
      </section>

      {/* CLOSING ARGUMENT */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Bottom Line</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            This won't stay hidden forever.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Every destination that earns the "hidden gem" label eventually loses it. Lisbon lost it around 2017. Porto around 2019. The Algarve, Tenerife, Mallorca — all once had that quality. Now they don't.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Montenegro is in the window. The infrastructure is there. The flights are there. The landscapes are extraordinary. The prices are still low. And the crowds haven't arrived yet.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            For people who've been saying they wanted to do something different — this is the moment. Not in five years when everyone's talking about it. Now, while it still feels like a discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-bold rounded-full hover:brightness-110 transition-all shadow-lg">
              Reserve Your Spot <ArrowRight size={16} />
            </Link>
            <Link to="/dates" className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-border text-foreground font-semibold rounded-full hover:bg-secondary transition-all">
              View 2026 Departures
            </Link>
          </div>
        </div>
      </section>

      <div className="md:hidden h-20" />
    </div>
  );
}