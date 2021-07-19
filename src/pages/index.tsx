import { GetHome } from 'graphql/generated/GetHome'
import { GET_HOME } from 'graphql/queries/home'
import Home, { HomeTemplateProps } from 'templates/Home'
import { initializeApollo } from 'utils/apollo'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// getStaticProps => gerar estático em build time
// getServerSideProps => gera via ssr a cada request (nunca vai para o bundle do client)
// getInitialProps => gera via ssr a cada request (vai para o client, gera via ssr, mas se tiver atualização do dado, ele faz hydrate do lado do lado do client depois do 1 request)
export async function getStaticProps() {
  // retorno dos dados

  const apolloClient = initializeApollo()

  const {
    data: { banners, newGames, upcommingGames, freeGames, sections }
  } = await apolloClient.query<GetHome>({ query: GET_HOME })

  return {
    props: {
      revalidate: 10,
      banners: banners.map((banner) => ({
        img: `http://localhost:1337${banner.image?.url}`,
        title: banner.title,
        subtitle: banner.subtitle,
        buttonLabel: banner.button?.label,
        buttonLink: banner.button?.link,
        ...(banner.ribbon && {
          ribbon: banner.ribbon.text,
          ribbonColor: banner.ribbon.color,
          ribbonSize: banner.ribbon.size
        })
      })),
      newGamesTitle: sections!.newGames?.title,
      newGames: newGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: `http://localhost:1337${game.cover?.url}`,
        price: game.price
      })),
      mostPopularGamesTitle: sections!.popularGames?.title,
      mostPopularHighlight: {
        title: sections?.popularGames?.title,
        subtitle: sections?.popularGames?.highlight?.title,
        backgroundImage: `http://localhost:1337${sections?.popularGames?.highlight?.background?.url}`,
        buttonLabel: sections?.popularGames?.highlight?.buttonLabel,
        buttonLink: sections?.popularGames?.highlight?.buttonLink,
        floatImage: `http://localhost:1337${sections?.popularGames?.highlight?.floatImage?.url}`,
        alignment: sections?.popularGames?.highlight?.allignment,
        games: sections?.popularGames?.games.map((game) => ({
          title: game.name,
          slug: game.slug,
          developer: game.developers[0].name,
          img: `http://localhost:1337${game.cover?.url}`,
          price: game.price
        }))
      },
      mostPopularGames: sections!.popularGames!.games.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: `http://localhost:1337${game.cover?.url}`,
        price: game.price
      })),
      upcomingGamesTitle: sections!.upcomingGames?.title,
      upcomingGames: upcommingGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: `http://localhost:1337${game.cover?.url}`,
        price: game.price
      })),
      upcomingHighlight: {
        title: sections?.upcomingGames?.title,
        subtitle: sections?.upcomingGames?.highlight?.title,
        backgroundImage: `http://localhost:1337${sections?.upcomingGames?.highlight?.background?.url}`,
        buttonLabel: sections?.upcomingGames?.highlight?.buttonLabel,
        buttonLink: sections?.upcomingGames?.highlight?.buttonLink,
        floatImage: `http://localhost:1337${sections?.upcomingGames?.highlight?.floatImage?.url}`,
        alignment: sections?.upcomingGames?.highlight?.allignment
      },
      freeGamesTitle: sections!.freeGames?.title,
      freeGames: freeGames.map((game) => ({
        title: game.name,
        slug: game.slug,
        developer: game.developers[0].name,
        img: `http://localhost:1337${game.cover?.url}`,
        price: game.price
      })),
      freeHighlight: {
        title: sections?.freeGames?.title,
        subtitle: sections?.freeGames?.highlight?.title,
        backgroundImage: `http://localhost:1337${sections?.freeGames?.highlight?.background?.url}`,
        buttonLabel: sections?.freeGames?.highlight?.buttonLabel,
        buttonLink: sections?.freeGames?.highlight?.buttonLink,
        floatImage: `http://localhost:1337${sections?.freeGames?.highlight?.floatImage?.url}`,
        alignment: sections?.freeGames?.highlight?.allignment
      }
    }
  }
}

//ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONA EM PAGES
// CASO TENTE CHAMAR DENTRO DE COMPONENTS OU TEMPLATES, NÃO ROLA
