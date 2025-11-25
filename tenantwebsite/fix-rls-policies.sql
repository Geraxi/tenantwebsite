-- Fix RLS Policies to prevent infinite recursion
-- Run this in Supabase SQL Editor after setup-database.sql

-- Step 1: Drop ALL existing policies first
DROP POLICY IF EXISTS "Users can view their own user record" ON users;
DROP POLICY IF EXISTS "Users can update their own user record" ON users;
DROP POLICY IF EXISTS "Users can view their own agency" ON agencies;
DROP POLICY IF EXISTS "Users can update their own agency" ON agencies;
DROP POLICY IF EXISTS "Users can manage owners in their agency" ON owners;
DROP POLICY IF EXISTS "Users can manage properties in their agency" ON properties;
DROP POLICY IF EXISTS "Users can manage tenants in their agency" ON tenants;
DROP POLICY IF EXISTS "Users can manage payments in their agency" ON payments;
DROP POLICY IF EXISTS "Users can manage tasks in their agency" ON tasks;
DROP POLICY IF EXISTS "Users can manage documents in their agency" ON documents;

-- Step 2: Create helper function FIRST (before policies use it)
CREATE OR REPLACE FUNCTION public.user_agency_id()
RETURNS UUID AS $$
  SELECT agency_id FROM users WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Step 3: Create all policies (they can now use the function)

-- Users table policies (simplified to avoid recursion)
CREATE POLICY "Users can view their own user record"
  ON users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own user record"
  ON users FOR UPDATE
  USING (id = auth.uid());

-- Agencies policies (using the function)
CREATE POLICY "Users can view their own agency"
  ON agencies FOR SELECT
  USING (id = public.user_agency_id());

CREATE POLICY "Users can update their own agency"
  ON agencies FOR UPDATE
  USING (id = public.user_agency_id());

-- Owners policy (using the function)
CREATE POLICY "Users can manage owners in their agency"
  ON owners FOR ALL
  USING (agency_id = public.user_agency_id());

-- Properties policy (using the function)
CREATE POLICY "Users can manage properties in their agency"
  ON properties FOR ALL
  USING (agency_id = public.user_agency_id());

-- Tenants policy (using the function)
CREATE POLICY "Users can manage tenants in their agency"
  ON tenants FOR ALL
  USING (agency_id = public.user_agency_id());

-- Payments policy (using the function)
CREATE POLICY "Users can manage payments in their agency"
  ON payments FOR ALL
  USING (agency_id = public.user_agency_id());

-- Tasks policy (using the function)
CREATE POLICY "Users can manage tasks in their agency"
  ON tasks FOR ALL
  USING (agency_id = public.user_agency_id());

-- Documents policy (using the function)
CREATE POLICY "Users can manage documents in their agency"
  ON documents FOR ALL
  USING (agency_id = public.user_agency_id());
