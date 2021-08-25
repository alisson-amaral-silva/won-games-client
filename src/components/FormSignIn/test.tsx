import { render, screen } from 'utils/test-utils'
import FormSignIn from '.'

describe('<FormSignIn  />', () => {
  it('should render the form', () => {
    render(<FormSignIn />)

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()

    expect(screen.getByRole('button')).toBeInTheDocument()

    expect(screen.getByRole('button')).toHaveTextContent('Sign in now')
  })

  it('should render the forgot password link', () => {
    render(<FormSignIn />)

    expect(
      screen.getByRole('link', { name: /forgot your password\?/i })
    ).toBeInTheDocument()
  })

  it('should render the text and link to sign up', () => {
    render(<FormSignIn />)

    expect(screen.getByText(/don’t have an account\?/i)).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
  })
})
