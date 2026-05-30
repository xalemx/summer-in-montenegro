const PARTNERS = [
  {
    name: 'MountainView Resort',
    location: 'Gusinje',
    desc: 'Modern mountain resort hotel with scenic views of the surrounding peaks. Rated 4.6 on Google.',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFeW9ASqU_DhNHDYKP5WIFSx8d2TeGZcws-7JfrK7CTefSbswpjg1l59qxQYWKbqLtQG4GscJj6xmDv7bz15H3XK3ipyDzEZxv94n3QPw6c3JD-OPKGUKDmxX3v7b4xrrJg3mHRZMC3Sa3a=w800-h600-k-no',
    mapsUrl: 'https://maps.app.goo.gl/8wdCPiDfpc42xSbPA',
  },
  {
    name: 'Ethno House Bektesevic',
    location: 'Kruševo, Gusinje area',
    desc: 'Traditional Montenegrin guesthouse with authentic local charm. Rated 5.0 on Google.',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFfDmokcnJtlj6zGo8FucnUPtpAHbaSIAT6hGwo5iY-TdoH1nc5294Xq_gjBiVJm9X28cQg0Om9lFBXYkKvOSqW-n91v3h9uC-D_P3korpIunXjTacYWsK5Xh_8Wot9mVu6Nps6aZ_H6us=w800-h1067-k-no',
    mapsUrl: 'https://maps.app.goo.gl/iG6eJUg2KMrfbEA17',
  },
  {
    name: 'Beach Bar Hemingway',
    location: 'Šušanj, Bar',
    desc: 'Iconic coastal bar in Bar — a great base for the first night on the Adriatic.',
    img: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH54ZrbWqqF0_fFU_vaHQVzX2DdxA-nGzCSk3jqLrLo2TPEShvZyBeXyB7jgN3ZwIMEbOQLnfO2rLf3Zxn0hHrX7J196oVmzVSGpDhlyJUf2rWPxdqXHuxQNnZe_uvX0iOMiAKCkEkTbvzh=w800-h600-k-no',
    mapsUrl: 'https://maps.app.goo.gl/cwLUfVLbh1exaAXZ7',
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

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {PARTNERS.map((p, i) => (
            <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{p.location}</p>
                <h3 className="font-heading text-xl font-semibold mb-2">{p.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{p.desc}</p>
                <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-medium hover:underline">View on Google Maps →</a>
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