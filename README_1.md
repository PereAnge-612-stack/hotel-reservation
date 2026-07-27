# Hôtel Prestige — Application de réservation

Application web de réservation de chambres d'hôtel, développée avec **Next.js** (App Router), **TypeScript**, **Tailwind CSS** et **Prisma** (SQLite).

## Fonctionnalités

### Espace public
- **Accueil / Chambres** — liste des chambres disponibles avec filtres (type, prix)
- **Réservation** — formulaire de réservation avec calcul automatique du total (nuits × prix)
- **Confirmation** — page de confirmation après réservation
- **Événements** — liste des événements organisés par l'hôtel

### Authentification
- **Inscription** — création de compte (nom, email, mot de passe)
- **Connexion** — authentification par email et mot de passe, session gérée par cookie JWT
- **Déconnexion**
- Toutes les pages (hors connexion/inscription) sont protégées : un visiteur non connecté est automatiquement redirigé vers la page de connexion

### Espace utilisateur connecté
- **Mon profil** — modification du nom et du mot de passe
- **Mes réservations** — historique des réservations de l'utilisateur, avec possibilité d'annuler

### Espace administrateur
- **Administration** — tableau de toutes les réservations du site (visible uniquement par les comptes ayant le rôle `admin`)
- Le lien "Administration" n'apparaît dans le menu que pour les comptes admin

## Structure du projet

```
app/
  page.tsx                  → Page d'accueil (liste des chambres)
  connexion/page.tsx         → Page de connexion
  inscription/page.tsx       → Page d'inscription
  profil/page.tsx            → Page de modification du profil
  mes-reservations/page.tsx  → Historique des réservations de l'utilisateur
  evenements/page.tsx        → Liste des événements
  admin/page.tsx             → Tableau de bord administrateur
  reservation/[id]/          → Formulaire de réservation d'une chambre
  confirmation/              → Page de confirmation
  api/                       → Routes API (authentification, réservations, événements)

components/
  Navbar.tsx                 → Menu latéral (sidebar)
  AppShell.tsx                → Affiche ou masque la sidebar selon la page
  FiltreChambres.tsx          → Filtres de recherche de chambres
  FormulaireReservation.tsx   → Formulaire de réservation

prisma/
  schema.prisma               → Modèles de données (User, Chambre, Reservation, Evenement)
```

## Installation et lancement

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Le site est ensuite accessible sur [http://localhost:3000](http://localhost:3000).

## Technologies utilisées

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS** + composants shadcn/ui
- **Prisma** (ORM) avec base de données SQLite
- **jose** (gestion des tokens JWT pour l'authentification)
- **bcryptjs** (hachage des mots de passe)
