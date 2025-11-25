-- Migration: Update schema to match CRM requirements
-- Run this after the initial schema.sql

-- Update properties table to match new field names
ALTER TABLE properties 
  DROP COLUMN IF EXISTS listing_type,
  DROP COLUMN IF EXISTS bedrooms,
  DROP COLUMN IF EXISTS bathrooms,
  DROP COLUMN IF EXISTS square_feet,
  DROP COLUMN IF EXISTS state,
  DROP COLUMN IF EXISTS zip_code,
  DROP COLUMN IF EXISTS country,
  DROP COLUMN IF EXISTS property_type;

-- Add new columns
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS type TEXT CHECK (type IN ('rent', 'sale')),
  ADD COLUMN IF NOT EXISTS size DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS rooms INTEGER,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived'));

-- Update tenants table
ALTER TABLE tenants
  DROP COLUMN IF EXISTS full_name,
  DROP COLUMN IF EXISTS address,
  DROP COLUMN IF EXISTS lease_start,
  DROP COLUMN IF EXISTS lease_end,
  DROP COLUMN IF EXISTS monthly_rent,
  DROP COLUMN IF EXISTS deposit,
  DROP COLUMN IF EXISTS notes;

ALTER TABLE tenants
  ADD COLUMN IF NOT EXISTS name TEXT NOT NULL,
  ADD COLUMN IF NOT EXISTS contract_start DATE,
  ADD COLUMN IF NOT EXISTS contract_end DATE;

-- Update owners table
ALTER TABLE owners
  DROP COLUMN IF EXISTS full_name,
  DROP COLUMN IF EXISTS address;

ALTER TABLE owners
  ADD COLUMN IF NOT EXISTS name TEXT NOT NULL;

-- Update payments table
ALTER TABLE payments
  DROP COLUMN IF EXISTS tenant_id,
  DROP COLUMN IF EXISTS payment_type,
  DROP COLUMN IF EXISTS paid_date,
  DROP COLUMN IF EXISTS invoice_number,
  DROP COLUMN IF EXISTS receipt_number,
  DROP COLUMN IF EXISTS notes;

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'unpaid' CHECK (status IN ('paid', 'unpaid')),
  ADD COLUMN IF NOT EXISTS paid_date DATE;

-- Update tasks table
ALTER TABLE tasks
  DROP COLUMN IF EXISTS tenant_id,
  DROP COLUMN IF EXISTS task_type,
  DROP COLUMN IF EXISTS priority,
  DROP COLUMN IF EXISTS completed_at;

ALTER TABLE tasks
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed')),
  ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES users(id) ON DELETE SET NULL;

