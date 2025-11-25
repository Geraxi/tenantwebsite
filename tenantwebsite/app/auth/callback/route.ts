import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { createUserAndAgency } from '@/lib/actions/auth'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Check if user record exists, if not create it
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .single()

      if (!existingUser) {
        // Create user and agency
        try {
          await createUserAndAgency(
            data.user.id,
            data.user.email || '',
            data.user.user_metadata?.full_name || data.user.user_metadata?.name || ''
          )
        } catch (error) {
          console.error('Error creating user/agency:', error)
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/crm/dashboard`)
}

