import { useState } from 'react';
import { ROLES } from '../data/roles';
import { useCommand } from '../store';
import type { IncidentStatus } from '../types';

export function Incidents() {
  const incidents = useCommand((s) => s.incidents);
  const perform = useCommand((s) => s.perform);
  const agent = useCommand((s) => s.agent)!;
  const [toast, setToast] = useState<string | null>(null);
  const role = ROLES[agent.role];

  const act = (status: IncidentStatus, vehicleId?: string) => {
    const kind = status === 'resolved' ? 'resolve' : 'dispatch';
    if (!role.actions.includes(kind)) {
      setToast('Outside your duty role.');
      return;
    }
    const err = perform(kind, vehicleId);
    setToast(err || (kind === 'resolve' ? 'Incident updated.' : 'Unit dispatched.'));
    window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="card">
      <div className="card-h">
        <div>
          <h3>Incidents &amp; SOS</h3>
          <div className="card-h-sub">Escalated from the TIN RIDE app and field desks</div>
        </div>
        <span className="chip">{incidents.filter((i) => i.status === 'open').length} open</span>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Title</th>
              <th>Area</th>
              <th>Plate</th>
              <th>Status</th>
              <th>Desk</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id}>
                <td className="id-cell">{i.id}</td>
                <td><span className="chip neutral">{i.kind.replace('_', ' ')}</span></td>
                <td>{i.title}</td>
                <td>{i.area}</td>
                <td>{i.plate ?? '—'}</td>
                <td>
                  <span className={`chip ${i.status === 'open' ? 'danger' : 'ok'}`}>{i.status}</span>
                </td>
                <td className="muted">{i.assignedTo ?? 'unassigned'}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {role.actions.includes('dispatch') ? (
                    <button className="link" onClick={() => act('dispatched', i.vehicleId)}>Dispatch</button>
                  ) : null}{' '}
                  {role.actions.includes('resolve') ? (
                    <button className="link" onClick={() => act('resolved', i.vehicleId)}>Resolve</button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
