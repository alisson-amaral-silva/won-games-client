import { screen } from '@testing-library/react'
import GameDetails from '.'
import { renderWithTheme } from 'utils/tests/helper'

describe('<GameDetails  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<GameDetails />)
    expect(
      screen.getByRole('heading', { name: 'Developer' })
    ).toBeInTheDocument()
  })
})
