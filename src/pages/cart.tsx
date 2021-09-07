import cartMock from 'components/CartList/mock'
import cardsMock from 'components/PaymentOptions/mock'
import { GetCart } from 'graphql/generated/GetCart'
import { GET_CART } from 'graphql/queries/cart'
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

  const { data } = await apolloClient.query<GetCart>({
    query: GET_CART
  })

  return {
    props: {
      session,
      items: cartMock,
      total: 'R$ 330,00',
      cards: cardsMock,
      highlight: highlightMapper(data.cart?.cart?.highlight),
      games: gamesMapper(data.cart?.cart?.games)
    }
  }
}
