import { useMemo, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { ROLES, type RoleDef } from '../data/roles';
import { agents, DEMO_PASSWORD } from '../data/seed';
import { useCommand } from '../store';
import type { AgencyRole } from '../types';

export function Login() {
  const login = useCommand((s) => s.login);
  const [role, setRole] = useState<AgencyRole>('police');
  const [email, setEmail] = useState(agents.find((a) => a.role === 'police')!.email);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [err, setErr] = useState<string | null>(null);

  const pick = (r: AgencyRole) => {
    setRole(r);
    const a = agents.find((x) => x.role === r)!;
    setEmail(a.email);
    setPassword(DEMO_PASSWORD);
    setErr(null);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = login(email, password, role);
    setErr(msg);
  };

  const list = useMemo(() => Object.values(ROLES) as RoleDef[], []);

  return (
    <div className="app-login">
      <div className="login-left">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/logo.png" alt="TIN RIDE" width={500} height={372} style={{ borderRadius: 16 }} />
        
        
          <p className="tag">
            <span className="y">Safe </span>Journey.{' '}
            <span className="y">Better </span>Future.
          </p>
          <p className="body">
            Command board for Police, FRSC, VIO, Civil Defence, licensed security and traffic desks.
            Monitor lawful city activity and act only within your authorised role.
          </p>
      
        </div>
      </div>

      <div className="login-right">
        <h2 className="h">Duty sign-in</h2>
        <p className="sub">Select your agency role to enter the command board.</p>

        <div className="role-grid">
          {list.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`role-chip${role === r.id ? ' active' : ''}`}
              onClick={() => pick(r.id)}
            >
              <b>{r.label}</b>
              <span>{r.agency}</span>
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Official email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {err ? <p className="err">{err}</p> : null}
          <button className="btn btn-primary" type="submit">
            Enter command board <ArrowRight size={16} />
          </button>
        </form>

        <p className="legal">
          This is not a public tracker. Passenger identity is shown only to roles with a lawful need (Police and TIN
          Command). Security agents see assigned corridors only. All queries and orders are stored in the audit log.
        </p>
        <p className="hint">Demo · police@tinride.ng · demo123</p>
      </div>
    </div>
  );
}
