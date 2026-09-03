import { places } from './city';
import type { Agent, Incident, LiveVehicle } from '../types';

export const DEMO_PASSWORD = 'demo123';

export const agents: Agent[] = [
  {
    id: 'a-cmd',
    name: 'Adaobi Eze',
    email: 'command@tinride.ng',
    password: DEMO_PASSWORD,
    role: 'command',
    unit: 'TIN Operations HQ',
    badge: 'CMD-01',
  },
  {
    id: 'a-npf',
    name: 'DSP Musa Bako',
    email: 'police@tinride.ng',
    password: DEMO_PASSWORD,
    role: 'police',
    unit: 'Jos Central Division',
    badge: 'NPF-4421',
  },
  {
    id: 'a-frsc',
    name: 'RSC Ladi Pam',
    email: 'frsc@tinride.ng',
    password: DEMO_PASSWORD,
    role: 'frsc',
    unit: 'FRSC RS8.1 Jos',
    badge: 'FRSC-8812',
  },
  {
    id: 'a-vio',
    name: 'Insp. Yakubu Dung',
    email: 'vio@tinride.ng',
    password: DEMO_PASSWORD,
    role: 'vio',
    unit: 'Plateau VIO Desk',
    badge: 'VIO-190',
  },
  {
    id: 'a-nscdc',
    name: 'SC Gyang Bot',
    email: 'nscdc@tinride.ng',
    password: DEMO_PASSWORD,
    role: 'nscdc',
    unit: 'NSCDC Plateau Command',
    badge: 'NSCDC-77',
  },
  {
    id: 'a-sec',
    name: 'Fatima Sani',
    email: 'security@tinride.ng',
    password: DEMO_PASSWORD,
    role: 'security',
    unit: 'TIN Night Corridor Team',
    badge: 'SEC-12',
  },
  {
    id: 'a-trf',
    name: 'Cpl. Nnamdi Obi',
    email: 'traffic@tinride.ng',
    password: DEMO_PASSWORD,
    role: 'traffic',
    unit: 'Terminus–Polo Control',
    badge: 'TRF-09',
  },
];

function ping() {
  return new Date().toISOString();
}

const drivers = [
  { name: 'Bala Aliyu', driverId: 'TR-D-0421', plate: 'PLT 421 KR', kind: 'keke' as const, vehicleName: 'Bajaj RE (Keke)' },
  { name: 'Amina Yusuf', driverId: 'TR-D-0188', plate: 'PLT 188 OK', kind: 'bike' as const, vehicleName: 'Bajaj Boxer (Bike)' },
  { name: 'Chinedu Okeke', driverId: 'TR-D-0550', plate: 'ABJ 550 XY', kind: 'car' as const, vehicleName: 'Toyota Corolla' },
  { name: 'Ibrahim Musa', driverId: 'TR-D-0332', plate: 'ABJ 123 XY', kind: 'bus' as const, vehicleName: 'Toyota Coaster (Bus)' },
  { name: 'Hauwa Gyang', driverId: 'TR-D-0701', plate: 'PLT 701 JG', kind: 'keke' as const, vehicleName: 'Bajaj RE (Keke)' },
  { name: 'Peter Pam', driverId: 'TR-D-0612', plate: 'PLT 612 PP', kind: 'car' as const, vehicleName: 'Honda Accord' },
  { name: 'Sadiya Umar', driverId: 'TR-D-0444', plate: 'KN 444 SA', kind: 'bike' as const, vehicleName: 'TVS Apache' },
  { name: 'Joel Nanle', driverId: 'TR-D-0288', plate: 'PLT 288 JN', kind: 'shared' as const, vehicleName: 'Shared shuttle' },
  { name: 'Maryam Bello', driverId: 'TR-D-0810', plate: 'ABJ 810 MB', kind: 'car' as const, vehicleName: 'Toyota Camry' },
  { name: 'Tunde Ade', driverId: 'TR-D-0199', plate: 'PLT 199 TA', kind: 'keke' as const, vehicleName: 'Bajaj RE (Keke)' },
  { name: 'Kemi Jos', driverId: 'TR-D-0505', plate: 'PLT 505 KJ', kind: 'bike' as const, vehicleName: 'Bajaj Boxer (Bike)' },
  { name: 'Usman Haruna', driverId: 'TR-D-0366', plate: 'KD 366 UH', kind: 'bus' as const, vehicleName: 'Hiace (Bus)' },
];

const routes = [
  ['Terminus Market', 'University of Jos'],
  ['Farin Gada', 'Polo Roundabout'],
  ['Bukuru', 'Terminus Market'],
  ['Rayfield', 'JUTH'],
  ['Dilimi', 'Plateau Secretariat'],
  ['Old Airport Junction', 'Terminus Market'],
  ['University of Jos', 'Farin Gada'],
  ['Polo Roundabout', 'Rayfield'],
];

export const seedVehicles: LiveVehicle[] = drivers.map((d, i) => {
  const p = places[i % places.length];
  const r = routes[i % routes.length];
  const flagged = i === 2;
  const papers = i !== 4 && i !== 9;
  return {
    id: `v-${i + 1}`,
    driver: d.name,
    driverId: d.driverId,
    plate: d.plate,
    kind: d.kind,
    vehicleName: d.vehicleName,
    from: r[0],
    to: r[1],
    area: p.area,
    lat: Math.min(9.99, Math.max(9.825, p.lat + (i % 3) * 0.004 - 0.006)),
    lng: Math.min(8.955, Math.max(8.815, p.lng + ((i * 7) % 5) * 0.003 - 0.005)),
    heading: (i * 47) % 360,
    speedKmh: flagged ? 0 : 18 + (i % 8) * 4,
    status: flagged ? 'flagged' : i === 6 ? 'escort' : 'moving',
    tripId: `TRP-24${100 + i}`,
    passenger: ['Mustapha Dawood', 'Aisha Gyang', 'John Pam', 'Ngozi Eze', undefined, 'Ladi Bot'][i % 6],
    night: i === 6 || i === 8,
    papersOk: papers,
    lastPing: ping(),
  };
});

export const seedIncidents: Incident[] = [
  {
    id: 'INC-1042',
    kind: 'sos',
    title: 'Rider SOS · Polo Roundabout',
    area: 'Polo',
    vehicleId: 'v-3',
    plate: 'ABJ 550 XY',
    status: 'open',
    createdAt: ping(),
    assignedTo: 'police',
    notes: 'Panic share from passenger app. Live pin on Polo. TIN Care escalated to Police.',
  },
  {
    id: 'INC-1043',
    kind: 'crash',
    title: 'Minor collision · Old Airport Junction',
    area: 'Rayfield Road',
    vehicleId: 'v-4',
    plate: 'ABJ 123 XY',
    status: 'dispatched',
    createdAt: ping(),
    assignedTo: 'frsc',
    notes: 'Two vehicles, no reported fatality. FRSC unit en route.',
  },
  {
    id: 'INC-1044',
    kind: 'papers',
    title: 'Expired inspection · keke PLT 701 JG',
    area: 'Terminus',
    vehicleId: 'v-5',
    plate: 'PLT 701 JG',
    status: 'open',
    createdAt: ping(),
    assignedTo: 'vio',
    notes: 'VIO flag from last checkpoint. Vehicle still on a live trip.',
  },
  {
    id: 'INC-1045',
    kind: 'night_escort',
    title: 'Night corridor escort · Terminus–Rayfield',
    area: 'Rayfield',
    vehicleId: 'v-7',
    plate: 'KN 444 SA',
    status: 'on_scene',
    createdAt: ping(),
    assignedTo: 'security',
    notes: 'Licensed TIN Security covering night bike until drop-off.',
  },
  {
    id: 'INC-1046',
    kind: 'road_obstruction',
    title: 'Obstruction · Dilimi spare-parts stretch',
    area: 'Dilimi',
    status: 'open',
    createdAt: ping(),
    assignedTo: 'traffic',
    notes: 'Parked trucks blocking keke lane. Traffic desk notified.',
  },
];
