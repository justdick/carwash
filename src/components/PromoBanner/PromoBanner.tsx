import { useCallback, useEffect, useRef, useState } from 'react';
import type { Promotion } from '../../types';
import styles from './PromoBanner.module.css';

interface PromoBannerProps {
  promotions: Promotion[];
  /** Auto-advance interval in milliseconds. Defaults to 5000. Set to 0 to disable. */
  autoAdvanceMs?: number;
}

export function PromoBanner({ promotions, autoAdvanceMs = 5000 }: PromoBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = promotions.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  // Auto-advance
  useEffect(() => {
    if (autoAdvanceMs <= 0 || count <= 1) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, autoAdvanceMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoAdvanceMs, count]);

  // Reset timer when user manually navigates
  const handleDotClick = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(index);

    if (autoAdvanceMs > 0 && count > 1) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % count);
      }, autoAdvanceMs);
    }
  };

  if (count === 0) return null;

  return (
    <section className={styles.banner} aria-roledescription="carousel" aria-label="Promotions">
      <div className={styles.slideContainer} aria-live="off">
        <div
          className={styles.slideTrack}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {promotions.map((promo, index) => (
            <div
              key={promo.id}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              aria-hidden={index !== activeIndex}
            >
              <span className={styles.discount}>{promo.discount}</span>
              <h3 className={styles.title}>{promo.title}</h3>
              <p className={styles.description}>{promo.description}</p>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Promotion slides">
          {promotions.map((promo, index) => (
            <button
              key={promo.id}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PromoBanner;
