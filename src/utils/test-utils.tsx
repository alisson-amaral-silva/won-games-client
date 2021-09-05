import { render, RenderOptions } from '@testing-library/react'

import {
  CartContext,
  CartContextData,
  CartContextDefaultValues
} from 'hooks/use-cart'

import {
  WishlistContext,
  WishlistContextData,
  WishlistContextDefaultValues
} from 'hooks/use-wishlist'

import { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

type CustomRenderPropos = {
  cartProviderProps?: CartContextData
  wishlistProviderProps?: WishlistContextData
} & Omit<RenderOptions, 'queries'>

const customRender = (
  ui: ReactElement,
  {
    cartProviderProps = CartContextDefaultValues,
    wishlistProviderProps = WishlistContextDefaultValues,
    ...renderOptions
  }: CustomRenderPropos = {}
) =>
  render(
    <ThemeProvider theme={theme}>
      <WishlistContext.Provider value={wishlistProviderProps}>
        <CartContext.Provider value={cartProviderProps}>
          {ui}
        </CartContext.Provider>
      </WishlistContext.Provider>
    </ThemeProvider>,
    renderOptions
  )

export * from '@testing-library/react'
export { customRender as render }
