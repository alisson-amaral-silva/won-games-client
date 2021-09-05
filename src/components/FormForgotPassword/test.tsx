import userEvent from '@testing-library/user-event'
import 'server.mock'
import { screen, render, waitFor } from 'utils/test-utils'
import FormForgotPassword from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
let query = {}

useRouter.mockImplementation(() => ({
  query
}))

describe('FormForgotPassword', () => {
  it('should render the form', () => {
    render(<FormForgotPassword />)

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /send email/i })
    ).toBeInTheDocument()
  })


  it('should show invalid email error message', async () => {
    render(<FormForgotPassword />)

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'valid')

    userEvent.click(screen.getByRole('button', { name: /send email/i }))

    expect(
      await screen.findByText(/must be a valid email/i)
    ).toBeInTheDocument()
  })


  it('should autofil email input if comes by logged user', async () => {
    query = { email: 'valid@gmail.com' }
    render(<FormForgotPassword />)

    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('valid@gmail.com')
  })
})
