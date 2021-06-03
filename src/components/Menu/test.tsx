import { renderWithTheme } from 'utils/tests/helper'
import Menu from '.'
import { fireEvent, screen } from '@testing-library/react'

describe('<Menu  />', () => {
  it('should render the menu', () => {
    renderWithTheme(<Menu />)

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/open search/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/open shopping cart/i)).toBeInTheDocument()
  })

  it('should handle the open/close mobile menu', () => {
    renderWithTheme(<Menu />)

    //selecionar o MenuFull(menu full screen)
    const fullMenuElement = screen.getByRole('navigation', { hidden: true })
    //getAttribute sempre retorna o atributo selecionado como string
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')

    //verificar se o menu está escondido
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })

    // clicar no botão de abrir o menu e verificar se ele abriu
    fireEvent.click(screen.getByLabelText(/open menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false')
    expect(fullMenuElement).toHaveStyle({ opacity: 1 })

    // clicar no botão de fechar o menu e verificar se ele fechou
    fireEvent.click(screen.getByLabelText(/close menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })
  })

  it('should show register box when logged out', () => {
    renderWithTheme(<Menu />)
    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
  })

  it('should not show register box when logged out', () => {
    renderWithTheme(<Menu username="Alisson" />)

    //para procuar algo que possa nãp estar na tela = query otherwise getByFodac
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument()

    expect(screen.getByText(/My account/i)).toBeInTheDocument()
    expect(screen.getByText(/Wishlist/i)).toBeInTheDocument()
  })
})
