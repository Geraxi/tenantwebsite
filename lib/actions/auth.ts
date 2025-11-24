'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createUserAndAgency(userId: string, email: string, fullName: string) {
  const supabase = await createClient()

  try {
    // Create agency first
    const { data: agency, error: agencyError } = await supabase
      .from('agencies')
      .insert({
        name: fullName ? `${fullName}'s Agency` : 'My Agency',
        email: email,
        subscription_tier: 'free',
        subscription_status: 'active',
      })
      .select()
      .single()

    if (agencyError) {
      console.error('Error creating agency:', agencyError)
      throw new Error('Failed to create agency')
    }

    // Create user record linked to agency
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: email,
        full_name: fullName,
        agency_id: agency.id,
        role: 'admin',
      })

    if (userError) {
      console.error('Error creating user:', userError)
      // Try to clean up agency if user creation fails
      await supabase.from('agencies').delete().eq('id', agency.id)
      throw new Error('Failed to create user')
    }

    return { agency, success: true }
  } catch (error) {
    console.error('Error in createUserAndAgency:', error)
    throw error
  }
}

