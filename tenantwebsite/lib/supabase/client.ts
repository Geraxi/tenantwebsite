import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // TEMPORARY HARDCODED VALUES - NOT SECURE!
  // TODO: Fix environment variables loading issue
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xrcnmlgecafyvtxqupza.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw'

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

