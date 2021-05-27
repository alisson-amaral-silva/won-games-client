import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Checkbox  from '.'

describe('<Checkbox  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Checkbox label="checkbox label" labelFor="check" />)

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument()
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for','check')
  })

  it('should render without label', () => {
    renderWithTheme(<Checkbox />)

    //sempre que precisa de buscar algo que pode não ter na tela, usar queryByWhatever
    expect(screen.queryByLabelText('Checkbox')).not.toBeInTheDocument()
  })

  it('should render without black label', () => {
    renderWithTheme(<Checkbox label="checkbox label" labelFor="check" labelColor="black" />)

    expect(screen.getByText(/checkbox label/i)).toHaveStyle({color:'#030517'})
  })
})
