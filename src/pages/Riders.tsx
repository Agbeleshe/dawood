import { useMemo, useState } from 'react';
import { VehicleDetail } from '../components/VehicleDetail';
import { useLiveTick } from '../hooks/useLiveTick';
import { ROLES } from '../data/roles';
import { useCommand, useVisibleVehicles } from '../store';

export function Riders() {
  useLiveTick();
  const agent = useCommand((s) => s.agent)!;
  const vehicles = useVisibleVehicles();
  const selectedId = useCommand((s) => s.selectedId);
  const select = useCommand((s) => s.select);
  const [q, setQ] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const role = ROLES[agent.role];

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return vehicles.filter(
      (v) =>
        !s ||
        v.plate.toLowerCase().includes(s) ||
        v.driver.toLowerCase().includes(s) ||
        v.area.toLowerCase().includes(s) ||
        v.tripId.toLowerCase().includes(s)
    );
  }, [vehicles, q]);

  const selected = vehicles.find((v) => v.id === selectedId);

  return (
    <div className="split">
      <div className="card">
        <div className="card-h">
          <h3>Active riders</h3>
          <input
            className="search-input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Plate, driver, area…"
          />
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Plate</th>
                <th>Driver</th>
                <th>Kind</th>
                <th>Corridor</th>
                <th>Status</th>
                {role.canSeePassenger ? <th>Passenger</th> : null}
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((v) => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 600 }}>{v.plate}</td>
                  <td>{v.driver}</td>
                  <td><span className="chip neutral">{v.kind}</span></td>
                  <td className="muted">{v.from} → {v.to}</td>
                  <td>
                    <span className={`chip ${v.status === 'flagged' || v.status === 'impounded' ? 'danger' : 'ok'}`}>
                      {v.status}
                    </span>
                  </td>
                  {role.canSeePassenger ? <td>{v.passenger ?? '—'}</td> : null}
                  <td>
                    <button className="link" onClick={() => select(v.id)}>Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-h">
          <h3>Duty actions</h3>
        </div>
        {selected ? (
          <VehicleDetail
            vehicle={selected}
            onDone={(m) => {
              setToast(m);
              window.setTimeout(() => setToast(null), 2400);
            }}
          />
        ) : (
          <p className="card-b muted">Select a rider to act within your role.</p>
        )}
      </div>
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
