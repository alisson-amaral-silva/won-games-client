import { render, screen } from 'utils/test-utils'
import Ribbon from '.'

describe('<Ribbon  />', () => {
  it('should render the text correctly', () => {
    render(<Ribbon>Best Seller</Ribbon>)

    expect(screen.getByText('Best Seller')).toBeInTheDocument()
  })

  it('should render with the primary color', () => {
    render(<Ribbon>Best Seller</Ribbon>)

    expect(screen.getByText('Best Seller')).toHaveStyle({
      backgroundColor: '#f231a5'
    })
  })

  it('should render with the secondary color', () => {
    render(<Ribbon color="secondary">Best Seller</Ribbon>)

    expect(screen.getByText('Best Seller')).toHaveStyle({
      backgroundColor: '#3CD3C1'
    })
  })

  it('should render with the normal size as default', () => {
    render(<Ribbon>Best Seller</Ribbon>)

    expect(screen.getByText('Best Seller')).toHaveStyle({
      height: '3.6rem',
      fontSize: '1.4rem'
    })
  })

  it('should render with the small size as default', () => {
    render(<Ribbon size="small">Best Seller</Ribbon>)

    expect(screen.getByText('Best Seller')).toHaveStyle({
      height: '2.6rem',
      fontSize: '1.2rem'
    })
  })
})
