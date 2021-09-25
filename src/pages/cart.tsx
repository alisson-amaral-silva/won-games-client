import { GetCart } from 'graphql/generated/GetCart'
import { GetRecommended } from 'graphql/generated/GetRecommended'
import { GET_CART } from 'graphql/queries/cart'
import { GET_RECOMMENDED } from 'graphql/queries/recommended'
import { GetServerSidePropsContext } from 'next'
import Cart, { CartProps } from 'templates/Cart'
import { initializeApollo } from 'utils/apollo'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import protectedRoutes from 'utils/protected-routes'

export default function CartPage(props: CartProps) {
  return <Cart {...props} />
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica por isso o serverSideProps
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await protectedRoutes(ctx)
  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<GetRecommended>({
    query: GET_RECOMMENDED
  })

  return {
    props: {
      session,
      highlight: highlightMapper(data.recommended?.section?.highlight),
      games: gamesMapper(data.recommended?.section?.games)
    }
  }
}
