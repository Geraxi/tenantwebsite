'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTask(formData: FormData) {
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

  const task = {
    agency_id: userData.agency_id,
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    due_date: formData.get('due_date') as string || null,
    assigned_to: formData.get('assigned_to') as string || null,
    property_id: formData.get('property_id') as string || null,
    status: 'todo',
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/tasks')
  return data
}

export async function updateTask(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const task = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    due_date: formData.get('due_date') as string || null,
    assigned_to: formData.get('assigned_to') as string || null,
    property_id: formData.get('property_id') as string || null,
    status: formData.get('status') as string,
  }

  const { data, error } = await supabase
    .from('tasks')
    .update(task)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/tasks')
  return data
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/crm/tasks')
}

export async function getTasks() {
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
    .from('tasks')
    .select('*, properties(*), tenants(*)')
    .eq('agency_id', userData.agency_id)
    .order('due_date', { ascending: true })

  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }

  return data || []
}

export async function getTask(id: string) {
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
    .from('tasks')
    .select('*, properties(*)')
    .eq('id', id)
    .eq('agency_id', userData.agency_id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

