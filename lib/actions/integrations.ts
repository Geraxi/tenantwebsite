'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { randomBytes, createHash } from 'crypto'

export type ApiKey = {
    id: string
    name: string
    prefix: string
    created_at: string
    last_used_at: string | null
}

export async function listApiKeys(): Promise<{ success: boolean, data?: ApiKey[], error?: string }> {
    const supabase = await createClient()

    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorized')

        // Get user's agency
        const { data: userData } = await supabase
            .from('users')
            .select('agency_id')
            .eq('id', user.id)
            .single()

        if (!userData?.agency_id) throw new Error('No agency found')

        const { data: keys, error } = await supabase
            .from('api_keys')
            .select('id, name, prefix, created_at, last_used_at')
            .eq('agency_id', userData.agency_id)
            .order('created_at', { ascending: false })

        if (error) throw error

        return { success: true, data: keys }
    } catch (error) {
        console.error('Error listing API keys:', error)
        return { success: false, error: 'Failed to list API keys' }
    }
}

export async function generateApiKey(name: string): Promise<{ success: boolean, key?: string, error?: string }> {
    const supabase = await createClient()

    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorized')

        // Get user's agency
        const { data: userData } = await supabase
            .from('users')
            .select('agency_id')
            .eq('id', user.id)
            .single()

        if (!userData?.agency_id) throw new Error('No agency found')

        // Generate Key
        // Format: sk_live_[random_chars]
        const randomPart = randomBytes(24).toString('hex')
        const key = `sk_live_${randomPart}`
        const prefix = key.slice(0, 12) // sk_live_1234

        // Hash the key for storage
        const keyHash = createHash('sha256').update(key).digest('hex')

        const { error } = await supabase
            .from('api_keys')
            .insert({
                agency_id: userData.agency_id,
                name,
                key_hash: keyHash,
                prefix,
                created_by: user.id
            })

        if (error) throw error

        revalidatePath('/crm/settings')
        return { success: true, key }
    } catch (error) {
        console.error('Error generating API key:', error)
        return { success: false, error: 'Failed to generate API key' }
    }
}

export async function revokeApiKey(id: string): Promise<{ success: boolean, error?: string }> {
    const supabase = await createClient()

    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorized')

        // RLS will handle the agency check, but we need to be authenticated
        const { error } = await supabase
            .from('api_keys')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/crm/settings')
        return { success: true }
    } catch (error) {
        console.error('Error revoking API key:', error)
        return { success: false, error: 'Failed to revoke API key' }
    }
}
