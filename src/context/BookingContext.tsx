import { createContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { Booking, BookingDetails } from '../types';
import * as bookingService from '../services/bookingService';

export interface BookingContextValue {
  bookings: Booking[];
  createBooking: (details: BookingDetails) => Booking;
  getBooking: (id: string) => Booking | undefined;
  upcomingBookings: Booking[];
  pastBookings: Booking[];
}

export const BookingContext = createContext<BookingContextValue | null>(null);

interface BookingProviderProps {
  children: ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [bookings, setBookings] = useState<Booking[]>(() =>
    bookingService.getAllBookings(),
  );

  const upcomingBookings = useMemo(
    () => bookings.filter((b) => b.status === 'upcoming'),
    [bookings],
  );

  const pastBookings = useMemo(
    () => bookings.filter((b) => b.status === 'past'),
    [bookings],
  );

  const createBooking = useCallback((details: BookingDetails): Booking => {
    const booking = bookingService.createBooking(details);
    setBookings(bookingService.getAllBookings());
    return booking;
  }, []);

  const getBooking = useCallback((id: string): Booking | undefined => {
    return bookingService.getBookingById(id);
  }, []);

  const value: BookingContextValue = {
    bookings,
    createBooking,
    getBooking,
    upcomingBookings,
    pastBookings,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
