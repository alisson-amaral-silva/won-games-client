import FormResetPassword from 'components/FormResetPassword'
import React from 'react'
import Auth from 'templates/Auth'

export default function ResetPassword() {
  return (
    <Auth title="Reset password">
      <FormResetPassword />
    </Auth>
  )
}
