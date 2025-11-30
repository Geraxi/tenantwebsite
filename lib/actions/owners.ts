'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createOwner(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const { data: userData } = await supabase
    .from('users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (!userData?.agency_id) {
    throw new Error('Agenzia non trovata')
  }

  const owner = {
    agency_id: userData.agency_id,
    full_name: formData.get('full_name') as string,
    phone: formData.get('phone') as string || null,
    email: formData.get('email') as string,
    address: formData.get('address') as string || null,
    notes: formData.get('notes') as string || null,
  }

  const { data, error } = await supabase
    .from('owners')
    .insert(owner)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Handle document uploads if any
  const docFiles = formData.getAll('documents') as File[]
  const validDocs = docFiles.filter(f => f instanceof File && f.size > 0)

  if (validDocs.length > 0 && data) {
    const { uploadFile } = await import('@/lib/storage')

    for (const file of validDocs) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${data.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      try {
        const url = await uploadFile('documents', `owner/${fileName}`, file)

        // Insert document record
        await supabase.from('documents').insert({
          agency_id: userData.agency_id,
          name: file.name,
          type: file.type,
          url: url,
          file_path: `owner/${fileName}`,
          entity_type: 'owner',
          entity_id: data.id,
          category: 'other'
        })
      } catch (err) {
        console.error('Error uploading document:', err)
      }
    }
  }

  revalidatePath('/crm/owners')
  return data
}

export async function updateOwner(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const owner = {
    full_name: formData.get('full_name') as string,
    phone: formData.get('phone') as string || null,
    email: formData.get('email') as string,
    address: formData.get('address') as string || null,
    notes: formData.get('notes') as string || null,
  }

  const { data, error } = await supabase
    .from('owners')
    .update(owner)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/owners')
  revalidatePath(`/crm/owners/${id}`)
  return data
}

export async function deleteOwner(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const { error } = await supabase
    .from('owners')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/owners')
}

export async function getOwner(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const { data: userData } = await supabase
    .from('users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (!userData?.agency_id) {
    throw new Error('Agenzia non trovata')
  }

  const { data, error } = await supabase
    .from('owners')
    .select('*')
    .eq('id', id)
    .eq('agency_id', userData.agency_id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getOwners() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data: userData } = await supabase
    .from('users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (!userData?.agency_id) {
    return []
  }

  const { data, error } = await supabase
    .from('owners')
    .select(`
      *,
      properties(id)
    `)
    .eq('agency_id', userData.agency_id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching owners:', error)
    return []
  }

  // Map the data to include properties count
  return (data || []).map((owner: any) => ({
    ...owner,
    properties_count: owner.properties ? owner.properties.length : 0,
  }))
}

export async function getOwnerProperties(ownerId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data: userData } = await supabase
    .from('users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (!userData?.agency_id) {
    return []
  }

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', ownerId)
    .eq('agency_id', userData.agency_id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching owner properties:', error)
    return []
  }

  return data || []
}

