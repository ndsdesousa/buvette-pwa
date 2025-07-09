'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { OrderItem, Order, Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { OrderSummary } from '@/components/OrderSummary';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function HomePage() {
  // Stockage des produits personnalisés
  const [customProducts] = useLocalStorage<Product[]>('customProducts', PRODUCTS);
  
  // État local pour la commande en cours
  const [quantities, setQuantities] = useState<Record<string, number>>(
    customProducts.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
  );
  const [consignesReturned, setConsignesReturned] = useState(0);
  
  // Stockage des commandes pour historique
  const [dailyOrders, setDailyOrders] = useLocalStorage<Order[]>('dailyOrders', []);

  // État pour l'accès admin
  const [adminAccess, setAdminAccess] = useState(false);

  const handleQuantityChange = useCallback((productId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [productId]: quantity }));
  }, []);

  const handleReset = useCallback(() => {
    setQuantities(customProducts.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {}));
    setConsignesReturned(0);
  }, [customProducts]);

  const handleConfirmOrder = useCallback(() => {
    const orderItems: OrderItem[] = customProducts
      .filter(product => quantities[product.id] > 0)
      .map(product => ({
        product,
        quantity: quantities[product.id],
      }));

    if (orderItems.length === 0 && consignesReturned === 0) return;

    const totalBoissons = orderItems.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
    const totalConsignes = orderItems.reduce((sum, item) => {
      return sum + (item.product.consigne ? item.quantity * item.product.consigne : 0);
    }, 0);
    const finalTotal = totalBoissons + totalConsignes - consignesReturned;

    const newOrder: Order = {
      id: Date.now().toString(),
      items: orderItems,
      consignesReturned,
      total: totalBoissons,
      totalConsignes,
      finalTotal,
      timestamp: new Date(),
    };

    setDailyOrders(prev => [...prev, newOrder]);
    handleReset();

    // Afficher une confirmation
    alert(`Commande confirmée !\nTotal: ${finalTotal.toFixed(2)}€`);
  }, [quantities, consignesReturned, customProducts, setDailyOrders, handleReset]);

  // Gestion de l'accès admin (appui long)
  const handleLongPress = useCallback(() => {
    setAdminAccess(true);
    setTimeout(() => setAdminAccess(false), 5000); // Accès pendant 5 secondes
  }, []);

  let pressTimer: NodeJS.Timeout;

  const handleMouseDown = () => {
    pressTimer = setTimeout(handleLongPress, 2000); // 2 secondes d'appui
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  // Calculer les items actuels pour le récapitulatif
  const currentOrderItems: OrderItem[] = customProducts
    .filter(product => quantities[product.id] > 0)
    .map(product => ({
      product,
      quantity: quantities[product.id],
    }));

  const todayTotal = dailyOrders.reduce((sum, order) => sum + order.finalTotal, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 
              className="text-2xl font-bold select-none" 
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
            >
              🍺 Buvette Comité des Fêtes
            </h1>
            <div className="flex space-x-4">
              {adminAccess && (
                <Link 
                  href="/admin" 
                  className="text-yellow-200 hover:text-white text-sm underline"
                >
                  ⚙️ Admin
                </Link>
              )}
              <Link 
                href="/history" 
                className="text-blue-200 hover:text-white text-sm underline"
              >
                📊 Historique
              </Link>
            </div>
          </div>
          {dailyOrders.length > 0 && (
            <div className="text-center mt-2 text-blue-100">
              {dailyOrders.length} commande(s) - Total du jour: {todayTotal.toFixed(2)}€
            </div>
          )}
        </div>
      </header>

      {/* Grille des produits */}
      <main className="max-w-4xl mx-auto p-4 pb-96">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 0}
              onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
            />
          ))}
        </div>
      </main>

      {/* Récapitulatif de commande */}
      <OrderSummary
        items={currentOrderItems}
        consignesReturned={consignesReturned}
        onConsignesReturnedChange={setConsignesReturned}
        onReset={handleReset}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
