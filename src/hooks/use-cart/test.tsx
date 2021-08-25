import { useCart, CartProvider, CartProviderProps } from '.'
import { renderHook } from '@testing-library/react-hooks'
import { setStorageItem } from 'utils/localStorage'
import { cartItems, gamesMock } from './mock'
import React from 'react'
import { MockedProvider } from '@apollo/client/testing'

describe('useCart', () => {
  it('should return items and their info if there are any in the cart', async () => {
    const wrapper = ({ children }: CartProviderProps) => (
      <MockedProvider mocks={[gamesMock]}>
        <CartProvider>{children}</CartProvider>
      </MockedProvider>
    )

    setStorageItem('cartItems', ['1', '2'])

    //renderiza o hook => dentro do wrapper ele ta renderizando o useCart
    const { result, waitForNextUpdate } = renderHook(() => useCart(), {
      wrapper
    })

    await waitForNextUpdate()

    expect(result.current.items).toStrictEqual(cartItems)
  })
})
