'use client';

import React from 'react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
  // S'assurer que quantity est un nombre valide
  const safeQuantity = Number(quantity) || 0;
  
  const handleIncrement = () => onQuantityChange(safeQuantity + 1);
  const handleDecrement = () => {
    // Pour les consignes, permettre les valeurs négatives (restitution)
    if (product.category === 'consigne') {
      onQuantityChange(safeQuantity - 1);
    } else {
      // Pour les autres produits, minimum 0
      onQuantityChange(Math.max(0, safeQuantity - 1));
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-md border border-gray-200 min-h-[8rem] flex flex-col">
      <div className="flex flex-col justify-between h-full flex-1">
        <div className="text-center flex-1 flex flex-col justify-center">
          <h3 className="font-bold text-base leading-tight text-gray-900 mb-1">{product.name}</h3>
          <div className="text-lg font-medium text-blue-600 mb-1">{product.price.toFixed(2)}€</div>
          {product.consigne && (
            <div className="text-xs text-orange-600 mb-1">+ {product.consigne.toFixed(2)}€ consigne</div>
          )}
        </div>

        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center space-x-2">
            {/* Bouton - : toujours visible pour consignes, visible seulement si quantity > 0 pour autres */}
            {(product.category === 'consigne' || safeQuantity > 0) && (
              <button
                onClick={handleDecrement}
                className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg flex items-center justify-center transition-colors"
              >
                -
              </button>
            )}
            
            {/* Affichage de la quantité seulement si différente de 0 */}
            {safeQuantity !== 0 && (
              <span className={`text-lg font-bold min-w-[2rem] text-center ${
                safeQuantity < 0 ? 'text-green-600' : ''
              }`}>
                {safeQuantity}
              </span>
            )}
            
            {/* Bouton + : toujours visible */}
            <button
              onClick={handleIncrement}
              className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
