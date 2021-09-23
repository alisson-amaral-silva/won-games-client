/// <reference types="cypress" />

import { createUser, User } from '../support/generate'

describe('Checkout', () => {
  let user: User
  describe('Free Games', () => {
    before(() => {
      user = createUser()
    })

    it('should buy free games', () => {
      //criar user
      cy.visit('/sign-up')

      cy.signUp(user)

      cy.wait(3000)

      //ir para explore page
      cy.visit('/games')

      cy.wait(5000)

      // filtrar jogos free
      cy.findByText(/free/i).click()

      cy.wait(5000)

      cy.location('href').should('contain', 'price_lte=0')

      // add jogos no cart
      cy.getByDataCy('game-card')
        .first()
        .within(() => {
          cy.findByText('$0.00').should('exist')
          cy.findByRole('button', { name: /add to cart/i }).click()
        })

      //verificar se o cart tem 1 jogo, abrir o drop
      cy.findAllByLabelText('Cart items').first().should('have.text', 1).click()

      //clicar no buy now
      cy.getByDataCy('cart-list').within(() => {
        cy.findByRole('link', { name: /buy it now/i })
          .should('exist')
          .click()
      })
      cy.wait(5000)

      //encontrar um texto de só jogos free
      cy.findByText(/Only free games, click buy and enjoy!/i).should('exist')

      //clicar para comprar
      cy.findByRole('button', { name: /buy now/i })
        .should('exist')
        .click()
      cy.wait(5000)

      //redirecionar para pag de success
      cy.location('href').should('contain', 'success')

      //mostrar texto de sucesso
      cy.findByRole('heading', {
        name: /Your purchase was successful!/i
      }).should('exist')
    })
  })

  describe.only('Paid Games', () => {
    before(() => {
      user = createUser()
    })

    it('should buy paid games with correct card', () => {
      //criar user
      cy.visit('/sign-up')

      cy.signUp(user)

      cy.wait(3000)

      //ir para explore page
      cy.visit('/games')

      cy.wait(5000)

      // filtrar jogos pagos
      cy.findByText(/Under \$100/i).click()

      cy.wait(5000)

      cy.location('href').should('contain', 'price_lte=100')

      // add jogos no cart
      cy.getByDataCy('game-card')
        .first()
        .within(() => {
          cy.findByRole('button', { name: /add to cart/i }).click()
        })

      //verificar se o cart tem 1 jogo, abrir o drop
      cy.findAllByLabelText('Cart items').first().should('have.text', 1).click()

      //clicar no buy now
      cy.getByDataCy('cart-list').within(() => {
        cy.findByRole('link', { name: /buy it now/i })
          .should('exist')
          .click()
      })

      cy.wait(5000)

      cy.findByRole('button', { name: /buy now/i }).should('be.disabled')

      //encontrar um texto de só jogos free
      cy.fillElementsInput('cardNumber','4242424242424242')
      cy.fillElementsInput('cardExpiry', '1025')
      cy.fillElementsInput('cardCvc', '123')

      //clicar para comprar
      cy.findByRole('button', { name: /buy now/i })
        .should('be.enabled')
        .click()

      cy.wait(5000)

      //redirecionar para pag de success
      cy.location('href').should('contain', 'success')

      cy.wait(5000)

      //mostrar texto de sucesso
      cy.findByRole('heading', {
        name: /Your purchase was successful!/i
      }).should('exist')
    })
  })
})
