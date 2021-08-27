import CartList, { CartListProps } from 'components/CartList'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import { GameCardProps } from 'components/GameCard'
import Heading from 'components/Heading'
import { HighlightProps } from 'components/Highlight'
import PaymentOptions, { PaymentOptionsProps } from 'components/PaymentOptions'
import Showcase from 'components/Showcase'
import React from 'react'
import Base from 'templates/Base'
import * as S from './styles'

export type CartProps = {
  games: GameCardProps[]
  highlight: HighlightProps
} & CartListProps &
  Pick<PaymentOptionsProps, 'cards'>

const Cart = ({ games, highlight, cards }: CartProps) => {
  const handlePayment = () => ({})

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My Cart
        </Heading>

        <S.Content>
          <CartList />
          <PaymentOptions cards={cards} handlePayment={handlePayment} />
        </S.Content>

        <Divider />
        <Showcase
          title="You may like theses games"
          games={games}
          highlight={highlight}
        />
      </Container>
    </Base>
  )
}
export default Cart
