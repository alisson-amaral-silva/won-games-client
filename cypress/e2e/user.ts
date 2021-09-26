/// <reference types="cypress" />

import { createUser } from '../support/generate'

describe('User', () => {
  it('should sign up', () => {
    const user = createUser()
    cy.visit('/sign-up')

    cy.wait(5000)

    cy.signUp(user)

    cy.wait(5000)

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    cy.findByText(user.username).should('exist')
  })

  it('should sign in and sign out', () => {
    cy.visit('/sign-in')

    cy.wait(5000)

    cy.signIn()

    cy.wait(10000)

    cy.getByDataCy('username').should('exist').click()

    cy.findByText(/sign out/i).click()

    cy.getByDataCy('username').should('not.exist')

    cy.findByRole('link', { name: /sign in/i }).should('exist')

  })

  it('should sign in the user and redirect to the page that he was previously', () => {

    cy.visit('/profile/me')

    cy.wait(5000)

    //redirecionar para o /sign-in com a callback do /profile/media
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/me`)

    cy.wait(5000)

    //fazer o sign in
    cy.signIn()

    cy.wait(5000)

    // espero ser redirecionado para o profile/me
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/profile/me`)

    cy.findByLabelText(/username/i).should('have.value', 'Batman')
    cy.findByLabelText(/e-mail/i).should('have.value', 'batman@gmail.com')
  })

})
