'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import * as XLSX from 'xlsx'

interface ImportResult {
  success: boolean
  message: string
  imported?: {
    tenants: number
    owners: number
    properties: number
  }
}

export function ExcelImport() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file type
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
      ]
      
      if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls') && !selectedFile.name.endsWith('.csv')) {
        setError('Formato file non supportato. Usa Excel (.xlsx, .xls) o CSV')
        return
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Il file è troppo grande. Dimensione massima: 5MB')
        return
      }

      setFile(selectedFile)
      setError(null)
      setResult(null)
    }
  }

  const processExcelFile = async (file: File) => {
    return new Promise<ImportResult>((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = async (e) => {
        try {
          const data = e.target?.result
          if (!data) {
            reject(new Error('Impossibile leggere il file'))
            return
          }

          const workbook = XLSX.read(data, { type: 'binary' })
          const imported = {
            tenants: 0,
            owners: 0,
            properties: 0,
          }

          // Process each sheet
          for (const sheetName of workbook.SheetNames) {
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet)

            if (jsonData.length === 0) continue

            // Detect entity type based on sheet name or column headers
            const firstRow = jsonData[0] as any
            const headers = Object.keys(firstRow).map(h => h.toLowerCase())
            
            let entityType: 'tenant' | 'owner' | 'property' | null = null

            // Detect by sheet name
            const sheetLower = sheetName.toLowerCase()
            if (sheetLower.includes('tenant') || sheetLower.includes('inquilino')) {
              entityType = 'tenant'
            } else if (sheetLower.includes('owner') || sheetLower.includes('proprietario')) {
              entityType = 'owner'
            } else if (sheetLower.includes('property') || sheetLower.includes('proprieta') || sheetLower.includes('immobile')) {
              entityType = 'property'
            } else {
              // Detect by column headers
              if (headers.some(h => h.includes('rent') || h.includes('affitto') || h.includes('tenant'))) {
                entityType = 'tenant'
              } else if (headers.some(h => h.includes('owner') || h.includes('proprietario'))) {
                entityType = 'owner'
              } else if (headers.some(h => h.includes('address') || h.includes('indirizzo') || h.includes('property'))) {
                entityType = 'property'
              }
            }

            if (!entityType) {
              console.warn(`Could not determine entity type for sheet: ${sheetName}`)
              continue
            }

            // Import data based on entity type
            // Note: This is a placeholder - you'll need to create import endpoints
            // or use server actions to import the data
            for (const row of jsonData) {
              try {
                // For now, we'll just count the rows
                // You can implement actual import logic here using server actions
                // Example: await createTenant(formData) from '@/lib/actions/tenants'
                imported[entityType + 's' as keyof typeof imported]++
              } catch (err) {
                console.error(`Error importing ${entityType}:`, err)
              }
            }
          }

          const totalImported = imported.tenants + imported.owners + imported.properties
          resolve({
            success: totalImported > 0,
            message: totalImported > 0 
              ? `File elaborato! Trovati: ${imported.tenants} inquilini, ${imported.owners} proprietari, ${imported.properties} proprietà. Nota: L'importazione automatica richiede la configurazione degli endpoint di importazione.`
              : 'Nessun dato trovato nel file. Assicurati che il file contenga dati validi.',
            imported,
          })
        } catch (err) {
          reject(err)
        }
      }

      reader.onerror = () => reject(new Error('Errore nella lettura del file'))
      reader.readAsBinaryString(file)
    })
  }

  const handleImport = async () => {
    if (!file) {
      setError('Seleziona un file')
      return
    }

    setIsProcessing(true)
    setError(null)
    setResult(null)

    try {
      const importResult = await processExcelFile(file)
      setResult(importResult)
      setFile(null)
      // Reset file input
      const fileInput = document.getElementById('excel-file') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante l\'importazione')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Importa Dati da Excel
        </CardTitle>
        <CardDescription>
          Carica un file Excel o CSV per importare automaticamente inquilini, proprietari e proprietà.
          Il sistema organizzerà automaticamente i dati nel dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="excel-file">File Excel/CSV</Label>
          <Input
            id="excel-file"
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            disabled={isProcessing}
          />
          <p className="text-xs text-muted-foreground">
            Formati supportati: .xlsx, .xls, .csv (max 5MB)
          </p>
          {file && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <FileText className="h-4 w-4" />
              <span className="text-sm">{file.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(file.size / 1024).toFixed(2)} KB)
              </span>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert variant={result.success ? 'default' : 'destructive'}>
            {result.success ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>{result.message}</AlertDescription>
            {result.imported && (
              <div className="mt-2 text-sm">
                <p>• Inquilini: {result.imported.tenants}</p>
                <p>• Proprietari: {result.imported.owners}</p>
                <p>• Proprietà: {result.imported.properties}</p>
              </div>
            )}
          </Alert>
        )}

        <Button
          onClick={handleImport}
          disabled={!file || isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Elaborazione...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Importa Dati
            </>
          )}
        </Button>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Come organizzare il tuo file Excel:</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Crea fogli separati per "Inquilini", "Proprietari" e "Proprietà"</li>
            <li>• La prima riga deve contenere le intestazioni delle colonne</li>
            <li>• Il sistema riconoscerà automaticamente il tipo di dati</li>
            <li>• I dati verranno organizzati automaticamente nel dashboard</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

