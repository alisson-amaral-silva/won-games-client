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

})
