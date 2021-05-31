import { renderWithTheme } from 'utils/tests/helper'
import Auth from '.'

describe('<Auth  />', () => {
  it('should render all components children', () => {
    renderWithTheme(
      <Auth title="Auth title">
        <input type="text" />{' '}
      </Auth>
    )
    // expect(
    //   screen.getByRole('heading', { name: /Auth /i })
    // ).toBeInTheDocument()
  })
})
