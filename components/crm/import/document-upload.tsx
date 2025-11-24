'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface DocumentUploadProps {
  onUploadComplete?: () => void
}

interface Entity {
  id: string
  name: string
  type: 'tenant' | 'owner' | 'property'
}

export function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [entityType, setEntityType] = useState<'tenant' | 'owner' | 'property' | 'auto'>('auto')
  const [selectedEntity, setSelectedEntity] = useState<string>('')
  const [category, setCategory] = useState('')
  const [entities, setEntities] = useState<Entity[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (entityType !== 'auto' && (entityType === 'tenant' || entityType === 'owner' || entityType === 'property')) {
      fetchEntities(entityType)
    }
  }, [entityType])

  const fetchEntities = async (type: 'tenant' | 'owner' | 'property') => {
    try {
      setError(null)
      const response = await fetch(`/api/${type}s`)
      if (response.ok) {
        const data = await response.json()
        setEntities(data.map((item: any) => ({
          id: item.id,
          name: item.name || item.title || item.address || `ID: ${item.id}`,
          type,
        })))
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error(`Error fetching ${type}s:`, errorData)
        setError(`Impossibile caricare la lista dei ${type === 'tenant' ? 'inquilini' : type === 'owner' ? 'proprietari' : 'proprietà'}. ${errorData.error || 'Errore sconosciuto'}`)
        setEntities([])
      }
    } catch (err) {
      console.error(`Error fetching ${type}s:`, err)
      setError(`Errore di connessione. Assicurati di essere autenticato.`)
      setEntities([])
    }
  }

  const detectEntityType = (fileName: string): 'tenant' | 'owner' | 'property' | null => {
    const lowerName = fileName.toLowerCase()
    
    // Keywords for tenant documents
    if (lowerName.includes('tenant') || lowerName.includes('inquilino') || 
        lowerName.includes('contract') || lowerName.includes('contratto') ||
        lowerName.includes('id') || lowerName.includes('carta') ||
        lowerName.includes('income') || lowerName.includes('reddito')) {
      return 'tenant'
    }
    
    // Keywords for owner documents
    if (lowerName.includes('owner') || lowerName.includes('proprietario') ||
        lowerName.includes('deed') || lowerName.includes('atto') ||
        lowerName.includes('tax') || lowerName.includes('fiscale')) {
      return 'owner'
    }
    
    // Keywords for property documents
    if (lowerName.includes('property') || lowerName.includes('proprieta') ||
        lowerName.includes('immobile') || lowerName.includes('energy') ||
        lowerName.includes('energetica') || lowerName.includes('inspection') ||
        lowerName.includes('ispezione')) {
      return 'property'
    }
    
    return null
  }

  const detectCategory = (fileName: string, detectedType: string): string => {
    const lowerName = fileName.toLowerCase()
    
    if (detectedType === 'tenant') {
      if (lowerName.includes('id') || lowerName.includes('carta') || lowerName.includes('identita')) return 'id'
      if (lowerName.includes('contract') || lowerName.includes('contratto')) return 'contract'
      if (lowerName.includes('income') || lowerName.includes('reddito')) return 'income'
      if (lowerName.includes('guarantee') || lowerName.includes('garanzia')) return 'guarantee'
    }
    
    if (detectedType === 'owner') {
      if (lowerName.includes('id') || lowerName.includes('carta') || lowerName.includes('identita')) return 'id'
      if (lowerName.includes('deed') || lowerName.includes('atto')) return 'property_deed'
      if (lowerName.includes('tax') || lowerName.includes('fiscale')) return 'tax'
    }
    
    if (detectedType === 'property') {
      if (lowerName.includes('contract') || lowerName.includes('contratto')) return 'contract'
      if (lowerName.includes('deed') || lowerName.includes('atto')) return 'deed'
      if (lowerName.includes('energy') || lowerName.includes('energetica')) return 'energy'
      if (lowerName.includes('inspection') || lowerName.includes('ispezione')) return 'inspection'
    }
    
    return 'other'
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('Il file è troppo grande. Dimensione massima: 10MB')
        return
      }

      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/jpg',
        'image/png',
      ]
      
      if (!allowedTypes.includes(selectedFile.type) && 
          !selectedFile.name.match(/\.(pdf|doc|docx|jpg|jpeg|png)$/i)) {
        setError('Formato file non supportato. Usa PDF, DOC, DOCX, JPG, JPEG o PNG')
        return
      }

      setFile(selectedFile)
      setError(null)
      setSuccess(null)

      // Auto-detect entity type and category if set to auto
      if (entityType === 'auto') {
        const detectedType = detectEntityType(selectedFile.name)
        if (detectedType) {
          setEntityType(detectedType)
          const detectedCategory = detectCategory(selectedFile.name, detectedType)
          setCategory(detectedCategory)
          // Fetch entities for the detected type
          fetchEntities(detectedType).then(() => {
            // Optionally auto-select first entity if only one exists
            // This can be removed if you want manual selection
          })
        } else {
          // If can't detect, show error or keep as auto
          setError('Impossibile rilevare automaticamente il tipo di documento. Seleziona manualmente il tipo di entità.')
        }
      } else if (entityType !== 'auto') {
        const detectedCategory = detectCategory(selectedFile.name, entityType)
        if (detectedCategory !== 'other') {
          setCategory(detectedCategory)
        }
        // Fetch entities if not already fetched
        if (entities.length === 0) {
          fetchEntities(entityType)
        }
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Seleziona un file')
      return
    }

    if (entityType === 'auto' || !selectedEntity) {
      setError('Seleziona il tipo di entità e l\'entità specifica')
      return
    }

    if (!category) {
      setError('Seleziona una categoria')
      return
    }

    setIsUploading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('entityType', entityType)
      formData.append('entityId', selectedEntity)
      formData.append('category', category)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Errore durante il caricamento')
      }

      const data = await response.json()
      setSuccess(`Documento "${file.name}" caricato con successo!`)
      
      // Reset form
      setFile(null)
      setSelectedEntity('')
      setCategory('')
      const fileInput = document.getElementById('document-file') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      if (onUploadComplete) {
        onUploadComplete()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante il caricamento')
    } finally {
      setIsUploading(false)
    }
  }

  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCategoryOptions = () => {
    if (entityType === 'tenant') {
      return [
        { value: 'id', label: 'Documento Identità' },
        { value: 'contract', label: 'Contratto' },
        { value: 'income', label: 'Certificazione Reddito' },
        { value: 'guarantee', label: 'Garanzia' },
        { value: 'other', label: 'Altro' },
      ]
    }
    if (entityType === 'owner') {
      return [
        { value: 'id', label: 'Documento Identità' },
        { value: 'property_deed', label: 'Atto di Proprietà' },
        { value: 'tax', label: 'Documenti Fiscali' },
        { value: 'other', label: 'Altro' },
      ]
    }
    if (entityType === 'property') {
      return [
        { value: 'contract', label: 'Contratto' },
        { value: 'deed', label: 'Atto di Proprietà' },
        { value: 'energy', label: 'Certificazione Energetica' },
        { value: 'inspection', label: 'Ispezione' },
        { value: 'other', label: 'Altro' },
      ]
    }
    return []
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Carica Documento
        </CardTitle>
        <CardDescription>
          Carica documenti per inquilini, proprietari o proprietà. Il sistema organizzerà automaticamente i documenti nel dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-file">File Documento</Label>
          <Input
            id="document-file"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <p className="text-xs text-muted-foreground">
            Formati supportati: PDF, DOC, DOCX, JPG, JPEG, PNG (max 10MB)
          </p>
          {file && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <FileText className="h-4 w-4" />
              <span className="text-sm flex-1">{file.name}</span>
              <Badge variant="outline" className="text-xs">
                {(file.size / 1024).toFixed(2)} KB
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="entity-type">Tipo di Entità</Label>
          <Select
            value={entityType}
            onValueChange={(value) => {
              setEntityType(value as any)
              setSelectedEntity('')
              setCategory('')
            }}
            disabled={isUploading}
          >
            <SelectTrigger id="entity-type">
              <SelectValue placeholder="Seleziona tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Rilevamento Automatico</SelectItem>
              <SelectItem value="tenant">Inquilino</SelectItem>
              <SelectItem value="owner">Proprietario</SelectItem>
              <SelectItem value="property">Proprietà</SelectItem>
            </SelectContent>
          </Select>
          {entityType === 'auto' && file && (
            <p className="text-xs text-muted-foreground">
              Il sistema cercherà di rilevare automaticamente il tipo basandosi sul nome del file
            </p>
          )}
        </div>

        {entityType !== 'auto' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="entity-search">Cerca {entityType === 'tenant' ? 'Inquilino' : entityType === 'owner' ? 'Proprietario' : 'Proprietà'}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="entity-search"
                  type="text"
                  placeholder={`Cerca ${entityType === 'tenant' ? 'inquilino' : entityType === 'owner' ? 'proprietario' : 'proprietà'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  disabled={isUploading}
                />
              </div>
              {entities.length > 0 ? (
                <>
                  <Select
                    value={selectedEntity}
                    onValueChange={setSelectedEntity}
                    disabled={isUploading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Seleziona ${entityType === 'tenant' ? 'inquilino' : entityType === 'owner' ? 'proprietario' : 'proprietà'}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredEntities.length > 0 ? (
                        filteredEntities.map((entity) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.name}
                          </SelectItem>
                        ))
                      ) : (
                        entities.map((entity) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {filteredEntities.length === 0 && searchQuery && entities.length > 0 && (
                    <p className="text-xs text-muted-foreground">Nessun risultato trovato per "{searchQuery}"</p>
                  )}
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Nessun {entityType === 'tenant' ? 'inquilino' : entityType === 'owner' ? 'proprietario' : 'proprietà'} trovato. Crea prima un {entityType === 'tenant' ? 'inquilino' : entityType === 'owner' ? 'proprietario' : 'proprietà'}.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={isUploading || !selectedEntity}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Seleziona categoria" />
                </SelectTrigger>
                <SelectContent>
                  {getCategoryOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || isUploading || entityType === 'auto' || !selectedEntity || !category || entityType === ''}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Caricamento...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Carica Documento
            </>
          )}
        </Button>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2 text-sm">Come funziona:</h3>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Il sistema può rilevare automaticamente il tipo di documento dal nome del file</li>
            <li>• I documenti vengono organizzati automaticamente nel dashboard</li>
            <li>• Puoi associare documenti a inquilini, proprietari o proprietà specifiche</li>
            <li>• I documenti sono accessibili dalle pagine di dettaglio di ogni entità</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

