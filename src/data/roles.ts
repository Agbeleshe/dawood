import type { ActionKind, AgencyRole } from '../types';

export type RoleDef = {
  id: AgencyRole;
  label: string;
  short: string;
  agency: string;
  cityWide: boolean;
  zones?: string[];
  canSeePassenger: boolean;
  actions: ActionKind[];
  color: string;
  blurb: string;
};

export const ROLES: Record<AgencyRole, RoleDef> = {
  command: {
    id: 'command',
    label: 'TIN Command',
    short: 'Command',
    agency: 'TIN RIDE Operations HQ',
    cityWide: true,
    canSeePassenger: true,
    actions: ['dispatch', 'stop', 'inspect', 'impound', 'escort', 'safety_alert', 'open_case', 'resolve'],
    color: '#FFC107',
    blurb: 'Full operational oversight across Jos. Coordinate agencies and close cases.',
  },
  police: {
    id: 'police',
    label: 'Nigeria Police',
    short: 'Police',
    agency: 'Nigeria Police Force · Jos Division',
    cityWide: true,
    canSeePassenger: true,
    actions: ['dispatch', 'stop', 'impound', 'open_case', 'resolve'],
    color: '#4FC3F7',
    blurb: 'Lawful public-safety response: SOS, wanted plates, crime-linked trips, stop orders.',
  },
  frsc: {
    id: 'frsc',
    label: 'FRSC',
    short: 'FRSC',
    agency: 'Federal Road Safety Corps',
    cityWide: true,
    canSeePassenger: false,
    actions: ['dispatch', 'inspect', 'impound', 'safety_alert', 'open_case', 'resolve'],
    color: '#81C784',
    blurb: 'Road safety, crash response, speed and corridor compliance, vehicle fitness flags.',
  },
  vio: {
    id: 'vio',
    label: 'VIO',
    short: 'VIO',
    agency: 'Vehicle Inspection Office · Plateau',
    cityWide: true,
    canSeePassenger: false,
    actions: ['inspect', 'impound', 'open_case', 'resolve'],
    color: '#FFB74D',
    blurb: 'Papers, roadworthiness and inspection. Impound only for documented vehicle offences.',
  },
  nscdc: {
    id: 'nscdc',
    label: 'Civil Defence',
    short: 'NSCDC',
    agency: 'Nigeria Security and Civil Defence Corps',
    cityWide: true,
    canSeePassenger: false,
    actions: ['dispatch', 'escort', 'open_case', 'resolve'],
    color: '#A5D6A7',
    blurb: 'Critical-asset and community protection. SOS support and authorised escorts.',
  },
  security: {
    id: 'security',
    label: 'Security Agent',
    short: 'Security',
    agency: 'Licensed TIN Security Partner',
    cityWide: false,
    zones: ['Terminus', 'Polo', 'Rayfield'],
    canSeePassenger: false,
    actions: ['dispatch', 'escort', 'open_case'],
    color: '#CE93D8',
    blurb: 'Assigned corridors only. Night escorts and escalate — not city-wide personal tracking.',
  },
  traffic: {
    id: 'traffic',
    label: 'Traffic Control',
    short: 'Traffic',
    agency: 'State Traffic Management',
    cityWide: true,
    canSeePassenger: false,
    actions: ['stop', 'safety_alert', 'open_case', 'resolve'],
    color: '#90CAF9',
    blurb: 'Flow, obstruction and junction control. Issue stop and safety notices on corridors.',
  },
};

export const ACTION_LABEL: Record<ActionKind, string> = {
  dispatch: 'Dispatch unit',
  stop: 'Lawful stop order',
  inspect: 'Inspection notice',
  impound: 'Impound hold',
  escort: 'Assign escort',
  safety_alert: 'Safety alert',
  open_case: 'Open case',
  resolve: 'Mark resolved',
};
