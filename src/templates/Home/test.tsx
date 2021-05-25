import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Home from '.'

describe('<Home  />', () => {
  it('it should render menu and footer', () => {
    renderWithTheme(<Home />)

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })

  it('it should render the sections', () => {
    renderWithTheme(<Home />)

    expect(screen.getByRole('heading', { name: 'News' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Most Popular' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Upcoming' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Free Games' })).toBeInTheDocument()
  })
})
