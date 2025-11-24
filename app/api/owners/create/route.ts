import { NextRequest, NextResponse } from 'next/server'
import { createOwner } from '@/lib/actions/owners'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const owner = await createOwner(formData)
    return NextResponse.json(owner, { status: 201 })
  } catch (error) {
    console.error('Error creating owner:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create owner' },
      { status: 500 }
    )
  }
}

