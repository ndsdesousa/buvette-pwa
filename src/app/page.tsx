'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { OrderItem } from '@/types';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  // État local pour la commande en cours
  const [quantities, setQuantities] = useState<Record<string, number>>(() => 
    PRODUCTS.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
  );

  // État pour l'accès admin
  const [adminAccess, setAdminAccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'boissons' | 'nourriture' | 'consignes'>('boissons');

  const handleQuantityChange = useCallback((productId: string, quantity: number) => {
    // S'assurer que la quantité est un nombre valide
    const safeQuantity = Number(quantity) || 0;
    setQuantities(prev => ({ ...prev, [productId]: safeQuantity }));
  }, []);

  const handleReset = useCallback(() => {
    const resetQuantities = PRODUCTS.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {});
    setQuantities(resetQuantities);
  }, []);

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
  const currentOrderItems: OrderItem[] = PRODUCTS
    .filter(product => {
      const qty = quantities[product.id];
      return qty != null && qty !== 0;
    })
    .map(product => ({
      product,
      quantity: quantities[product.id] || 0,
    }));

  // Filtrer les produits selon la catégorie active
  const getFilteredProducts = () => {
    switch (activeCategory) {
      case 'boissons':
        return PRODUCTS.filter(product => product.category === 'boisson');
      case 'nourriture':
        return PRODUCTS.filter(product => product.category === 'restauration');
      case 'consignes':
        return PRODUCTS.filter(product => product.category === 'consigne');
      default:
        return PRODUCTS;
    }
  };

  const filteredProducts = getFilteredProducts();

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
              Comité des fêtes Mettray
            </h1>
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                className="bg-transparent hover:bg-orange-100 text-orange-400 hover:text-orange-500 p-2 rounded-lg font-bold transition-colors text-xl"
                title="Remettre à zéro"
              >
                ↻
              </button>
              {adminAccess && (
                <Link 
                  href="/admin" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  ⚙️ Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Grille des produits */}
      <main className="max-w-4xl mx-auto p-4 pb-48">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 0}
              onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
            />
          ))}
        </div>
      </main>

      {/* Barre de navigation en bas */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
        <div className="flex">
          <button
            onClick={() => setActiveCategory('boissons')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeCategory === 'boissons'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="text-lg mb-1">🥤</div>
            <div className="text-xs">Boissons</div>
          </button>
          
          <button
            onClick={() => setActiveCategory('nourriture')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeCategory === 'nourriture'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="text-lg mb-1">🍴</div>
            <div className="text-xs">Nourriture</div>
          </button>
          
          <button
            onClick={() => setActiveCategory('consignes')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeCategory === 'consignes'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="text-lg mb-1">🔄</div>
            <div className="text-xs">Consignes</div>
          </button>
        </div>
      </nav>

      {/* Récapitulatif simplifié fixe en bas */}
      {currentOrderItems.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30 p-2">
          <div className="max-w-4xl mx-auto">
            {/* Détail des totaux */}
            <div className="space-y-1">
              {(() => {
                const boissonsNourriture = currentOrderItems.filter(item => item.product.category !== 'consigne');
                const consignesDirectes = currentOrderItems.filter(item => item.product.category === 'consigne');
                
                // Calculer le total des boissons/nourriture (sans leurs consignes)
                const totalBoissonsNourriture = boissonsNourriture.reduce((sum, item) => {
                  const quantity = Number(item.quantity) || 0;
                  const price = Number(item.product.price) || 0;
                  return sum + (quantity * price);
                }, 0);
                
                // Calculer le total des consignes des produits + consignes directes
                const totalConsignesProduits = boissonsNourriture.reduce((sum, item) => {
                  const quantity = Number(item.quantity) || 0;
                  const consigneValue = Number(item.product.consigne) || 0;
                  return sum + (quantity * consigneValue);
                }, 0);
                const totalConsignesDirectes = consignesDirectes.reduce((sum, item) => {
                  const quantity = Number(item.quantity) || 0;
                  const price = Number(item.product.price) || 0;
                  return sum + (quantity * price);
                }, 0);
                const totalConsignes = totalConsignesProduits + totalConsignesDirectes;
                
                const totalGeneral = totalBoissonsNourriture + totalConsignes;

                return (
                  <>
                    {totalBoissonsNourriture > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-700">Boissons / Nourriture :</span>
                        <span className="text-xs font-medium">{totalBoissonsNourriture.toFixed(2)}€</span>
                      </div>
                    )}
                    
                    {totalConsignes !== 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-700">
                          {totalConsignes > 0 ? 'Consignes :' : 'Restitution consignes :'}
                        </span>
                        <span className={`text-xs font-medium ${totalConsignes > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                          {totalConsignes > 0 ? '+' : ''}{totalConsignes.toFixed(2)}€
                        </span>
                      </div>
                    )}
                    
                    <div className="border-t pt-1 mt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">Total :</span>
                        <span className="text-lg font-bold text-blue-600">
                          {totalGeneral.toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
