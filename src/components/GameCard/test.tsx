import { screen } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helper'
import GameCard from '.'

const props = {
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img:
    'https://avatars.githubusercontent.com/u/60556153?s=400&u=2b0f7c18e8adff995f5cc65423d3608804d36a6b&v=4',
  price: 'R$ 235,00'
}

describe('<GameCard  />', () => {
  it('should render correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /population zero/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /rockstar games/i })).toBeInTheDocument()
    expect(screen.getByTestId('price')).toBeInTheDocument()
  })

  it('should render price in label', () => {
    renderWithTheme(<GameCard {...props} />)

    const price = screen.getByText('R$ 235,00')

    expect(price).not.toHaveStyle({ textDecoration: 'line-through' })
    expect(price).toHaveStyle({ backgroundColor: theme.colors.secondary })
  })

  it('should render a line-through in price when promotional', () => {
    renderWithTheme(<GameCard {...props} promotionalPrice="R$ 15,00" />)

    expect(screen.getByText('R$ 235,00')).toHaveStyle({
      textDecoration: 'line-through'
    })

    expect(screen.getByText('R$ 15,00')).not.toHaveStyle({
      textDecoration: 'line-through'
    })
  })
})
