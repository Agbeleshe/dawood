export type AgencyRole =
  | 'command'
  | 'police'
  | 'frsc'
  | 'vio'
  | 'nscdc'
  | 'security'
  | 'traffic';

export type VehicleKind = 'keke' | 'bike' | 'car' | 'bus' | 'shared';

export type VehicleStatus = 'moving' | 'idle' | 'flagged' | 'stopped' | 'impounded' | 'escort';

export type IncidentKind =
  | 'sos'
  | 'crash'
  | 'fare_dispute'
  | 'papers'
  | 'speeding'
  | 'wanted_plate'
  | 'night_escort'
  | 'road_obstruction';

export type IncidentStatus = 'open' | 'dispatched' | 'on_scene' | 'resolved' | 'closed';

export type ActionKind =
  | 'dispatch'
  | 'stop'
  | 'inspect'
  | 'impound'
  | 'escort'
  | 'safety_alert'
  | 'open_case'
  | 'resolve';

export type Agent = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AgencyRole;
  unit: string;
  badge: string;
};

export type Place = {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
};

export type LiveVehicle = {
  id: string;
  driver: string;
  driverId: string;
  plate: string;
  kind: VehicleKind;
  vehicleName: string;
  from: string;
  to: string;
  area: string;
  lat: number;
  lng: number;
  heading: number;
  speedKmh: number;
  status: VehicleStatus;
  tripId: string;
  passenger?: string;
  night: boolean;
  papersOk: boolean;
  lastPing: string;
};

export type Incident = {
  id: string;
  kind: IncidentKind;
  title: string;
  area: string;
  vehicleId?: string;
  plate?: string;
  status: IncidentStatus;
  createdAt: string;
  assignedTo?: AgencyRole;
  notes: string;
};

export type AuditEntry = {
  id: string;
  at: string;
  agent: string;
  role: AgencyRole;
  action: string;
  detail: string;
  vehicleId?: string;
};
