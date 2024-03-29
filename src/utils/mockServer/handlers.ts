import { rest } from 'msw'

type LoginReqBody = {
  email: string
}

type ResetReqBody = {
  code: string
  password: string
  passwordConfirmation: string
}

export const handlers = [
  rest.post<LoginReqBody>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    (req, res, ctx) => {
      const { email } = req.body

      // quando der erro
      if (email === 'false@email.com') {
        return res(
          ctx.status(400),
          ctx.json({
            error: 'Bad Request',
            message: [
              {
                messages: [
                  {
                    message: 'This email does not exist'
                  }
                ]
              }
            ]
          })
        )
      }

      // quando da bom
      return res(
        ctx.status(200),
        ctx.json({
          ok: true
        })
      )
    }
  ),
  rest.post<ResetReqBody>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    (req, res, ctx) => {
      const { code } = req.body

      // quando der erro
      if (code === 'wrong_code') {
        return res(
          ctx.status(400),
          ctx.json({
            error: 'Bad Request',
            message: [
              {
                messages: [
                  {
                    message: 'Incorrect code provided'
                  }
                ]
              }
            ]
          })
        )
      }

      // quando da bom
      return res(
        ctx.status(200),
        ctx.json({
          user: {
            email: 'valid@gmail.com'
          }
        })
      )
    }
  )
]
