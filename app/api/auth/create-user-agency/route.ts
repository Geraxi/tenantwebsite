import { NextRequest, NextResponse } from 'next/server'
import { createUserAndAgency } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId, email, fullName } = body

    // Verify the userId matches the authenticated user
    if (userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = await createUserAndAgency(userId, email, fullName)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error creating user/agency:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create user and agency' },
      { status: 500 }
    )
  }
}

