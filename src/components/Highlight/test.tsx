import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Highlight from '.'

const props = {
  title: 'Heading 1',
  subtitle:'Heading 2',
  buttonLabel: 'Buy now',
  backgroundImage: '/img/red-dead-img.jpg',
  buttonLink: '/rd2'
}

describe('<Highlight  />', () => {
  it('should render headings and button', () => {
   renderWithTheme(<Highlight  {...props}/>)

    expect(
      screen.getByRole('heading', { name: /heading 1/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /heading 2/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /buy now/i })
    ).toBeInTheDocument()
  })

  it('should render background image', () => {
    const {container} = renderWithTheme(<Highlight  {...props}/>)

    expect(container.firstChild).toHaveStyle({
      backgroundImage: `url(${props.backgroundImage})`
    });

   })

})
