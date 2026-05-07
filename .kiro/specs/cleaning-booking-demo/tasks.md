# Implementation Plan: Cleaning Booking Demo

## Overview

Build a responsive, mobile-first cleaning services booking SPA using React 18, TypeScript, Vite, React Router v6, and CSS Modules. All data is simulated with localStorage as the persistence layer. The implementation proceeds bottom-up: project scaffolding → design tokens and shared components → data/service layer → context providers and hooks → page components → routing and layout wiring → final polish.

## Tasks

- [x] 1. Scaffold project and configure tooling
  - Initialize a Vite project with the React + TypeScript template
  - Install dependencies: `react-router-dom`, `react-icons`
  - Create the directory structure as defined in the design (`src/theme/`, `src/components/`, `src/pages/`, `src/layouts/`, `src/context/`, `src/hooks/`, `src/services/`, `src/data/`, `src/types/`, `src/utils/`)
  - Create `src/types/index.ts` with all shared TypeScript interfaces (`ServiceCategory`, `PricingTier`, `Service`, `User`, `Address`, `CartItem`, `BookingDetails`, `Booking`, `Promotion`, `CategoryId`)
  - _Requirements: 13.1_

- [x] 2. Implement design tokens, global styles, and shared UI components
  - [x] 2.1 Create design tokens and global styles
    - Create `src/theme/tokens.css` with CSS custom properties for colors (greens/teals primary, warm accents), spacing scale, border-radius, shadows, typography, and transitions
    - Create `src/theme/global.css` with CSS reset, base typography, and global utility styles
    - Import both in `src/main.tsx`
    - _Requirements: 12.1, 12.2, 12.4_

  - [x] 2.2 Implement Button component
    - Create `src/components/Button/Button.tsx` and `Button.module.css`
    - Support variants (primary, secondary, outline, ghost), sizes (sm, md, lg), loading state, fullWidth, and disabled props
    - _Requirements: 12.3, 12.4_

  - [x] 2.3 Implement Card, Badge, and Input components
    - Create `src/components/Card/Card.tsx` and `Card.module.css` with hoverable prop and consistent styling
    - Create `src/components/Badge/Badge.tsx` and `Badge.module.css` for cart count indicator
    - Create `src/components/Input/Input.tsx` and `Input.module.css` with label, error state, and helper text
    - _Requirements: 7.7, 12.4_

  - [x] 2.4 Implement Calendar and TimeSlotPicker components
    - Create `src/components/Calendar/Calendar.tsx` and `Calendar.module.css` — month grid date picker, only future dates selectable
    - Create `src/components/TimeSlotPicker/TimeSlotPicker.tsx` and `TimeSlotPicker.module.css` — horizontal scrollable hourly slots from 8 AM to 6 PM
    - _Requirements: 6.1, 6.2_

  - [x] 2.5 Implement PromoBanner and EmptyState components
    - Create `src/components/PromoBanner/PromoBanner.tsx` and `PromoBanner.module.css` — carousel/slider for promotional content
    - Create `src/components/EmptyState/EmptyState.tsx` and `EmptyState.module.css` — illustration + message + CTA for empty lists
    - _Requirements: 3.3, 7.6, 9.4_

  - [ ]* 2.6 Write unit tests for shared UI components
    - Test Button renders all variants and handles click/loading/disabled states
    - Test Calendar disables past dates and fires onSelectDate
    - Test TimeSlotPicker renders slots and fires onSelectSlot
    - Test Input displays error state and label
    - _Requirements: 6.1, 6.2, 12.3_

- [x] 3. Implement mock data and service layer
  - [x] 3.1 Create mock data modules
    - Create `src/data/categories.ts` with all 5 service categories (Car Wash, House Cleaning, Carpet & Upholstery, Window Cleaning, Specialized) with icons from react-icons
    - Create `src/data/services.ts` with all services per category (4 Car Wash, 3 House Cleaning, 3 Carpet & Upholstery, 3 Window Cleaning, 3 Specialized) each with 2-3 pricing tiers
    - Create `src/data/promotions.ts` with at least one demo promotion
    - _Requirements: 4.4, 13.1_

  - [x] 3.2 Implement storage service and utility functions
    - Create `src/services/storage.ts` with generic `getItem<T>`, `setItem<T>`, `removeItem` wrappers using the `cln_` key prefix
    - Create `src/utils/referenceNumber.ts` with `generateReferenceNumber()` returning `CLN-XXXXXX` format
    - Create `src/utils/validation.ts` with form validation helpers for email, password, and address fields
    - _Requirements: 13.2, 13.4_

  - [x] 3.3 Implement auth, booking, and cart services
    - Create `src/services/authService.ts` — simulated login/signup with localStorage user store, duplicate email check, credential validation
    - Create `src/services/bookingService.ts` — create booking with reference number, read bookings, categorize as upcoming/past
    - Create `src/services/cartService.ts` — add/remove/clear cart items, calculate totals, persist to localStorage
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 6.6, 7.1, 7.2, 7.3, 13.2, 13.4_

  - [ ]* 3.4 Write unit tests for service layer
    - Test authService: signup creates user, login validates credentials, duplicate email rejected
    - Test bookingService: creates booking with reference number, categorizes upcoming vs past
    - Test cartService: add/remove/clear items, total calculation
    - Test referenceNumber: format matches CLN-XXXXXX pattern
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 6.6, 13.4_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement context providers and custom hooks
  - [x] 5.1 Implement AuthContext and useAuth hook
    - Create `src/context/AuthContext.tsx` with user state, login/signup/logout/updateProfile actions, session persistence via localStorage
    - Create `src/hooks/useAuth.ts` as a convenience hook wrapping useContext(AuthContext)
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 10.5_

  - [x] 5.2 Implement CartContext and useCart hook
    - Create `src/context/CartContext.tsx` with cart items state, addItem/removeItem/clearCart actions, itemCount and totalPrice derived values, localStorage sync
    - Create `src/hooks/useCart.ts` as a convenience hook wrapping useContext(CartContext)
    - _Requirements: 7.1, 7.2, 7.3, 7.7, 13.2, 13.3_

  - [x] 5.3 Implement BookingContext and useBookings hook
    - Create `src/context/BookingContext.tsx` with bookings state, createBooking/getBooking actions, upcomingBookings/pastBookings derived values, localStorage sync
    - Create `src/hooks/useBookings.ts` as a convenience hook wrapping useContext(BookingContext)
    - _Requirements: 6.6, 7.5, 9.1, 9.5, 13.2, 13.3_

  - [x] 5.4 Implement useMediaQuery hook
    - Create `src/hooks/useMediaQuery.ts` for responsive breakpoint detection (768px threshold)
    - _Requirements: 11.1, 11.2_

- [x] 6. Implement navigation and app shell layout
  - [x] 6.1 Implement BottomNav and TopNav components
    - Create `src/components/BottomNav/BottomNav.tsx` and `BottomNav.module.css` — fixed bottom bar with icons/labels for Home, Bookings, Cart (with Badge), Profile; highlights active route
    - Create `src/components/TopNav/TopNav.tsx` and `TopNav.module.css` — top navigation bar for desktop with same links and cart badge
    - _Requirements: 11.1, 11.2, 7.7, 12.5_

  - [x] 6.2 Implement AppShell layout and route guards
    - Create `src/layouts/AppShell.tsx` — renders BottomNav on mobile (≤768px) and TopNav on desktop (>768px), wraps page content
    - Implement route guard logic: redirect unauthenticated users to `/auth`, redirect first-time users to `/onboarding`, redirect authenticated users away from `/auth` to `/app/home`
    - _Requirements: 11.1, 11.2, 11.3, 1.3, 2.3_

- [x] 7. Implement page components — Onboarding and Auth
  - [x] 7.1 Implement Onboarding page
    - Create `src/pages/Onboarding/Onboarding.tsx` and `Onboarding.module.css`
    - 2-3 swipeable/navigable slides introducing services and booking process
    - "Get Started" and "Skip" buttons that set `cln_onboarding_complete` flag in localStorage and navigate to Auth
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 7.2 Implement Auth page
    - Create `src/pages/Auth/Auth.tsx` and `Auth.module.css`
    - Login and Signup tabs/forms with email and password fields
    - Form validation, error display for invalid credentials and duplicate emails
    - On successful login/signup, navigate to Home
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 8. Implement page components — Home and Service Browsing
  - [x] 8.1 Implement Home page
    - Create `src/pages/Home/Home.tsx` and `Home.module.css`
    - Greeting with customer name, category grid with icons, promo banner section, featured services section (3-4 services with pricing)
    - Category cards navigate to `/app/category/:categoryId`, featured services navigate to `/app/service/:serviceId`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 8.2 Implement CategoryListing page
    - Create `src/pages/CategoryListing/CategoryListing.tsx` and `CategoryListing.module.css`
    - Display all services in the selected category as scrollable cards with name, description, starting price, and duration
    - Tapping a card navigates to `/app/service/:serviceId`
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 8.3 Implement ServiceDetail page
    - Create `src/pages/ServiceDetail/ServiceDetail.tsx` and `ServiceDetail.module.css`
    - Display service name, description, duration, image/icon, and pricing tiers with selectable tier cards
    - "Book Now" button navigates to BookingForm with selected service and tier pre-filled
    - "Add to Cart" button adds the service with selected tier to the cart
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 9. Implement page components — Booking Flow and Cart
  - [x] 9.1 Implement BookingForm page
    - Create `src/pages/BookingForm/BookingForm.tsx` and `BookingForm.module.css`
    - Calendar date picker (future dates only), time slot picker (8 AM – 6 PM), address form (street, city, zip), optional notes field
    - Display booking summary (service, tier, date, time, address) before confirmation
    - "Confirm Booking" creates booking record via BookingContext and navigates to Confirmation
    - Support both single-service (from Book Now) and multi-service (from Cart) flows
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 7.4, 7.5_

  - [x] 9.2 Implement Cart page
    - Create `src/pages/Cart/Cart.tsx` and `Cart.module.css`
    - Display cart items with service name, tier, and price; show total price
    - Remove individual items; "Book All" navigates to BookingForm with all cart items
    - Empty state with message and link to browse services
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.6_

  - [x] 9.3 Implement Confirmation page
    - Create `src/pages/Confirmation/Confirmation.tsx` and `Confirmation.module.css`
    - Success indicator (checkmark icon/animation), booking reference number, services, date, time, address, total price
    - "View My Bookings" button navigates to MyBookings; "Book Another Service" button navigates to Home
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 10. Implement page components — My Bookings and Profile
  - [x] 10.1 Implement MyBookings page
    - Create `src/pages/MyBookings/MyBookings.tsx` and `MyBookings.module.css`
    - Upcoming and Past tabs/sections; each booking shows reference number, service names, date, time, status
    - Tapping a booking expands or navigates to show full details (address, notes)
    - Empty state per section with prompt to book a service
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x] 10.2 Implement Profile page
    - Create `src/pages/Profile/Profile.tsx` and `Profile.module.css`
    - Display name, email, placeholder avatar; editable name field
    - Saved addresses section (pre-populated with one demo address)
    - "Log Out" button clears session and navigates to Auth
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 11. Wire up routing and App entry point
  - [x] 11.1 Create route definitions and App component
    - Create `src/routes.tsx` with all route definitions matching the design routing structure
    - Update `src/App.tsx` to wrap the app with AuthContext, CartContext, BookingContext providers and render the router
    - Update `src/main.tsx` to render App with theme imports
    - _Requirements: 1.3, 2.3, 2.6, 11.1, 11.2_

  - [ ]* 11.2 Write integration tests for key user flows
    - Test onboarding → auth → home navigation flow
    - Test service browsing → add to cart → booking flow
    - Test login persistence across simulated page refresh
    - _Requirements: 1.1, 1.2, 2.3, 6.6, 7.4, 13.3_

- [x] 12. Responsive polish and visual refinements
  - Apply mobile-first responsive styles: single-column on ≤768px, wider grid layouts on >768px
  - Add smooth transitions and animations for screen navigation, card hover/tap, and loading states
  - Ensure consistent border-radius, shadow, and spacing across all components
  - Add appropriate react-icons for each service category and navigation item
  - Verify the green/teal palette with warm accents is applied consistently throughout
  - _Requirements: 11.3, 11.4, 11.5, 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- All code uses TypeScript with React 18, Vite, React Router v6, and CSS Modules
- No backend — all data is simulated with localStorage using the `cln_` key prefix
- The implementation builds bottom-up: tokens → components → services → contexts → pages → routing → polish
