import { Outlet, Navigate, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { BottomNav } from '../components/BottomNav/BottomNav';
import { TopNav } from '../components/TopNav/TopNav';
import { getItem } from '../services/storage';
import styles from './AppShell.module.css';

/**
 * AppShell — responsive layout wrapper for authenticated `/app/*` routes.
 *
 * Responsibilities:
 * 1. Renders BottomNav on mobile (≤768px) and TopNav on desktop (>768px).
 * 2. Wraps page content via <Outlet /> with padding for fixed nav bars.
 * 3. Route guard: redirects unauthenticated users to /auth,
 *    and first-time users (no onboarding flag) to /onboarding.
 */
export function AppShell() {
  const { isAuthenticated } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();

  // Route guard: redirect to onboarding if first-time user
  const onboardingComplete = getItem<boolean>('onboarding_complete', false);
  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }

  // Route guard: redirect unauthenticated users to auth
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return (
    <div className={styles.shell}>
      {!isMobile && <TopNav />}
      <main className={styles.content}>
        <Outlet />
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
}

export default AppShell;
