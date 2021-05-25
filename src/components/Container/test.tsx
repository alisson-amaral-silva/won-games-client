import { renderWithTheme } from 'utils/tests/helper'
import theme from 'styles/theme'
import { Container } from '.'

describe('<Container  />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(<Container />)

    expect(container.firstChild).toHaveStyleRule(
      'max-width',
      theme.grid.container
    )
  })
})
