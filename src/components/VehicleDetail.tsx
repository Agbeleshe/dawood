import { ACTION_LABEL, ROLES } from '../data/roles';
import { useCommand } from '../store';
import type { ActionKind, LiveVehicle } from '../types';

export function VehicleDetail({
  vehicle,
  onDone,
}: {
  vehicle: LiveVehicle;
  onDone: (msg: string) => void;
}) {
  const agent = useCommand((s) => s.agent)!;
  const perform = useCommand((s) => s.perform);
  const role = ROLES[agent.role];

  const run = (kind: ActionKind) => {
    const err = perform(kind, vehicle.id);
    onDone(err || `${ACTION_LABEL[kind]} logged for ${vehicle.plate}.`);
  };

  const isAlert = vehicle.status === 'flagged' || vehicle.status === 'impounded';

  return (
    <div className="card-b">
      <div className="detail-header">
        <div>
          <div className="detail-plate">{vehicle.plate}</div>
          <div className="detail-sub">{vehicle.vehicleName} · {vehicle.kind}</div>
        </div>
        <span className={`chip ${isAlert ? 'danger' : 'ok'}`}>{vehicle.status}</span>
      </div>

      <dl className="kv">
        <dt>Driver</dt>
        <dd>{vehicle.driver} · {vehicle.driverId}</dd>
        <dt>Trip</dt>
        <dd>{vehicle.from} → {vehicle.to}</dd>
        <dt>Area</dt>
        <dd>{vehicle.area}</dd>
        <dt>Speed</dt>
        <dd>{vehicle.speedKmh} km/h</dd>
        <dt>Papers</dt>
        <dd>{vehicle.papersOk ? 'Current' : 'Attention required'}</dd>
        <dt>Passenger</dt>
        <dd>
          {role.canSeePassenger
            ? (vehicle.passenger ?? 'Not disclosed on this trip')
            : <span className="muted">Hidden · not required for this role</span>}
        </dd>
        <dt>Corridor</dt>
        <dd>{vehicle.night ? 'Night corridor' : 'Day operations'}</dd>
      </dl>

      <div className="actions">
        {role.actions.map((a) => (
          <button
            key={a}
            className={`btn btn-sm ${a === 'impound' ? 'btn-danger' : 'btn-outline'}`}
            onClick={() => run(a)}
          >
            {ACTION_LABEL[a]}
          </button>
        ))}
      </div>
    </div>
  );
}
