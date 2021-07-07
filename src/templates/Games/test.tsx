import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import gamesMock from 'components/GameCardSlider/mock'
import inputsMock from 'components/ExploreSidebar/mock'
import Games from '.'

describe('<Games  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Games games={gamesMock} filterItems={inputsMock} />)
    expect(
      screen.getByRole('heading', { name: /explore games/i })
    ).toBeInTheDocument()
  })
})
