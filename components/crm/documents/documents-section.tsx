'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, File, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Document {
  id: string
  name: string
  type: string
  url: string
  uploaded_at: string
  category?: string
}

interface DocumentsSectionProps {
  entityType: 'tenant' | 'owner' | 'property'
  entityId: string
}

const documentCategories = {
  tenant: [
    { value: 'id', label: 'Documento Identità' },
    { value: 'contract', label: 'Contratto di Affitto' },
    { value: 'income', label: 'Certificazione Reddito' },
    { value: 'guarantee', label: 'Garanzia/Deposito' },
    { value: 'bank_statement', label: 'Estratto Conto Bancario' },
    { value: 'employment', label: 'Certificato di Lavoro' },
    { value: 'reference', label: 'Referenze' },
    { value: 'insurance', label: 'Assicurazione' },
    { value: 'utility', label: 'Bollette/Utilità' },
    { value: 'other', label: 'Altro' },
  ],
  owner: [
    { value: 'id', label: 'Documento Identità' },
    { value: 'property_deed', label: 'Atto di Proprietà' },
    { value: 'tax', label: 'Documenti Fiscali' },
    { value: 'other', label: 'Altro' },
  ],
  property: [
    { value: 'contract', label: 'Contratto' },
    { value: 'deed', label: 'Atto di Proprietà' },
    { value: 'energy', label: 'Certificazione Energetica' },
    { value: 'inspection', label: 'Ispezione' },
    { value: 'other', label: 'Altro' },
  ],
}

export function DocumentsSection({ entityType, entityId }: DocumentsSectionProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [category, setCategory] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocuments()
  }, [entityType, entityId])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/documents?entityType=${entityType}&entityId=${entityId}`)
      if (response.ok) {
        const data = await response.json()
        setDocuments(data)
      }
    } catch (err) {
      console.error('Error fetching documents:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Il file è troppo grande. Dimensione massima: 10MB')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !category) {
      setError('Seleziona un file e una categoria')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('entityType', entityType)
      formData.append('entityId', entityId)
      formData.append('category', category)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Errore durante il caricamento del documento')
      }

      // Refresh documents list
      await fetchDocuments()
      
      // Reset form
      setSelectedFile(null)
      setCategory('')
      setIsOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante il caricamento')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = async (doc: Document) => {
    try {
      const response = await fetch(`/api/documents/${doc.id}/download`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = doc.name
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        // Fallback: open in new tab if download fails
        window.open(doc.url, '_blank')
      }
    } catch (err) {
      console.error('Error downloading document:', err)
      // Fallback: open in new tab
      window.open(doc.url, '_blank')
    }
  }

  const handleDelete = async (documentId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo documento?')) {
      return
    }

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchDocuments()
      }
    } catch (err) {
      console.error('Error deleting document:', err)
    }
  }

  const getCategoryLabel = (cat: string) => {
    const categories = documentCategories[entityType]
    return categories.find(c => c.value === cat)?.label || cat
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('image')) return '🖼️'
    if (type.includes('word')) return '📝'
    return '📎'
  }

  const categories = documentCategories[entityType]

  return (
    <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <File className="h-5 w-5 text-blue-600" />
              Documenti {entityType === 'tenant' ? 'Inquilino' : entityType === 'owner' ? 'Proprietario' : 'Proprietà'}
            </CardTitle>
            <CardDescription>
              {entityType === 'tenant' 
                ? 'Carica e gestisci tutti i documenti dell\'inquilino (contratti, identità, certificazioni, ecc.). Organizza la documentazione in modo centralizzato.'
                : entityType === 'owner'
                ? 'Carica e gestisci tutti i documenti del proprietario (atti di proprietà, documenti fiscali, ecc.).'
                : 'Carica e gestisci tutti i documenti della proprietà (contratti, certificazioni energetiche, ispezioni, ecc.).'}
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="mr-2 h-4 w-4" />
                Carica Documento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Carica Nuovo Documento</DialogTitle>
                <DialogDescription>
                  {entityType === 'tenant'
                    ? 'Aggiungi un documento al profilo dell\'inquilino. Seleziona il file e assegna una categoria appropriata per organizzare la documentazione.'
                    : entityType === 'owner'
                    ? 'Aggiungi un documento al profilo del proprietario. Seleziona il file e assegna una categoria appropriata.'
                    : 'Aggiungi un documento alla proprietà. Seleziona il file e assegna una categoria appropriata.'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Seleziona una categoria</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Annulla
                  </Button>
                  <Button onClick={handleUpload} disabled={isUploading || !selectedFile || !category}>
                    {isUploading ? 'Caricamento...' : 'Carica'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Caricamento documenti...</p>
        ) : documents.length === 0 ? (
          <div className="text-center py-8">
            <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Nessun documento ancora caricato</p>
            <p className="text-xs text-muted-foreground">
              {entityType === 'tenant' 
                ? 'Clicca su "Carica Documento" per aggiungere documenti dell\'inquilino'
                : entityType === 'owner'
                ? 'Clicca su "Carica Documento" per aggiungere documenti del proprietario'
                : 'Clicca su "Carica Documento" per aggiungere documenti della proprietà'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{getFileIcon(doc.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(doc.category || 'other')}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(doc.uploaded_at).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(doc)}
                    className="h-8 w-8"
                  >
                    <File className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doc.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

