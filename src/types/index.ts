// Service category identifiers
export type CategoryId = 'car-wash' | 'house-cleaning' | 'carpet-upholstery' | 'window-cleaning' | 'specialized';

export interface ServiceCategory {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  includes: string[];
}

export interface Service {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  shortDescription: string;
  duration: string;
  image: string;
  tiers: PricingTier[];
  featured: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  savedAddresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  zipCode: string;
  label?: string;
}

export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  tierId: string;
  tierName: string;
  price: number;
}

export interface BookingDetails {
  services: CartItem[];
  date: string;
  timeSlot: string;
  address: Address;
  notes?: string;
}

export interface Booking {
  id: string;
  referenceNumber: string;
  services: CartItem[];
  date: string;
  timeSlot: string;
  address: Address;
  notes?: string;
  totalPrice: number;
  status: 'upcoming' | 'past';
  createdAt: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  categoryId?: CategoryId;
  serviceId?: string;
}
