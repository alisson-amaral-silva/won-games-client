import { Meta, Story } from '@storybook/react/types-6-0'
import Button from '.'
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string'
    },
    icon: {
      type: ''
    }
  }
} as Meta

export const Default: Story = (args) => <Button {...args} />

Default.args = { children: 'Buy now' }

export const WithIcon: Story = (args) => <Button {...args} />

WithIcon.args = {
  size: 'small',
  children: 'Buy now',
  icon: <AddShoppingCart />
}

export const asLink: Story = (args) => <Button {...args} />

asLink.args = {
  size: 'small',
  children: 'Buy now',
  as: 'a',
  href: '/link'
}
