import { Story, Meta } from '@storybook/react/types-6-0'
import TextField, { TextFieldProps } from '.'
import { EmailOutline } from '@styled-icons/evaicons-outline/EmailOutline'

export default {
  title: 'Form/TextField',
  component: TextField,
  args: {
    label: 'E-mail',
    name: 'Email',
    initialValue: '',
    placeholder: 'john.cage@gmail.com',
    iconPosition: 'left',
    disabledInput: false
  },
  argTypes: {
    onInput: { action: 'changed' },
    icon: {
      type: ''
    }
  }
} as Meta

export const Default: Story<TextFieldProps> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TextField {...args} />
  </div>
)

export const WithIcon: Story<TextFieldProps> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TextField {...args} />
  </div>
)

WithIcon.args = {
  icon: <EmailOutline />
}

export const withError: Story<TextFieldProps> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TextField {...args} />
  </div>
)

withError.args = {
  errorMessage: 'Ops...something is wrong'
}
