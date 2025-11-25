'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export default function TestSupabasePage() {
  const [checks, setChecks] = useState<{
    envVars: { url: boolean; key: boolean }
    connection: boolean | null
    error: string | null
  }>({
    envVars: { url: false, key: false },
    connection: null,
    error: null,
  })

  useEffect(() => {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setChecks(prev => ({
      ...prev,
      envVars: {
        url: !!supabaseUrl && !supabaseUrl.includes('your_supabase'),
        key: !!supabaseAnonKey && !supabaseAnonKey.includes('your_supabase'),
      },
    }))

    // Test connection
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient()
      supabase
        .from('agencies')
        .select('count')
        .limit(1)
        .then(() => {
          setChecks(prev => ({ ...prev, connection: true }))
        })
        .catch((err) => {
          setChecks(prev => ({
            ...prev,
            connection: false,
            error: err.message,
          }))
        })
    }
  }, [])

  const allGood = checks.envVars.url && checks.envVars.key && checks.connection === true

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Test Configurazione Supabase</CardTitle>
          <CardDescription>
            Verifica che Supabase sia configurato correttamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>NEXT_PUBLIC_SUPABASE_URL</span>
              {checks.envVars.url ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Configurato
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Non configurato
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              {checks.envVars.key ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Configurato
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Non configurato
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>Connessione a Supabase</span>
              {checks.connection === null ? (
                <Badge variant="secondary">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Verifica in corso...
                </Badge>
              ) : checks.connection ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Connesso
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Errore
                </Badge>
              )}
            </div>
          </div>

          {checks.error && (
            <div className="p-3 bg-destructive/10 rounded-md">
              <p className="text-sm text-destructive font-medium">Errore:</p>
              <p className="text-sm text-destructive">{checks.error}</p>
            </div>
          )}

          {allGood ? (
            <div className="p-4 bg-green-50 rounded-md border border-green-200">
              <p className="text-sm text-green-800 font-medium">
                ✅ Supabase è configurato correttamente!
              </p>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
              <p className="text-sm text-yellow-800 font-medium mb-2">
                ⚠️ Configurazione incompleta
              </p>
              <p className="text-xs text-yellow-700">
                Vai a Netlify Dashboard → Site settings → Environment variables e aggiungi:
              </p>
              <ul className="text-xs text-yellow-700 mt-2 list-disc list-inside">
                <li>NEXT_PUBLIC_SUPABASE_URL</li>
                <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
              </ul>
            </div>
          )}

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Valori attuali (solo per debug):
            </p>
            <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto">
              {JSON.stringify(
                {
                  url: process.env.NEXT_PUBLIC_SUPABASE_URL
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...`
                    : 'NON CONFIGURATO',
                  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 30)}...`
                    : 'NON CONFIGURATO',
                },
                null,
                2
              )}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

