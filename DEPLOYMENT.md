# Déploiement sur Vercel

## Étapes de déploiement

### 1. Créer un compte Vercel
- Aller sur [vercel.com](https://vercel.com)
- S'inscrire avec GitHub

### 2. Connecter le repository
- Cliquer sur "New Project"
- Importer depuis GitHub
- Sélectionner le repository buvette-pwa

### 3. Configuration
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Variables d'environnement
Aucune variable d'environnement requise pour cette application.

### 5. Déploiement
- Cliquer sur "Deploy"
- L'application sera disponible sur une URL type: `buvette-pwa.vercel.app`

## Configuration automatique
Le fichier `vercel.json` (optionnel) permet de personnaliser le déploiement.

## URL finale
Une fois déployé, vous obtiendrez une URL permanente pour votre buvette PWA.

## Mise à jour
Chaque push sur la branche main déclenche automatiquement un nouveau déploiement.
