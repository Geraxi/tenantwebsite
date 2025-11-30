import { createClient } from '@/lib/supabase/server'

export async function uploadFile(bucket: string, path: string, file: File): Promise<string> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error(`Errore nel caricamento: ${error.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return publicUrl
}

export async function uploadPropertyImage(propertyId: string, file: File): Promise<string> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autenticato')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${propertyId}/${Date.now()}.${fileExt}`
  const filePath = `properties/${fileName}`

  const { data, error } = await supabase.storage
    .from('property-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error(`Errore nel caricamento: ${error.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('property-images')
    .getPublicUrl(filePath)

  return publicUrl
}

export async function deletePropertyImage(imageUrl: string) {
  const supabase = await createClient()

  // Extract file path from URL
  const urlParts = imageUrl.split('/')
  const fileName = urlParts[urlParts.length - 1]
  const propertyId = urlParts[urlParts.length - 2]
  const filePath = `properties/${propertyId}/${fileName}`

  const { error } = await supabase.storage
    .from('property-images')
    .remove([filePath])

  if (error) {
    throw new Error(`Errore nell'eliminazione: ${error.message}`)
  }
}

