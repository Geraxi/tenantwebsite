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

  // First create the property without images
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
    images: [],
  }

  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  // Handle image uploads if any
  const imageFiles = formData.getAll('images') as File[]
  const validImages = imageFiles.filter(f => f instanceof File && f.size > 0)

  if (validImages.length > 0 && data) {
    const { uploadFile } = await import('@/lib/storage')
    const imageUrls: string[] = []

    for (const file of validImages) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${data.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      try {
        const url = await uploadFile('property-images', `properties/${fileName}`, file)
        imageUrls.push(url)
      } catch (err) {
        console.error('Error uploading image:', err)
      }
    }

    // Update property with image URLs
    if (imageUrls.length > 0) {
      await supabase
        .from('properties')
        .update({ images: imageUrls })
        .eq('id', data.id)

      data.images = imageUrls
    }
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

