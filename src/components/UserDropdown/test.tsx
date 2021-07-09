import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helper'
import UserDropdown from '.'

describe('<UserDropdown  />', () => {
  it('should render the username', () => {
    renderWithTheme(<UserDropdown username="Killmonger" />)
    expect(screen.getByText(/killmonger/i)).toBeInTheDocument()
  })
  it('should render the menu', () => {
    renderWithTheme(<UserDropdown username="Killmonger" />)

    userEvent.click(screen.getByText(/killmonger/i))
    expect(screen.getByText(/my profile/i)).toBeInTheDocument()
    expect(screen.getByText(/wishlist/i)).toBeInTheDocument()
    expect(screen.getByText(/sign out/i)).toBeInTheDocument()
  })
})
