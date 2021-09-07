import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import Button from 'components/Button'
import Heading from 'components/Heading'
import { useCart } from 'hooks/use-cart'
import React, { useEffect, useState } from 'react'
import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'
import * as S from './styles'

const PaymentForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(true)
  const { items } = useCart()
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    if (items.length) {
      //bater na API /orders/create-payment-intent
      //enviar itens do carrinho
      //se receber freeGames: True -> setFreeGames
      //seguir com o fluxo do jogo gratuito
      //se receber erro, setError
      //otherwise criou um intent
      // setClientSecret
    }
  }, [])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>

        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px'
              }
            }
          }}
          onChange={handleChange}
        />
        {error && (
          <S.Error>
            <ErrorOutline size={20} />
            {error}
          </S.Error>
        )}
      </S.Body>
      <S.Footer>
        <Button as="a" fullWidth minimal>
          Continue shopping
        </Button>
        <Button
          disabled={disabled || !!error}
          fullWidth
          icon={<ShoppingCart />}
        >
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}
export default PaymentForm
