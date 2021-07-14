import { gql, useQuery } from '@apollo/client'
import bannerMock from 'components/BannerSlider/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import Home, { HomeTemplateProps } from 'templates/Home'

export default function Index(props: HomeTemplateProps) {
  const { loading, error } = useQuery(gql`
    query getGames {
      games {
        name
      }
    }
  `)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Loading...</p>

  return <Home {...props} />
}

// getStaticProps => gerar estático em build time
// getServerSideProps => gera via ssr a cada request (nunca vai para o bundle do client)
// getInitialProps => gera via ssr a cada request (vai para o client, gera via ssr, mas se tiver atualização do dado, ele faz hydrate do lado do lado do client depois do 1 request)
export async function getServerSideProps() {
  // faz lógica
  // pode ser buscar dados de API
  // fazer calculo| leitura de context

  // retorno dos dados
  return {
    props: {
      banners: bannerMock,
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
