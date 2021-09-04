import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import Joi from 'joi'

const fieldsValidations = {
  username: Joi.string().min(5).required(),
  //tlds = .com/.net/.br/ .qualquer coisa
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'confirm password does not match with password' })
}

export type FieldErrors = {
  [key: string]: string
}

function getFieldErrors(objErrors: Joi.ValidationResult) {
  const errors: FieldErrors = {}

  if (objErrors.error) {
    objErrors.error.details.forEach((error) => {
      errors[error.path.join('.')] = error.message
    })
  }

  return errors
}

export function signUpValidate(values: UsersPermissionsRegisterInput) {
  const schema = Joi.object(fieldsValidations)

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type SignInValues = Omit<UsersPermissionsRegisterInput, 'username'>

export function signInValidate(values: SignInValues) {
  const { email, password } = fieldsValidations
  const schema = Joi.object({ email, password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type ForgotValidateParams = Pick<UsersPermissionsRegisterInput, 'email'>

export function forgotValidate(values: ForgotValidateParams) {
  const { email } = fieldsValidations
  const schema = Joi.object({ email })
  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type ResetValidateProps = {
  password: string
  confirm_password: string
}

export function resetValidate(values: ResetValidateProps) {
  const { password, confirm_password } = fieldsValidations
  const schema = Joi.object({ password, confirm_password })
  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}
