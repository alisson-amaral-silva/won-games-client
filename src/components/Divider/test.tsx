import 'match-media-mock'
import { renderWithTheme } from 'utils/tests/helper'
import { Divider } from '.'

describe('<Divider  />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(<Divider />)
    expect(container.firstChild).toHaveStyleRule(
      'background',
      'rgba(181,181,181,0.3)'
    )
  })
})
