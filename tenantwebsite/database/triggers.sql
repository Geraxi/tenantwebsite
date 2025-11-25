-- Database Triggers for Automatic User/Agency Creation
-- Run this in your Supabase SQL Editor after running schema.sql

-- Function to create user and agency on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_agency_id UUID;
BEGIN
  -- Create agency for the new user
  INSERT INTO public.agencies (name, email, subscription_tier, subscription_status)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'My Agency') || '''s Agency',
    NEW.email,
    'free',
    'active'
  )
  RETURNING id INTO new_agency_id;

  -- Create user record linked to agency
  INSERT INTO public.users (id, email, full_name, agency_id, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    new_agency_id,
    'admin'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

