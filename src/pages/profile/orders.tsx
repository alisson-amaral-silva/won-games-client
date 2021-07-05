import Profile from 'templates/Profile'
import cartListMock from 'components/CartList/mock'
import CartList from 'components/CartList'

export default function Orders() {
  return (
    <Profile>
      <CartList items={cartListMock} total="R$ 330,00" />
    </Profile>
  )
}
