import { CityMap } from '../components/CityMap';
import { useLiveTick } from '../hooks/useLiveTick';
import { useCommand, useVisibleVehicles } from '../store';

const LEGEND = [
  { cls: 'moving', label: 'Moving' },
  { cls: 'flagged', label: 'Flagged' },
  { cls: 'stopped', label: 'Stop order' },
  { cls: 'escort', label: 'Escort' },
  { cls: 'impounded', label: 'Impound hold' },
] as const;

export function LiveCity() {
  useLiveTick();
  const vehicles = useVisibleVehicles();
  const selectedId = useCommand((s) => s.selectedId);
  const select = useCommand((s) => s.select);

  return (
    <div className="card">
      <div className="card-h">
        <div>
          <h3>Jos live map</h3>
          <div className="card-h-sub">Real-time TIN-registered trips · click a unit to inspect</div>
        </div>
        <span className="chip">{vehicles.length} units visible</span>
      </div>
      <CityMap vehicles={vehicles} selectedId={selectedId} onSelect={select} tall />
      <div className="map-legend">
        {LEGEND.map((l) => (
          <span key={l.cls} className="legend-item">
            <i className={`legend-dot ${l.cls}`} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
