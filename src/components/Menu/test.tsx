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
    expect(fullMenuElement).toHaveStyle({opacity: 0})

    // clicar no botão de abrir o menu e verificar se ele abriu
    fireEvent.click(screen.getByLabelText(/open menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false')
    expect(fullMenuElement).toHaveStyle({opacity: 1})

    // clicar no botão de fechar o menu e verificar se ele fechou
    fireEvent.click(screen.getByLabelText(/cluse menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({opacity: 0})
  })
})
