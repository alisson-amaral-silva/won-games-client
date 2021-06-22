import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import GameDetails, { GameDetailsProps } from '.'

const props: GameDetailsProps = {
  developer: 'developer',
  platforms: ['mac', 'linux', 'windows'],
  releaseDate: new Date().toString()
}

describe('<GameDetails  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<GameDetails {...props} />)

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
  })

  it('should render platform icons', () => {
    renderWithTheme(<GameDetails {...props} />)

    expect(screen.getByRole('img', { name: /linux/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /mac/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /windows/i })).toBeInTheDocument()
  })

  it('should render the formated date', () => {
    renderWithTheme(<GameDetails {...props} />)

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
})
