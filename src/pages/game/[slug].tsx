import Game, { GameTemplateProps } from 'templates/Game'
import galleryMock from 'components/Gallery/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
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
  const descriptionHtml =
    '<p style=""><a href="http://www.techtudo.com.br/tudo-sobre/kingdom-hearts-3.html" class="" target="_self">Kingdom Hearts 3</a> chega ao <a href="http://www.techtudo.com.br/tudo-sobre/playstation-4.html" class="" target="_self">PS4</a> e <a href="http://www.techtudo.com.br/tudo-sobre/xbox-720.html" class="" target="_self">Xbox One</a> (sem versão para PC) após 13 anos de espera desde o último jogo lançado para um console de mesa, <a href="https://www.techtudo.com.br/tudo-sobre/kingdom-hearts-hd-25-remix.html" class="" target="_self">Kingdom Hearts 2</a>, para&nbsp;<a href="https://www.techtudo.com.br/tudo-sobre/playstation-2-slim.html" class="" target="_self">PlayStation 2</a>. A jornada do personagem principal, Sora, junto dos fiéis escudeiros Pato Donald e Pateta chega a uma conclusão épica que justifica este intervalo. A análise a seguir busca avaliar a história e cronologia do game da <a href="http://www.techtudo.com.br/tudo-sobre/square-enix.html" class="" target="_self">Square Enix</a>, que se passa dentro de fases inspiradas em filmes da Walt Disney, como Frozen, Toy Story, Monstros S.A., Enrolados, Operação Big Hero, Piratas do Caribe, Hércules e Ursinho Pooh. Jogabilidade e gráficos também são levados em conta, assim como a importância da personalidade do protagonista para o enredo. Kingdom Hearts utiliza a eterna luta entre Luz e Trevas como metáfora para ensinar uma lição sobre laços e amizade. Por isso, o título é muito mais que apenas um jogo de ação e aventura que mistura elementos de&nbsp;<a href="https://www.techtudo.com.br/tudo-sobre/final-fantasy-xv.html" class="" target="_self">Final Fantasy</a> com figuras famosas da empresa criadora de Mickey Mouse.&nbsp;<br></p>'
  return {
    props: {
      cover: 'https://www.wasd.pt/wp-content/uploads/2019/01/KH3HD.png',
      gameInfo: {
        title: 'Kingdom hearts 3',
        price: '59.00',
        description:
          'KINGDOM HEARTS III tells the story of the power of friendship as Sora and his friends embark on a perilous adventure. Set in a vast array of Disney and Pixar worlds, KINGDOM HEARTS follows the journey of Sora, a young boy and unknowing heir to a spectacular power. Sora is joined by Donald Duck and Goofy to stop an evil force known as the Heartless from invading and overtaking the universe'
      },
      gallery: galleryMock,
      description: descriptionHtml,
      details: {
        developer: 'Different Tales',
        releaseDate: new Date().toString(),
        platforms: ['windows', 'mac', 'linux'],
        publisher: 'Walkabout',
        rating: 'BR0',
        genres: ['Role-playing']
      },
      upcommingGames: gamesMock,
      upcommingHighlight: highlightMock,
      recommendedGames: gamesMock
    }
  }
}
