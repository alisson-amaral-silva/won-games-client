import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import Button from 'components/Button'
import { FormLoading } from 'components/Form'
import Heading from 'components/Heading'
import { useCart } from 'hooks/use-cart'
import { Session } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'
import { createPaymentIntent } from 'utils/stripe/methods'
import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const [disabled, setDisabled] = useState(true)
  const { items } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { push } = useRouter()

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        //bater na API /orders/create-payment-intent
        //enviar itens do carrinho
        const data = await createPaymentIntent({
          items,
          token: session.jwt
        })
        //se receber freeGames: True -> setFreeGames
        //seguir com o fluxo do jogo gratuito
        if (data.freeGames) {
          setFreeGames(true)
          return
        }

        //se receber erro, setError
        if (data.error) {
          setError(data.error)
          return
        }
        //otherwise criou um intent
        // setClientSecret

        setFreeGames(false)
        setClientSecret(data.client_secret)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    //se for free
    if (freeGames) {
      //manda pro banco
      //redireciona para success
      push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      setLoading(false)
    }

    //salvar compra no banco do startPosition
    //redirecionar para pagina de sucesso
    push('/success')
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" size="small" lineBottom>
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
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
          )}

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
            disabled={!freeGames && (disabled || !!error)}
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}
export default PaymentForm
