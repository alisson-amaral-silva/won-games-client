import Heading from 'components/Heading'
import TextField from 'components/TextField'
import Button from 'components/Button'
import * as S from './styles'

const FormProfile = () => (
  <>
    <Heading lineBottom color="black" size="small">
      My Profile
    </Heading>
    <S.Form>
      <TextField
        name="name"
        placeholder="Name"
        label="Name"
        initialValue="John Doe"
      />

      <TextField
        name="email"
        placeholder="E-mail"
        type="email"
        label="E-mail"
        initialValue="johndoe@gmail.com"
        disabled
      />

      <TextField
        type="password"
        name="password"
        placeholder="Type your password"
        label="Password"
      />

      <TextField
        type="password"
        name="new_password"
        placeholder="Type your new password"
        label="New password"
      />

      <Button size="large">Save</Button>
    </S.Form>
  </>
)

export default FormProfile
