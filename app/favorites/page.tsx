import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import { EmptyState } from "@/app/components/EmptyState";
import { ClientOnly } from "@/app/components/ClientOnly";
import { FavoriteClient } from "@/app/favorites/FavoriteClient";


export default async function ListingPage() {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorite found"
                    subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoriteClient
                listings={ listings }
                currentUser={ currentUser }
            />
        </ClientOnly>
    )

}
