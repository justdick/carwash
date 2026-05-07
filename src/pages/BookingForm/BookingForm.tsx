import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { Calendar } from '../../components/Calendar/Calendar';
import { TimeSlotPicker } from '../../components/TimeSlotPicker/TimeSlotPicker';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useBookings } from '../../hooks/useBookings';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import type { CartItem, Address } from '../../types';
import styles from './BookingForm.module.css';

/** Format an ISO date string (YYYY-MM-DD) to a readable label */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Format a time slot value (e.g. "10:00") to a readable label */
function formatTimeSlot(slot: string): string {
  const hour = parseInt(slot.split(':')[0], 10);
  const displayHour = hour <= 12 ? hour : hour - 12;
  const period = hour < 12 ? 'AM' : 'PM';
  return `${displayHour}:00 ${period}`;
}

export function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { createBooking } = useBookings();
  const { items: cartItems, clearCart } = useCart();
  const { user } = useAuth();

  // Determine services: from location state (Book Now / Book All) or fall back to cart
  const services: CartItem[] = useMemo(() => {
    const state = location.state as { services?: CartItem[] } | null;
    if (state?.services && state.services.length > 0) {
      return state.services;
    }
    // Fallback: use cart items (for "Book All" flow)
    return cartItems;
  }, [location.state, cartItems]);

  // Determine if this came from the cart flow
  const isCartFlow = useMemo(() => {
    const state = location.state as { services?: CartItem[] } | null;
    // If no services in state, we're using cart items
    if (!state?.services || state.services.length === 0) return true;
    // If services match cart items count and there are multiple, likely cart flow
    return false;
  }, [location.state]);

  // Form state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedSavedAddress, setSelectedSavedAddress] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation errors
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [zipError, setZipError] = useState('');

  // Saved addresses from user profile
  const savedAddresses: Address[] = user?.savedAddresses ?? [];

  // Total price
  const totalPrice = useMemo(
    () => services.reduce((sum, s) => sum + s.price, 0),
    [services],
  );

  // Check if form is complete enough to show summary
  const isFormComplete =
    selectedDate !== null &&
    selectedSlot !== null &&
    street.trim() !== '' &&
    city.trim() !== '' &&
    zipCode.trim() !== '';

  const handleSelectSavedAddress = (address: Address) => {
    if (selectedSavedAddress === address.id) {
      // Deselect
      setSelectedSavedAddress(null);
      setStreet('');
      setCity('');
      setZipCode('');
    } else {
      setSelectedSavedAddress(address.id);
      setStreet(address.street);
      setCity(address.city);
      setZipCode(address.zipCode);
      setStreetError('');
      setCityError('');
      setZipError('');
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    setFormError('');

    if (!selectedDate) {
      setFormError('Please select a date for your booking.');
      valid = false;
      return valid;
    }

    if (!selectedSlot) {
      setFormError('Please select a time slot for your booking.');
      valid = false;
      return valid;
    }

    if (!street.trim()) {
      setStreetError('Street address is required');
      valid = false;
    } else {
      setStreetError('');
    }

    if (!city.trim()) {
      setCityError('City is required');
      valid = false;
    } else {
      setCityError('');
    }

    if (!zipCode.trim()) {
      setZipError('Zip code is required');
      valid = false;
    } else {
      setZipError('');
    }

    if (!valid && !formError) {
      setFormError('Please fill in all required address fields.');
    }

    return valid;
  };

  const handleConfirmBooking = () => {
    if (!validateForm()) return;
    if (services.length === 0) {
      setFormError('No services selected. Please go back and select a service.');
      return;
    }

    setIsSubmitting(true);

    const address: Address = {
      id: selectedSavedAddress ?? `addr-${Date.now()}`,
      street: street.trim(),
      city: city.trim(),
      zipCode: zipCode.trim(),
    };

    const booking = createBooking({
      services,
      date: selectedDate!,
      timeSlot: selectedSlot!,
      address,
      notes: notes.trim() || undefined,
    });

    // If this was a cart flow, clear the cart
    if (isCartFlow) {
      clearCart();
    }

    navigate(`/app/confirmation/${booking.id}`);
  };

  // Redirect if no services
  if (services.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FaArrowLeft />
          </button>
          <h1 className={styles.pageTitle}>Book a Service</h1>
        </header>
        <div className={styles.formError}>
          No services selected. Please go back and select a service to book.
        </div>
        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/app/home')}>
            Browse Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h1 className={styles.pageTitle}>Book a Service</h1>
      </header>

      {/* Services being booked */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {services.length === 1 ? 'Service' : 'Services'}
        </h2>
        <div className={styles.servicesSection}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceItem}>
              <div className={styles.serviceItemInfo}>
                <p className={styles.serviceItemName}>{service.serviceName}</p>
                <p className={styles.serviceItemTier}>{service.tierName}</p>
              </div>
              <span className={styles.serviceItemPrice}>${service.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop two-column layout wrapper */}
      <div className={styles.formLayout}>
        <div className={styles.formLeft}>
          {/* Date Picker */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Select Date</h2>
            <div className={styles.calendarWrapper}>
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
          </section>

          {/* Time Slot Picker */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Select Time</h2>
            <TimeSlotPicker
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          </section>
        </div>

        <div className={styles.formRight}>
          {/* Address Form */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Service Address</h2>
            <div className={styles.addressForm}>
              {/* Saved addresses */}
              {savedAddresses.length > 0 && (
                <div className={styles.savedAddresses}>
                  <p className={styles.savedAddressLabel}>Saved addresses</p>
                  <div className={styles.savedAddressChips}>
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        className={`${styles.addressChip} ${selectedSavedAddress === addr.id ? styles.addressChipSelected : ''}`}
                        onClick={() => handleSelectSavedAddress(addr)}
                        aria-pressed={selectedSavedAddress === addr.id}
                      >
                        <FaMapMarkerAlt className={styles.addressChipIcon} aria-hidden="true" />
                        {addr.label || addr.street}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Input
                label="Street Address"
                value={street}
                onChange={(val) => {
                  setStreet(val);
                  setSelectedSavedAddress(null);
                  if (streetError) setStreetError('');
                }}
                placeholder="123 Main Street"
                required
                error={streetError}
              />
              <Input
                label="City"
                value={city}
                onChange={(val) => {
                  setCity(val);
                  setSelectedSavedAddress(null);
                  if (cityError) setCityError('');
                }}
                placeholder="Springfield"
                required
                error={cityError}
              />
              <Input
                label="Zip Code"
                value={zipCode}
                onChange={(val) => {
                  setZipCode(val);
                  setSelectedSavedAddress(null);
                  if (zipError) setZipError('');
                }}
                placeholder="12345"
                required
                error={zipError}
              />
            </div>
          </section>

          {/* Notes */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Notes (Optional)</h2>
            <label className={styles.notesLabel} htmlFor="booking-notes">
              Special instructions or requests
            </label>
            <textarea
              id="booking-notes"
              className={styles.notesTextarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Gate code is 1234, please use side entrance..."
              rows={3}
            />
          </section>
        </div>
      </div>

      {/* Booking Summary */}
      {isFormComplete && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Booking Summary</h2>
          <div className={styles.summary}>
            {services.map((service) => (
              <div key={service.id} className={styles.summaryRow}>
                <p className={styles.summaryLabel}>
                  {service.serviceName} ({service.tierName})
                </p>
                <p className={styles.summaryValue}>${service.price}</p>
              </div>
            ))}
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Date</p>
              <p className={styles.summaryValue}>{formatDate(selectedDate!)}</p>
            </div>
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Time</p>
              <p className={styles.summaryValue}>{formatTimeSlot(selectedSlot!)}</p>
            </div>
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Address</p>
              <p className={styles.summaryValue}>
                {street}, {city} {zipCode}
              </p>
            </div>
            {notes.trim() && (
              <div className={styles.summaryRow}>
                <p className={styles.summaryLabel}>Notes</p>
                <p className={styles.summaryValue}>{notes.trim()}</p>
              </div>
            )}
            <hr className={styles.summaryDivider} />
            <div className={styles.summaryTotal}>
              <p className={styles.summaryTotalLabel}>Total</p>
              <p className={styles.summaryTotalPrice}>${totalPrice}</p>
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {formError && (
        <div className={styles.formError} role="alert">
          {formError}
        </div>
      )}

      {/* Confirm Button */}
      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleConfirmBooking}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Confirm Booking{totalPrice > 0 ? ` — $${totalPrice}` : ''}
        </Button>
      </div>
    </div>
  );
}

export default BookingForm;
