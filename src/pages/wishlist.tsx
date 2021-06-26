import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

//Paginas under autenticação e que não são atualizadas constantemente
export async function getStaticProps() {
  return {
    props: {
      games: gamesMock,
      recommendedHighlight: highlightMock,
      recommendedGames: gamesMock.slice(0, 5)
    }
  }
}
