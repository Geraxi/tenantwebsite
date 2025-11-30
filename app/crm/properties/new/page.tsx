import { redirect } from 'next/navigation'
import { createProperty } from '@/lib/actions/properties'
import { getOwners } from '@/lib/actions/owners'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Building, MapPin, Euro, Ruler, Home, Upload } from 'lucide-react'
import Link from 'next/link'

export default async function NewPropertyPage() {
    const owners = await getOwners()

    async function handleSubmit(formData: FormData) {
        'use server'
        try {
            await createProperty(formData)
            redirect('/crm/properties')
        } catch (error) {
            throw error
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/crm/properties">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Nuova Proprietà</h1>
                    <p className="text-muted-foreground">Aggiungi una nuova proprietà al portafoglio</p>
                </div>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            Dettagli Proprietà
                        </CardTitle>
                        <CardDescription>Informazioni principali sull'immobile</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Titolo Annuncio *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Es. Trilocale Centro Storico"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Tipologia *</Label>
                                <Select name="type" required defaultValue="apartment">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleziona tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apartment">Appartamento</SelectItem>
                                        <SelectItem value="house">Casa Indipendente</SelectItem>
                                        <SelectItem value="villa">Villa</SelectItem>
                                        <SelectItem value="office">Ufficio</SelectItem>
                                        <SelectItem value="shop">Negozio</SelectItem>
                                        <SelectItem value="garage">Garage</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="owner_id">Proprietario</Label>
                                <Select name="owner_id">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleziona proprietario" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {owners.map((owner: any) => (
                                            <SelectItem key={owner.id} value={owner.id}>
                                                {owner.full_name || owner.email}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Stato</Label>
                                <Select name="status" defaultValue="active">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleziona stato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Attivo (Disponibile)</SelectItem>
                                        <SelectItem value="rented">Affittato</SelectItem>
                                        <SelectItem value="sold">Venduto</SelectItem>
                                        <SelectItem value="inactive">Inattivo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descrizione</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Descrizione dettagliata dell'immobile..."
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Localizzazione
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="address">Indirizzo *</Label>
                            <Input
                                id="address"
                                name="address"
                                placeholder="Via Roma 10"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">Città *</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    placeholder="Milano"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zip_code">CAP</Label>
                                <Input
                                    id="zip_code"
                                    name="zip_code"
                                    placeholder="20100"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Ruler className="h-5 w-5" />
                            Caratteristiche e Prezzo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Prezzo (€) *</Label>
                                <div className="relative">
                                    <Euro className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="1000"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="size">Superficie (mq)</Label>
                                <div className="relative">
                                    <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="size"
                                        name="size"
                                        type="number"
                                        placeholder="80"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rooms">Locali</Label>
                                <Input
                                    id="rooms"
                                    name="rooms"
                                    type="number"
                                    placeholder="3"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Immagini Proprietà
                        </CardTitle>
                        <CardDescription>Carica foto dell'immobile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="images">Immagini (max 10MB per file)</Label>
                            <Input
                                id="images"
                                name="images"
                                type="file"
                                multiple
                                accept="image/*"
                                className="cursor-pointer"
                            />
                            <p className="text-xs text-muted-foreground">
                                Puoi selezionare più immagini contemporaneamente
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Link href="/crm/properties">
                        <Button type="button" variant="outline">
                            Annulla
                        </Button>
                    </Link>
                    <Button type="submit">
                        Crea Proprietà
                    </Button>
                </div>
            </form>
        </div>
    )
}
