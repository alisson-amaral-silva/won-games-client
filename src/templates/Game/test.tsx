import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helper'
import Game from '.'
import galleryMock from 'components/Gallery/mock'

const gameInfo = {
  title: 'Kingdom hearts 3',
  price: '59.00',
  description:
    'KINGDOM HEARTS III tells the story of the power of friendship as Sora and his friends embark on a perilous adventure. Set in a vast array of Disney and Pixar worlds, KINGDOM HEARTS follows the journey of Sora, a young boy and unknowing heir to a spectacular power. Sora is joined by Donald Duck and Goofy to stop an evil force known as the Heartless from invading and overtaking the universe'
}

const details = {
  developer: 'Different Tales',
  releaseDate: new Date().toString(),
  platforms: ['windows', 'mac', 'linux'],
  publisher: 'Walkabout',
  rating: 'BR0',
  genres: ['Role-playing']
}
const gallery = galleryMock

describe('<Game  />', () => {
  it('should render the heading', () => {
    renderWithTheme(
      <Game
        gameInfo={gameInfo}
        cover="https://www.wasd.pt/wp-content/uploads/2019/01/KH3HD.png"
        gallery={gallery}
        details={details}
      />
    )
    expect(screen.getByRole('heading', { name: /Game/i })).toBeInTheDocument()
  })
})
