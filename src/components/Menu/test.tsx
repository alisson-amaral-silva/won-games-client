import { render, screen } from 'utils/test-utils'
import Menu from '.'
import { fireEvent } from '@testing-library/react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const query = {}

useRouter.mockImplementation(() => ({
  query
}))

describe('<Menu  />', () => {
  it('should render the menu', () => {
    render(<Menu />)

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/open search/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/open shopping cart/i)).toBeInTheDocument()
  })

  it('should handle the open/close mobile menu', () => {
    render(<Menu />)

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
    render(<Menu />)
    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
    expect(screen.getByText(/sign Up/i)).toBeInTheDocument()
  })

  it('should not show register box when logged out', () => {
    render(<Menu username="Alisson" />)

    //para procuar algo que possa nãp estar na tela = query otherwise getByFodac
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/sign Up/i)).not.toBeInTheDocument()

    expect(screen.getAllByText(/my profile/i)).toHaveLength(2)
    expect(screen.getAllByText(/wishlist/i)).toHaveLength(2)
  })
})
