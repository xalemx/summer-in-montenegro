export default function GuestMemories() {
  return (
    <section className="py-24 px-6 bg-secondary/30 border-y border-border">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Guest Memories</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">Photos, Videos &amp; Stories</h2>
        <p className="text-muted-foreground mb-12 max-w-lg mx-auto">
          Real guests. Real trips. Real memories from the people who've travelled with us.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 opacity-30 pointer-events-none select-none" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`rounded-2xl bg-muted border border-border ${i === 0 || i === 5 ? 'row-span-2' : ''}`} style={{ aspectRatio: i === 0 || i === 5 ? '1/2' : '1/1' }} />
          ))}
        </div>

        <div className="inline-flex flex-col items-center gap-3 px-10 py-8 rounded-2xl bg-card border border-dashed border-border">
          <span className="text-3xl">📸</span>
          <p className="font-semibold text-foreground">Coming after Summer 2026</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Guest photos, videos and testimonials will appear here after our first departures in July 2026.
          </p>
        </div>
      </div>
    </section>
  );
}