import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  { num: 1, name: 'Podgorica', desc: 'Day 1 · Arrival. Airport pickup. Your Montenegro adventure begins.', lat: 42.441, lng: 19.263 },
  { num: 2, name: 'Skadar Lake', desc: 'Day 1 · Scenic stop at the Balkans\' largest lake. Stunning views.', lat: 42.167, lng: 19.267 },
  { num: 3, name: 'Bar', desc: 'Day 1–2 · Sleep. Coastal town, local atmosphere, Adriatic feel.', lat: 42.098, lng: 19.100 },
  { num: 4, name: 'Biogradska Gora', desc: 'Day 2 · One of Europe\'s last primeval forests. A hidden gem.', lat: 42.887, lng: 19.609 },
  { num: 5, name: 'Gusinje', desc: 'Day 2–6 · Your mountain base. Boutique guesthouse, local food, wild landscapes.', lat: 42.558, lng: 19.834 },
  { num: 6, name: 'Plavsko Jezero', desc: 'Day 3–4 · Glacial lake at 900m. Swimming, kayaking, coffee by the water.', lat: 42.599, lng: 19.945 },
  { num: 7, name: 'Prokletije', desc: 'Day 3 · Accursed Mountains National Park. Epic hikes, viewpoints, mountain air.', lat: 42.510, lng: 19.790 },
  { num: 8, name: 'Kolašin', desc: 'Day 7 · Return south via this charming mountain town.', lat: 42.823, lng: 19.524 },
];


export default function MonteMap() {
  return (
    <section className="py-24 px-0 bg-background">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <p className="text-center text-primary/60 text-xs tracking-[0.4em] uppercase mb-4">The Route</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center text-foreground leading-tight mb-4">
          From coast to mountains.<br />
          <em>Eight days, six places.</em>
        </h2>
        <p className="text-center text-muted-foreground max-w-md mx-auto">
          Fly into Podgorica, stop at Skadar Lake, sleep in Bar, then head north through Biogradska Gora to Gusinje. Return via Kolašin.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-border" style={{ height: '480px' }}>
          <MapContainer
            center={[42.5, 19.35]}
            zoom={9}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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