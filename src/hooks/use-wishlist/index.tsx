import { GameCardProps } from 'components/GameCard'
import { createContext, useContext, useEffect, useState } from 'react'
import Wishlist from 'templates/Wishlist'

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
  const isInWishlist = (id: string) => false
  const addToWishlist = (id: string) => {}
  const removeFromWishlist = (id: string) => {}

  return (
    <WishlistContext.Provider
      value={{ addToWishlist, isInWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => useContext(WishlistContext)

export { WishlistProvider, useWishlist }
