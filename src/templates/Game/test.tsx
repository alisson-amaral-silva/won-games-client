import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Game from '.'

describe('<Game  />', () => {
  it('should render the heading', () => {
    renderWithTheme(
      <Game cover="https://www.wasd.pt/wp-content/uploads/2019/01/KH3HD.png" />
    )
    expect(screen.getByRole('heading', { name: /Game/i })).toBeInTheDocument()
  })
})
