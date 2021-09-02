import { signInValidate, signUpValidate } from '.'

describe('validations', () => {
  describe('signInValidate()', () => {
    it('should validate empty fields', () => {
      const values = { email: '', password: '' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty'
      })
    })

    it('should return invalid email error', () => {
      const values = { email: 'invalid-email', password: '1324' }

      expect(signInValidate(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })
  })

  describe('signUpValidate()', () => {
    it('should validate empty fields', () => {
      const values = {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      }

      expect(signUpValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        username: '"username" is not allowed to be empty',
        password: '"password" is not allowed to be empty'
      })
    })

    it('should return an error when username field is short', () => {
      const values = {
        username: 'hi',
        email: '',
        password: ''
      }

      expect(signUpValidate(values).username).toMatchInlineSnapshot(
        `"\\"username\\" length must be at least 5 characters long"`
      )
    })

    it('should return invalid email error', () => {
      const values = { username: '', email: 'invalid-email', password: '1324' }

      expect(signUpValidate(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })

    it('should return an error when password and confirm password are invalid', () => {
      const values = {
        username: '',
        email: 'invalid-email',
        password: '1324',
        confirm_password: 'invalid-password'
      }

      expect(signUpValidate(values).confirm_password).toMatchInlineSnapshot(
        `"confirm password does not match with password"`
      )
    })
  })
})
