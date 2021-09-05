import { Favorite, FavoriteBorder } from '@styled-icons/material-outlined'
import Button, { ButtonProps } from 'components/Button'
import { useWishlist } from 'hooks/use-wishlist'
import { useSession } from 'next-auth/client'
import React from 'react'

type WishlistButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const WishlistButton = ({
  id,
  hasText,
  size = 'small'
}: WishlistButtonProps) => {
  const [session] = useSession()
  const { isInWishlist } = useWishlist()
  const ButtonText = isInWishlist(id)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist'

  const handleClick = () => {
    isInWishlist(id) ? removeFromWishlist(id) : addToWishlist(id)
  }

  if (!session) return null

  return (
    <Button
      onClick={handleClick}
      icon={
        isInWishlist(id) ? (
          <Favorite aria-label={ButtonText} />
        ) : (
          <FavoriteBorder aria-label={ButtonText} />
        )
      }
      size={size}
    >
      {hasText && ButtonText}
    </Button>
  )
}

export default WishlistButton
function removeFromWishlist(id: string) {
  throw new Error('Function not implemented.')
}

function addToWishlist(id: string) {
  throw new Error('Function not implemented.')
}
