import { Meta, Story } from '@storybook/react/types-6-0'
import CartList, { CardListProps } from '.'

import mockItems from './mock'

export default {
  title: 'CartList',
  component: CartList,
  args: {
    items: mockItems,
    total: 'R$ 330,00'
  },
  parameters: {
    default: 'won-dark'
  }
} as Meta

export const Default: Story<CardListProps> = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
)
