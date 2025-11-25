'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

export default function DebugPage() {
  const [status, setStatus] = useState('Testing connection...')
  const [envInfo, setEnvInfo] = useState<any>({})
  const [errorDetails, setErrorDetails] = useState<string>('')

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    setEnvInfo({
      urlPresent: !!url,
      keyPresent: !!key,
      urlStart: url ? `${url.substring(0, 8)}...` : 'MISSING',
      keyStart: key ? `${key.substring(0, 8)}...` : 'MISSING',
      urlLength: url?.length || 0,
      keyLength: key?.length || 0,
      isPlaceholder: url?.includes('your_supabase') || false
    })

    async function testConnection() {
      try {
        const supabase = createClient()
        // Try to get the session - this verifies the client is initialized and can talk to Supabase
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }
        
        setStatus('SUCCESS: Connection to Supabase established!')
      } catch (e: any) {
        console.error('Connection test failed:', e)
        setStatus('FAILED: Could not connect to Supabase')
        setErrorDetails(e.message || JSON.stringify(e))
      }
    }
    
    testConnection()
  }, [])

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Debugger</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Environment Variables</h2>
          <div className="space-y-2 text-sm font-mono">
            <p>URL Present: {envInfo.urlPresent ? '✅' : '❌'}</p>
            <p>Key Present: {envInfo.keyPresent ? '✅' : '❌'}</p>
            <p>URL Value: {envInfo.urlStart}</p>
            <p>Key Value: {envInfo.keyStart}</p>
            <p>Is Placeholder: {envInfo.isPlaceholder ? '⚠️ YES (Config missing)' : 'No'}</p>
          </div>
        </div>

        <div className={`p-4 border rounded ${status.includes('SUCCESS') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <h2 className="font-semibold mb-2">Connection Status</h2>
          <p className={`font-bold ${status.includes('SUCCESS') ? 'text-green-700' : 'text-red-700'}`}>
            {status}
          </p>
          {errorDetails && (
            <div className="mt-2 p-2 bg-white rounded border border-red-100 text-red-600 text-xs font-mono overflow-auto">
              {errorDetails}
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          <p>If URL/Key are missing or placeholders, check Netlify Environment Variables.</p>
          <p>If Connection Failed with "Load failed", check Browser Console for CORS errors.</p>
        </div>
      </div>
    </div>
  )
}
