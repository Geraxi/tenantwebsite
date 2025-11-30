-- Create API Keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  prefix TEXT NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their agency api keys"
  ON api_keys FOR SELECT
  USING (agency_id = public.user_agency_id());

CREATE POLICY "Users can create api keys for their agency"
  ON api_keys FOR INSERT
  WITH CHECK (agency_id = public.user_agency_id());

CREATE POLICY "Users can delete their agency api keys"
  ON api_keys FOR DELETE
  USING (agency_id = public.user_agency_id());

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_api_keys_agency_id ON api_keys(agency_id);
