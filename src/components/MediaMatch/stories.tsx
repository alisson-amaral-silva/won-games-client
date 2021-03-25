import { Meta, Story } from '@storybook/react/types-6-0'
import MediaMatch from '.'

export default {
  title: 'MediaMatch',
  component: MediaMatch
} as Meta

export const Desktop: Story = () => (
  <MediaMatch greaterThan="medium">Only on Desktop</MediaMatch>
)
export const Mobile: Story = () => (
  <MediaMatch lessThan="medium">Only on Desktop</MediaMatch>
)

export const None: Story = () => <MediaMatch>Only on Desktop</MediaMatch>

Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}
