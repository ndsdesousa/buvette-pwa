'use client';

import React from 'react';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Order } from '@/types';
import { Button } from '@/components/ui/Button';

export default function HistoryPage() {
  const [dailyOrders, setDailyOrders] = useLocalStorage<Order[]>('dailyOrders', []);

  const totalDuJour = dailyOrders.reduce((sum, order) => sum + order.finalTotal, 0);
  const totalBoissons = dailyOrders.reduce((sum, order) => sum + order.total, 0);
  const totalConsignes = dailyOrders.reduce((sum, order) => sum + order.totalConsignes, 0);
  const totalRetours = dailyOrders.reduce((sum, order) => sum + order.consignesReturned, 0);

  const clearHistory = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer l&apos;historique du jour ?')) {
      setDailyOrders([]);
    }
  };

  const exportData = () => {
    const data = {
      date: new Date().toLocaleDateString('fr-FR'),
      summary: {
        totalOrders: dailyOrders.length,
        totalSales: totalDuJour,
        totalDrinks: totalBoissons,
        totalConsignes: totalConsignes,
        totalReturns: totalRetours,
      },
      orders: dailyOrders,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buvette-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">📊 Historique des ventes</h1>
            <Link href="/" className="text-blue-200 hover:text-white">
              ← Retour
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Résumé du jour */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Résumé du jour</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dailyOrders.length}</div>
              <div className="text-sm text-gray-600">Commandes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalDuJour.toFixed(2)}€</div>
              <div className="text-sm text-gray-600">Total encaissé</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalConsignes.toFixed(2)}€</div>
              <div className="text-sm text-gray-600">Consignes prises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{totalRetours.toFixed(2)}€</div>
              <div className="text-sm text-gray-600">Consignes rendues</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <Button
            variant="secondary"
            onClick={exportData}
            disabled={dailyOrders.length === 0}
          >
            📥 Exporter les données
          </Button>
          <Button
            variant="danger"
            onClick={clearHistory}
            disabled={dailyOrders.length === 0}
          >
            🗑️ Effacer l&apos;historique
          </Button>
        </div>

        {/* Liste des commandes */}
        {dailyOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-2">📝</div>
            <p className="text-gray-600">Aucune commande aujourd&apos;hui</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dailyOrders.reverse().map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-gray-600">
                    {new Date(order.timestamp).toLocaleTimeString('fr-FR')}
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {order.finalTotal.toFixed(2)}€
                  </div>
                </div>
                
                {order.items.length > 0 && (
                  <div className="mb-2">
                    <div className="text-sm font-medium mb-1">Articles:</div>
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {item.quantity}x {item.product.name} - {(item.quantity * item.product.price).toFixed(2)}€
                        {item.product.consigne && (
                          <span className="text-orange-600">
                            {' '}+ {(item.quantity * item.product.consigne).toFixed(2)}€ consigne
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {order.consignesReturned > 0 && (
                  <div className="text-sm text-red-600">
                    Retours consignes: -{order.consignesReturned.toFixed(2)}€
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
