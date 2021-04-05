import { Meta, Story } from '@storybook/react/types-6-0'
import Highlight, { HighlightProps } from '.'

export default {
  title: 'Highlight',
  component: Highlight,
  args:{
    title: 'Red Dead its back',
    subtitle:'Come see Johns new adventures',
    buttonLabel: 'Buy now',
    buttonLink:'/rd2',
    backgroundImage:'/img/red-dead-img.jpg'
  }
} as Meta

export const Basic: Story<HighlightProps> = (args) => <Highlight {...args}/>
