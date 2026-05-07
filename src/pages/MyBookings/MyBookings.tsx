import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStickyNote,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { useBookings } from '../../hooks/useBookings';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import type { Booking } from '../../types';
import styles from './MyBookings.module.css';

type Tab = 'upcoming' | 'past';

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

function BookingCard({
  booking,
  isExpanded,
  onToggle,
}: {
  booking: Booking;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const serviceNames = booking.services.map((s) => s.serviceName).join(', ');

  return (
    <div className={styles.bookingCard} role="listitem">
      <button
        className={styles.bookingHeader}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`booking-details-${booking.id}`}
      >
        <div className={styles.bookingInfo}>
          <p className={styles.referenceNumber}>{booking.referenceNumber}</p>
          <p className={styles.serviceNames}>{serviceNames}</p>
          <div className={styles.bookingMeta}>
            <span className={styles.metaItem}>
              <FaCalendarAlt aria-hidden="true" />
              {formatDate(booking.date)}
            </span>
            <span className={styles.metaItem}>
              <FaClock aria-hidden="true" />
              {formatTimeSlot(booking.timeSlot)}
            </span>
          </div>
          <span
            className={`${styles.statusBadge} ${
              booking.status === 'upcoming' ? styles.statusUpcoming : styles.statusPast
            }`}
          >
            {booking.status === 'upcoming' ? 'Upcoming' : 'Past'}
          </span>
        </div>
        <span className={styles.expandIcon} aria-hidden="true">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>

      {isExpanded && (
        <div
          id={`booking-details-${booking.id}`}
          className={styles.bookingDetails}
          role="region"
          aria-label={`Details for booking ${booking.referenceNumber}`}
        >
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

          {/* Address */}
          <div className={styles.detailRow}>
            <FaMapMarkerAlt className={styles.detailIcon} aria-hidden="true" />
            <div>
              <p className={styles.detailLabel}>Address</p>
              <p className={styles.detailValue}>
                {booking.address.street}, {booking.address.city} {booking.address.zipCode}
              </p>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className={styles.detailRow}>
              <FaStickyNote className={styles.detailIcon} aria-hidden="true" />
              <div>
                <p className={styles.detailLabel}>Notes</p>
                <p className={styles.detailValue}>{booking.notes}</p>
              </div>
            </div>
          )}

          {/* Total */}
          <div className={styles.totalRow}>
            <p className={styles.totalLabel}>Total</p>
            <p className={styles.totalPrice}>${booking.totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function MyBookings() {
  const navigate = useNavigate();
  const { upcomingBookings, pastBookings } = useBookings();
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  const handleToggle = (bookingId: string) => {
    setExpandedBookingId((prev) => (prev === bookingId ? null : bookingId));
  };

  const handleBookService = () => {
    navigate('/app/home');
  };

  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>My Bookings</h1>
      </header>

      {/* Tabs */}
      <div className={styles.tabs} role="tablist" aria-label="Booking sections">
        <button
          role="tab"
          aria-selected={activeTab === 'upcoming'}
          className={`${styles.tab} ${activeTab === 'upcoming' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
          {upcomingBookings.length > 0 && (
            <span className={styles.tabCount}>{upcomingBookings.length}</span>
          )}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'past'}
          className={`${styles.tab} ${activeTab === 'past' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past
          {pastBookings.length > 0 && (
            <span className={styles.tabCount}>{pastBookings.length}</span>
          )}
        </button>
      </div>

      {/* Booking List or Empty State */}
      <div role="tabpanel" aria-label={`${activeTab} bookings`}>
        {displayedBookings.length === 0 ? (
          <EmptyState
            icon={<FaCalendarAlt />}
            title={
              activeTab === 'upcoming'
                ? 'No upcoming bookings'
                : 'No past bookings'
            }
            message={
              activeTab === 'upcoming'
                ? 'You don\'t have any upcoming bookings yet. Book a cleaning service to get started!'
                : 'You don\'t have any past bookings yet.'
            }
            actionLabel="Book a Service"
            onAction={handleBookService}
          />
        ) : (
          <div className={styles.bookingList} role="list">
            {displayedBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isExpanded={expandedBookingId === booking.id}
                onToggle={() => handleToggle(booking.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
