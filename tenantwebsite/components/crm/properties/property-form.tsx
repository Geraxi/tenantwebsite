'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createProperty } from '@/lib/actions/properties'

const propertySchema = z.object({
    title: z.string().min(3, 'Il titolo deve contenere almeno 3 caratteri'),
    description: z.string().optional(),
    type: z.string().min(1, 'Seleziona un tipo di proprietà'),
    price: z.string().min(1, 'Inserisci il prezzo'),
    address: z.string().min(5, 'Inserisci un indirizzo valido'),
    city: z.string().min(2, 'Inserisci la città'),
    size: z.string().optional(),
    rooms: z.string().optional(),
    status: z.string().default('active'),
    owner_id: z.string().optional(),
})

type PropertyFormValues = z.infer<typeof propertySchema>

interface PropertyFormProps {
    owners: { id: string; full_name: string }[]
}

export function PropertyForm({ owners }: PropertyFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            title: '',
            description: '',
            type: '',
            price: '',
            address: '',
            city: '',
            size: '',
            rooms: '',
            status: 'active',
            owner_id: 'none', // Default to none if no owner selected
        },
    })

    const onSubmit = async (data: PropertyFormValues) => {
        setIsLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('title', data.title)
        if (data.description) formData.append('description', data.description)
        formData.append('type', data.type)
        formData.append('price', data.price)
        formData.append('address', data.address)
        formData.append('city', data.city)
        if (data.size) formData.append('size', data.size)
        if (data.rooms) formData.append('rooms', data.rooms)
        formData.append('status', data.status)
        if (data.owner_id && data.owner_id !== 'none') formData.append('owner_id', data.owner_id)

        try {
            await createProperty(formData)
            router.push('/crm/properties')
            router.refresh()
        } catch (err) {
            console.error('Error creating property:', err)
            setError(err instanceof Error ? err.message : 'Si è verificato un errore durante la creazione della proprietà')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Dettagli Proprietà</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Titolo Annuncio</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Appartamento Centro Storico" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Tipo Proprietà</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleziona tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="apartment">Appartamento</SelectItem>
                                                <SelectItem value="house">Casa Indipendente</SelectItem>
                                                <SelectItem value="villa">Villa</SelectItem>
                                                <SelectItem value="office">Ufficio</SelectItem>
                                                <SelectItem value="shop">Negozio</SelectItem>
                                                <SelectItem value="land">Terreno</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Prezzo (€)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="1200" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Stato</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleziona stato" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">Disponibile</SelectItem>
                                                <SelectItem value="rented">Affittato</SelectItem>
                                                <SelectItem value="sold">Venduto</SelectItem>
                                                <SelectItem value="maintenance">Manutenzione</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Indirizzo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Via Roma 123" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Città</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Milano" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="size"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Dimensioni (mq)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="85" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rooms"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Stanze</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="3" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="owner_id"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Proprietario</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleziona proprietario (opzionale)" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="none">Nessuno</SelectItem>
                                                {owners.map((owner) => (
                                                    <SelectItem key={owner.id} value={owner.id}>
                                                        {owner.full_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Descrizione</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descrivi la proprietà..."
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isLoading}
                            >
                                Annulla
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Crea Proprietà
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
