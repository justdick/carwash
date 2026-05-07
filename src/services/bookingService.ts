import type { Booking, BookingDetails } from '../types';
import { getItem, setItem } from './storage';
import { generateReferenceNumber } from '../utils/referenceNumber';

const BOOKINGS_KEY = 'bookings';

function getBookings(): Booking[] {
  return getItem<Booking[]>(BOOKINGS_KEY, []);
}

function saveBookings(bookings: Booking[]): void {
  setItem(BOOKINGS_KEY, bookings);
}

/**
 * Create a new booking from the provided details.
 * Generates a unique reference number and persists to localStorage.
 */
export function createBooking(details: BookingDetails): Booking {
  const bookings = getBookings();
  const totalPrice = details.services.reduce((sum, s) => sum + s.price, 0);

  const booking: Booking = {
    id: crypto.randomUUID(),
    referenceNumber: generateReferenceNumber(),
    services: details.services,
    date: details.date,
    timeSlot: details.timeSlot,
    address: details.address,
    notes: details.notes,
    totalPrice,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  };

  saveBookings([...bookings, booking]);
  return booking;
}

/**
 * Retrieve a single booking by ID.
 */
export function getBookingById(id: string): Booking | undefined {
  return getBookings().find((b) => b.id === id);
}

/**
 * Get all bookings, re-categorizing status based on current date.
 */
export function getAllBookings(): Booking[] {
  const bookings = getBookings();
  const today = new Date().toISOString().split('T')[0];

  const updated = bookings.map((b) => ({
    ...b,
    status: (b.date >= today ? 'upcoming' : 'past') as Booking['status'],
  }));

  // Persist updated statuses
  saveBookings(updated);
  return updated;
}

/**
 * Get upcoming bookings (date is today or in the future).
 */
export function getUpcomingBookings(): Booking[] {
  return getAllBookings().filter((b) => b.status === 'upcoming');
}

/**
 * Get past bookings (date is before today).
 */
export function getPastBookings(): Booking[] {
  return getAllBookings().filter((b) => b.status === 'past');
}
