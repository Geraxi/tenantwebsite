import { NextRequest, NextResponse } from 'next/server'
import { getProperties } from '@/lib/actions/properties'

export async function GET(request: NextRequest) {
  try {
    const properties = await getProperties()
    
    // Return simplified list for document upload
    const simplified = properties.map((property: any) => ({
      id: property.id,
      name: property.title || property.name || property.address || `Proprietà ${property.id}`,
    }))
    
    return NextResponse.json(simplified)
  } catch (error) {
    console.error('Error in GET /api/properties:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

