// Force update
import { PropertyForm } from '../../../../components/crm/properties/property-form'
import { getOwners } from '@/lib/actions/owners'

export default async function NewPropertyPage() {
    const owners = await getOwners()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Nuova Proprietà</h1>
                <p className="text-muted-foreground">Aggiungi una nuova proprietà al tuo portafoglio</p>
            </div>

            <PropertyForm owners={owners} />
        </div>
    )
}
