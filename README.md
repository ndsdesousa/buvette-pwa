# 🍺 Buvette PWA - Application de Gestion de Buvette

Une Progressive Web App moderne pour la gestion d'une buvette de comité des fêtes, optimisée pour mobile et fonctionnant hors-ligne.

## ✨ Fonctionnalités

### 🛒 Gestion des commandes
- Interface tactile optimisée pour tablettes et smartphones
- Calcul automatique des totaux avec gestion des consignes
- Retours de consignes rapides (+1€, +2€, +3€, +5€)
- Récapitulatif détaillé en temps réel

### 📱 PWA Features
- Installation sur écran d'accueil (iOS/Android)
- Fonctionnement offline complet
- Design mobile-first responsive
- Cache intelligent des ressources

### 💾 Stockage local
- Sauvegarde automatique des commandes
- Historique des ventes quotidiennes
- Aucune dépendance à une base de données externe
- Données persistantes entre les sessions

## 🍷 Catalogue produits

| Produit | Prix | Consigne |
|---------|------|----------|
| Sodas | 2,00€ | - |
| Verre de vin rosé | 3,50€ | - |
| Bouteille pétillant | 8,00€ | - |
| Bière verre consigné | 3,00€ | +1,00€ |
| Pichet de bière | 12,00€ | +2,00€ |
| Planchette apéro | 8,00€ | +3,00€ |

## 🚀 Installation et développement

### Prérequis
- Node.js 18+
- npm ou yarn

### Commandes

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm start

# Génération des icônes PWA
node generate-icons.js
```

## 📱 Installation sur mobile

### iOS (Safari)
1. Ouvrir l'application dans Safari
2. Appuyer sur le bouton de partage
3. Sélectionner "Ajouter à l'écran d'accueil"

### Android (Chrome)
1. Ouvrir l'application dans Chrome
2. Appuyer sur le menu (3 points)
3. Sélectionner "Ajouter à l'écran d'accueil"

## 🏗️ Architecture technique

### Stack
- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **PWA** : next-pwa + Workbox
- **Storage** : localStorage + IndexedDB

### Structure des dossiers
```
src/
├── app/                 # Pages Next.js (App Router)
├── components/          # Composants React réutilisables
│   └── ui/             # Composants UI de base
├── data/               # Données statiques (produits)
├── hooks/              # Hooks React personnalisés
└── types/              # Définitions TypeScript
```

## 🔧 Configuration PWA

La configuration PWA est dans `next.config.js` et `public/manifest.json`. 

**Fonctionnalités PWA :**
- Service Worker automatique
- Cache intelligent (NetworkFirst)
- Installation native
- Mode standalone
- Icônes adaptatives

## 📊 Gestion des données

### Stockage local
- **Commandes du jour** : `localStorage.dailyOrders`
- **Configuration** : Produits et prix en dur (modifiables dans `/src/data/products.ts`)

### Format des données
```typescript
interface Order {
  id: string;
  items: OrderItem[];
  consignesReturned: number;
  total: number;
  totalConsignes: number;
  finalTotal: number;
  timestamp: Date;
}
```

## 🎨 Design et UX

### Couleurs
- **Primaire** : Bleu (#1e40af)
- **Succès** : Vert pour les confirmations
- **Attention** : Orange pour les consignes

### Ergonomie
- Boutons tactiles minimum 60px
- Interface adaptée aux bénévoles non-techniques
- Feedback visuel immédiat
- Confirmation des actions importantes

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter le repository GitHub à Vercel
2. Configuration automatique détectée
3. Déploiement automatique à chaque push

### Variables d'environnement
Aucune variable d'environnement requise pour le fonctionnement de base.

## 🧪 Tests

### Tests manuels recommandés
- [ ] Installation PWA sur iOS et Android
- [ ] Fonctionnement offline
- [ ] Calculs avec/sans consignes
- [ ] Retours de consignes
- [ ] Persistance des données
- [ ] Responsive design

## 📝 Licence

MIT License - Libre d'utilisation pour tous les comités des fêtes !

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter des fonctionnalités

---

*Développé avec ❤️ pour les comités des fêtes*
