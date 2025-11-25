-- Final Schema Migration
-- This updates the schema to match the CRM requirements exactly

-- Update properties table
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
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='properties' AND column_name='type') THEN
    ALTER TABLE properties ADD COLUMN type TEXT CHECK (type IN ('rent', 'sale'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='properties' AND column_name='size') THEN
    ALTER TABLE properties ADD COLUMN size DECIMAL(10, 2);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='properties' AND column_name='rooms') THEN
    ALTER TABLE properties ADD COLUMN rooms INTEGER;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='properties' AND column_name='status') THEN
    ALTER TABLE properties DROP COLUMN IF EXISTS status;
    ALTER TABLE properties ADD COLUMN status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived'));
  END IF;
END $$;

-- Update tenants table
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
  
  -- Remove columns that are not needed
  ALTER TABLE tenants DROP COLUMN IF EXISTS address;
  ALTER TABLE tenants DROP COLUMN IF EXISTS monthly_rent;
  ALTER TABLE tenants DROP COLUMN IF EXISTS deposit;
  ALTER TABLE tenants DROP COLUMN IF EXISTS notes;
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
DO $$
BEGIN
  -- Remove tenant_id requirement (payments are linked to properties, not tenants directly)
  ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_tenant_id_fkey;
  ALTER TABLE payments DROP COLUMN IF EXISTS tenant_id;
  
  -- Simplify payment structure
  ALTER TABLE payments DROP COLUMN IF EXISTS payment_type;
  ALTER TABLE payments DROP COLUMN IF EXISTS invoice_number;
  ALTER TABLE payments DROP COLUMN IF EXISTS receipt_number;
  ALTER TABLE payments DROP COLUMN IF EXISTS notes;
  
  -- Update status to match requirements
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payments' AND column_name='status') THEN
    -- Update existing status values
    UPDATE payments SET status = 'unpaid' WHERE status = 'pending';
    UPDATE payments SET status = 'paid' WHERE status = 'completed';
    -- Drop and recreate with new constraint
    ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_status_check;
    ALTER TABLE payments DROP COLUMN status;
  END IF;
  
  ALTER TABLE payments ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'unpaid' CHECK (status IN ('paid', 'unpaid'));
END $$;

-- Update tasks table
DO $$
BEGIN
  ALTER TABLE tasks DROP COLUMN IF EXISTS tenant_id;
  ALTER TABLE tasks DROP COLUMN IF EXISTS task_type;
  ALTER TABLE tasks DROP COLUMN IF EXISTS priority;
  ALTER TABLE tasks DROP COLUMN IF EXISTS completed_at;
  
  -- Update status
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tasks' AND column_name='status') THEN
    ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_status_check;
    ALTER TABLE tasks DROP COLUMN status;
  END IF;
  
  ALTER TABLE tasks ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed'));
END $$;

