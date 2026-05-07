import type { ServiceCategory } from '../types';

export const categories: ServiceCategory[] = [
  {
    id: 'car-wash',
    name: 'Car Wash',
    icon: 'FaCar',
    description: 'Professional car cleaning services at your doorstep',
  },
  {
    id: 'house-cleaning',
    name: 'House Cleaning',
    icon: 'FaHome',
    description: 'Thorough home cleaning tailored to your needs',
  },
  {
    id: 'carpet-upholstery',
    name: 'Carpet & Upholstery',
    icon: 'FaCouch',
    description: 'Deep cleaning for carpets, sofas, and mattresses',
  },
  {
    id: 'window-cleaning',
    name: 'Window Cleaning',
    icon: 'FaRegWindowMaximize',
    description: 'Crystal-clear windows inside and out',
  },
  {
    id: 'specialized',
    name: 'Specialized',
    icon: 'FaTools',
    description: 'Pressure washing, garage cleaning, and post-construction cleanup',
  },
];

export function getCategoryById(id: string): ServiceCategory | undefined {
  return categories.find((c) => c.id === id);
}
