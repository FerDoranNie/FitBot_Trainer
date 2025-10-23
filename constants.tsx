
import React from 'react';
import type { Equipment } from './types';

export const DumbbellIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21 9h-2V7h2v2zm-4 0h-2V7h2v2zM7 9H5V7h2v2zm12-4h-2V3h2v2zm-4 0h-2V3h2v2zM7 5H5V3h2v2zM9 14.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S11.33 16 10.5 16 9 15.33 9 14.5zM22 14v-4H2v4c0 1.1.9 2 2 2h1v2.05c-.5.39-.81.99-.81 1.66C4.19 21.08 5.11 22 6.2 22s2.01-.92 2.01-2.29c0-.67-.31-1.27-.81-1.66V16h8v2.05c-.5.39-.81.99-.81 1.66 0 1.37.92 2.29 2.01 2.29s2.01-.92 2.01-2.29c0-.67-.31-1.27-.81-1.66V16h1c1.1 0 2-.9 2-2zm-12.3-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S12.13 16 11.3 16s-1.6-.67-1.6-1.5z"></path></svg>
);

export const BodyweightIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 3c-1.1 0-2 .9-2 2v7h-2v-4h-2v4H8v-4H6v4H4v-7c0-1.1-.9-2-2-2v-2h20v2z"></path></svg>
);

export const BandIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21.93 15.39c-1-3.39-3.73-6.03-7.14-6.97-1.1-.3-2.26-.45-3.45-.45-1.22 0-2.41.16-3.53.47-3.28.93-5.94 3.53-6.81 6.66-.28 1-.41 2.05-.41 3.12 0 .41.04.82.1 1.22l.18.99H21.9c.07-.4.1-.81.1-1.22.02-1.13-.12-2.23-.47-3.22zM8.33 13.52c-.37.1-.73.22-1.09.34-.69.24-1.32.57-1.89.97.35-.68.85-1.26 1.48-1.72.6-.42 1.26-.73 1.95-.94l-.45.35zm7.34 0c.69.21 1.35.52 1.95.94.63.46 1.13 1.04 1.48 1.72-.57-.4-1.2-.73-1.89-.97-.36-.12-.72-.24-1.09-.34l-.45-.35z"></path></svg>
);

export const YogaMatIcon: React.FC<{className?: string}> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10 4.1C6.7 4.54 4 7.42 4 10.85c0 1.28.38 2.47 1.03 3.51L4 16.5v2h2.5l2.25-2.25c.3.02.6.05.9.05 3.32 0 6.13-2.5 6.6-5.74.13-.9-.08-1.79-.58-2.56-.6-.9-1.57-1.47-2.67-1.47-1.11 0-2.11.59-2.73 1.52-.39-.14-.79-.23-1.22-.27zM8.9 12.93c-.4-.59-.6-1.3-.6-2.08 0-1.82 1.48-3.3 3.3-3.3.47 0 .91.1 1.32.28-.46.81-.62 1.74-.49 2.68.21 1.48 1.32 2.72 2.79 3.03.35.07.69.1 1.03.1 1.3 0 2.47-.69 3.1-1.7.27.8.27 1.66.02 2.48-.37 1.22-1.18 2.22-2.26 2.82-1.37.76-2.98.88-4.49.33-1.41-.5-2.6-1.58-3.19-2.96-.3-.69-.45-1.44-.43-2.2zM20 7.25c0-.97-.78-1.75-1.75-1.75S16.5 6.28 16.5 7.25s.78 1.75 1.75 1.75S20 8.22 20 7.25z"></path></svg>
);

export const EQUIPMENT_OPTIONS: Equipment[] = [
  { id: 'bodyweight', name: 'Peso Corporal', icon: <BodyweightIcon /> },
  { id: 'dumbbells', name: 'Mancuernas', icon: <DumbbellIcon /> },
  { id: 'bands', name: 'Bandas', icon: <BandIcon /> },
  { id: 'yoga_mat', name: 'Mat de Yoga', icon: <YogaMatIcon /> },
];

export const ACTIVITY_LEVELS = [
    { id: 'sedentary', name: 'Sedentario (poco o ningún ejercicio)' },
    { id: 'light', name: 'Ligero (ejercicio 1-3 días/semana)' },
    { id: 'moderate', name: 'Moderado (ejercicio 3-5 días/semana)' },
    { id: 'active', name: 'Activo (ejercicio 6-7 días/semana)' },
    { id: 'very_active', name: 'Muy activo (trabajo físico o ejercicio intenso diario)' },
];