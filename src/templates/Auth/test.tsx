import { renderWithTheme } from 'utils/tests/helper'
import Auth from '.'
import { screen } from '@testing-library/react'

describe('<Auth  />', () => {
  it('should render all components children', () => {
    renderWithTheme(
      <Auth title="Auth title">
        <input type="text" />{' '}
      </Auth>
    )
    // verifiquem se tem 2 logos
    expect(screen.getAllByRole('img', { name: /won games/i })).toHaveLength(2)

    // verifica se tem o heading principal do banner
    expect(
      screen.getByRole('heading', {
        name: /All your favorite games in one place/i
      })
    ).toBeInTheDocument()

    // verifica se tem o subtitle
    expect(
      screen.getByRole('heading', {
        name: /WON is the best and most complete game platform/i
      })
    ).toBeInTheDocument()

    // verifica se tem o title do content
    expect(
      screen.getByRole('heading', { name: /auth title/i })
    ).toBeInTheDocument()

    // verifica se o children tá sendo renderizado
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
