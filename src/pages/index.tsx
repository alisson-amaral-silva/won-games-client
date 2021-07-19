import { GetHome, GetHomeVariables } from 'graphql/generated/GetHome'
import { GET_HOME } from 'graphql/queries/home'
import Home, { HomeTemplateProps } from 'templates/Home'
import { initializeApollo } from 'utils/apollo'
import { bannerMapper, gamesMapper, highlightMapper } from 'utils/mappers'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// getStaticProps => gerar estático em build time
// getServerSideProps => gera via ssr a cada request (nunca vai para o bundle do client)
// getInitialProps => gera via ssr a cada request (vai para o client, gera via ssr, mas se tiver atualização do dado, ele faz hydrate do lado do lado do client depois do 1 request)
export async function getStaticProps() {
  // retorno dos dados

  const apolloClient = initializeApollo()

  const TODAY = new Date().toISOString().slice(0, 10)

  const {
    data: { banners, newGames, upcommingGames, freeGames, sections }
  } = await apolloClient.query<GetHome, GetHomeVariables>({
    query: GET_HOME,
    variables: { date: TODAY }
  })

  return {
    props: {
      revalidate: 10,
      banners: bannerMapper(banners),
      newGamesTitle: sections!.newGames?.title,
      newGames: gamesMapper(newGames),
      mostPopularGamesTitle: sections!.popularGames?.title,
      mostPopularHighlight: highlightMapper(sections?.popularGames?.highlight),
      mostPopularGames: gamesMapper(sections!.popularGames!.games),
      upcomingGamesTitle: sections!.upcomingGames?.title,
      upcomingGames: gamesMapper(upcommingGames),
      upcomingHighlight: highlightMapper(sections?.upcomingGames?.highlight),
      freeGamesTitle: sections!.freeGames?.title,
      freeGames: gamesMapper(freeGames),
      freeHighlight: highlightMapper(sections?.freeGames?.highlight)
    }
  }
}

//ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONA EM PAGES
// CASO TENTE CHAMAR DENTRO DE COMPONENTS OU TEMPLATES, NÃO ROLA
