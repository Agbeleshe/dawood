import type { Place } from '../types';

export const CITY = 'Jos, Plateau';

/** Jos city centre — used as default map anchor */
export const JOS_CENTER = { lat: 9.8965, lng: 8.8583 } as const;

export const JOS_BOUNDS = {
  minLat: 9.825,
  maxLat: 9.995,
  minLng: 8.815,
  maxLng: 8.955,
} as const;

export const places: Place[] = [
  { id: 'terminus', name: 'Terminus Market', area: 'Terminus', lat: 9.928, lng: 8.892 },
  { id: 'unijos', name: 'University of Jos', area: 'Bauchi Road', lat: 9.978, lng: 8.869 },
  { id: 'farin', name: 'Farin Gada', area: 'Farin Gada', lat: 9.905, lng: 8.852 },
  { id: 'polo', name: 'Polo Roundabout', area: 'Polo', lat: 9.915, lng: 8.875 },
  { id: 'airport', name: 'Old Airport Junction', area: 'Rayfield Road', lat: 9.885, lng: 8.91 },
  { id: 'bukuru', name: 'Bukuru', area: 'Bukuru', lat: 9.845, lng: 8.865 },
  { id: 'rayfield', name: 'Rayfield', area: 'Rayfield', lat: 9.875, lng: 8.92 },
  { id: 'juth', name: 'JUTH', area: 'Lamingo', lat: 9.935, lng: 8.945 },
  { id: 'secretariat', name: 'Plateau Secretariat', area: 'Jos', lat: 9.92, lng: 8.885 },
  { id: 'dilimi', name: 'Dilimi', area: 'Dilimi', lat: 9.898, lng: 8.838 },
];
