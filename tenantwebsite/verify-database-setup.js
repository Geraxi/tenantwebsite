// Verify database setup after SQL is run
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://xrcnmlgecafyvtxqupza.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw'

const supabase = createClient(supabaseUrl, supabaseKey)

const requiredTables = [
  'agencies',
  'users',
  'owners',
  'properties',
  'tenants',
  'payments',
  'tasks',
  'documents'
]

async function verifySetup() {
  console.log('🔍 Verifying database setup...\n')
  
  let allGood = true
  const results = []
  
  for (const table of requiredTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('relation')) {
          console.log(`❌ ${table}: Table does not exist`)
          results.push({ table, status: 'missing' })
          allGood = false
        } else {
          console.log(`⚠️  ${table}: ${error.message}`)
          results.push({ table, status: 'error', error: error.message })
          allGood = false
        }
      } else {
        console.log(`✅ ${table}: Table exists and accessible`)
        results.push({ table, status: 'ok' })
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`)
      results.push({ table, status: 'error', error: err.message })
      allGood = false
    }
  }
  
  console.log('\n' + '='.repeat(50))
  
  if (allGood) {
    console.log('✅ All tables are set up correctly!')
    console.log('\nNext steps:')
    console.log('1. Create storage bucket "documents" in Supabase Dashboard')
    console.log('2. Provide Stripe credentials')
    console.log('3. Test the application locally')
  } else {
    const missing = results.filter(r => r.status === 'missing')
    console.log(`⚠️  ${missing.length} table(s) are missing.`)
    console.log('\nPlease run setup-database.sql in Supabase SQL Editor:')
    console.log('https://supabase.com/dashboard/project/xrcnmlgecafyvtxqupza/sql/new')
    console.log('\nMissing tables:')
    missing.forEach(r => console.log(`  - ${r.table}`))
  }
  
  return allGood
}

verifySetup()

