import Game, { GameTemplateProps } from 'templates/Game'
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
      cover: 'https://www.wasd.pt/wp-content/uploads/2019/01/KH3HD.png'
    }
  }
}
