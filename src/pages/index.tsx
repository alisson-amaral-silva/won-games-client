import Home, { HomeTemplateProps } from 'templates/Home'
import bannerMock from 'components/BannerSlider/mock'
import highlightMock from 'components/Highlight/mock'
import gamesMock from 'components/GameCardSlider/mock'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// Static => gerar estático em build time
export function getStaticProps() {
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
