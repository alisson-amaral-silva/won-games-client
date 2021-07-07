import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helper'
import Dropdown from '.'

describe('<Dropdown  />', () => {
  it('should render the closed dropdown', () => {
    renderWithTheme(<Dropdown title="something">Shazam</Dropdown>)
    expect(screen.getByText(/something/i)).toBeInTheDocument()
    expect(screen.queryByText(/shazam/i)).toHaveAttribute('aria-hidden', 'true')
  })

  it('should open dropdown', () => {
    renderWithTheme(<Dropdown title="something">Shazam</Dropdown>)
    userEvent.click(screen.getByText(/something/i))
    expect(screen.queryByText(/shazam/i)).toHaveAttribute(
      'aria-hidden',
      'false'
    )
  })
})
