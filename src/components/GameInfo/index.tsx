import * as S from './styles'

import Button from 'components/Button'
import Heading from 'components/Heading'
import Ribbon from 'components/Ribbon'
import React from 'react'
import { AddShoppingCart, FavoriteBorder } from 'styled-icons/material'

export type GameInfoProps = {
  title: string
  description: string
  price: number
}

const GameInfo = ({ title, description, price }: GameInfoProps) => (
  <S.Wrapper>
    <Heading color="black" lineBottom>
      {title}
    </Heading>

    <Ribbon color="secondary">
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price)}
    </Ribbon>

    <S.Description>{description}</S.Description>

    <S.ButtonsWrapper>
      <Button icon={<AddShoppingCart />} size="large">
        Add to cart
      </Button>
      <Button icon={<FavoriteBorder />} size="large" minimal>
        Wishlist
      </Button>
    </S.ButtonsWrapper>
  </S.Wrapper>
)

export default GameInfo
