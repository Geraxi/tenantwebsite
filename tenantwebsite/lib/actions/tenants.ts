'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTenant(formData: FormData) {
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

  const tenant = {
    agency_id: userData.agency_id,
    full_name: formData.get('full_name') as string,
    phone: formData.get('phone') as string || null,
    email: formData.get('email') as string,
    address: formData.get('address') as string || null,
    rental_status: formData.get('rental_status') as string || 'prospective',
    lease_start: formData.get('lease_start') as string || null,
    lease_end: formData.get('lease_end') as string || null,
    monthly_rent: formData.get('monthly_rent') ? parseFloat(formData.get('monthly_rent') as string) : null,
    deposit: formData.get('deposit') ? parseFloat(formData.get('deposit') as string) : null,
    notes: formData.get('notes') as string || null,
    property_id: formData.get('property_id') as string || null,
  }

  const { data, error } = await supabase
    .from('tenants')
    .insert(tenant)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/tenants')
  // Revalidate property page if property_id is set
  const propertyId = formData.get('property_id') as string
  if (propertyId) {
    revalidatePath(`/crm/properties/${propertyId}`)
  }
  return data
}

export async function updateTenant(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const tenant = {
    full_name: formData.get('full_name') as string,
    phone: formData.get('phone') as string || null,
    email: formData.get('email') as string,
    address: formData.get('address') as string || null,
    rental_status: formData.get('rental_status') as string,
    lease_start: formData.get('lease_start') as string || null,
    lease_end: formData.get('lease_end') as string || null,
    monthly_rent: formData.get('monthly_rent') ? parseFloat(formData.get('monthly_rent') as string) : null,
    deposit: formData.get('deposit') ? parseFloat(formData.get('deposit') as string) : null,
    notes: formData.get('notes') as string || null,
    property_id: formData.get('property_id') as string || null,
  }

  const { data, error } = await supabase
    .from('tenants')
    .update(tenant)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/tenants')
  revalidatePath(`/crm/tenants/${id}`)
  return data
}

export async function deleteTenant(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const { error } = await supabase
    .from('tenants')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/tenants')
}

export async function getTenant(id: string) {
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
    .from('tenants')
    .select('*, properties(*)')
    .eq('id', id)
    .eq('agency_id', userData.agency_id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getTenants() {
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
    .from('tenants')
    .select('*, properties(*)')
    .eq('agency_id', userData.agency_id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tenants:', error)
    return []
  }

  return data || []
}

