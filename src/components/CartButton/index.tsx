import Button from 'components/Button'
import {
  AddShoppingCart,
  RemoveShoppingCart
} from '@styled-icons/material-outlined'
import { useCart } from 'hooks/use-cart'

type CartButtonProps = {
  id: string
}

const CartButton = ({ id }: CartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart()
  return (
    <Button
      icon={
        isInCart(id) ? (
          <RemoveShoppingCart aria-label="Remove from cart" />
        ) : (
          <AddShoppingCart aria-label="Add to Cart" />
        )
      }
      onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
      size="small"
    />
  )
}

export default CartButton