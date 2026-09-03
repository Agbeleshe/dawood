import L from 'leaflet';
import { JOS_BOUNDS, JOS_CENTER } from '../data/city';
import type { LiveVehicle, VehicleStatus } from '../types';

export const MAP_TILE =
  'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';

export const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; OpenStreetMap contributors';

const STATUS_COLOR: Record<VehicleStatus, string> = {
  moving: '#FFC107',
  idle: '#9AA3B2',
  flagged: '#E53935',
  stopped: '#FF9800',
  impounded: '#6B7280',
  escort: '#CE93D8',
};

export function clampCoord(lat: number, lng: number) {
  return {
    lat: Math.min(JOS_BOUNDS.maxLat, Math.max(JOS_BOUNDS.minLat, lat)),
    lng: Math.min(JOS_BOUNDS.maxLng, Math.max(JOS_BOUNDS.minLng, lng)),
  };
}

export function vehicleIcon(v: LiveVehicle, selected: boolean) {
  const color = STATUS_COLOR[v.status];
  const size = selected ? 18 : 14;
  const ring = selected ? 'box-shadow:0 0 0 4px rgba(255,193,7,0.35);' : '';
  const rot = v.status === 'impounded' || v.status === 'stopped' || v.status === 'idle' ? 0 : v.heading;

  return L.divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};border:2px solid #061830;
      transform:rotate(${rot}deg);${ring}
      transition:transform 0.3s ease;
    "></div>`,
  });
}

export function placeIcon() {
  return L.divIcon({
    className: '',
    iconSize: [8, 8],
    iconAnchor: [4, 4],
    html: `<div style="width:8px;height:8px;border-radius:50%;background:#1A3354;border:1px solid #3d5a80;"></div>`,
  });
}

export { JOS_CENTER, JOS_BOUNDS };
