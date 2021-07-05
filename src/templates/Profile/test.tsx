import { screen } from '@testing-library/react'
import Profile from '.'
import { renderWithTheme } from 'utils/tests/helper'

describe('<Profile  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Profile />)
    expect(
      screen.getByRole('heading', { name: /my profile/i })
    ).toBeInTheDocument()
  })
})
