import Game, { GameTemplateProps } from 'templates/Game'
import galleryMock from 'components/Gallery/mock'

export default function Index(props: GameTemplateProps) {
  return <Game {...props} />
}

//gera path em build time (/game/bla /game/foo)
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'kingdom-hearts-3' } }],
    fallback: false
  }
}

export async function getStaticProps() {
  return {
    props: {
      cover: 'https://www.wasd.pt/wp-content/uploads/2019/01/KH3HD.png',
      gameInfo: {
        title: 'Kingdom hearts 3',
        price: '59.00',
        description:
          'KINGDOM HEARTS III tells the story of the power of friendship as Sora and his friends embark on a perilous adventure. Set in a vast array of Disney and Pixar worlds, KINGDOM HEARTS follows the journey of Sora, a young boy and unknowing heir to a spectacular power. Sora is joined by Donald Duck and Goofy to stop an evil force known as the Heartless from invading and overtaking the universe'
      },
      gallery: galleryMock
    }
  }
}
