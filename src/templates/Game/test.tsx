import { render, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Game from '.'

describe('<Game  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Game />)
    expect(screen.getByRole('heading', { name: /Game/i })).toBeInTheDocument()
  })
})
