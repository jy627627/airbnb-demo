'use client'

import { SafeReservations, SafeUser } from "@/app/types";
import React, { useCallback, useState } from "react";
import { Container } from "@/app/components/Container";
import { Heading } from "@/app/components/Heading";
import { ListingCard } from "@/app/components/listings/ListingCard";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface TripsClientProps {
    currentUser?: SafeUser | null
    reservations: SafeReservations[]
}
export const TripsClient:React.FC<TripsClientProps> = ({
    currentUser,
    reservations
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id)
            axios.delete(`/api/reservations/${id}`).then(() => {
                toast.success('Reservations cancel successfully')
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
                title="Trips"
                subtitle="Where you've been and where you're going"
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
                {reservations.map((reservation: any) => (
                    <ListingCard
                        key={ reservation.id }
                        data={ reservation.listing }
                        reservation={ reservation }
                        actionId={ reservation.id }
                        onAction={ onCancel }
                        disabled={ deletingId === reservation.id }
                        actionLabel="Cancel reservation"
                        currentUser={ currentUser }
                    />
                ))}
            </div>
        </Container>
    )
}
