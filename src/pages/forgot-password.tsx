import FormForgotPassword from 'components/FormForgotPassword'
import React from 'react'
import Auth from 'templates/Auth'

export default function ForgotPassword() {
  return (
    <Auth title="Request new password">
      <FormForgotPassword />
    </Auth>
  )
}
