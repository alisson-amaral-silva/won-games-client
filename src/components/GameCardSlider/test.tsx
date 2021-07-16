import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import GameCardSlider from '.'
import items from './mock'

describe('<GameCardSlider  />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(<GameCardSlider items={items} />)
    expect(container.querySelectorAll('.slick-active')).toHaveLength(4)
  })

  it('should render white arrows if color passed', () => {
    renderWithTheme(<GameCardSlider items={items} color="white" />)

    expect(screen.getByLabelText(/previous games/i)).toHaveStyle({
      color: '#FAFAFA'
    })
    expect(screen.getByLabelText(/next games/i)).toHaveStyle({
      color: '#FAFAFA'
    })
  })
})
