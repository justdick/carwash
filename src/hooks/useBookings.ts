import { useContext } from 'react';
import { BookingContext, type BookingContextValue } from '../context/BookingContext';

export function useBookings(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}
