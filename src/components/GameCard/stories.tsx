import { Meta, Story } from '@storybook/react/types-6-0'
import GameCard, { GameCardProps } from '.'

export default {
  title: 'GameCard',
  component: GameCard,
  args: {
    title: 'Population Zero',
    developer: 'Rockstar Games',
    img:
      'https://avatars.githubusercontent.com/u/60556153?s=400&u=2b0f7c18e8adff995f5cc65423d3608804d36a6b&v=4',
    price: 'R$ 235,00'
  }
} as Meta

export const Basic: Story<GameCardProps> = (args) => (
  <div style={{width: '30rem'}}>
    <GameCard {...args} />
  </div>
)
