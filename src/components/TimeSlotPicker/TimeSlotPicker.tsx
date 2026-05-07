import { useMemo } from 'react';
import styles from './TimeSlotPicker.module.css';

interface TimeSlotPickerProps {
  selectedSlot: string | null;       // e.g. "10:00"
  onSelectSlot: (slot: string) => void;
}

interface Slot {
  value: string;   // "08:00", "09:00", …, "18:00"
  label: string;   // "8 AM", "9 AM", …, "6 PM"
}

/** Generate hourly slots from 8 AM to 6 PM */
function generateSlots(): Slot[] {
  const slots: Slot[] = [];
  for (let hour = 8; hour <= 18; hour++) {
    const value = `${String(hour).padStart(2, '0')}:00`;
    const displayHour = hour <= 12 ? hour : hour - 12;
    const period = hour < 12 ? 'AM' : 'PM';
    const label = `${displayHour} ${period}`;
    slots.push({ value, label });
  }
  return slots;
}

export function TimeSlotPicker({ selectedSlot, onSelectSlot }: TimeSlotPickerProps) {
  const slots = useMemo(generateSlots, []);

  return (
    <div
      className={styles.wrapper}
      role="group"
      aria-label="Select a time slot"
    >
      <div className={styles.scrollContainer}>
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.value;

          const classNames = [
            styles.slot,
            isSelected ? styles.selected : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={slot.value}
              type="button"
              className={classNames}
              onClick={() => onSelectSlot(slot.value)}
              aria-pressed={isSelected}
              aria-label={`Select ${slot.label}`}
            >
              {slot.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlotPicker;
