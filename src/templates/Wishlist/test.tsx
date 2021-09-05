import 'session.mock'
import { render, screen } from 'utils/test-utils'
import Wishlist, { WishlistTemplateProps } from '.'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

const props: WishlistTemplateProps = {
  games: gamesMock,
  recommendedHighlight: highlightMock,
  recommendedGames: gamesMock
}

jest.mock('components/Menu', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Menu" />
  }
}))

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />
  }
}))

describe('<Wishlist  />', () => {
  it('should render the Whishlist Component', () => {
    render(<Wishlist {...props} />)
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Menu')).toBeInTheDocument()
    expect(screen.getAllByText(/population zero/i)).toHaveLength(6)
  })

  it('should render empty when there are no games', () => {
    render(
      <Wishlist
        recommendedGames={gamesMock}
        recommendedHighlight={highlightMock}
      />
    )
    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /your wishlist is empty/i })
    ).toBeInTheDocument()
  })
})
