import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  /** Icon or illustration to display above the title */
  icon: ReactNode;
  /** Heading text */
  title: string;
  /** Descriptive message below the title */
  message: string;
  /** Label for the optional CTA button */
  actionLabel?: string;
  /** Callback when the CTA button is clicked */
  onAction?: () => void;
}

export function EmptyState({ icon, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className={styles.container} role="status">
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {actionLabel && onAction && (
        <div className={styles.action}>
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
