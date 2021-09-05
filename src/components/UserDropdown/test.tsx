import 'session.mock'
import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/test-utils'
import UserDropdown from '.'

describe('<UserDropdown  />', () => {
  it('should render the username', () => {
    render(<UserDropdown username="Killmonger" />)
    expect(screen.getByText(/killmonger/i)).toBeInTheDocument()
  })
  it('should render the menu', () => {
    render(<UserDropdown username="Killmonger" />)

    userEvent.click(screen.getByText(/killmonger/i))
    expect(screen.getByText(/my profile/i)).toBeInTheDocument()
    expect(screen.getByText(/wishlist/i)).toBeInTheDocument()
    expect(screen.getByText(/sign out/i)).toBeInTheDocument()
  })
})
