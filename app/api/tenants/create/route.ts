import { NextRequest, NextResponse } from 'next/server'
import { createTenant } from '@/lib/actions/tenants'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const tenant = await createTenant(formData)
    return NextResponse.json(tenant, { status: 201 })
  } catch (error) {
    console.error('Error creating tenant:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create tenant' },
      { status: 500 }
    )
  }
}

