import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const entityType = searchParams.get('entityType')
    const entityId = searchParams.get('entityId')

    if (!entityType || !entityId) {
      return Response.json(
        { error: 'entityType and entityId are required' },
        { status: 400 }
      )
    }

    // Fetch documents from database
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('uploaded_at', { ascending: false })

    if (error) {
      console.error('Error fetching documents:', error)
      return Response.json(
        { error: 'Failed to fetch documents' },
        { status: 500 }
      )
    }

    return Response.json(data || [])
  } catch (error) {
    console.error('Error in GET /api/documents:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

