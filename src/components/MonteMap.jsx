import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default Leaflet icon paths broken by Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const makeIcon = (num) => L.divIcon({
  html: `<div style="
    width:32px; height:32px; border-radius:50%;
    background: hsl(158,45%,18%); color:#fff;
    display:flex; align-items:center; justify-content:center;
    font-family: serif; font-weight:700; font-size:13px;
    border:2px solid hsl(43,90%,50%); box-shadow:0 2px 12px rgba(0,0,0,0.35);
  ">${num}</div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
});

const STOPS = [
  { num: 1, name: 'Podgorica', desc: 'Day 1 · Arrival. Meet your host. South Montenegro welcome.', lat: 42.441, lng: 19.263 },
  { num: 2, name: 'Kotor', desc: 'Day 1 · Optional coastal stop — UNESCO bay views, old town walls.', lat: 42.424, lng: 18.771 },
  { num: 3, name: 'Plav', desc: 'Day 2–4 · Glacial lake at 900m. Swimming, kayaking, coffee by the water.', lat: 42.599, lng: 19.945 },
  { num: 4, name: 'Gusinje', desc: 'Day 2–6 · Your mountain base. Boutique guesthouse, local food, real life.', lat: 42.558, lng: 19.834 },
  { num: 5, name: 'Prokletije', desc: 'Day 3 · Accursed Mountains. Epic hikes, viewpoints, mountain air.', lat: 42.510, lng: 19.790 },
];

const ROUTE = STOPS.map(s => [s.lat, s.lng]);

export default function MonteMap() {
  return (
    <section className="py-24 px-0 bg-background">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <p className="text-center text-primary/60 text-xs tracking-[0.4em] uppercase mb-4">The Route</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-foreground leading-tight mb-4">
          From coast to mountains.<br />
          <em>Seven days, five places.</em>
        </h2>
        <p className="text-center text-muted-foreground max-w-md mx-auto">
          Fly into Podgorica, head south to the coast, then drive north into wild Montenegro. Each stop more remote than the last.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-border" style={{ height: '480px' }}>
          <MapContainer
            center={[42.52, 19.2]}
            zoom={9}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Polyline
              positions={ROUTE}
              pathOptions={{ color: 'hsl(43,90%,50%)', weight: 3, dashArray: '8 6', opacity: 0.85 }}
            />
            {STOPS.map(stop => (
              <Marker key={stop.num} position={[stop.lat, stop.lng]} icon={makeIcon(stop.num)}>
                <Popup>
                  <div style={{ fontFamily: 'system-ui', minWidth: '180px' }}>
                    <strong style={{ fontSize: '14px' }}>{stop.name}</strong>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', lineHeight: '1.4' }}>{stop.desc}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Stop legend */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="flex flex-wrap justify-center gap-3">
          {STOPS.map(stop => (
            <div key={stop.num} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">{stop.num}</span>
              <span className="font-medium text-foreground">{stop.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}