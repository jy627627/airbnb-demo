import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getFavoriteListings() {
   try {
       const currentUser = await getCurrentUser()

       if ( !currentUser ) return []

       const favorites = await prisma?.listing.findMany({
           where: {
               id: {
                   in: [...currentUser.favoriteIds || []]
               }
           }
       })

        const SafeFavorites = favorites.map((favorite) => ({
           ...favorite,
           createdAt: favorite.createdAt.toISOString()
       }))

       return SafeFavorites

   } catch ( err:any ) {
       throw new Error( err )
   }
}

