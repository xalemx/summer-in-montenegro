const TRUST_CARDS = [
  {
    quote: "I've done Interrail, Thailand, Bali. None of it felt like this. Montenegro is Europe's last secret — and having a local host who actually knows it makes all the difference.",
    name: "Sarah M.",
    detail: "London · Traveller",
    avatar: "SM",
  },
  {
    quote: "I was nervous going with a group of strangers. By day 2 we were sharing food off each other's plates. By day 7 we were making plans for next summer.",
    name: "James K.",
    detail: "Manchester · First solo trip",
    avatar: "JK",
  },
  {
    quote: "The mountain views literally made me cry. I didn't expect that. The photos don't do it justice. Nothing prepares you for it.",
    name: "Priya L.",
    detail: "London · Returned twice",
    avatar: "PL",
  },
];

const WHY_CARDS = [
  { icon: '🏔️', heading: "Europe's most dramatic landscapes", body: 'Glacial lakes at 900m, canyon walls that drop 1,300m, coast that rivals the Amalfi. Three hours from London.' },
  { icon: '🤝', heading: 'A group that actually bonds', body: 'Max 8 people. Similar age, similar energy. Not a tour group — closer to a group of friends who happen to have met that week.' },
  { icon: '🍽️', heading: 'Food that changes you', body: 'Home cooking, family tables, local wine. No menus, no tourist traps. You eat what the family eats.' },
  { icon: '🧭', heading: 'A local who really knows it', body: "Your host was born in Montenegro. They know the roads that aren't on maps, the families that cook the best food, the views with no one else there." },
];

export default function TestimonialsSection() {
  return (
    <section className="py-36 md:py-44 px-6 bg-background">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-primary/60 text-xs tracking-[0.4em] uppercase font-medium mb-4">Why Guests Choose Montenegro</p>
          <h2 className="font-heading text-5xl md:text-6xl font-light text-foreground leading-tight italic">
            Words from the group.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {TRUST_CARDS.map((card, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-5">
              <p className="font-heading text-lg italic text-foreground/80 leading-relaxed flex-1">
                &ldquo;{card.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {card.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{card.name}</p>
                  <p className="text-xs text-muted-foreground">{card.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-14">
          <p className="text-muted-foreground/50 text-xs tracking-[0.4em] uppercase">Four reasons people come back</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {WHY_CARDS.map((card, i) => (
            <div key={i} className="flex gap-5 p-6 rounded-2xl bg-secondary/30 border border-border">
              <span className="text-3xl flex-shrink-0 mt-0.5">{card.icon}</span>
              <div>
                <p className="font-semibold text-foreground mb-2">{card.heading}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-primary/20 p-10 text-center">
          <p className="text-muted-foreground/40 text-sm mb-2">Video testimonials coming after first departures</p>
          <p className="text-muted-foreground/25 text-xs">July 2026 onwards</p>
        </div>

      </div>
    </section>
  );
}