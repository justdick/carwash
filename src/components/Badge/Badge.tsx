import styles from './Badge.module.css';

interface BadgeProps {
  count: number;
}

export function Badge({ count }: BadgeProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <span className={styles.badge} aria-label={`${count} item${count === 1 ? '' : 's'} in cart`}>
      {count > 99 ? '99+' : count}
    </span>
  );
}

export default Badge;
