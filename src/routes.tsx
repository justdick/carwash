import { createHashRouter, Navigate } from 'react-router';
import { AppShell } from './layouts/AppShell';
import { AuthGuard } from './layouts/AuthGuard';
import { Onboarding } from './pages/Onboarding/Onboarding';
import { Auth } from './pages/Auth/Auth';
import { Home } from './pages/Home/Home';
import { CategoryListing } from './pages/CategoryListing/CategoryListing';
import { ServiceDetail } from './pages/ServiceDetail/ServiceDetail';
import { BookingForm } from './pages/BookingForm/BookingForm';
import { Cart } from './pages/Cart/Cart';
import { Confirmation } from './pages/Confirmation/Confirmation';
import { MyBookings } from './pages/MyBookings/MyBookings';
import { Profile } from './pages/Profile/Profile';

/**
 * Application route definitions.
 *
 * Uses HashRouter for GitHub Pages compatibility (no server-side routing needed).
 *
 * Route structure:
 *   /              → redirects to /app/home (guards in AppShell handle auth/onboarding)
 *   /onboarding    → Onboarding page
 *   /auth          → Auth page (AuthGuard redirects authenticated users to /app/home)
 *   /app/*         → AppShell layout with responsive nav (guards handle auth/onboarding)
 */
export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/app/home" replace />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    // AuthGuard redirects authenticated users to /app/home
    element: <AuthGuard />,
    children: [
      {
        path: '/auth',
        element: <Auth />,
      },
    ],
  },
  {
    // AppShell handles route guards (auth + onboarding) and responsive nav
    path: '/app',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'category/:categoryId',
        element: <CategoryListing />,
      },
      {
        path: 'service/:serviceId',
        element: <ServiceDetail />,
      },
      {
        path: 'book',
        element: <BookingForm />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'confirmation/:bookingId',
        element: <Confirmation />,
      },
      {
        path: 'bookings',
        element: <MyBookings />,
      },
      {
        path: 'bookings/:bookingId',
        element: <MyBookings />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);
