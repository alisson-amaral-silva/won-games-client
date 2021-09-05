import { GameCardProps } from 'components/GameCard'
import { GetWishlist_wishlists_games } from 'graphql/generated/GetWishlist'
import { useGetWishlist } from 'graphql/queries/wishlist'
import { useSession } from 'next-auth/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { gamesMapper } from 'utils/mappers'

export type WishlistContextData = {
  items: GameCardProps[]
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  loading: boolean
}

export const WishlistContextDefaultValues = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null,
  loading: false
}

export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues
)

export type WishlistProviderProps = {
  children: React.ReactNode
}

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [session] = useSession()
  const [wishlistItems, seWishlistItems] = useState<
    GetWishlist_wishlists_games[]
  >([])
  const isInWishlist = (id: string) => false
  const addToWishlist = (id: string) => {}
  const removeFromWishlist = (id: string) => {}
  const { data, loading } = useGetWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  useEffect(() => {
    seWishlistItems(data?.wishlists[0]?.games || [])
  }, [data])

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        addToWishlist,
        isInWishlist,
        removeFromWishlist,
        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
