-- Enable UUID extension

create extension if not exists "uuid-ossp";



---------------------------------------------------------

-- USERS & AGENCIES

---------------------------------------------------------



create table if not exists agencies (

    id uuid primary key default uuid_generate_v4(),

    name text not null,

    created_at timestamptz default now()

);



create table if not exists users (

    id uuid primary key,

    agency_id uuid references agencies(id) on delete set null,

    full_name text,

    email text unique,

    phone text,

    role text check (role in ('admin', 'agent')) default 'agent',

    created_at timestamptz default now()

);



-- Link Supabase auth.users to custom users table

alter table users

add constraint fk_auth_user foreign key (id)

references auth.users (id) on delete cascade;



---------------------------------------------------------

-- OWNERS (Landlords)

---------------------------------------------------------



create table if not exists owners (

    id uuid primary key default uuid_generate_v4(),

    agency_id uuid references agencies(id) on delete cascade,

    full_name text not null,

    email text,

    phone text,

    notes text,

    created_at timestamptz default now()

);



---------------------------------------------------------

-- PROPERTIES

---------------------------------------------------------



create table if not exists properties (

    id uuid primary key default uuid_generate_v4(),

    agency_id uuid references agencies(id) on delete cascade,

    owner_id uuid references owners(id) on delete set null,

    

    type text check (type in ('rent', 'sale')) not null,

    title text not null,

    description text,

    price numeric not null,

    address text,

    city text,

    size numeric,

    rooms int,

    status text check (status in ('active', 'archived')) default 'active',

    

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);



-- Auto-update timestamp function

create or replace function update_updated_at_column()

returns trigger as $$

begin

    new.updated_at = now();

    return new;

end;

$$ language plpgsql;



-- Auto-update timestamp trigger

drop trigger if exists update_property_timestamp on properties;

create trigger update_property_timestamp

before update on properties

for each row execute function update_updated_at_column();



---------------------------------------------------------

-- PROPERTY IMAGES

---------------------------------------------------------



create table if not exists property_images (

    id uuid primary key default uuid_generate_v4(),

    property_id uuid references properties(id) on delete cascade,

    url text not null,

    created_at timestamptz default now()

);



---------------------------------------------------------

-- TENANTS

---------------------------------------------------------



create table if not exists tenants (

    id uuid primary key default uuid_generate_v4(),

    agency_id uuid references agencies(id) on delete cascade,

    

    full_name text not null,

    email text,

    phone text,

    

    rental_status text check (rental_status in ('active', 'past', 'lead')) default 'lead',

    property_id uuid references properties(id) on delete set null,

    contract_start date,

    contract_end date,

    

    created_at timestamptz default now()

);



---------------------------------------------------------

-- PAYMENTS

---------------------------------------------------------



create table if not exists payments (

    id uuid primary key default uuid_generate_v4(),

    agency_id uuid references agencies(id) on delete cascade,

    property_id uuid references properties(id) on delete cascade,

    tenant_id uuid references tenants(id) on delete set null,

    

    amount numeric not null,

    due_date date not null,

    status text check (status in ('paid', 'unpaid', 'late')) default 'unpaid',

    invoice_url text,

    

    created_at timestamptz default now()

);



---------------------------------------------------------

-- TASKS (Maintenance, Reminders)

---------------------------------------------------------



create table if not exists tasks (

    id uuid primary key default uuid_generate_v4(),

    agency_id uuid references agencies(id) on delete cascade,

    property_id uuid references properties(id) on delete set null,

    assigned_to uuid references users(id) on delete set null,

    

    title text not null,

    description text,

    due_date date,

    status text check (status in ('pending', 'in_progress', 'done')) default 'pending',

    

    created_at timestamptz default now()

);



---------------------------------------------------------

-- DOCUMENTS (contracts, PDFs, files)

---------------------------------------------------------



create table if not exists documents (

    id uuid primary key default uuid_generate_v4(),

    agency_id uuid references agencies(id) on delete cascade,

    property_id uuid references properties(id),

    tenant_id uuid references tenants(id),

    owner_id uuid references owners(id),

    

    file_url text not null,

    type text,

    created_at timestamptz default now()

);



---------------------------------------------------------

-- ROW LEVEL SECURITY

---------------------------------------------------------



-- Enable RLS on all tables

alter table agencies enable row level security;

alter table users enable row level security;

alter table owners enable row level security;

alter table properties enable row level security;

alter table property_images enable row level security;

alter table tenants enable row level security;

alter table payments enable row level security;

alter table tasks enable row level security;

alter table documents enable row level security;



---------------------------------------------------------

-- ACCESS POLICY EXAMPLES (you add more inside Supabase UI)

---------------------------------------------------------



-- Allow users to read/write only their own agency's data



-- Owners

drop policy if exists "Owners: Read" on owners;

create policy "Owners: Read" on owners

for select using (auth.uid() in (select id from users where agency_id = owners.agency_id));



drop policy if exists "Owners: Insert" on owners;

create policy "Owners: Insert" on owners

for insert with check (auth.uid() in (select id from users where agency_id = owners.agency_id));



-- Apply equivalent policies to all tables later




