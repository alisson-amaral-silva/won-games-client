import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Gallery from '.'
import items from './mock'

describe('<Gallery  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Gallery items={items} />)
    expect(
      screen.getByRole('heading', { name: /gallery/i })
    ).toBeInTheDocument()
  })
})
