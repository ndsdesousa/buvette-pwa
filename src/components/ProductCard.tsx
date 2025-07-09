'use client';

import React from 'react';
import { Product } from '@/types';
import { Button } from './ui/Button';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function ProductCard({ product, quantity, onQuantityChange }: ProductCardProps) {
  const handleIncrement = () => onQuantityChange(quantity + 1);
  const handleDecrement = () => onQuantityChange(Math.max(0, quantity - 1));

  const totalPrice = quantity * product.price;
  const totalConsigne = product.consigne ? quantity * product.consigne : 0;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
      <div className="flex flex-col space-y-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
          <div className="text-sm text-gray-600 mt-1">
            <div>{product.price.toFixed(2)}€</div>
            {product.consigne && (
              <div className="text-orange-600">+ {product.consigne.toFixed(2)}€ consigne</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecrement}
              disabled={quantity === 0}
              className="w-12 h-12 p-0 text-xl"
            >
              -
            </Button>
            
            <span className="text-2xl font-bold min-w-[3rem] text-center">
              {quantity}
            </span>
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleIncrement}
              className="w-12 h-12 p-0 text-xl"
            >
              +
            </Button>
          </div>

          {quantity > 0 && (
            <div className="text-right">
              <div className="font-semibold text-lg">
                {totalPrice.toFixed(2)}€
              </div>
              {totalConsigne > 0 && (
                <div className="text-sm text-orange-600">
                  +{totalConsigne.toFixed(2)}€ consigne
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
