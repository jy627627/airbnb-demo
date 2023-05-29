
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import { EmptyState } from "@/app/components/EmptyState";
import { ClientOnly } from "@/app/components/ClientOnly";
import { PropertiesClient } from "@/app/properties/PropertiesClient";


export default async function PropertiesPage() {
    const currentUser = await getCurrentUser()

    if ( !currentUser ) return (
        <ClientOnly>
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        </ClientOnly>
    )

    const listings = await getListings({ userId: currentUser.id })

    if (listings.length === 0) return (
        <ClientOnly>
            <EmptyState
                title="No properties found"
                subtitle="Looks like you havent reserved any properties."
            />
        </ClientOnly>
    )

    return (
        <ClientOnly>
            <PropertiesClient
                currentUser={ currentUser }
                listings={ listings }
            />
        </ClientOnly>
    )

}
