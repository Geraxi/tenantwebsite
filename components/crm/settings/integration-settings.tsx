'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, Trash2, Copy, Check } from 'lucide-react'
import { generateApiKey, revokeApiKey, type ApiKey } from '@/lib/actions/integrations'

interface IntegrationSettingsProps {
    initialKeys: ApiKey[]
}

export function IntegrationSettings({ initialKeys }: IntegrationSettingsProps) {
    const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
    const [isLoading, setIsLoading] = useState(false)
    const [newKeyName, setNewKeyName] = useState('')
    const [generatedKey, setGeneratedKey] = useState<string | null>(null)
    const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const handleGenerateKey = async () => {
        if (!newKeyName.trim()) return

        setIsLoading(true)
        try {
            const result = await generateApiKey(newKeyName)
            if (result.success && result.key) {
                setGeneratedKey(result.key)
                // Optimistically update the list or wait for revalidation? 
                // Since we revalidatePath in the action, the parent page might refresh, but we are in a client component.
                // We should probably just refresh the page or update local state if we returned the full object.
                // The action returns the key string, but not the full DB object.
                // For simplicity, let's just reload the page or better, fetch the list again?
                // Actually, let's just assume the user will refresh or we can add a simple placeholder.
                // But wait, we need to show the key NOW.
                // We'll handle the list update by just refreshing the router in a real app, but here let's just show the key.
                // We can't easily add it to the list without the ID and timestamps from the DB.
                // Let's just rely on the user refreshing for the list, or we can improve the action to return the created object.
                // For now, showing the key is the most important part.
            }
        } catch (error) {
            console.error('Failed to generate key', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopyKey = () => {
        if (generatedKey) {
            navigator.clipboard.writeText(generatedKey)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        }
    }

    const handleCloseDialog = () => {
        setIsGenerateDialogOpen(false)
        setGeneratedKey(null)
        setNewKeyName('')
        // Refresh the page to show the new key in the list
        window.location.reload()
    }

    const handleRevokeKey = async (id: string) => {
        try {
            const result = await revokeApiKey(id)
            if (result.success) {
                setKeys(keys.filter(k => k.id !== id))
            }
        } catch (error) {
            console.error('Failed to revoke key', error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>
                            Gestisci le chiavi API per connettere piattaforme esterne.
                        </CardDescription>
                    </div>
                    <Button onClick={() => setIsGenerateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Genera Nuova Chiave
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {keys.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                        Nessuna chiave API attiva. Generane una per iniziare.
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Prefisso</TableHead>
                                <TableHead>Creata il</TableHead>
                                <TableHead>Ultimo utilizzo</TableHead>
                                <TableHead className="text-right">Azioni</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {keys.map((key) => (
                                <TableRow key={key.id}>
                                    <TableCell className="font-medium">{key.name}</TableCell>
                                    <TableCell><Badge variant="outline" className="font-mono">{key.prefix}...</Badge></TableCell>
                                    <TableCell>{new Date(key.created_at).toLocaleDateString('it-IT')}</TableCell>
                                    <TableCell>
                                        {key.last_used_at ? new Date(key.last_used_at).toLocaleString('it-IT') : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Questa azione revocherà immediatamente la chiave API "{key.name}".
                                                        Qualsiasi integrazione che utilizza questa chiave smetterà di funzionare.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleRevokeKey(key.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                        Revoca
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                <Dialog open={isGenerateDialogOpen} onOpenChange={(open) => {
                    if (!open && generatedKey) {
                        handleCloseDialog()
                    } else if (!open) {
                        setIsGenerateDialogOpen(false)
                    }
                }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Genera Nuova Chiave API</DialogTitle>
                            <DialogDescription>
                                Inserisci un nome per identificare questa chiave (es. "Zapier", "Sito Web").
                            </DialogDescription>
                        </DialogHeader>

                        {!generatedKey ? (
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Nome della chiave"
                                        value={newKeyName}
                                        onChange={(e) => setNewKeyName(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleGenerateKey}
                                    disabled={!newKeyName.trim() || isLoading}
                                    className="w-full"
                                >
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Crea Chiave
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4 py-4">
                                <div className="rounded-md bg-muted p-4">
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Copia la tua chiave API ora. Non potrai più vederla in seguito!
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <code className="flex-1 rounded bg-background p-2 font-mono text-sm border">
                                            {generatedKey}
                                        </code>
                                        <Button size="icon" variant="outline" onClick={handleCopyKey}>
                                            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <Button onClick={handleCloseDialog} className="w-full">
                                    Ho copiato la chiave
                                </Button>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}
