import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';
import { router } from './routes';

/**
 * App — root component that wraps the application with context providers
 * and renders the router.
 *
 * Provider order (outermost → innermost):
 *   AuthProvider → CartProvider → BookingProvider → RouterProvider
 *
 * Auth is outermost because cart and bookings may depend on the current user.
 */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BookingProvider>
          <RouterProvider router={router} />
        </BookingProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
