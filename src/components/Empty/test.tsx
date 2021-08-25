import { render, screen } from 'utils/test-utils'
import Empty from '.'

const props = {
  title: 'Whatever',
  description: 'Whatever type 2'
}

describe('<Empty  />', () => {
  it('should render correctly', () => {
    render(<Empty {...props} hasLink />)
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
    render(<Empty {...props} />)
    expect(
      screen.queryByRole('link', {
        name: /go back to store/i
      })
    ).not.toBeInTheDocument()
  })
})
