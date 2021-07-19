import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import Home, { HomeTemplateProps } from 'templates/Home'
import { initializeApollo } from 'utils/apollo'
import { GET_HOME } from 'graphql/queries/home'
import { GetHome } from 'graphql/generated/GetHome'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// getStaticProps => gerar estático em build time
// getServerSideProps => gera via ssr a cada request (nunca vai para o bundle do client)
// getInitialProps => gera via ssr a cada request (vai para o client, gera via ssr, mas se tiver atualização do dado, ele faz hydrate do lado do lado do client depois do 1 request)
export async function getStaticProps() {
  // retorno dos dados

  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<GetHome>({ query: GET_HOME })

  return {
    props: {
      revalidate: 10,
      banners: data.banners.map((banner) => ({
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
      newGames: gamesMock,
      mostPopularHighlight: highlightMock,
      mostPopularGames: gamesMock,
      upcomingGames: gamesMock,
      upcomingHighlight: highlightMock,
      upcomingMoreGames: gamesMock,
      freeGames: gamesMock,
      freeHighlight: highlightMock
    }
  }
}

//ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONA EM PAGES
// CASO TENTE CHAMAR DENTRO DE COMPONENTS OU TEMPLATES, NÃO ROLA
