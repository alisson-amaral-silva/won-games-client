import { render, screen } from 'utils/test-utils'
import GameDetails, { GameDetailsProps } from '.'

const props: GameDetailsProps = {
  developer: 'developer',
  publisher: 'Walkabout',
  platforms: ['mac', 'linux', 'windows'],
  releaseDate: new Date().toString(),
  rating: 'BR0',
  genres: ['Role-playing', 'Adventure']
}

describe('<GameDetails  />', () => {
  it('should render the heading', () => {
    render(<GameDetails {...props} />)

    expect(
      screen.getByRole('heading', { name: /developer/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /release date/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /platforms/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /publisher/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /rating/i })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /genres/i })).toBeInTheDocument()

    expect(
      screen.getByText(
        new Intl.DateTimeFormat('en-us', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }).format(new Date())
      )
    ).toBeInTheDocument()
  })

  it('should render platform icons', () => {
    render(<GameDetails {...props} />)

    expect(screen.getByRole('img', { name: /linux/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /mac/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /windows/i })).toBeInTheDocument()
  })

  it('should render the formated date', () => {
    render(<GameDetails {...props} />)

    expect(
      screen.getByText(
        new Intl.DateTimeFormat('en-us', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }).format(new Date())
      )
    ).toBeInTheDocument()
  })

  it('should render the free rating when BR0', () => {
    render(<GameDetails {...props} />)

    expect(screen.getByText(/free/i)).toBeInTheDocument()
  })

  it('should render the publisher', () => {
    render(<GameDetails {...props} />)

    expect(screen.getByText(/walkabout/i)).toBeInTheDocument()
  })

  it('should render the +18 rating when BR18', () => {
    render(<GameDetails {...props} rating="BR18" />)

    expect(screen.getByText(/18\+/i)).toBeInTheDocument()
  })

  it('should render genres', () => {
    render(<GameDetails {...props} />)

    expect(screen.getByText(/role-playing \/ adventure/i)).toBeInTheDocument()
  })
})
