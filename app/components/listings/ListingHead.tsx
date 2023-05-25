'use client'

import { SafeUser } from "@/app/types";
import React from "react";
import { useCountries } from "@/app/hooks/useCountries";
import { Heading } from "@/app/components/Heading";
import Image from "next/image";
import { HeartButton } from "@/app/components/HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser: SafeUser | null
}

export const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {

    const { getByValue } = useCountries()

    const location = getByValue(locationValue)

    return (
        <>
            <Heading
                title={ title }
                subtitle={`${ location?.region }, ${ location?.label }`}
            />

            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image
                    fill
                    src={ imageSrc }
                    alt={ title }
                    className="
                        object-cover w-full
                    "
                />
                <div
                    className="
                        absolute
                        top-5
                        right-5
                    "
                >
                    <HeartButton
                        listingId={ id }
                        currentUser={ currentUser }
                    />
                </div>
            </div>
        </>
    )
}
