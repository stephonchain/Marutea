# CLAUDE.md — Marutea Webapp

## Vision du projet

Refonte complète de marutea.fr sous Next.js 14, remplaçant WordPress/Avada. Site de spa bien-être (propriétaire : Candice) situé à Arcachon. Objectif : vitrine moderne + e-commerce cartes cadeaux + comptes clients + blog bien-être + réservation en ligne.

-----

## Stack technique

|Couche              |Technologie                                             |
|--------------------|--------------------------------------------------------|
|Framework           |Next.js 14 (App Router)                                 |
|Auth + DB + Storage |Supabase                                                |
|Paiement            |Stripe (cartes cadeaux + checkout)                      |
|Déploiement         |Vercel                                                  |
|Email transactionnel|Brevo (SMTP existant)                                   |
|CMS headless        |Fichiers MDX dans `/content` (pas de Sanity pour le MVP)|

-----

## Design system

### Identité visuelle Marutea

- **Fonts** : `Playlist` (display/titres) + `Okomito` (corps de texte)
- **Palette** : tons naturels, chauds, organiques — crème, sable, vert sauge, terracotta doux
- **Esthétique** : luxury/refined — généreux espaces blancs, typographie large, photos plein écran
- **Pas de** : gradients violets, Inter, Roboto, layouts génériques

### CSS variables à définir dans `globals.css`

```css
:root {
  --color-cream: #F5F0E8;
  --color-sand: #C8B89A;
  --color-sage: #7A8C72;
  --color-terra: #C4876A;
  --color-dark: #2C2419;
  --font-display: 'Playlist', cursive;
  --font-body: 'Okomito', sans-serif;
}
```

-----

## Structure du projet

```
marutea/
├── CLAUDE.md
├── .env.local                    # variables d'environnement (ne jamais committer)
├── next.config.ts
├── tailwind.config.ts
├── package.json
│
├── app/
│   ├── layout.tsx                # RootLayout avec fonts + providers
│   ├── page.tsx                  # Page d'accueil
│   ├── globals.css
│   │
│   ├── soins/
│   │   ├── page.tsx              # Catalogue des soins/services
│   │   └── [slug]/
│   │       └── page.tsx          # Détail d'un soin
│   │
│   ├── bien-etre/
│   │   ├── page.tsx              # Blog conseils bien-être
│   │   └── [slug]/
│   │       └── page.tsx          # Article individuel (MDX)
│   │
│   ├── cartes-cadeaux/
│   │   ├── page.tsx              # Sélection + achat carte cadeau
│   │   └── confirmation/
│   │       └── page.tsx          # Post-paiement Stripe
│   │
│   ├── reservation/
│   │   └── page.tsx              # Formulaire réservation (Calendly embed ou custom)
│   │
│   ├── contact/
│   │   └── page.tsx              # Page contact
│   │
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── reset-password/page.tsx
│   │
│   └── (dashboard)/
│       ├── layout.tsx            # Layout protégé (auth required)
│       ├── profil/page.tsx
│       ├── reservations/page.tsx # Historique réservations
│       └── cartes/page.tsx       # Mes cartes cadeaux (achetées ou reçues)
│
├── components/
│   ├── ui/                       # Composants atomiques réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── GiftCardBanner.tsx
│   │   └── Testimonials.tsx
│   ├── soins/
│   │   ├── SoinCard.tsx
│   │   └── SoinsList.tsx
│   ├── blog/
│   │   ├── ArticleCard.tsx
│   │   └── ArticlesList.tsx
│   └── cartes-cadeaux/
│       ├── GiftCardSelector.tsx
│       └── GiftCardCheckout.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Client browser
│   │   ├── server.ts             # Client server (cookies)
│   │   └── middleware.ts         # Auth middleware
│   ├── stripe/
│   │   ├── client.ts
│   │   └── gift-cards.ts         # Logique cartes cadeaux
│   ├── email/
│   │   └── brevo.ts              # Envoi emails via Brevo SMTP
│   └── utils.ts
│
├── content/
│   ├── soins/                    # Fichiers MDX pour chaque soin
│   │   ├── massage-californien.mdx
│   │   └── ...
│   └── bien-etre/                # Articles de blog
│       └── ...
│
├── types/
│   ├── supabase.ts               # Types générés par Supabase CLI
│   ├── soin.ts
│   └── gift-card.ts
│
└── middleware.ts                  # Protect /dashboard routes
```

-----

## Base de données Supabase (schéma initial)

```sql
-- Profils clients (lié à auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- Soins / services
create table soins (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nom text not null,
  description text,
  duree_minutes int,
  prix_cents int not null,        -- en centimes pour éviter les flottants
  categorie text,
  actif boolean default true,
  created_at timestamptz default now()
);

-- Réservations
create table reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  soin_id uuid references soins(id),
  date_heure timestamptz not null,
  statut text default 'pending',
  -- pending | confirmed | cancelled
  notes text,
  created_at timestamptz default now()
);

-- Cartes cadeaux
create table gift_cards (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  valeur_cents int not null,
  solde_cents int not null,        -- solde restant
  acheteur_id uuid references profiles(id),
  stripe_payment_intent_id text,
  destinataire_email text,
  message text,
  expire_at timestamptz,
  created_at timestamptz default now()
);

-- RLS à activer sur toutes les tables
alter table profiles enable row level security;
alter table reservations enable row level security;
alter table gift_cards enable row level security;
```

-----

## Variables d'environnement (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Brevo (email)
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=
BREVO_SMTP_KEY=
EMAIL_FROM=contact@marutea.fr

# App
NEXT_PUBLIC_APP_URL=https://marutea.fr
```

-----

## Fonctionnalités — détail par module

### 1. Cartes cadeaux (priorité MVP)

**Flux d'achat :**

1. L'acheteur choisit un montant (ex: 50€, 75€, 100€, ou montant libre)
1. Il saisit l'email du destinataire + message personnalisé
1. Paiement via Stripe Checkout (session)
1. Webhook Stripe `payment_intent.succeeded` :
- Génère un code unique (`MARU-XXXX-XXXX`)
- Insère en DB (`gift_cards`)
- Envoie email au destinataire via Brevo avec le code + PDF stylisé
1. Page confirmation avec résumé

**Utilisation en boutique :**

- Candice entre le code manuellement dans un panneau admin simple
- Le système déduit du solde ou marque comme utilisée

### 2. Comptes clients

- Auth Supabase (email/password + magic link)
- Dashboard : historique réservations, cartes cadeaux possédées
- Middleware Next.js protège toutes les routes `/dashboard/*`

### 3. Blog bien-être

- Articles en MDX dans `/content/bien-etre/`
- Frontmatter : `title`, `date`, `excerpt`, `cover`, `tags`
- Rendu avec `next-mdx-remote` ou composants natifs Next.js
- Pas de CMS pour le MVP — Candice édite via GitHub ou un éditeur MDX simple

### 4. Réservation

**MVP simple :** Formulaire (soin souhaité, date/heure, nom, email, message) qui envoie un email à Candice via Brevo. Pas de calendrier temps réel pour le MVP.

**V2 :** Intégration Calendly ou système custom avec disponibilités en DB.

-----

## Conventions de code

- TypeScript strict partout
- Nommage : composants en PascalCase, fichiers utilitaires en camelCase
- Toutes les actions serveur dans `/app/api/` ou Server Actions Next.js 14
- Jamais de `SUPABASE_SERVICE_ROLE_KEY` côté client
- Stripe webhooks gérés dans `/app/api/webhooks/stripe/route.ts`
- Toujours valider les données entrantes avec `zod`

-----

## Ordre de développement recommandé

1. **Init** : `npx create-next-app@latest marutea --typescript --tailwind --app`
1. **Design system** : globals.css, fonts, composants UI de base (Button, Card)
1. **Layout** : Header + Footer avec navigation
1. **Page d'accueil** : Hero, aperçu soins, bannière cartes cadeaux
1. **Page soins** : liste + pages détail depuis MDX
1. **Auth Supabase** : login, register, middleware, dashboard shell
1. **Cartes cadeaux** : Stripe checkout + webhook + email Brevo
1. **Blog** : liste articles + pages MDX
1. **Réservation** : formulaire simple + envoi email
1. **Dashboard client** : historique réservations, cartes

-----

## Notes importantes

- Les fonts Playlist et Okomito doivent être chargées depuis `/public/fonts/` (fichiers locaux, pas Google Fonts) pour les performances et pour respecter le RGPD
- Le site doit être 100% en français (fr-FR) avec balises `lang="fr"`
- Images : utiliser `next/image` avec `placeholder="blur"` partout
- SEO : metadata dynamique sur chaque page avec `generateMetadata()`
- RGPD : bannière cookies minimaliste, pas de trackers tiers sans consentement
