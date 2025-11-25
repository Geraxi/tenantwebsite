'use client'

import dynamic from 'next/dynamic'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DocumentUpload } from '@/components/crm/import/document-upload'

// Dynamically import ExcelImport to avoid SSR issues with xlsx
const ExcelImport = dynamic(
  () => import('@/components/crm/import/excel-import').then((mod) => ({ default: mod.ExcelImport })),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 border rounded-lg">
        <p>Caricamento componente...</p>
      </div>
    ),
  }
)

export default function ImportPage() {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Importa Dati e Documenti</h1>
        <p className="text-muted-foreground">
          Carica file Excel o documenti per importare e organizzare automaticamente i tuoi dati nel dashboard
        </p>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="documents">Carica Documenti</TabsTrigger>
          <TabsTrigger value="excel">Importa da Excel</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="space-y-4">
          <DocumentUpload />
        </TabsContent>
        <TabsContent value="excel" className="space-y-4">
          <ExcelImport />
        </TabsContent>
      </Tabs>
    </div>
  )
}
