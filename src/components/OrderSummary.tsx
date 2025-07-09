'use client';

import React from 'react';
import { OrderItem } from '@/types';
import { Button } from './ui/Button';

interface OrderSummaryProps {
  items: OrderItem[];
  consignesReturned: number;
  onConsignesReturnedChange: (amount: number) => void;
  onReset: () => void;
  onConfirm: () => void;
}

export function OrderSummary({ 
  items, 
  consignesReturned, 
  onConsignesReturnedChange, 
  onReset, 
  onConfirm 
}: OrderSummaryProps) {
  const totalBoissons = items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
  const totalConsignes = items.reduce((sum, item) => {
    return sum + (item.product.consigne ? item.quantity * item.product.consigne : 0);
  }, 0);
  const finalTotal = totalBoissons + totalConsignes - consignesReturned;

  const hasItems = items.some(item => item.quantity > 0);

  if (!hasItems && consignesReturned === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-blue-200 sticky bottom-4 mx-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Récapitulatif</h2>
      
      {hasItems && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Total boissons:</span>
            <span className="font-semibold">{totalBoissons.toFixed(2)}€</span>
          </div>
          {totalConsignes > 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Consignes à encaisser:</span>
              <span className="font-semibold">+{totalConsignes.toFixed(2)}€</span>
            </div>
          )}
        </div>
      )}

      {/* Retours de consignes */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span>Retours de consignes:</span>
          <span className="font-semibold text-green-600">
            -{consignesReturned.toFixed(2)}€
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 5].map(amount => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => onConsignesReturnedChange(consignesReturned + amount)}
              className="h-10"
            >
              +{amount}€
            </Button>
          ))}
        </div>
        {consignesReturned > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onConsignesReturnedChange(0)}
            className="w-full mt-2 h-10"
          >
            Reset retours
          </Button>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>TOTAL À PAYER:</span>
          <span className="text-green-600">{finalTotal.toFixed(2)}€</span>
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        <Button
          variant="secondary"
          onClick={onReset}
          className="flex-1"
        >
          Reset
        </Button>
        <Button
          variant="success"
          onClick={onConfirm}
          className="flex-1"
          disabled={finalTotal <= 0}
        >
          Confirmer
        </Button>
      </div>
    </div>
  );
}
