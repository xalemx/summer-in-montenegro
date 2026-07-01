import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';

const TYPE_EMOJI = {
  Accommodation: '🏨', Transfer: '🚗', Activity: '🧭', Restaurant: '🍽️',
  Guide: '🧭', 'Car Rental': '🚗', 'Boat Trip': '⛵', Experience: '✨', Other: '📍',
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function numberedIcon(n, emoji) {
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:34px;height:34px;">
      <div style="width:34px;height:34px;border-radius:50%;background:#2f6f5e;color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.45);">${emoji}</div>
      <span style="position:absolute;top:-7px;right:-7px;background:#fff;color:#2f6f5e;border-radius:9999px;min-width:18px;height:18px;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid #2f6f5e;padding:0 3px;">${n}</span>
    </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16],
  });
}

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 1) map.setView(points[0], 12);
    else if (points.length > 1) map.fitBounds(L.latLngBounds(points), { padding: [50, 50] });
  }, [points]);
  return null;
}

export default function ProposalMap({ items }) {
  const [coords, setCoords] = useState({});
  const [loading, setLoading] = useState(true);

  const waypoints = useMemo(() => items.slice().sort((a, b) => (a.day_number || 1) - (b.day_number || 1) || (a.sort_order || 0) - (b.sort_order || 0)).filter(i => (i.location || i.title)), [items]);

  useEffect(() => {
    let alive = true;
    (async () => {
      for (const it of waypoints) {
        if (typeof it.latitude === 'number' && typeof it.longitude === 'number') {
          if (alive) setCoords(prev => ({ ...prev, [it.id]: { lat: it.latitude, lon: it.longitude } }));
          continue;
        }
        try {
          const res = await base44.functions.invoke('geocodeItem', { proposal_item_id: it.id, location: it.location || it.title });
          const d = res.data;
          if (alive && d && typeof d.lat === 'number') setCoords(prev => ({ ...prev, [it.id]: { lat: d.lat, lon: d.lon } }));
        } catch (e) { /* skip */ }
        await sleep(1100);
      }
      if (alive) setLoading(false);
    })();
    return () => { alive = false; };
  }, [waypoints]);

  const validWaypoints = waypoints.filter(w => coords[w.id]);
  const points = validWaypoints.map(w => [coords[w.id].lat, coords[w.id].lon]);

  if (!waypoints.length) return null;
  if (points.length === 0 && loading) return <div className="flex items-center justify-center py-10 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} /> Plotting your route on the Montenegro map…</div>;
  if (points.length === 0) return <p className="text-sm text-muted-foreground text-center py-6">No mappable locations found for this itinerary yet.</p>;

  return (
    <div className="relative">
      <MapContainer center={[42.7, 19.4]} zoom={8} scrollWheelZoom={false} className="w-full h-[420px] md:h-[480px] rounded-2xl border border-border overflow-hidden z-0">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {points.length > 1 && <Polyline positions={points} pathOptions={{ color: '#2f6f5e', weight: 3, dashArray: '6 8', opacity: 0.9 }} />}
        {validWaypoints.map((w, idx) => {
          const c = coords[w.id];
          const emoji = TYPE_EMOJI[w.item_type] || '📍';
          return (
            <Marker key={w.id} position={[c.lat, c.lon]} icon={numberedIcon(idx + 1, emoji)}>
              <Popup>
                <div>
                  <p className="font-semibold text-sm">{idx + 1}. {w.title}</p>
                  <p className="text-xs text-slate-500">{w.item_type}{w.location ? ` · ${w.location}` : ''}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Day {w.day_number || 1}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
        <FitBounds points={points} />
      </MapContainer>
      <p className="text-xs text-muted-foreground mt-2 text-center">Your journey in order — {validWaypoints.length} stops</p>
    </div>
  );
}