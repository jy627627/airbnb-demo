'use client'

import {SafeListing, SafeReservations, SafeUser} from "@/app/types";
import React, { useCallback, useState } from "react";
import { Container } from "@/app/components/Container";
import { Heading } from "@/app/components/Heading";
import { ListingCard } from "@/app/components/listings/ListingCard";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface TripsClientProps {
    currentUser?: SafeUser | null
    listings: SafeListing[]
}
export const PropertiesClient:React.FC<TripsClientProps> = ({
    currentUser,
    listings
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id)
            axios.delete(`/api/listings/${id}`).then(() => {
                toast.success('Listing deleted!')
                router.refresh()
            }).catch((err) => {
                toast.error( err?.response?.data?.error )
            }).finally(()=> {
                setDeletingId('')
            })
        },
        [router]
    )

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {listings.map((listing: any) => (
                    <ListingCard
                        key={ listing.id }
                        data={ listing.listing }
                        actionId={ listing.id }
                        onAction={ listing }
                        disabled={ deletingId === listing.id }
                        actionLabel="Delete property"
                        currentUser={ currentUser }
                    />
                ))}
            </div>
        </Container>
    )
}
