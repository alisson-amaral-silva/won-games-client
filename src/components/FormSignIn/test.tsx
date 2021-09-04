import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import { render, screen } from 'utils/test-utils'
import FormSignIn from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()

useRouter.mockImplementation(() => ({
  push,
  query: '',
  asPath: '',
  route: '/'
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

describe('<FormSignIn  />', () => {
  it('should render the form', () => {
    render(
      <MockedProvider>
        <FormSignIn />
      </MockedProvider>
    )

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()

    expect(screen.getByRole('button')).toBeInTheDocument()

    expect(screen.getByRole('button')).toHaveTextContent('Sign in now')
  })

  it('should render the forgot password link', () => {
    render(
      <MockedProvider>
        <FormSignIn />
      </MockedProvider>
    )

    expect(screen.getByTestId(/forgot-password/i)).toBeInTheDocument()
  })

  it('should render the text and link to sign up', () => {
    render(
      <MockedProvider>
        <FormSignIn />
      </MockedProvider>
    )

    expect(screen.getByText(/don’t have an account\?/i)).toBeInTheDocument()

    expect(screen.getByTestId(/sign up/i)).toBeInTheDocument()
  })
})
