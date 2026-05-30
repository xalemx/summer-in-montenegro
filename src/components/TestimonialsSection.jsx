const FEATURE_CARDS = [
  { icon: '👥', heading: 'Small Groups', body: 'Maximum 8 guests per departure.' },
  { icon: '🧭', heading: 'Local Host', body: 'Guidance throughout the journey.' },
  { icon: '🏔️', heading: 'Authentic Montenegro', body: 'Beyond crowded tourist areas.' },
  { icon: '🥾', heading: 'Flexible Experiences', body: 'Choose activities that suit your interests.' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-36 md:py-44 px-6 bg-background">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-primary/60 text-xs tracking-[0.4em] uppercase font-medium mb-4">Why Guests Choose Montenegro</p>
          <h2 className="font-heading text-5xl md:text-6xl font-light text-foreground leading-tight italic">
            Why Small-Group Travel Works.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {FEATURE_CARDS.map((card, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-4 text-center items-center">
              <span className="text-4xl">{card.icon}</span>
              <p className="font-semibold text-foreground text-base">{card.heading}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-primary/20 p-10 text-center">
          <p className="text-muted-foreground/40 text-sm mb-2">Video testimonials coming after first departures</p>
          <p className="text-muted-foreground/25 text-xs">July 2026 onwards</p>
        </div>

      </div>
    </section>
  );
}