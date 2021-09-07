import theme from 'styles/theme'
import { render, screen } from 'utils/test-utils'
import ProfileMenu from '.'

describe('<ProfileMenu  />', () => {
  it('should render the menu', () => {
    render(<ProfileMenu />)
    expect(
      screen.getByRole('link', { name: /my profile/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /my orders/i })).toBeInTheDocument()
    expect(screen.getByTestId(/sign-out/i)).toBeInTheDocument()
  })

  it('should render the menu with an active link defined', () => {
    render(<ProfileMenu activeLink="/profile/orders" />)

    expect(screen.getByRole('link', { name: /my orders/i })).toHaveStyle({
      background: theme.colors.primary,
      color: theme.colors.white
    })
  })
})
