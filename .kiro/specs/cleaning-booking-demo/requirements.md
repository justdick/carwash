# Requirements Document

## Introduction

A client-facing booking demo for a cleaning services company. Customers use a mobile app-style web interface to browse and book various cleaning services (car wash, house cleaning, carpet cleaning, window cleaning, and specialized services). The company travels to the customer's location for all services. The demo is a responsive web application — mobile-first with bottom navigation on small screens, and a standard web layout on desktop. All data is simulated (mock data, local storage) with no real backend. The UI should feel polished and premium with a fresh, vibrant color palette (greens/teals with warm accents) — avoiding the generic blue-and-white look.

## Glossary

- **App**: The cleaning services booking web application
- **Customer**: The end user who browses and books cleaning services
- **Service**: A specific cleaning offering (e.g., Basic Car Wash, Deep House Clean)
- **Service_Category**: A grouping of related services (e.g., Car Wash, House Cleaning)
- **Booking**: A confirmed reservation for one or more services at a specific date, time, and location
- **Cart**: A temporary collection of services the Customer has selected before confirming a Booking
- **Booking_Form**: The interface where the Customer selects date, time, address, and optional notes for a Booking
- **Home_Screen**: The main landing screen showing featured services, categories, and promotions
- **Bottom_Navigation**: A fixed navigation bar at the bottom of the screen on mobile viewports with links to Home, Bookings, Cart, and Profile
- **Desktop_Navigation**: A standard top/sidebar navigation used on larger viewports
- **Onboarding_Screen**: An introductory welcome flow shown to first-time users
- **Auth_Screen**: The login and signup interface
- **My_Bookings_Screen**: A screen displaying the Customer's upcoming and past bookings
- **Profile_Screen**: A screen showing the Customer's account information and settings
- **Confirmation_Screen**: A screen displayed after a Booking is successfully placed, showing a summary and reference number
- **Service_Detail_Screen**: A screen showing full details of a Service including pricing tiers and descriptions
- **Mock_Data**: Predefined static data used to simulate real service listings, pricing, and bookings
- **Local_Storage**: Browser localStorage used to persist demo state (auth, bookings, cart) across sessions

## Requirements

### Requirement 1: Onboarding Experience

**User Story:** As a new Customer, I want to see a brief introduction to the app when I first open it, so that I understand what services are available and how to book.

#### Acceptance Criteria

1. WHEN the Customer opens the App for the first time, THE Onboarding_Screen SHALL display 2-3 swipeable slides introducing the company's services and booking process.
2. WHEN the Customer taps "Get Started" or "Skip" on the Onboarding_Screen, THE App SHALL navigate the Customer to the Auth_Screen.
3. WHEN the Customer has completed onboarding once, THE App SHALL skip the Onboarding_Screen on subsequent visits and navigate directly to the Auth_Screen or Home_Screen based on login state.

### Requirement 2: Authentication

**User Story:** As a Customer, I want to sign up and log in to the app, so that I can manage my bookings and profile.

#### Acceptance Criteria

1. THE Auth_Screen SHALL provide both a Login form and a Signup form, each requiring an email address and password.
2. WHEN the Customer submits valid signup credentials, THE App SHALL create a simulated account and store the credentials in Local_Storage.
3. WHEN the Customer submits valid login credentials that match a stored account, THE App SHALL authenticate the Customer and navigate to the Home_Screen.
4. IF the Customer submits login credentials that do not match any stored account, THEN THE App SHALL display an error message indicating invalid credentials.
5. IF the Customer submits a signup with an email that already exists in Local_Storage, THEN THE App SHALL display an error message indicating the account already exists.
6. WHEN the Customer is authenticated, THE App SHALL persist the session in Local_Storage so the Customer remains logged in on page refresh.

### Requirement 3: Home Screen

**User Story:** As a Customer, I want to see an overview of available services and promotions when I open the app, so that I can quickly find what I need.

#### Acceptance Criteria

1. THE Home_Screen SHALL display a greeting with the Customer's name.
2. THE Home_Screen SHALL display all Service_Category options (Car Wash, House Cleaning, Carpet & Upholstery, Window Cleaning, Specialized) as tappable cards or icons.
3. THE Home_Screen SHALL display a promotional banner section with at least one demo promotion.
4. THE Home_Screen SHALL display a "Featured Services" section showing 3-4 popular services with pricing.
5. WHEN the Customer taps a Service_Category card, THE App SHALL navigate to the corresponding category listing screen.
6. WHEN the Customer taps a featured Service, THE App SHALL navigate to the Service_Detail_Screen for that Service.

### Requirement 4: Service Browsing

**User Story:** As a Customer, I want to browse services within a category, so that I can compare options and find the right service for my needs.

#### Acceptance Criteria

1. WHEN the Customer navigates to a Service_Category, THE App SHALL display all services within that category as a scrollable list of cards.
2. THE App SHALL display each Service card with the service name, a brief description, starting price, and estimated duration.
3. WHEN the Customer taps a Service card, THE App SHALL navigate to the Service_Detail_Screen for that Service.
4. THE App SHALL provide the following Service_Category listings with Mock_Data:
   - Car Wash: Basic Wash, Full Detail, Interior Only, Exterior Only
   - House Cleaning: Regular Cleaning, Deep Clean, Move-in/Move-out Clean
   - Carpet & Upholstery: Carpet Cleaning, Sofa/Couch Cleaning, Mattress Cleaning
   - Window Cleaning: Interior Windows, Exterior Windows, Full Window Service
   - Specialized: Pressure Washing, Garage Cleaning, Post-Construction Cleanup

### Requirement 5: Service Detail

**User Story:** As a Customer, I want to see full details about a service including what's included and pricing options, so that I can make an informed booking decision.

#### Acceptance Criteria

1. THE Service_Detail_Screen SHALL display the service name, description, estimated duration, and an illustrative image or icon.
2. THE Service_Detail_Screen SHALL display available pricing tiers or packages for the Service (e.g., Basic, Standard, Premium) with price and what's included in each tier.
3. THE Service_Detail_Screen SHALL display a "Book Now" button.
4. WHEN the Customer taps "Book Now", THE App SHALL navigate to the Booking_Form with the selected Service and tier pre-filled.
5. THE Service_Detail_Screen SHALL display an "Add to Cart" button allowing the Customer to add the Service to the Cart without immediately booking.

### Requirement 6: Booking Flow

**User Story:** As a Customer, I want to select a date, time, and provide my address to book a service, so that the cleaning team can come to my location.

#### Acceptance Criteria

1. THE Booking_Form SHALL require the Customer to select a date from a calendar picker showing available dates (simulated — all future dates available).
2. THE Booking_Form SHALL require the Customer to select a time slot from a list of available slots (simulated — hourly slots from 8 AM to 6 PM).
3. THE Booking_Form SHALL require the Customer to enter a service address including street address, city, and zip code.
4. THE Booking_Form SHALL allow the Customer to enter optional notes or special instructions for the service.
5. THE Booking_Form SHALL display a summary of the selected Service, tier, date, time, and address before the Customer confirms.
6. WHEN the Customer taps "Confirm Booking" on the Booking_Form, THE App SHALL create a Booking record in Local_Storage with a unique reference number.
7. WHEN the Booking is successfully created, THE App SHALL navigate to the Confirmation_Screen.

### Requirement 7: Cart and Multi-Service Booking

**User Story:** As a Customer, I want to add multiple services to a cart and book them together, so that I can schedule several cleanings in one session.

#### Acceptance Criteria

1. THE Cart SHALL display all services the Customer has added, showing service name, tier, and price for each item.
2. THE Cart SHALL display the total price for all items.
3. THE Cart SHALL allow the Customer to remove individual services from the Cart.
4. WHEN the Customer taps "Book All" in the Cart, THE App SHALL navigate to the Booking_Form with all Cart services included.
5. WHEN a multi-service Booking is confirmed, THE App SHALL create a single Booking record containing all selected services.
6. WHEN the Cart is empty, THE Cart SHALL display a message indicating no services have been added and provide a link to browse services.
7. THE App SHALL display a badge on the Cart icon in the navigation showing the number of items in the Cart.

### Requirement 8: Booking Confirmation

**User Story:** As a Customer, I want to see a confirmation of my booking with all the details, so that I know my booking was successful.

#### Acceptance Criteria

1. THE Confirmation_Screen SHALL display a success indicator (checkmark icon or animation).
2. THE Confirmation_Screen SHALL display the Booking reference number, selected services, date, time, address, and total price.
3. THE Confirmation_Screen SHALL provide a "View My Bookings" button that navigates to the My_Bookings_Screen.
4. THE Confirmation_Screen SHALL provide a "Book Another Service" button that navigates to the Home_Screen.

### Requirement 9: My Bookings

**User Story:** As a Customer, I want to view my upcoming and past bookings, so that I can keep track of my scheduled services.

#### Acceptance Criteria

1. THE My_Bookings_Screen SHALL display bookings in two tabs or sections: "Upcoming" and "Past".
2. THE My_Bookings_Screen SHALL display each Booking with the reference number, service names, date, time, and status.
3. WHEN the Customer taps a Booking, THE My_Bookings_Screen SHALL expand or navigate to show full Booking details including address and notes.
4. WHEN there are no bookings in a section, THE My_Bookings_Screen SHALL display an empty state message with a prompt to book a service.
5. THE App SHALL categorize Bookings as "Upcoming" when the booking date is in the future and "Past" when the booking date has passed.

### Requirement 10: Customer Profile

**User Story:** As a Customer, I want to view and manage my profile information, so that I can keep my details up to date.

#### Acceptance Criteria

1. THE Profile_Screen SHALL display the Customer's name, email, and a placeholder avatar.
2. THE Profile_Screen SHALL allow the Customer to edit their name.
3. THE Profile_Screen SHALL display a saved addresses section (pre-populated with one demo address).
4. THE Profile_Screen SHALL provide a "Log Out" button.
5. WHEN the Customer taps "Log Out", THE App SHALL clear the session from Local_Storage and navigate to the Auth_Screen.

### Requirement 11: Responsive Layout and Navigation

**User Story:** As a Customer, I want the app to work well on both my phone and my laptop, so that I can book services from any device.

#### Acceptance Criteria

1. WHILE the viewport width is 768px or less, THE App SHALL display the Bottom_Navigation with icons and labels for Home, Bookings, Cart, and Profile.
2. WHILE the viewport width is greater than 768px, THE App SHALL display the Desktop_Navigation as a top navigation bar or sidebar.
3. THE App SHALL use a mobile-first responsive design that adapts layouts, font sizes, and spacing for different screen sizes.
4. WHILE the viewport width is 768px or less, THE App SHALL render screens in a single-column layout optimized for touch interaction.
5. WHILE the viewport width is greater than 768px, THE App SHALL render screens in a wider layout utilizing available horizontal space (e.g., grid layouts for service cards).

### Requirement 12: Visual Design and Theming

**User Story:** As the client, I want the demo to look polished and premium with a fresh color palette, so that it impresses stakeholders and feels like a real product.

#### Acceptance Criteria

1. THE App SHALL use a primary color palette based on greens and teals with warm accent colors, avoiding generic blue-and-white themes.
2. THE App SHALL define all colors, spacing, and typography as CSS custom properties (design tokens) so that brand colors can be swapped in later.
3. THE App SHALL use smooth transitions and animations for screen navigation, card interactions, and loading states.
4. THE App SHALL use consistent border radius, shadow, and spacing across all components to maintain a cohesive visual identity.
5. THE App SHALL display appropriate icons for each Service_Category and navigation item.

### Requirement 13: Demo Data and State Persistence

**User Story:** As a demo presenter, I want the app to have realistic sample data and persist state across page refreshes, so that the demo feels authentic during a client presentation.

#### Acceptance Criteria

1. THE App SHALL pre-populate all Service_Category and Service listings with realistic Mock_Data including names, descriptions, pricing, and durations.
2. THE App SHALL persist Cart contents, Booking records, and authentication state in Local_Storage.
3. WHEN the Customer refreshes the page, THE App SHALL restore the previous state from Local_Storage including login status, Cart items, and Bookings.
4. THE App SHALL generate unique reference numbers for each Booking in the format "CLN-" followed by 6 alphanumeric characters.
