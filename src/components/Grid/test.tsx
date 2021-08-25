import theme from 'styles/theme'
import { render } from 'utils/test-utils'
import { Grid } from '.'

describe('<Grid  />', () => {
  it('should render the heading', () => {
    const { container } = render(<Grid>Whatever</Grid>)

    expect(container.firstChild).toHaveStyleRule(
      'grid-gap',
      theme.spacings.medium
    )
  })
})
