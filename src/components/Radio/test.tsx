import { screen, waitFor } from '@testing-library/react'
import Radio from '.'
import theme from 'styles/theme'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helper'

describe('<Radio  />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Radio label="radio label" labelFor="radio" />)

    expect(screen.getByRole('radio')).toBeInTheDocument()
    expect(screen.getByLabelText(/radio label/i)).toBeInTheDocument()
    expect(screen.getByText(/radio label/i)).toHaveAttribute('for', 'radio')
  })

  it('should render without label', () => {
    renderWithTheme(<Radio />)

    //sempre que precisa de buscar algo que pode não ter na tela, usar queryByWhatever
    expect(screen.queryByLabelText('Radio')).not.toBeInTheDocument()
  })

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn()

    renderWithTheme(
      <Radio
        label="Radio"
        labelFor="Radio"
        onCheck={onCheck}
        value="anyValue"
      />
    )

    expect(onCheck).not.toHaveBeenCalled()

    userEvent.click(screen.getByRole('radio'))
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })
    expect(onCheck).toHaveBeenCalledWith(true)
  })

  it('should render with label (black)', () => {
    renderWithTheme(<Radio label="Radio" labelColor="black" />)

    const label = screen.getByText('Radio')
    expect(label).toBeInTheDocument()
    expect(label).toHaveStyle({ color: theme.colors.black })
  })

  it('should be accessible with tab', async () => {
    renderWithTheme(<Radio label="Radio" labelFor="Radio" />)

    expect(document.body).toHaveFocus()

    userEvent.tab()

    expect(screen.getByLabelText(/radio/i)).toHaveFocus()
  })
})
