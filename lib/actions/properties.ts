'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProperty(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  // Get user's agency_id
  const { data: userData } = await supabase
    .from('users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (!userData?.agency_id) {
    throw new Error('Agenzia non trovata')
  }

  const imagesJson = formData.get('images') as string
  let images: string[] = []
  try {
    images = imagesJson ? JSON.parse(imagesJson) : []
  } catch {
    images = []
  }

  const property = {
    agency_id: userData.agency_id,
    type: formData.get('type') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    price: parseFloat(formData.get('price') as string),
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    size: formData.get('size') ? parseFloat(formData.get('size') as string) : null,
    rooms: formData.get('rooms') ? parseInt(formData.get('rooms') as string) : null,
    status: formData.get('status') as string || 'active',
    owner_id: formData.get('owner_id') as string || null,
    images: images,
  }

  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/properties')
  return data
}

export async function updateProperty(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const imagesJson = formData.get('images') as string
  let images: string[] = []
  try {
    images = imagesJson ? JSON.parse(imagesJson) : []
  } catch {
    images = []
  }

  const property = {
    type: formData.get('type') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    price: parseFloat(formData.get('price') as string),
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    size: formData.get('size') ? parseFloat(formData.get('size') as string) : null,
    rooms: formData.get('rooms') ? parseInt(formData.get('rooms') as string) : null,
    status: formData.get('status') as string,
    owner_id: formData.get('owner_id') as string || null,
    images: images,
  }

  const { data, error } = await supabase
    .from('properties')
    .update(property)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/properties')
  revalidatePath(`/crm/properties/${id}`)
  return data
}

export async function deleteProperty(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/properties')
}

export async function getProperty(id: string) {
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
    .from('properties')
    .select('*, owners(*), tenants(*)')
    .eq('id', id)
    .eq('agency_id', userData.agency_id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getProperties() {
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
    .select('*, owners(*)')
    .eq('agency_id', userData.agency_id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties:', error)
    return []
  }

  return data || []
}

