import { NavLink } from 'react-router';
import { HiOutlineHome, HiOutlineCalendarDays, HiOutlineShoppingCart, HiOutlineUser } from 'react-icons/hi2';
import { Badge } from '../Badge/Badge';
import { useCart } from '../../hooks/useCart';
import styles from './BottomNav.module.css';

const navItems = [
  { to: '/app/home', label: 'Home', icon: HiOutlineHome },
  { to: '/app/bookings', label: 'Bookings', icon: HiOutlineCalendarDays },
  { to: '/app/cart', label: 'Cart', icon: HiOutlineShoppingCart, showBadge: true },
  { to: '/app/profile', label: 'Profile', icon: HiOutlineUser },
];

export function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav className={styles.bottomNav} aria-label="Main navigation">
      {navItems.map(({ to, label, icon: Icon, showBadge }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [styles.navItem, isActive ? styles.active : ''].filter(Boolean).join(' ')
          }
        >
          <span className={styles.iconWrapper}>
            <Icon className={styles.icon} aria-hidden="true" />
            {showBadge && <Badge count={itemCount} />}
          </span>
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
