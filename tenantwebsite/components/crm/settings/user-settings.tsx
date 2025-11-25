'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UserSettingsProps {
  user: {
    id: string
    email?: string
  }
  userData: {
    full_name?: string
    email?: string
  } | null
}

export function UserSettings({ user, userData }: UserSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        router.refresh()
        alert('Profilo aggiornato con successo')
      } else {
        alert('Errore durante l\'aggiornamento del profilo')
      }
    } catch (error) {
      alert('Errore durante l\'aggiornamento del profilo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">Nome Completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="full_name"
            name="full_name"
            defaultValue={userData?.full_name || ''}
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email || userData?.email || ''}
            className="pl-10"
            disabled
          />
        </div>
        <p className="text-xs text-muted-foreground">
          L'email non può essere modificata
        </p>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Salvataggio...' : 'Salva Modifiche'}
      </Button>
    </form>
  )
}

