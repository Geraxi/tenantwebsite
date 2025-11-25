import { NextRequest, NextResponse } from 'next/server'
import { getOwners } from '@/lib/actions/owners'

export async function GET(request: NextRequest) {
  try {
    const owners = await getOwners()
    
    // Return simplified list for document upload
    const simplified = owners.map((owner: any) => ({
      id: owner.id,
      name: owner.name || `${owner.first_name || ''} ${owner.last_name || ''}`.trim() || `Proprietario ${owner.id}`,
    }))
    
    return NextResponse.json(simplified)
  } catch (error) {
    console.error('Error in GET /api/owners:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

