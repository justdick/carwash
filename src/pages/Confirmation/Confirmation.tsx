import { useParams, useNavigate } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';
import { useBookings } from '../../hooks/useBookings';
import { Button } from '../../components/Button/Button';
import styles from './Confirmation.module.css';

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

export function Confirmation() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { getBooking } = useBookings();

  const booking = bookingId ? getBooking(bookingId) : undefined;

  const handleViewBookings = () => {
    navigate('/app/bookings');
  };

  const handleBookAnother = () => {
    navigate('/app/home');
  };

  // Booking not found
  if (!booking) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Booking Not Found</h1>
          <p className={styles.notFoundMessage}>
            We couldn't find the booking you're looking for. It may have been removed or the link is invalid.
          </p>
          <Button variant="primary" size="lg" onClick={handleViewBookings}>
            View My Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Success Indicator */}
      <section className={styles.successSection}>
        <FaCheckCircle className={styles.successIcon} aria-hidden="true" />
        <h1 className={styles.successTitle}>Booking Confirmed!</h1>
        <p className={styles.successMessage}>
          Your cleaning service has been successfully booked.
        </p>
      </section>

      {/* Reference Number */}
      <div className={styles.referenceSection}>
        <p className={styles.referenceLabel}>Booking Reference</p>
        <p className={styles.referenceNumber}>{booking.referenceNumber}</p>
      </div>

      {/* Booking Details */}
      <div className={styles.detailsCard}>
        <h2 className={styles.detailsTitle}>Booking Details</h2>

        {/* Services */}
        <div className={styles.servicesList}>
          {booking.services.map((service) => (
            <div key={service.id} className={styles.serviceItem}>
              <div className={styles.serviceItemInfo}>
                <p className={styles.serviceItemName}>{service.serviceName}</p>
                <p className={styles.serviceItemTier}>{service.tierName}</p>
              </div>
              <span className={styles.serviceItemPrice}>${service.price}</span>
            </div>
          ))}
        </div>

        {/* Date & Time */}
        <div className={styles.detailRow}>
          <p className={styles.detailLabel}>Date</p>
          <p className={styles.detailValue}>{formatDate(booking.date)}</p>
        </div>
        <div className={styles.detailRow}>
          <p className={styles.detailLabel}>Time</p>
          <p className={styles.detailValue}>{formatTimeSlot(booking.timeSlot)}</p>
        </div>

        {/* Address */}
        <div className={styles.detailRow}>
          <p className={styles.detailLabel}>Address</p>
          <p className={styles.detailValue}>
            {booking.address.street}, {booking.address.city} {booking.address.zipCode}
          </p>
        </div>

        {/* Notes (if any) */}
        {booking.notes && (
          <div className={styles.detailRow}>
            <p className={styles.detailLabel}>Notes</p>
            <p className={styles.detailValue}>{booking.notes}</p>
          </div>
        )}

        <hr className={styles.divider} />

        {/* Total */}
        <div className={styles.totalRow}>
          <p className={styles.totalLabel}>Total</p>
          <p className={styles.totalPrice}>${booking.totalPrice}</p>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleViewBookings}
        >
          View My Bookings
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleBookAnother}
        >
          Book Another Service
        </Button>
      </div>
    </div>
  );
}

export default Confirmation;
