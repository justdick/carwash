import type { Promotion } from '../types';

export const promotions: Promotion[] = [
  {
    id: 'promo-spring',
    title: 'Spring Cleaning Special',
    description: 'Get your home sparkling clean this season with our deep cleaning package.',
    discount: '20% OFF',
    categoryId: 'house-cleaning',
  },
  {
    id: 'promo-carwash',
    title: 'First Car Wash Free',
    description: 'New customers get a complimentary Basic Wash on their first booking.',
    discount: 'FREE',
    categoryId: 'car-wash',
    serviceId: 'cw-basic',
  },
  {
    id: 'promo-bundle',
    title: 'Bundle & Save',
    description: 'Book 3 or more services together and save on the total price.',
    discount: '15% OFF',
  },
];
