'use client'

import {SafeListing, SafeReservations, SafeUser} from "@/app/types";
import React, {useCallback, useState } from "react";
import { Container } from "@/app/components/Container";
import { Heading } from "@/app/components/Heading";
import { ListingCard } from "@/app/components/listings/ListingCard";

interface FavoriteClientProps {
    currentUser?: SafeUser | null
    listings: SafeListing[]
}

export const FavoriteClient:React.FC<FavoriteClientProps> = ({
    currentUser,
    listings
}) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you favorited!"
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
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    )
}
