import type { Service } from '../types';

export const services: Service[] = [
  // ── Car Wash (4 services) ──
  {
    id: 'cw-basic',
    categoryId: 'car-wash',
    name: 'Basic Wash',
    description:
      'A quick exterior wash to remove dirt, dust, and road grime. Includes a rinse, foam wash, and hand dry for a fresh, clean finish.',
    shortDescription: 'Quick exterior wash and hand dry',
    duration: '30-45 min',
    image: 'FaCar',
    featured: true,
    tiers: [
      {
        id: 'cw-basic-std',
        name: 'Standard',
        price: 25,
        description: 'Exterior wash and hand dry',
        includes: ['Exterior rinse', 'Foam wash', 'Hand dry'],
      },
      {
        id: 'cw-basic-prem',
        name: 'Premium',
        price: 40,
        description: 'Standard wash plus tire shine and window clean',
        includes: ['Exterior rinse', 'Foam wash', 'Hand dry', 'Tire shine', 'Window cleaning'],
      },
    ],
  },
  {
    id: 'cw-full-detail',
    categoryId: 'car-wash',
    name: 'Full Detail',
    description:
      'A comprehensive inside-and-out detail that restores your vehicle to showroom condition. Includes clay bar treatment, polish, and interior deep clean.',
    shortDescription: 'Complete interior and exterior detailing',
    duration: '2-3 hours',
    image: 'FaCar',
    featured: false,
    tiers: [
      {
        id: 'cw-detail-std',
        name: 'Standard',
        price: 120,
        description: 'Full exterior and interior detail',
        includes: ['Hand wash', 'Clay bar', 'Polish', 'Interior vacuum', 'Dashboard wipe'],
      },
      {
        id: 'cw-detail-prem',
        name: 'Premium',
        price: 180,
        description: 'Standard detail plus ceramic coating and leather conditioning',
        includes: [
          'Hand wash',
          'Clay bar',
          'Polish',
          'Ceramic coating',
          'Interior vacuum',
          'Leather conditioning',
          'Engine bay clean',
        ],
      },
    ],
  },
  {
    id: 'cw-interior',
    categoryId: 'car-wash',
    name: 'Interior Only',
    description:
      'Focused interior cleaning including vacuuming, surface wipe-down, and odor removal. Perfect for keeping the cabin fresh between full details.',
    shortDescription: 'Deep interior vacuum and surface cleaning',
    duration: '45-60 min',
    image: 'FaCar',
    featured: false,
    tiers: [
      {
        id: 'cw-int-basic',
        name: 'Basic',
        price: 45,
        description: 'Vacuum and surface wipe',
        includes: ['Full vacuum', 'Dashboard & console wipe', 'Door panel cleaning'],
      },
      {
        id: 'cw-int-deep',
        name: 'Deep Clean',
        price: 75,
        description: 'Basic plus shampoo and odor treatment',
        includes: [
          'Full vacuum',
          'Dashboard & console wipe',
          'Carpet shampoo',
          'Seat shampoo',
          'Odor elimination',
        ],
      },
    ],
  },
  {
    id: 'cw-exterior',
    categoryId: 'car-wash',
    name: 'Exterior Only',
    description:
      'Thorough exterior cleaning with hand wash, wheel cleaning, and protective wax coating to shield your paint from the elements.',
    shortDescription: 'Hand wash with wax protection',
    duration: '45-60 min',
    image: 'FaCar',
    featured: false,
    tiers: [
      {
        id: 'cw-ext-std',
        name: 'Standard',
        price: 35,
        description: 'Hand wash and dry',
        includes: ['Hand wash', 'Wheel cleaning', 'Hand dry'],
      },
      {
        id: 'cw-ext-prem',
        name: 'Premium',
        price: 55,
        description: 'Standard plus wax and trim dressing',
        includes: ['Hand wash', 'Wheel cleaning', 'Hand dry', 'Spray wax', 'Trim dressing'],
      },
    ],
  },

  // ── House Cleaning (3 services) ──
  {
    id: 'hc-regular',
    categoryId: 'house-cleaning',
    name: 'Regular Cleaning',
    description:
      'Routine cleaning to keep your home tidy and fresh. Covers all main living areas including kitchen, bathrooms, and bedrooms.',
    shortDescription: 'Routine home cleaning for all rooms',
    duration: '2-3 hours',
    image: 'FaHome',
    featured: true,
    tiers: [
      {
        id: 'hc-reg-1br',
        name: '1-2 Bedrooms',
        price: 90,
        description: 'Cleaning for smaller homes',
        includes: ['Kitchen cleaning', 'Bathroom sanitizing', 'Dusting', 'Vacuuming', 'Mopping'],
      },
      {
        id: 'hc-reg-3br',
        name: '3-4 Bedrooms',
        price: 140,
        description: 'Cleaning for larger homes',
        includes: [
          'Kitchen cleaning',
          'Bathroom sanitizing',
          'Dusting',
          'Vacuuming',
          'Mopping',
          'Baseboard wiping',
        ],
      },
      {
        id: 'hc-reg-5br',
        name: '5+ Bedrooms',
        price: 200,
        description: 'Cleaning for large estates',
        includes: [
          'Kitchen cleaning',
          'Bathroom sanitizing',
          'Dusting',
          'Vacuuming',
          'Mopping',
          'Baseboard wiping',
          'Ceiling fan dusting',
        ],
      },
    ],
  },
  {
    id: 'hc-deep',
    categoryId: 'house-cleaning',
    name: 'Deep Clean',
    description:
      'An intensive top-to-bottom clean that tackles built-up grime, grease, and hidden dirt. Ideal for seasonal refreshes or before special events.',
    shortDescription: 'Intensive top-to-bottom deep cleaning',
    duration: '4-6 hours',
    image: 'FaHome',
    featured: true,
    tiers: [
      {
        id: 'hc-deep-1br',
        name: '1-2 Bedrooms',
        price: 180,
        description: 'Deep clean for smaller homes',
        includes: [
          'All regular cleaning tasks',
          'Inside appliances',
          'Inside cabinets',
          'Wall spot cleaning',
          'Light fixture cleaning',
        ],
      },
      {
        id: 'hc-deep-3br',
        name: '3-4 Bedrooms',
        price: 280,
        description: 'Deep clean for larger homes',
        includes: [
          'All regular cleaning tasks',
          'Inside appliances',
          'Inside cabinets',
          'Wall spot cleaning',
          'Light fixture cleaning',
          'Garage sweep',
        ],
      },
    ],
  },
  {
    id: 'hc-movein',
    categoryId: 'house-cleaning',
    name: 'Move-in/Move-out Clean',
    description:
      'Comprehensive cleaning designed for empty or near-empty homes. Ensures every surface is spotless for new occupants or to secure your deposit.',
    shortDescription: 'Full clean for moving transitions',
    duration: '4-8 hours',
    image: 'FaHome',
    featured: false,
    tiers: [
      {
        id: 'hc-move-std',
        name: 'Standard',
        price: 250,
        description: 'Full empty-home clean',
        includes: [
          'All surfaces cleaned',
          'Inside all cabinets & closets',
          'Appliance cleaning',
          'Bathroom deep scrub',
          'Floor cleaning',
        ],
      },
      {
        id: 'hc-move-prem',
        name: 'Premium',
        price: 380,
        description: 'Standard plus carpet steam and window wash',
        includes: [
          'All surfaces cleaned',
          'Inside all cabinets & closets',
          'Appliance cleaning',
          'Bathroom deep scrub',
          'Carpet steam cleaning',
          'Window washing',
        ],
      },
    ],
  },

  // ── Carpet & Upholstery (3 services) ──
  {
    id: 'cu-carpet',
    categoryId: 'carpet-upholstery',
    name: 'Carpet Cleaning',
    description:
      'Professional hot-water extraction carpet cleaning that removes deep-set stains, allergens, and odors. Safe for all carpet types.',
    shortDescription: 'Hot-water extraction deep carpet clean',
    duration: '1-2 hours',
    image: 'FaCouch',
    featured: false,
    tiers: [
      {
        id: 'cu-carpet-sm',
        name: '1-2 Rooms',
        price: 80,
        description: 'Carpet cleaning for small areas',
        includes: ['Pre-treatment', 'Hot-water extraction', 'Spot treatment', 'Deodorizing'],
      },
      {
        id: 'cu-carpet-md',
        name: '3-4 Rooms',
        price: 140,
        description: 'Carpet cleaning for medium homes',
        includes: ['Pre-treatment', 'Hot-water extraction', 'Spot treatment', 'Deodorizing', 'Hallway included'],
      },
      {
        id: 'cu-carpet-lg',
        name: 'Whole House',
        price: 220,
        description: 'Carpet cleaning for entire home',
        includes: [
          'Pre-treatment',
          'Hot-water extraction',
          'Spot treatment',
          'Deodorizing',
          'Stair cleaning',
          'Protectant application',
        ],
      },
    ],
  },
  {
    id: 'cu-sofa',
    categoryId: 'carpet-upholstery',
    name: 'Sofa/Couch Cleaning',
    description:
      'Gentle yet effective upholstery cleaning for sofas and couches. Removes stains, pet hair, and embedded dirt while preserving fabric quality.',
    shortDescription: 'Professional sofa and couch cleaning',
    duration: '1-2 hours',
    image: 'FaCouch',
    featured: false,
    tiers: [
      {
        id: 'cu-sofa-std',
        name: 'Standard',
        price: 70,
        description: 'Single sofa or loveseat',
        includes: ['Vacuum', 'Spot treatment', 'Steam cleaning', 'Deodorizing'],
      },
      {
        id: 'cu-sofa-set',
        name: 'Full Set',
        price: 130,
        description: 'Sofa set (up to 3 pieces)',
        includes: ['Vacuum', 'Spot treatment', 'Steam cleaning', 'Deodorizing', 'Fabric protectant'],
      },
    ],
  },
  {
    id: 'cu-mattress',
    categoryId: 'carpet-upholstery',
    name: 'Mattress Cleaning',
    description:
      'Deep mattress sanitization that eliminates dust mites, allergens, and stains. Helps improve sleep quality and extend mattress life.',
    shortDescription: 'Deep sanitization and stain removal',
    duration: '45-60 min',
    image: 'FaCouch',
    featured: false,
    tiers: [
      {
        id: 'cu-matt-single',
        name: 'Single/Twin',
        price: 50,
        description: 'Single or twin mattress',
        includes: ['Vacuum', 'UV sanitization', 'Stain treatment', 'Deodorizing'],
      },
      {
        id: 'cu-matt-queen',
        name: 'Queen/King',
        price: 75,
        description: 'Queen or king mattress',
        includes: ['Vacuum', 'UV sanitization', 'Stain treatment', 'Deodorizing', 'Pillow sanitization'],
      },
    ],
  },

  // ── Window Cleaning (3 services) ──
  {
    id: 'wc-interior',
    categoryId: 'window-cleaning',
    name: 'Interior Windows',
    description:
      'Professional interior window cleaning including sills, tracks, and frames. Streak-free results using eco-friendly solutions.',
    shortDescription: 'Interior window, sill, and track cleaning',
    duration: '1-2 hours',
    image: 'FaRegWindowMaximize',
    featured: false,
    tiers: [
      {
        id: 'wc-int-sm',
        name: 'Up to 10 Windows',
        price: 60,
        description: 'Small home interior windows',
        includes: ['Glass cleaning', 'Sill wiping', 'Track cleaning'],
      },
      {
        id: 'wc-int-lg',
        name: '11-20 Windows',
        price: 100,
        description: 'Larger home interior windows',
        includes: ['Glass cleaning', 'Sill wiping', 'Track cleaning', 'Screen dusting'],
      },
    ],
  },
  {
    id: 'wc-exterior',
    categoryId: 'window-cleaning',
    name: 'Exterior Windows',
    description:
      'Safe and thorough exterior window cleaning for homes up to 3 stories. Removes weather buildup, water spots, and grime.',
    shortDescription: 'Exterior window cleaning up to 3 stories',
    duration: '1-3 hours',
    image: 'FaRegWindowMaximize',
    featured: false,
    tiers: [
      {
        id: 'wc-ext-sm',
        name: 'Up to 10 Windows',
        price: 80,
        description: 'Small home exterior windows',
        includes: ['Glass cleaning', 'Frame wiping', 'Screen cleaning'],
      },
      {
        id: 'wc-ext-lg',
        name: '11-20 Windows',
        price: 140,
        description: 'Larger home exterior windows',
        includes: ['Glass cleaning', 'Frame wiping', 'Screen cleaning', 'Hard water spot removal'],
      },
    ],
  },
  {
    id: 'wc-full',
    categoryId: 'window-cleaning',
    name: 'Full Window Service',
    description:
      'Complete interior and exterior window cleaning package. The most thorough option for sparkling windows throughout your home.',
    shortDescription: 'Complete interior and exterior package',
    duration: '2-4 hours',
    image: 'FaRegWindowMaximize',
    featured: true,
    tiers: [
      {
        id: 'wc-full-sm',
        name: 'Up to 10 Windows',
        price: 120,
        description: 'Small home full service',
        includes: [
          'Interior & exterior glass',
          'Sills & tracks',
          'Frames',
          'Screen cleaning',
        ],
      },
      {
        id: 'wc-full-lg',
        name: '11-20 Windows',
        price: 200,
        description: 'Larger home full service',
        includes: [
          'Interior & exterior glass',
          'Sills & tracks',
          'Frames',
          'Screen cleaning',
          'Hard water spot removal',
          'Skylight cleaning',
        ],
      },
    ],
  },

  // ── Specialized (3 services) ──
  {
    id: 'sp-pressure',
    categoryId: 'specialized',
    name: 'Pressure Washing',
    description:
      'High-pressure cleaning for driveways, patios, decks, and exterior walls. Removes mold, mildew, oil stains, and years of buildup.',
    shortDescription: 'High-pressure cleaning for outdoor surfaces',
    duration: '1-3 hours',
    image: 'FaTools',
    featured: false,
    tiers: [
      {
        id: 'sp-press-sm',
        name: 'Small Area',
        price: 100,
        description: 'Driveway or patio (up to 500 sq ft)',
        includes: ['Surface pre-treatment', 'High-pressure wash', 'Debris cleanup'],
      },
      {
        id: 'sp-press-lg',
        name: 'Large Area',
        price: 200,
        description: 'Multiple surfaces (up to 1500 sq ft)',
        includes: [
          'Surface pre-treatment',
          'High-pressure wash',
          'Debris cleanup',
          'Mold/mildew treatment',
          'Sealant application',
        ],
      },
    ],
  },
  {
    id: 'sp-garage',
    categoryId: 'specialized',
    name: 'Garage Cleaning',
    description:
      'Complete garage cleanout and deep cleaning. We organize, sweep, degrease the floor, and leave your garage looking brand new.',
    shortDescription: 'Full garage cleanout and degreasing',
    duration: '2-4 hours',
    image: 'FaTools',
    featured: false,
    tiers: [
      {
        id: 'sp-garage-1',
        name: '1-Car Garage',
        price: 120,
        description: 'Single-car garage cleaning',
        includes: ['Floor sweep & degrease', 'Shelf dusting', 'Cobweb removal', 'Organization'],
      },
      {
        id: 'sp-garage-2',
        name: '2-Car Garage',
        price: 200,
        description: 'Double-car garage cleaning',
        includes: [
          'Floor sweep & degrease',
          'Shelf dusting',
          'Cobweb removal',
          'Organization',
          'Wall wipe-down',
          'Window cleaning',
        ],
      },
    ],
  },
  {
    id: 'sp-postconstruction',
    categoryId: 'specialized',
    name: 'Post-Construction Cleanup',
    description:
      'Thorough cleanup after renovations or new construction. Removes dust, debris, adhesive residue, and paint splatters from all surfaces.',
    shortDescription: 'Cleanup after renovation or construction',
    duration: '4-8 hours',
    image: 'FaTools',
    featured: false,
    tiers: [
      {
        id: 'sp-post-std',
        name: 'Standard',
        price: 300,
        description: 'Single room or small area post-construction',
        includes: [
          'Debris removal',
          'Dust wipe-down',
          'Floor cleaning',
          'Window cleaning',
          'Fixture polishing',
        ],
      },
      {
        id: 'sp-post-prem',
        name: 'Premium',
        price: 500,
        description: 'Whole home post-construction',
        includes: [
          'Debris removal',
          'Dust wipe-down',
          'Floor cleaning',
          'Window cleaning',
          'Fixture polishing',
          'Adhesive removal',
          'Paint splatter cleanup',
          'HVAC vent cleaning',
        ],
      },
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return services.filter((s) => s.categoryId === categoryId);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}
