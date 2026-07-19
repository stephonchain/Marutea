# Marutea 🌿

Refonte de [marutea.fr](https://www.marutea.fr) — spa bien-être à Arcachon (propriétaire : Candice).
Vitrine moderne + e-commerce cartes cadeaux + comptes clients + blog bien-être + réservation en ligne.

## Stack

| Couche | Technologie |
|---|---|
| Framework | Next.js 14 (App Router) |
| Auth + DB | Supabase |
| Paiement | Stripe (cartes cadeaux) |
| Email | Brevo (SMTP) |
| Contenu | Fichiers MDX dans `/content` |
| Déploiement | Vercel |

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Le site fonctionne sans configuration : les pages vitrine (accueil, soins, blog,
réservation, contact) sont statiques/MDX. Supabase et Stripe ne sont requis que
pour l'auth, le dashboard et l'achat de cartes cadeaux.

## Configuration

### Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter `supabase/schema.sql` dans le SQL Editor (tables + RLS + trigger profil)
3. Renseigner `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` dans `.env.local`

### Stripe (cartes cadeaux)

1. Renseigner `STRIPE_SECRET_KEY` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
2. Créer un webhook vers `https://marutea.fr/api/webhooks/stripe` écoutant `checkout.session.completed`
3. Renseigner `STRIPE_WEBHOOK_SECRET`

À la réception du paiement, le webhook génère un code `MARU-XXXX-XXXX`, insère
la carte en base et envoie l'email au destinataire via Brevo.

### Brevo (emails)

Renseigner `BREVO_SMTP_USER` et `BREVO_SMTP_KEY` (clé SMTP du compte Brevo existant).
Les demandes de réservation arrivent sur `RESERVATION_NOTIFY_EMAIL`.

### Fonts

Déposer les fichiers Playlist et Okomito dans `/public/fonts` (voir `public/fonts/README.md`).
Fonts locales : pas de Google Fonts (perfs + RGPD).

## Contenu (MDX)

- **Soins** : `content/soins/*.mdx` — frontmatter : `title`, `excerpt`, `categorie`, `dureeMinutes`, `prixCents`, `variantes` (optionnel)
- **Blog** : `content/bien-etre/*.mdx` — frontmatter : `title`, `date`, `excerpt`, `cover`, `tags`

Candice peut éditer ces fichiers directement sur GitHub : chaque commit
redéploie automatiquement le site via Vercel.

## Structure

```
app/                  # Pages (App Router)
├── soins/            # Catalogue + détail (MDX)
├── bien-etre/        # Blog (MDX)
├── cartes-cadeaux/   # Achat Stripe + confirmation
├── reservation/      # Formulaire → email Brevo
├── (auth)/           # login / register / reset-password
├── (dashboard)/      # Espace client protégé (profil, réservations, cartes)
└── api/              # Route handlers (checkout, webhook Stripe, réservation)
components/           # UI, layout, home, soins, blog, cartes-cadeaux
content/              # MDX (soins + articles)
lib/                  # supabase, stripe, email, loaders MDX
supabase/schema.sql   # Schéma DB + RLS
```

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — serveur de production
- `npm run lint` — ESLint
