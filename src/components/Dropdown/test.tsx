import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Dropdown from '.'

describe('<Dropdown  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Dropdown title="something">Something</Dropdown>)
    expect(
      screen.getByRole('heading', { name: /something/i })
    ).toBeInTheDocument()
  })
})
