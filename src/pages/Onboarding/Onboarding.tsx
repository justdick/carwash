import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { HiOutlineSparkles, HiOutlineCalendarDays, HiOutlineCheckBadge } from 'react-icons/hi2';
import { Button } from '../../components/Button/Button';
import { setItem } from '../../services/storage';
import styles from './Onboarding.module.css';

interface Slide {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    icon: <HiOutlineSparkles />,
    title: 'Premium Cleaning Services',
    description:
      'From car washes to deep house cleans, we bring professional cleaning right to your doorstep.',
  },
  {
    icon: <HiOutlineCalendarDays />,
    title: 'Book in Seconds',
    description:
      'Pick a date, choose a time slot, and confirm. We handle the rest so you can relax.',
  },
  {
    icon: <HiOutlineCheckBadge />,
    title: 'Trusted & Reliable',
    description:
      'Track your bookings, manage your schedule, and enjoy a spotless space every time.',
  },
];

/**
 * Onboarding — introductory slides shown to first-time users.
 *
 * Validates: Requirements 1.1, 1.2, 1.3
 */
export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const isLastSlide = currentSlide === slides.length - 1;

  const completeOnboarding = useCallback(() => {
    setItem('onboarding_complete', true);
    navigate('/auth');
  }, [navigate]);

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      completeOnboarding();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [isLastSlide, completeOnboarding]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <div className={styles.container}>
      {/* Skip button */}
      <div className={styles.skipButton}>
        <Button variant="ghost" size="sm" onClick={completeOnboarding}>
          Skip
        </Button>
      </div>

      {/* Slides */}
      <div className={styles.slidesWrapper} aria-live="polite">
        <div
          className={styles.slidesTrack}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              aria-hidden={index !== currentSlide}
            >
              <div className={styles.iconWrapper} aria-hidden="true">
                {slide.icon}
              </div>
              <h2 className={styles.slideTitle}>{slide.title}</h2>
              <p className={styles.slideDescription}>{slide.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section: dots + actions */}
      <div className={styles.bottomSection}>
        <div className={styles.dots} role="tablist" aria-label="Slide navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => handleDotClick(index)}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
            {isLastSlide ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
