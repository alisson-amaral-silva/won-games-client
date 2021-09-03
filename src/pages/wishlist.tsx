import gamesMock from 'components/GameCardSlider/mock'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { GetServerSidePropsContext } from 'next'
import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'
import { initializeApollo } from 'utils/apollo'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import protectedRoutes from 'utils/protected-routes'

export default function WishlistPage(props: WishlistTemplateProps) {
  return <Wishlist {...props} />
}

//Paginas under autenticação e que não são atualizadas constantemente
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<GetRecommended>({
    query: GET_RECOMMENDED
  })

  return {
    props: {
      games: gamesMock,
      recommendedHighlight: gamesMapper(data.recommended?.section?.games),
      recommendedGames: highlightMapper(data.recommended?.section?.highlight),
      recommendedTitle: data.recommended?.section?.title,
      session
    }
  }
}
