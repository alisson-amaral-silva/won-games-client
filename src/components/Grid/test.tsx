import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helper'
import { Grid } from '.'

describe('<Grid  />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(<Grid>Whatever</Grid>)

    expect(container.firstChild).toHaveStyleRule(
      'grid-gap',
      theme.spacings.medium
    )
  })
})
