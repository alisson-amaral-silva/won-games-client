import Cart, { CartProps } from 'templates/Cart'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import cartMock from 'components/CartList/mock'
import cardsMock from 'components/PaymentOptions/mock'

export default function CartPage(props: CartProps) {
  return <Cart {...props} />
}

// Cada vez que o usuario add ou remove as coisas ela não é estatica por isso o serverSideProps
export async function getServerSideProps() {
  return {
    props: {
      items: cartMock,
      total: 'R$ 330,00',
      cards: cardsMock,
      highlight: highlightMock,
      games: gamesMock.slice(0, 5)
    }
  }
}
