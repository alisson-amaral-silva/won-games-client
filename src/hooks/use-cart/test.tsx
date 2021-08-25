import { useCart, CartProvider, CartProviderProps } from '.'
import { renderHook } from '@testing-library/react-hooks'
import { setStorageItem } from 'utils/localStorage'

describe('useCart', () => {
  it('should return items and their info if there are any in the cart', () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <CartProvider>{children}</CartProvider>
    )

    setStorageItem('cartItems', ['1', '2'])

    //renderiza o hook => dentro do wrapper ele ta renderizando o useCart
    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toStrictEqual(['1', '2'])
  })
})
