import { Container } from 'components/Container'
import Heading from 'components/Heading'
import { Divider } from 'components/Divider'
import Base from 'templates/Base'
import * as S from './styles'
import { HighlightProps } from 'components/Highlight'
import { GameCardProps } from 'components/GameCard'
import Showcase from 'components/Showcase'
import CartList, { CartListProps } from 'components/CartList'
import PaymentOptions, { PaymentOptionsProps } from 'components/PaymentOptions'
import React from 'react'
import Empty from 'components/Empty'

export type CartProps = {
  games: GameCardProps[]
  highlight: HighlightProps
} & CartListProps &
  Pick<PaymentOptionsProps, 'cards'>

const Cart = ({ games, highlight, items, total, cards }: CartProps) => {
  const handlePayment = () => ({})

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My Cart
        </Heading>
        {items?.length ? (
          <S.Content>
            <CartList items={items} total={total} />
            <PaymentOptions cards={cards} handlePayment={handlePayment} />
          </S.Content>
        ) : (
          <Empty
            title="Your cart is empty"
            description="Games added to your cart will appear here"
            hasLink
          />
        )}

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
