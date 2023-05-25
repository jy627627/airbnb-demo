import { EmptyState } from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import { ClientOnly } from "@/app/components/ClientOnly";
import { TripsClient } from "@/app/trips/TripsClient";


export default async function TripsPage() {
    const currentUser = await getCurrentUser()

    if ( !currentUser ) return (
        <ClientOnly>
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        </ClientOnly>
    )

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) return (
        <ClientOnly>
            <EmptyState
                title="No trips found"
                subtitle="Looks like you havent reserved any trips."
            />
        </ClientOnly>
    )

    return (
        <ClientOnly>
            <TripsClient
                currentUser={ currentUser }
                reservations={ reservations }
            />
        </ClientOnly>
    )

}
