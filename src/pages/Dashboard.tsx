import { useState } from 'react';
import { AlertTriangle, MapPin, Radio, Users } from 'lucide-react';
import { CityMap } from '../components/CityMap';
import { VehicleDetail } from '../components/VehicleDetail';
import { useLiveTick } from '../hooks/useLiveTick';
import { ROLES } from '../data/roles';
import { useCommand, useVisibleVehicles } from '../store';

export function Dashboard() {
  useLiveTick();
  const agent = useCommand((s) => s.agent)!;
  const vehicles = useVisibleVehicles();
  const incidents = useCommand((s) => s.incidents);
  const selectedId = useCommand((s) => s.selectedId);
  const select = useCommand((s) => s.select);
  const [toast, setToast] = useState<string | null>(null);
  const role = ROLES[agent.role];
  const selected = vehicles.find((v) => v.id === selectedId) ?? vehicles[0];
  const openInc = incidents.filter((i) => i.status === 'open' || i.status === 'dispatched').length;
  const flagged = vehicles.filter((v) => v.status === 'flagged' || v.status === 'impounded').length;

  return (
    <>
      <div className="stats">
        <div className="stat stat--accent">
          <div className="stat-head">
            <span className="k">Visible units</span>
            <div className="stat-icon"><Radio size={15} /></div>
          </div>
          <div className="v y">{vehicles.length}</div>
        </div>
        <div className="stat">
          <div className="stat-head">
            <span className="k">Open incidents</span>
            <div className="stat-icon"><AlertTriangle size={15} /></div>
          </div>
          <div className="v">{openInc}</div>
        </div>
        <div className="stat">
          <div className="stat-head">
            <span className="k">Flagged / hold</span>
            <div className="stat-icon"><Users size={15} /></div>
          </div>
          <div className="v">{flagged}</div>
        </div>
        <div className="stat">
          <div className="stat-head">
            <span className="k">Coverage</span>
            <div className="stat-icon"><MapPin size={15} /></div>
          </div>
          <div className="v v-sm">{role.cityWide ? 'Jos city-wide' : role.zones?.join(', ')}</div>
        </div>
      </div>

      <p className="role-blurb">{role.blurb}</p>

      <div className="split">
        <div className="card">
          <div className="card-h">
            <h3>Live activity map</h3>
            <span className="chip">Operational</span>
          </div>
          <CityMap
            vehicles={vehicles}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Selected unit</h3>
            {selected ? <span className="chip neutral">{selected.kind}</span> : null}
          </div>
          {selected ? (
            <VehicleDetail
              vehicle={selected}
              onDone={(m) => { setToast(m); window.setTimeout(() => setToast(null), 2400); }}
            />
          ) : (
            <p className="card-b muted">No unit in your corridor.</p>
          )}
        </div>
      </div>
      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}
