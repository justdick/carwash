import { useState, useMemo, useCallback } from 'react';
import styles from './Calendar.module.css';

interface CalendarProps {
  selectedDate: string | null;       // ISO date string
  onSelectDate: (date: string) => void;
  minDate?: string;                  // defaults to today
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Strip time from a Date and return YYYY-MM-DD */
function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Parse a YYYY-MM-DD string into a local Date at midnight */
function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function Calendar({ selectedDate, onSelectDate, minDate }: CalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const minDateObj = useMemo(
    () => (minDate ? parseDate(minDate) : today),
    [minDate, today],
  );

  const todayISO = useMemo(() => toISODate(today), [today]);

  const [viewYear, setViewYear] = useState(
    selectedDate ? parseDate(selectedDate).getFullYear() : today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    selectedDate ? parseDate(selectedDate).getMonth() : today.getMonth(),
  );

  /** Build the grid of day cells for the current view month */
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const startDow = firstDay.getDay(); // 0 = Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells: Array<{ date: Date; iso: string } | null> = [];

    // Leading blanks
    for (let i = 0; i < startDow; i++) {
      cells.push(null);
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      cells.push({ date, iso: toISODate(date) });
    }

    return cells;
  }, [viewYear, viewMonth]);

  const canGoPrev = useMemo(() => {
    // Can go prev if the previous month has at least one selectable day
    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const lastDayOfPrev = new Date(prevYear, prevMonth + 1, 0);
    return lastDayOfPrev >= minDateObj;
  }, [viewYear, viewMonth, minDateObj]);

  const goToPrevMonth = useCallback(() => {
    if (!canGoPrev) return;
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, [canGoPrev]);

  const goToNextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const isDisabled = useCallback(
    (date: Date) => date < minDateObj,
    [minDateObj],
  );

  return (
    <div className={styles.calendar} role="group" aria-label="Date picker">
      {/* Header with month/year and navigation */}
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className={styles.monthYear} aria-live="polite">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          className={styles.navButton}
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className={styles.dayHeaders} role="row">
        {DAY_LABELS.map((label) => (
          <div key={label} className={styles.dayHeader} role="columnheader" aria-label={label}>
            {label}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className={styles.grid} role="grid" aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear}`}>
        {calendarDays.map((cell, idx) => {
          if (!cell) {
            return <div key={`blank-${idx}`} className={styles.emptyCell} />;
          }

          const disabled = isDisabled(cell.date);
          const isSelected = selectedDate === cell.iso;
          const isToday = cell.iso === todayISO;

          const cellClasses = [
            styles.dayCell,
            disabled ? styles.disabled : styles.selectable,
            isSelected ? styles.selected : '',
            isToday && !isSelected ? styles.today : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={cell.iso}
              type="button"
              className={cellClasses}
              disabled={disabled}
              onClick={() => onSelectDate(cell.iso)}
              aria-label={`${MONTH_NAMES[viewMonth]} ${cell.date.getDate()}, ${viewYear}`}
              aria-selected={isSelected || undefined}
              aria-current={isToday ? 'date' : undefined}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
