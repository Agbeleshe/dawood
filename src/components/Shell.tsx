import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Activity,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Search,
  ShieldAlert,
  Siren,
} from 'lucide-react';
import { ROLES } from '../data/roles';
import { useCommand } from '../store';

const links = [
  { to: '/', label: 'Duty desk', icon: LayoutDashboard },
  { to: '/city', label: 'Live city', icon: MapPinned },
  { to: '/riders', label: 'Riders', icon: Activity },
  { to: '/incidents', label: 'Incidents', icon: Siren },
  { to: '/lookup', label: 'Lookup', icon: Search },
  { to: '/audit', label: 'Audit log', icon: ClipboardList },
];

function useClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }));
  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }));
    }, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Shell() {
  const agent = useCommand((s) => s.agent)!;
  const logout = useCommand((s) => s.logout);
  const role = ROLES[agent.role];
  const loc = useLocation();
  const clock = useClock();
  const title = links.find((l) => (l.to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(l.to)))?.label ?? 'Command';
  const initials = agent.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="shell">
      <aside className="side">
        <div className="side-brand">
          <img src="/logo.png" alt="" width={40} height={40} />
          <div>
            <div className="wordmark" style={{ fontSize: 17 }}>
              <span>TIN </span>
              <span>RIDE</span>
            </div>
            <div className="side-brand-sub">Command Board</div>
          </div>
        </div>

        <nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <l.icon size={16} strokeWidth={2} />
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="side-foot">
          <span className="badge-role">{role.short}</span>
          <div className="agent-card">
            <div className="agent-avatar">{initials}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{agent.name}</div>
              <div className="muted" style={{ fontSize: 11 }}>{agent.badge} · {agent.unit}</div>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={logout} style={{ width: '100%' }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      <section className="main">
        <header className="top">
          <h1>{title}</h1>
          <div className="top-meta">
            <span className="top-clock">{clock} WAT</span>
            <div className="live-pill">
              <span className="pulse" />
              LIVE · JOS
            </div>
          </div>
        </header>

        <div className="content">
          <div className="banner">
            <ShieldAlert size={15} />
            <span>
              Official duty use only. City activity is shown for lawful operations (SOS, crashes, papers, authorised escorts).
              Every action is logged to the audit trail.{' '}
              {role.cityWide ? 'City-wide operational view.' : `Assigned corridors: ${role.zones?.join(', ')}.`}
            </span>
          </div>
          <Outlet />
        </div>
      </section>
    </div>
  );
}
