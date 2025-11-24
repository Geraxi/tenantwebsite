# Document Storage Setup Guide

This guide explains how to set up the document storage system for the Tenant CRM.

## Features

The document storage system allows users to:
- Upload documents (ID documents, contracts, certificates, etc.) for tenants, owners, and properties
- Organize documents by category
- Download documents
- Delete documents

## Database Setup

1. **Run the migration SQL** in your Supabase SQL Editor:

```sql
-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('tenant', 'owner', 'property')),
  entity_id TEXT NOT NULL,
  category TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_documents_entity ON documents(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_at ON documents(uploaded_at DESC);
```

2. **Create Storage Bucket**:

   - Go to Supabase Dashboard > Storage
   - Click "New bucket"
   - Name: `documents`
   - Public: `false` (private bucket)
   - Click "Create bucket"

3. **Set Storage Policies**:

   In the Supabase SQL Editor, run:

```sql
-- Allow authenticated users to upload documents
CREATE POLICY "Users can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Allow users to read documents
CREATE POLICY "Users can read documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents');

-- Allow users to delete documents
CREATE POLICY "Users can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents');
```

## Document Categories

### For Tenants:
- Documento Identità (ID Document)
- Contratto (Contract)
- Certificazione Reddito (Income Certificate)
- Garanzia (Guarantee)
- Altro (Other)

### For Owners:
- Documento Identità (ID Document)
- Atto di Proprietà (Property Deed)
- Documenti Fiscali (Tax Documents)
- Altro (Other)

### For Properties:
- Contratto (Contract)
- Atto di Proprietà (Property Deed)
- Certificazione Energetica (Energy Certificate)
- Ispezione (Inspection)
- Altro (Other)

## Usage

The document section appears automatically on:
- Tenant detail pages (`/crm/tenants/[id]`)
- Owner detail pages (`/crm/owners/[id]`)
- Property detail pages (`/crm/properties/[id]`)

Users can:
1. Click "Carica Documento" to upload a new document
2. Select a file (PDF, DOC, DOCX, JPG, JPEG, PNG - max 10MB)
3. Choose a category
4. View, download, or delete existing documents

## File Storage

Documents are stored in Supabase Storage under:
- Path structure: `{entityType}/{entityId}/{timestamp}.{ext}`
- Example: `tenant/123/1699123456789.pdf`

## API Endpoints

- `GET /api/documents?entityType={type}&entityId={id}` - Fetch documents
- `POST /api/documents/upload` - Upload a document
- `GET /api/documents/[id]/download` - Download a document
- `DELETE /api/documents/[id]` - Delete a document

## Security Notes

- Documents are stored in a private bucket
- Only authenticated users can access documents
- File size is limited to 10MB
- Supported file types: PDF, DOC, DOCX, JPG, JPEG, PNG



