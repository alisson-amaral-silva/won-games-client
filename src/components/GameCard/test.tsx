import { render, screen } from '@testing-library/react'
import GameCard from '.'
import { renderWithTheme } from 'utils/tests/helper'

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
})
