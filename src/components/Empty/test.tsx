import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Empty from '.'

const props = {
  title: 'Whatever',
  description: 'Whatever type 2'
}

describe('<Empty  />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Empty {...props} hasLink />)
    expect(
      screen.getByRole('image', {
        name: /a gamer in a couch playing videogame/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /Whatever/i
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/Whatever type 2/i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /go back to store/i
      })
    ).toHaveAttribute('href', '/')
  })

  it('should not render the link', () => {
    renderWithTheme(<Empty {...props} />)
    expect(
      screen.queryByRole('link', {
        name: /go back to store/i
      })
    ).not.toBeInTheDocument()
  })
})
