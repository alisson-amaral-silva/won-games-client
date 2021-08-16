import cartMock from 'components/CartList/mock'
import cardsMock from 'components/PaymentOptions/mock'
import { GetCart } from 'graphql/generated/GetCart'
import { GET_CART } from 'graphql/queries/cart'
import Cart, { CartProps } from 'templates/Cart'
import { initializeApollo } from 'utils/apollo'
import { gamesMapper, highlightMapper } from 'utils/mappers'

export default function CartPage(props: CartProps) {
  return <Cart {...props} />
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica por isso o serverSideProps
export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<GetCart>({
    query: GET_CART
  })

  return {
    props: {
      items: cartMock,
      total: 'R$ 330,00',
      cards: cardsMock,
      highlight: highlightMapper(data.cart?.cart?.highlight),
      games: gamesMapper(data.cart?.cart?.games)
    }
  }
}
