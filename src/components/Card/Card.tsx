import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
}

export function Card({
  children,
  onClick,
  className,
  hoverable = false,
}: CardProps) {
  const classNames = [
    styles.card,
    hoverable ? styles.hoverable : '',
    onClick ? styles.clickable : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const interactiveProps = onClick
    ? { role: 'button' as const, tabIndex: 0, onClick, onKeyDown: handleKeyDown }
    : {};

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  }

  return (
    <div className={classNames} {...interactiveProps}>
      {children}
    </div>
  );
}

export default Card;
