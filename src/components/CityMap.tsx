import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, ZoomControl, useMap } from 'react-leaflet';
import { places } from '../data/city';
import { JOS_CENTER, MAP_ATTRIBUTION, MAP_TILE, placeIcon, vehicleIcon } from '../lib/map';
import type { LiveVehicle } from '../types';

function FlyToSelected({ vehicles, selectedId }: { vehicles: LiveVehicle[]; selectedId: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const selected = vehicles.find((v) => v.id === selectedId);
    if (!selected) return;
    map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 14), { duration: 0.6 });
    // Only re-fly when the user picks a different unit — not on every GPS tick
  }, [selectedId, map]);

  return null;
}

export function CityMap({
  vehicles,
  selectedId,
  onSelect,
  tall = false,
}: {
  vehicles: LiveVehicle[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  tall?: boolean;
}) {
  return (
    <div className={`map-wrap${tall ? ' map-wrap--tall' : ''}`}>
      <MapContainer
        center={[JOS_CENTER.lat, JOS_CENTER.lng]}
        zoom={13}
        className="leaflet-map"
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer url={MAP_TILE} attribution={MAP_ATTRIBUTION} />
        {tall ? <ZoomControl position="bottomright" /> : null}
        <FlyToSelected vehicles={vehicles} selectedId={selectedId} />

        {places.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={placeIcon()}>
            <Tooltip direction="top" offset={[0, -6]} opacity={0.95} className="map-tip">
              {p.name}
            </Tooltip>
          </Marker>
        ))}

        {vehicles.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            icon={vehicleIcon(v, selectedId === v.id)}
            eventHandlers={{ click: () => onSelect(v.id) }}
          >
            <Popup className="map-popup">
              <strong>{v.plate}</strong>
              <span>{v.driver}</span>
              <span>{v.vehicleName} · {v.speedKmh} km/h</span>
              <span className={`status-${v.status}`}>{v.status}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="map-overlay">
        <span className="map-badge">LIVE · JOS</span>
      </div>
    </div>
  );
}

export { useLiveTick } from '../hooks/useLiveTick';
