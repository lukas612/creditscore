-- MSI Tracker v1 — esquema inicial
-- Tres tablas + un log; las cuotas no se guardan, se calculan al vuelo desde
-- `purchases` + `cards` en lib/msi.ts. Todas las tablas llevan RLS
-- `user_id = auth.uid()` (o `id = auth.uid()` en profiles).

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  ingreso_mensual numeric(12, 2),
  plan text not null default 'free' check (plan in ('free', 'pro')),
  stripe_customer_id text unique,
  avisos_activos boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  nombre text not null,
  banco text,
  dia_corte smallint not null check (dia_corte between 1 and 31),
  dia_limite_pago smallint not null check (dia_limite_pago between 1 and 31),
  created_at timestamptz not null default now()
);

create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id uuid not null references public.cards (id) on delete cascade,
  descripcion text not null,
  comercio text,
  importe numeric(12, 2) not null check (importe > 0),
  meses smallint not null check (meses in (3, 6, 9, 12, 18, 24)),
  fecha_compra date not null,
  liquidada_en date,
  created_at timestamptz not null default now()
);

-- Registra qué aviso (tarjeta + mes) ya se envió, para no duplicar el email
-- del cron. Solo lo escribe el cron (service_role, salta RLS); el usuario
-- solo puede leer los suyos.
create table public.reminders_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id uuid not null references public.cards (id) on delete cascade,
  mes date not null, -- primer día del mes natural al que corresponde el aviso
  enviado_en timestamptz not null default now(),
  unique (user_id, card_id, mes)
);

create index cards_user_id_idx on public.cards (user_id);
create index purchases_user_id_idx on public.purchases (user_id);
create index purchases_card_id_idx on public.purchases (card_id);
create index purchases_fecha_compra_idx on public.purchases (fecha_compra);
create index reminders_log_user_id_idx on public.reminders_log (user_id);

alter table public.profiles enable row level security;
alter table public.cards enable row level security;
alter table public.purchases enable row level security;
alter table public.reminders_log enable row level security;

create policy "profiles: solo el propio usuario" on public.profiles
  for all
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "cards: solo el propio usuario" on public.cards
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "purchases: solo el propio usuario" on public.purchases
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Nadie inserta aviso propio desde el cliente: solo lectura por RLS. El cron
-- escribe con la service_role key, que no pasa por estas políticas.
create policy "reminders_log: lectura propia" on public.reminders_log
  for select
  using (user_id = auth.uid());

-- Crea el perfil automáticamente al registrarse, para que nunca exista un
-- usuario en auth.users sin su fila en profiles.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
