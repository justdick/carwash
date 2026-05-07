import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

/**
 * AuthGuard — route wrapper for the `/auth` route.
 *
 * Redirects authenticated users to /app/home so they don't see the
 * login/signup screen when already logged in.
 * Unauthenticated users see the auth page normally.
 */
export function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/app/home" replace />;
  }

  return <Outlet />;
}

export default AuthGuard;
