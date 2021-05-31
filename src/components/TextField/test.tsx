import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmailOutline } from '@styled-icons/evaicons-outline/EmailOutline'

import { renderWithTheme } from 'utils/tests/helper'

import TextField from '.'

describe('<TextField />', () => {
  it('Renders with Label and icon', () => {
    renderWithTheme(
      <TextField
        icon={<EmailOutline data-testid="icon" />}
        label="Label"
        labelFor="Field"
        id="Field"
      />
    )

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('Renders without Label', () => {
    renderWithTheme(<TextField icon={<EmailOutline data-testid="icon" />} />)

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('Renders with placeholder', () => {
    renderWithTheme(
      <TextField
        icon={<EmailOutline data-testid="icon" />}
        placeholder="hey you"
      />
    )

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('Changes its value when typing', async () => {
    const onInput = jest.fn()
    renderWithTheme(
      <TextField
        icon={<EmailOutline data-testid="icon" />}
        onInput={onInput}
        label="TextField"
        labelFor="TextField"
        id="TextField"
      />
    )

    const input = screen.getByRole('textbox')
    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInput).toHaveBeenCalledTimes(text.length)
    })
    expect(onInput).toHaveBeenCalledWith(text)
  })

  it('Is accessible by tab', () => {
    renderWithTheme(
      <TextField
        icon={<EmailOutline data-testid="icon" />}
        label="TextField"
        labelFor="TextField"
        id="TextField"
      />
    )

    const input = screen.getByLabelText('TextField')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).toHaveFocus()
  })

  it('should render an icon on the right side', () => {
    renderWithTheme(
      <TextField
        icon={<EmailOutline data-testid="icon" />}
        label="TextField"
        labelFor="TextField"
        id="TextField"
        iconPosition="right"
      />
    )

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({ order: 1 })
  })

  it('should disable the textfield when disabled', async () => {
    const onInput = jest.fn()
    renderWithTheme(
      <TextField
        icon={<EmailOutline data-testid="icon" />}
        label="TextField"
        labelFor="TextField"
        onInput={onInput}
        id="TextField"
        iconPosition="right"
        disabledInput={true}
      />
    )

    const input = screen.getByLabelText('TextField')
    expect(input).toBeDisabled()

    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })
    expect(onInput).not.toHaveBeenCalled()
  })

  it('Is not accessible by tab when disabled', () => {
    renderWithTheme(
      <TextField
        icon={<EmailOutline data-testid="icon" />}
        label="TextField"
        labelFor="TextField"
        id="TextField"
        disabledInput={true}
      />
    )

    const input = screen.getByLabelText('TextField')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).not.toHaveFocus()
  })
})
