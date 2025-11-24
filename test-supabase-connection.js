// Test Supabase connection
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://xrcnmlgecafyvtxqupza.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('agencies').select('count').limit(1)
    
    if (error && error.code === 'PGRST116') {
      console.log('✅ Connection successful! Tables not created yet - this is expected.')
      console.log('📝 Next step: Run setup-database.sql in Supabase SQL Editor')
      return true
    } else if (error) {
      console.error('❌ Connection error:', error.message)
      return false
    } else {
      console.log('✅ Connection successful! Database is ready.')
      return true
    }
  } catch (err) {
    console.error('❌ Connection failed:', err.message)
    return false
  }
}

testConnection()

