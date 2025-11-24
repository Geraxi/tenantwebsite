import { NextRequest, NextResponse } from 'next/server'
import { getTenants } from '@/lib/actions/tenants'

export async function GET(request: NextRequest) {
  try {
    const tenants = await getTenants()
    
    // Return simplified list for document upload
    const simplified = tenants.map((tenant: any) => ({
      id: tenant.id,
      name: tenant.name || `${tenant.first_name || ''} ${tenant.last_name || ''}`.trim() || `Inquilino ${tenant.id}`,
    }))
    
    return NextResponse.json(simplified)
  } catch (error) {
    console.error('Error in GET /api/tenants:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

