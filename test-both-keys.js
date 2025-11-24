// Test both keys to see which one works
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://xrcnmlgecafyvtxqupza.supabase.co'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyY25tbGdlY2FmeXZ0eHF1cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY5ODksImV4cCI6MjA2ODU5Mjk4OX0.qiv5o3Vj9bl6Md8MN0xoEkPdjPLxMjq6ej3ZGqYRIxw'
const publishableKey = 'sb_publishable_vht0bEdINsaB33Vgb0KHzA_zW15yWAU'

async function testKey(key, keyName) {
  console.log(`\nTesting ${keyName}...`)
  const supabase = createClient(supabaseUrl, key)
  
  try {
    // Try to query auth (this works with any valid key)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError && authError.message.includes('JWT')) {
      console.log(`❌ ${keyName}: Invalid JWT format`)
      return false
    }
    
    // Try to query a table (this requires proper permissions)
    const { data, error } = await supabase.from('agencies').select('count').limit(1)
    
    if (error && error.code === 'PGRST116') {
      console.log(`✅ ${keyName}: Valid key! (Tables not created yet)`)
      return true
    } else if (error && error.message.includes('JWT')) {
      console.log(`❌ ${keyName}: Invalid JWT - ${error.message}`)
      return false
    } else if (error) {
      console.log(`⚠️  ${keyName}: Key works but ${error.message}`)
      return true
    } else {
      console.log(`✅ ${keyName}: Valid and working!`)
      return true
    }
  } catch (err) {
    console.log(`❌ ${keyName}: Error - ${err.message}`)
    return false
  }
}

async function testBoth() {
  console.log('Testing Supabase keys...')
  console.log('='.repeat(50))
  
  const anonWorks = await testKey(anonKey, 'Anon Key (JWT)')
  const pubWorks = await testKey(publishableKey, 'Publishable Key')
  
  console.log('\n' + '='.repeat(50))
  console.log('\nRecommendation:')
  
  if (anonWorks && !pubWorks) {
    console.log('✅ Use the Anon Key (JWT) - it\'s working correctly')
    console.log('The publishable key format doesn\'t match Supabase\'s standard format')
  } else if (pubWorks && !anonWorks) {
    console.log('✅ Use the Publishable Key - it\'s working correctly')
    console.log('Update .env.local with the publishable key')
  } else if (anonWorks && pubWorks) {
    console.log('✅ Both keys work! Use the Anon Key (JWT) as it\'s the standard format')
  } else {
    console.log('⚠️  Neither key format works. Please check your Supabase dashboard:')
    console.log('   Settings > API > Project API keys')
  }
}

testBoth()

