'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/Button';

export default function AdminPage() {
  const [customProducts, setCustomProducts] = useLocalStorage<Product[]>('customProducts', PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<{price: string, consigne: string}>({price: '', consigne: ''});

  const startEditing = (product: Product) => {
    setEditingProduct(product.id);
    setTempValues({
      price: product.price.toString(),
      consigne: product.consigne?.toString() || ''
    });
  };

  const saveProduct = (productId: string) => {
    const newProducts = customProducts.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          price: parseFloat(tempValues.price) || product.price,
          consigne: tempValues.consigne ? parseFloat(tempValues.consigne) : product.consigne
        };
      }
      return product;
    });
    setCustomProducts(newProducts);
    setEditingProduct(null);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setTempValues({price: '', consigne: ''});
  };

  const resetToDefault = () => {
    if (confirm('Êtes-vous sûr de vouloir remettre les prix par défaut ?')) {
      setCustomProducts(PRODUCTS);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">⚙️ Administration</h1>
            <Link href="/" className="text-blue-200 hover:text-white">
              ← Retour
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Configuration des produits</h2>
            <Button variant="secondary" onClick={resetToDefault}>
              🔄 Remettre par défaut
            </Button>
          </div>

          <div className="space-y-4">
            {customProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    {editingProduct === product.id ? (
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prix (€)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={tempValues.price}
                            onChange={(e) => setTempValues({...tempValues, price: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Consigne (€) - optionnel
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={tempValues.consigne}
                            onChange={(e) => setTempValues({...tempValues, consigne: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1 text-gray-600">
                        <span>{product.price.toFixed(2)}€</span>
                        {product.consigne && (
                          <span className="text-orange-600 ml-2">+ {product.consigne.toFixed(2)}€ consigne</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    {editingProduct === product.id ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => saveProduct(product.id)}
                        >
                          ✓ Sauver
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={cancelEditing}
                        >
                          ✗ Annuler
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(product)}
                      >
                        ✏️ Modifier
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">ℹ️ Information</h3>
          <p className="text-yellow-700 text-sm">
            Les modifications sont sauvegardées localement sur cet appareil. 
            Pour partager la configuration avec d&apos;autres appareils, vous devrez 
            modifier les prix sur chaque appareil séparément.
          </p>
        </div>
      </main>
    </div>
  );
}
