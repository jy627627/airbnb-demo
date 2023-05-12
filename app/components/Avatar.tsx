'use client'
import Image from 'next/image'
import React from "react";

interface AvatarProps {
    src: string | null | undefined //imageAvatarSrc
}

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
    console.log('src',src)
    return (
        <Image
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={ src || "/images/placeholder.jpg" }
        />
    )
}
