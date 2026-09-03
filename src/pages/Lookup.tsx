import { useMemo, useState } from 'react';
import { VehicleDetail } from '../components/VehicleDetail';
import { useVisibleVehicles } from '../store';

export function Lookup() {
  const vehicles = useVisibleVehicles();
  const [q, setQ] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const hit = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return vehicles.filter(
      (v) =>
        v.plate.toLowerCase().includes(s) ||
        v.driverId.toLowerCase().includes(s) ||
        v.tripId.toLowerCase().includes(s) ||
        v.driver.toLowerCase().includes(s)
    );
  }, [q, vehicles]);

  return (
    <div className="split">
      <div className="card">
        <div className="card-h">
          <h3>Lawful lookup</h3>
          <span className="chip neutral">{hit.length} results</span>
        </div>
        <div className="card-b">
          <p className="muted" style={{ marginTop: 0, marginBottom: 16, fontSize: 13 }}>
            Search by plate, driver ID or trip ID. Results are limited to units your role may see.
          </p>
          <div className="field">
            <label>Query</label>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. PLT 421 KR" />
          </div>
          <div className="list">
            {hit.map((v) => (
              <div key={v.id} className="row">
                <div style={{ flex: 1 }}>
                  <div className="t">{v.plate}</div>
                  <div className="s">{v.driver} · {v.driverId} · {v.tripId}</div>
                </div>
                <span className={`chip ${v.status === 'flagged' ? 'danger' : 'ok'}`}>{v.status}</span>
              </div>
            ))}
            {q.trim().length >= 2 && hit.length === 0 ? (
              <p className="muted" style={{ textAlign: 'center', padding: '20px 0' }}>
                No match in your authorised set.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-h">
          <h3>Record</h3>
        </div>
        {hit[0] ? (
          <VehicleDetail
            vehicle={hit[0]}
            onDone={(m) => {
              setToast(m);
              window.setTimeout(() => setToast(null), 2400);
            }}
          />
        ) : (
          <p className="card-b muted">Enter a plate or ID to load a record.</p>
        )}
      </div>
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
