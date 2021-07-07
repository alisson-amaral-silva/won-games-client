import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import CartIcon from '.'

describe('<CartIcon  />', () => {
  it('should render without badge', () => {
    renderWithTheme(<CartIcon />)

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument()
  })

  it('should render with badge', () => {
    renderWithTheme(<CartIcon quantity={12} />)

    expect(screen.getByLabelText(/cart items/i)).toBeInTheDocument()
    expect(screen.getByText(/12/)).toBeInTheDocument()
  })
})
