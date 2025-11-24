-- Updated Tenant Platform Database Schema
-- Run this in your Supabase SQL Editor after the initial schema.sql
-- This matches the CRM requirements exactly

-- Update properties table structure
ALTER TABLE properties 
  DROP COLUMN IF EXISTS listing_type,
  DROP COLUMN IF EXISTS bedrooms,
  DROP COLUMN IF EXISTS bathrooms,
  DROP COLUMN IF EXISTS square_feet,
  DROP COLUMN IF EXISTS state,
  DROP COLUMN IF EXISTS zip_code,
  DROP COLUMN IF EXISTS country,
  DROP COLUMN IF EXISTS property_type;

-- Add new columns for properties
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS type TEXT CHECK (type IN ('rent', 'sale')),
  ADD COLUMN IF NOT EXISTS size DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS rooms INTEGER;

-- Update status constraint
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_status_check;
ALTER TABLE properties DROP COLUMN IF EXISTS status;
ALTER TABLE properties ADD COLUMN status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived'));

-- Update tenants table
ALTER TABLE tenants
  DROP COLUMN IF EXISTS address,
  DROP COLUMN IF EXISTS monthly_rent,
  DROP COLUMN IF EXISTS deposit,
  DROP COLUMN IF EXISTS notes;

-- Rename columns if they exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenants' AND column_name='full_name') THEN
    ALTER TABLE tenants RENAME COLUMN full_name TO name;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenants' AND column_name='lease_start') THEN
    ALTER TABLE tenants RENAME COLUMN lease_start TO contract_start;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tenants' AND column_name='lease_end') THEN
    ALTER TABLE tenants RENAME COLUMN lease_end TO contract_end;
  END IF;
END $$;

-- Update owners table
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='owners' AND column_name='full_name') THEN
    ALTER TABLE owners RENAME COLUMN full_name TO name;
  END IF;
  
  ALTER TABLE owners DROP COLUMN IF EXISTS address;
END $$;

-- Update payments table
ALTER TABLE payments
  DROP CONSTRAINT IF EXISTS payments_tenant_id_fkey,
  DROP COLUMN IF EXISTS tenant_id,
  DROP COLUMN IF EXISTS payment_type,
  DROP COLUMN IF EXISTS invoice_number,
  DROP COLUMN IF EXISTS receipt_number,
  DROP COLUMN IF EXISTS notes;

-- Update payments status
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_status_check;
ALTER TABLE payments DROP COLUMN IF EXISTS status;
ALTER TABLE payments ADD COLUMN status TEXT DEFAULT 'unpaid' CHECK (status IN ('paid', 'unpaid'));

-- Update tasks table
ALTER TABLE tasks
  DROP COLUMN IF EXISTS tenant_id,
  DROP COLUMN IF EXISTS task_type,
  DROP COLUMN IF EXISTS priority,
  DROP COLUMN IF EXISTS completed_at;

-- Update tasks status
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_status_check;
ALTER TABLE tasks DROP COLUMN IF EXISTS status;
ALTER TABLE tasks ADD COLUMN status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed'));

-- Ensure assigned_to exists
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES users(id) ON DELETE SET NULL;

