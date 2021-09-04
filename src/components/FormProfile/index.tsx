import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Button from 'components/Button'
import * as S from './styles'
import React from 'react'
import Link from 'next/link'

export type FormProfileProps = {
  username?: string
  email?: string
}

const FormProfile = ({ username, email }: FormProfileProps) => (
  <>
    <Heading lineBottom color="black" size="small">
      My Profile
    </Heading>
    <S.Form>
      <TextField
        name="username"
        placeholder="Username"
        label="Username"
        initialValue={username}
      />

      <TextField
        name="email"
        placeholder="E-mail"
        type="email"
        label="E-mail"
        initialValue={email}
        disabled
      />

      <S.ButtonContainer>
        <Link href={`/forgot-password?email=${email}`} passHref>
          <Button minimal size="medium" as="a">
            Reset Password
          </Button>
        </Link>
      </S.ButtonContainer>

      <Button size="medium">Save</Button>
    </S.Form>
  </>
)

export default FormProfile
