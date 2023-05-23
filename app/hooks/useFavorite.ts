import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import {useMemo} from "react";


interface IUserFavorite {
    listingId: string;
    currentUser: SafeUser | null
}

export const useFavorite = ({
    listingId,
    currentUser
}:IUserFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavorited = useMemo(
        ()=>{
            const list = currentUser?.favoriteIds || []

            return list.includes(listingId)
        },
        [currentUser,listingId]
    )
}
