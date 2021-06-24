import 'match-media-mock'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Gallery from '.'
import items from './mock'

describe('<Gallery  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Gallery items={items.slice(0, 2)} />)

    expect(
      screen.getByRole('button', { name: /Gallery Image 1/i })
    ).toHaveAttribute('src', items[0].src)

    expect(
      screen.getByRole('button', { name: /Gallery Image 2/i })
    ).toHaveAttribute('src', items[1].src)
  })

  it('should render open Modal', () => {
    renderWithTheme(<Gallery items={items.slice(0, 2)} />)

    const modal = screen.getByLabelText('modal')
    //getAttribute sempre retorna o atributo selecionado como string
    expect(modal.getAttribute('aria-hidden')).toBe('true')

    //verificar se a modal está escondida
    expect(modal).toHaveStyle({ opacity: 0 })

    // clicar no botão de abrir a modal e verificar se ela abriu
    fireEvent.click(screen.getByRole('button', { name: /Gallery Image 1/i }))
    expect(modal.getAttribute('aria-hidden')).toBe('false')
    expect(modal).toHaveStyle({ opacity: 1 })
  })

  it('should render close Modal when overlay or button clicked', () => {
    renderWithTheme(<Gallery items={items.slice(0, 2)} />)

    const modal = screen.getByLabelText('modal')

    // clicar no botão de abrir a modal e verificar se ela abriu
    fireEvent.click(screen.getByRole('button', { name: /Gallery Image 1/i }))

    // clicar no botão de fechar a modal e verificar se ela fechou
    fireEvent.click(screen.getByRole('button', { name: /close-modal/i }))
    expect(modal.getAttribute('aria-hidden')).toBe('true')
    expect(modal).toHaveStyle({ opacity: 0 })
  })
})
