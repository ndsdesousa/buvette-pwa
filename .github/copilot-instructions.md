<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Buvette PWA - Instructions pour Copilot

Ce projet est une Progressive Web App (PWA) pour la gestion d'une buvette de comité des fêtes.

## Architecture
- Next.js 15 avec App Router
- TypeScript
- Tailwind CSS
- PWA avec next-pwa
- Stockage local avec localStorage

## Fonctionnalités principales
- Catalogue de produits avec prix et consignes
- Gestion des commandes avec calculs automatiques
- Retours de consignes
- Stockage local des données
- Interface mobile-first optimisée pour les tablettes et smartphones

## Conventions de code
- Utiliser 'use client' pour les composants interactifs
- Préférer les fonctions fléchées pour les composants
- Utiliser des interfaces TypeScript strictes
- Composants dans /src/components avec export nommé
- Hooks personnalisés dans /src/hooks
- Types dans /src/types

## Spécificités mobile
- Boutons tactiles minimum 60px
- Interface responsive mobile-first
- Optimisation pour Safari iOS et Chrome Android
- Fonctionnement offline complet
