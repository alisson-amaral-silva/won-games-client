import 'match-media-mock'
import { render } from 'utils/test-utils'
import { Divider } from '.'

describe('<Divider  />', () => {
  it('should render the heading', () => {
    const { container } = render(<Divider />)
    expect(container.firstChild).toHaveStyleRule(
      'background',
      'rgba(181,181,181,0.3)'
    )
  })
})
