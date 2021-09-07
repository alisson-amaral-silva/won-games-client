import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CartList, { CartListProps } from 'components/CartList'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import { GameCardProps } from 'components/GameCard'
import Heading from 'components/Heading'
import { HighlightProps } from 'components/Highlight'
import PaymentForm from 'components/PaymentForm'
import Showcase from 'components/Showcase'
import React from 'react'
import Base from 'templates/Base'

import * as S from './styles'

export type CartProps = {
  games: GameCardProps[]
  highlight: HighlightProps
} & CartListProps

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHIBLE_KEY}`)

const Cart = ({ games, highlight }: CartProps) => {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My Cart
        </Heading>

        <S.Content>
          <CartList />
          <Elements stripe={stripe}>
            <PaymentForm />
          </Elements>
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
