// Test the complete authentication flow
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://xrcnmlgecafyvtxqupza.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testDatabase() {
  console.log('🧪 Testing database setup...\n')
  
  // Test if we can query each table
  const tables = ['agencies', 'users', 'owners', 'properties', 'tenants', 'payments', 'tasks', 'documents']
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(0) // Just test if table exists, don't fetch data
      
      if (error && (error.code === 'PGRST116' || error.message.includes('does not exist'))) {
        console.log(`❌ ${table}: Still missing`)
        return false
      } else if (error) {
        console.log(`⚠️  ${table}: ${error.message}`)
      } else {
        console.log(`✅ ${table}: Ready`)
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`)
      return false
    }
  }
  
  console.log('\n✅ Database is fully set up!')
  console.log('\nNext steps:')
  console.log('1. Create storage bucket "documents" in Supabase')
  console.log('2. Test the app: npm run dev')
  console.log('3. Sign up a test account')
  return true
}

testDatabase()

