-- Schéma initial Marutea
-- À exécuter dans le SQL Editor de Supabase (ou via migration CLI).

-- Profils clients (lié à auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- Soins / services
create table if not exists soins (
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
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  soin_id uuid references soins(id),
  date_heure timestamptz not null,
  statut text default 'pending',   -- pending | confirmed | cancelled
  notes text,
  created_at timestamptz default now()
);

-- Cartes cadeaux
create table if not exists gift_cards (
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

-- Création automatique du profil à l'inscription
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row Level Security
alter table profiles enable row level security;
alter table soins enable row level security;
alter table reservations enable row level security;
alter table gift_cards enable row level security;

-- profiles : chacun lit/modifie son propre profil
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

-- soins : lecture publique des soins actifs
create policy "soins_select_public" on soins
  for select using (actif = true);

-- reservations : chacun lit ses propres réservations
create policy "reservations_select_own" on reservations
  for select using (auth.uid() = user_id);
create policy "reservations_insert_own" on reservations
  for insert with check (auth.uid() = user_id);

-- gift_cards : lecture par l'acheteur ou le destinataire (email du JWT)
create policy "gift_cards_select_own" on gift_cards
  for select using (
    auth.uid() = acheteur_id
    or destinataire_email = (auth.jwt() ->> 'email')
  );

-- Les insertions de cartes cadeaux passent par le service role (webhook Stripe),
-- qui bypasse la RLS : pas de policy insert publique.
