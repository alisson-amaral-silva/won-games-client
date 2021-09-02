import 'next-auth'

declare module 'next-auth/client' {
  export * from 'next-auth/client'

  interface SignInResponse {
    error: string | undefined
    status: number
    ok: boolean
    url: string | null
  }

  export function signin(
    provider: 'credentials' | 'email' | 'string',
    data?: GenericObject & {
      callbackUrl?: string
      redirect?: false
    },
    authorizationParams?: string | string[][] | GenericObject | UrlSearchParams
  ): Promise<SignInResponse>

  export const signIn: typeof signin
}
