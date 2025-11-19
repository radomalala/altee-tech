# Altee Tech Site

Application React + Vite avec Tailwind CSS v4 (mode import direct) et un back-end (API locale sur `http://localhost:3000` pour les leads / formations si disponible). Déploiement cible: Vercel.

## Stack
- Vite (Rolldown build)
- React 19
- Tailwind CSS v4 (`@import "tailwindcss"` sans config complexe)
- Lucide React Icons
- (Optionnel) API Express/SQLite locale pour données dynamiques

## Développement
```powershell
npm install
npm run dev
```
Ouvre l'UI sur un port Vite (`5173` ou suivant) et l'API éventuelle sur `3000`.

## Build
```powershell
npm run build
npm run preview
```
Le bundle est généré dans `dist/`.

## Tailwind v4
Activation minimale: ajout dans `src/index.css`:
```css
@import "tailwindcss";
```
Les classes nouvelles (`bg-linear-to-r`, `shrink-0`, etc.) remplacent les anciennes (`bg-gradient-to-*`, `flex-shrink-0`).

## Déploiement sur Vercel
1. Pousser le code sur GitHub (`radomalala/altee-tech`).
2. Sur Vercel: "Add New Project" → importer le repo.
3. Configuration auto:
	- Build Command: `npm run build`
	- Output Directory: `dist`
	- Install Command: `npm install`
4. Déployer.

Un fichier `vercel.json` est présent pour expliciter la config.

## Publication (Git)
```powershell
git init
git add .
git commit -m "feat: initial altee tech site"
git branch -M main
git remote add origin https://github.com/radomalala/altee-tech.git
git push -u origin main
```
Si authentification demandée: créer un PAT GitHub (scope repo) et utiliser comme mot de passe.

## Variables / API
L'UI tente de requêter `http://localhost:3000/api/leads` et `http://localhost:3000/api/trainings`. Si indisponible, bascule sur des données de démonstration.

## Personnalisation
- Modifier les services dans `App.jsx`.
- Adapter les sections hero / academy.
- Ajouter ou retirer l'admin dashboard selon besoins.

## Licence
Usage interne Altee Tech.
