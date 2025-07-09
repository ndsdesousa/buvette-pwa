import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'soda',
    name: 'Sodas',
    price: 2.00,
    category: 'boisson',
  },
  {
    id: 'vin-rose',
    name: 'Verre de vin rosé',
    price: 3.50,
    category: 'boisson',
  },
  {
    id: 'bouteille-petillant',
    name: 'Bouteille pétillant',
    price: 8.00,
    category: 'boisson',
  },
  {
    id: 'biere-verre',
    name: 'Bière verre consigné',
    price: 3.00,
    consigne: 1.00,
    category: 'boisson',
  },
  {
    id: 'pichet-biere',
    name: 'Pichet de bière',
    price: 12.00,
    consigne: 2.00,
    category: 'boisson',
  },
  {
    id: 'planchette-apero',
    name: 'Planchette apéro',
    price: 8.00,
    consigne: 3.00,
    category: 'boisson',
  },
];

export const RETOUR_CONSIGNES = [
  { label: '+1€', value: 1 },
  { label: '+2€', value: 2 },
  { label: '+3€', value: 3 },
  { label: '+5€', value: 5 },
];
