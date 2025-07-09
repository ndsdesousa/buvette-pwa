import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // BOISSONS
  {
    id: 'soda',
    name: 'Soda',
    price: 2.00,
    category: 'boisson',
  },
  {
    id: 'eau-plate',
    name: 'Eau plate 50cl',
    price: 0.50,
    category: 'boisson',
  },
  {
    id: 'cafe',
    name: 'Café',
    price: 0.50,
    category: 'boisson',
  },
  {
    id: 'verre-vin',
    name: 'Verre vin rouge/rosé',
    price: 1.50,
    category: 'boisson',
  },
  {
    id: 'bouteille-vin',
    name: 'Bouteille vin rouge/rosé',
    price: 8.00,
    category: 'boisson',
  },
  {
    id: 'verre-petillant',
    name: 'Verre pétillant',
    price: 2.00,
    category: 'boisson',
  },
  {
    id: 'bouteille-petillant',
    name: 'Bouteille pétillant',
    price: 12.00,
    category: 'boisson',
  },
  
  // BIÈRES
  {
    id: 'biere-blonde',
    name: 'Bière blonde',
    price: 3.00,
    consigne: 1.00,
    category: 'boisson',
  },
  {
    id: 'biere-rouge',
    name: 'Bière rouge',
    price: 3.50,
    consigne: 1.00,
    category: 'boisson',
  },
  {
    id: 'biere-ipa',
    name: 'Bière IPA',
    price: 3.50,
    consigne: 1.00,
    category: 'boisson',
  },

  // PICHETS DE BIÈRES (4 bières + 3€ consigne)
  {
    id: 'pichet-blonde',
    name: 'Pichet bière blonde',
    price: 12.00,
    consigne: 3.00,
    category: 'boisson',
  },
  {
    id: 'pichet-rouge',
    name: 'Pichet bière rouge',
    price: 14.00,
    consigne: 3.00,
    category: 'boisson',
  },
  {
    id: 'pichet-ipa',
    name: 'Pichet bière IPA',
    price: 14.00,
    consigne: 3.00,
    category: 'boisson',
  },

  // RESTAURATION
  {
    id: 'planchette-apero',
    name: 'Planchette apéro',
    price: 10.00,
    consigne: 2.00,
    category: 'restauration',
  },

  // CONSIGNES
  {
    id: 'consigne-gobelet',
    name: 'Consigne gobelet',
    price: 1.00,
    category: 'consigne',
  },
  {
    id: 'consigne-pichet',
    name: 'Consigne pichet',
    price: 3.00,
    category: 'consigne',
  },
  {
    id: 'consigne-planchette',
    name: 'Consigne planchette',
    price: 2.00,
    category: 'consigne',
  },
];

export const RETOUR_CONSIGNES = [
  { label: '+1€', value: 1 },
  { label: '+2€', value: 2 },
  { label: '+3€', value: 3 },
  { label: '+5€', value: 5 },
];
