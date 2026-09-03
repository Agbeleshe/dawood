import { useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JOS_BOUNDS } from './data/city';
import { ROLES } from './data/roles';
import { agents, seedIncidents, seedVehicles } from './data/seed';
import type { ActionKind, AgencyRole, Agent, AuditEntry, Incident, LiveVehicle } from './types';

function uid(prefix: string) {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function now() {
  return new Date().toISOString();
}

type State = {
  agent: Agent | null;
  vehicles: LiveVehicle[];
  incidents: Incident[];
  audit: AuditEntry[];
  selectedId: string | null;
  login: (email: string, password: string, roleHint?: AgencyRole) => string | null;
  logout: () => void;
  select: (id: string | null) => void;
  tick: () => void;
  perform: (kind: ActionKind, vehicleId?: string, extra?: string) => string;
};

function canSeeVehicle(role: AgencyRole, v: LiveVehicle) {
  const def = ROLES[role];
  if (def.cityWide) return true;
  return (def.zones ?? []).some((z) => v.area === z || v.from.includes(z) || v.to.includes(z));
}

export const useCommand = create<State>()(
  persist(
    (set, get) => ({
      agent: null,
      vehicles: seedVehicles,
      incidents: seedIncidents,
      audit: [
        {
          id: 'aud-0',
          at: now(),
          agent: 'System',
          role: 'command',
          action: 'session',
          detail: 'Duty desk opened. All actions on this board are logged for lawful review.',
        },
      ],
      selectedId: null,

      login: (email, password, roleHint) => {
        const e = email.trim().toLowerCase();
        const match = agents.find(
          (a) => a.email === e && a.password === password && (!roleHint || a.role === roleHint)
        );
        if (!match) {
          const byRole = roleHint ? agents.find((a) => a.role === roleHint && a.password === password) : undefined;
          if (byRole && (!e || e === byRole.email)) {
            set({ agent: byRole });
            return null;
          }
          return 'Wrong email, password or role.';
        }
        set({ agent: match });
        return null;
      },

      logout: () => set({ agent: null, selectedId: null }),
      select: (id) => set({ selectedId: id }),

      tick: () =>
        set((s) => ({
          vehicles: s.vehicles.map((v) => {
            if (v.status === 'impounded' || v.status === 'stopped') return v;
            const step = 0.00032;
            const nlat = v.lat + Math.cos((v.heading * Math.PI) / 180) * step;
            const nlng = v.lng + Math.sin((v.heading * Math.PI) / 180) * step;
            let heading = v.heading;
            let lat = nlat;
            let lng = nlng;
            if (
              lat < JOS_BOUNDS.minLat ||
              lat > JOS_BOUNDS.maxLat ||
              lng < JOS_BOUNDS.minLng ||
              lng > JOS_BOUNDS.maxLng
            ) {
              heading = (heading + 140) % 360;
              lat = Math.min(JOS_BOUNDS.maxLat, Math.max(JOS_BOUNDS.minLat, v.lat));
              lng = Math.min(JOS_BOUNDS.maxLng, Math.max(JOS_BOUNDS.minLng, v.lng));
            }
            return { ...v, lat, lng, heading, lastPing: now(), speedKmh: v.status === 'idle' ? 0 : v.speedKmh };
          }),
        })),

      perform: (kind, vehicleId, extra) => {
        const agent = get().agent;
        if (!agent) return 'Not signed in.';
        const allowed = ROLES[agent.role].actions.includes(kind);
        if (!allowed) return 'This action is outside your duty role.';

        const vehicle = vehicleId ? get().vehicles.find((v) => v.id === vehicleId) : undefined;
        if (vehicle && !canSeeVehicle(agent.role, vehicle)) {
          return 'This vehicle is outside your assigned corridors.';
        }

        const labels: Record<ActionKind, string> = {
          dispatch: 'Dispatched a unit',
          stop: 'Issued a lawful stop order',
          inspect: 'Issued an inspection notice',
          impound: 'Placed an impound hold',
          escort: 'Assigned an escort',
          safety_alert: 'Broadcast a safety alert',
          open_case: 'Opened an operational case',
          resolve: 'Resolved the selected matter',
        };

        const detail = [
          labels[kind],
          vehicle ? `for ${vehicle.plate} (${vehicle.driver})` : extra || 'city desk',
          extra && vehicle ? `— ${extra}` : '',
        ]
          .filter(Boolean)
          .join(' ');

        set((s) => {
          const audit: AuditEntry = {
            id: uid('AUD'),
            at: now(),
            agent: agent.name,
            role: agent.role,
            action: kind,
            detail,
            vehicleId: vehicle?.id,
          };

          let vehicles = s.vehicles;
          if (vehicle) {
            vehicles = s.vehicles.map((v) => {
              if (v.id !== vehicle.id) return v;
              if (kind === 'stop') return { ...v, status: 'stopped', speedKmh: 0 };
              if (kind === 'impound') return { ...v, status: 'impounded', speedKmh: 0 };
              if (kind === 'inspect') return { ...v, status: 'flagged' };
              if (kind === 'escort') return { ...v, status: 'escort' };
              if (kind === 'resolve') return { ...v, status: 'moving', speedKmh: Math.max(16, v.speedKmh) };
              return v;
            });
          }

          let incidents = s.incidents;
          if (kind === 'open_case' || kind === 'dispatch' || kind === 'safety_alert') {
            incidents = [
              {
                id: uid('INC'),
                kind: kind === 'safety_alert' ? 'speeding' : 'sos',
                title: extra || `${labels[kind]} · ${vehicle?.area ?? CITY_FALLBACK}`,
                area: vehicle?.area ?? 'Jos',
                vehicleId: vehicle?.id,
                plate: vehicle?.plate,
                status: kind === 'dispatch' ? 'dispatched' : 'open',
                createdAt: now(),
                assignedTo: agent.role,
                notes: detail,
              },
              ...incidents,
            ];
          }
          if (kind === 'resolve' && vehicle) {
            incidents = incidents.map((inc) =>
              inc.vehicleId === vehicle.id && inc.status !== 'closed' ? { ...inc, status: 'resolved' } : inc
            );
          }

          return { vehicles, incidents, audit: [audit, ...s.audit] };
        });

        return '';
      },
    }),
    {
      name: 'tinride-command-v2',
      partialize: (s) => ({
        agent: s.agent,
        vehicles: s.vehicles,
        incidents: s.incidents,
        audit: s.audit,
      }),
    }
  )
);

const CITY_FALLBACK = 'Jos desk';

export function visibleVehicles(role: AgencyRole, vehicles: LiveVehicle[]) {
  return vehicles.filter((v) => canSeeVehicle(role, v));
}

/** Stable list for React — never filter inside a Zustand selector (that returns a new array every snapshot). */
export function useVisibleVehicles() {
  const role = useCommand((s) => s.agent?.role);
  const vehicles = useCommand((s) => s.vehicles);
  return useMemo(() => (role ? visibleVehicles(role, vehicles) : []), [role, vehicles]);
}
