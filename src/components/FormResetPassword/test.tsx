import userEvent from '@testing-library/user-event'
import 'server.mock'
import { render, screen } from 'utils/test-utils'
import FormResetPassword from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const query = {}

useRouter.mockImplementation(() => ({
  query
}))

jest.mock('next-auth/client', () => ({
  signIn: jest.fn()
}))

describe('<FormResetPassword>', () => {
  it('should render the form', () => {
    render(<FormResetPassword />)

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /reset password/i })
    ).toBeInTheDocument()
  })

  it('should show validation errors', async () => {
    render(<FormResetPassword />)

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(screen.getByPlaceholderText(/confirm/i), '321')

    userEvent.click(screen.getByRole('button', { name: /reset password/i }))

    expect(await screen.findByText(/confirm password does not match/i))
  })
})
