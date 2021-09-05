import { useMutation } from '@apollo/client'
import { GameCardProps } from 'components/GameCard'
import { GetWishlist_wishlists_games } from 'graphql/generated/GetWishlist'
import {
  MUTATION_CREATE_WISHLIST,
  MUTATION_UPDATE_WISHLIST
} from 'graphql/mutations/wishlist'
import { useGetWishlist } from 'graphql/queries/wishlist'
import { useSession } from 'next-auth/client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
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
  const [wishlistId, setWishlistId] = useState<string | null>()
  const [wishlistItems, setWishlistItems] = useState<
    GetWishlist_wishlists_games[]
  >([])

  const [createList, { loading: loadingCreate }] = useMutation(
    MUTATION_CREATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.createWishlist?.wishlist?.games || [])
        setWishlistId(data?.createWishlist?.wishlist?.id)
      }
    }
  )

  const [updateList, { loading: loadingUpdate }] = useMutation(
    MUTATION_UPDATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.updateWishlist?.wishlist?.games || [])
        setWishlistId(data?.updateWishlist?.wishlist?.id)
      }
    }
  )

  const { data, loading: loadingGet } = useGetWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  useEffect(() => {
    setWishlistItems(data?.wishlists[0]?.games || [])
    setWishlistId(data?.wishlists[0]?.id || null)
  }, [data])

  const isInWishlist = (id: string) => {
    return !!wishlistItems.find((game) => game.id === id)
  }

  const wishlistGameIds = useMemo(
    () => wishlistItems.map((game) => game.id),
    [wishlistItems]
  )

  const addToWishlist = (id: string) => {
    //se não existir na wishlist - cria
    if (!wishlistId) {
      return createList({
        variables: {
          input: {
            data: {
              games: [...wishlistGameIds, id]
            }
          }
        }
      })
    } else {
      // senão atualiza a wishlist existente
      return updateList({
        variables: {
          input: {
            where: {
              id: wishlistId
            },
            data: {
              games: [...wishlistGameIds, id]
            }
          }
        }
      })
    }
  }

  const removeFromWishlist = (id: string) => {
    updateList({
      variables: {
        input: {
          where: { id: wishlistId },
          data: {
            games: wishlistGameIds.filter((gameId: string) => gameId !== id)
          }
        }
      }
    })
  }
  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        addToWishlist,
        isInWishlist,
        removeFromWishlist,
        loading: loadingGet || loadingCreate || loadingUpdate
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
