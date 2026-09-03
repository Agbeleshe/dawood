import { ROLES } from '../data/roles';
import { useCommand } from '../store';

export function Audit() {
  const audit = useCommand((s) => s.audit);

  return (
    <div className="card">
      <div className="card-h">
        <div>
          <h3>Audit log</h3>
          <div className="card-h-sub">Immutable duty trail for this command desk</div>
        </div>
        <span className="chip neutral">{audit.length} entries</span>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Officer</th>
              <th>Role</th>
              <th>Action</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {audit.map((a) => (
              <tr key={a.id}>
                <td className="muted">{new Date(a.at).toLocaleString()}</td>
                <td>{a.agent}</td>
                <td><span className="chip neutral">{ROLES[a.role].short}</span></td>
                <td className="id-cell">{a.action}</td>
                <td>{a.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
