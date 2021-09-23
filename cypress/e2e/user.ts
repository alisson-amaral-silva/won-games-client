/// <reference types="cypress" />

import { createUser } from '../support/generate'

describe('User', () => {
  it('should sign up', () => {
    const user = createUser()
    cy.visit('/sign-up')

    cy.signUp(user)

    cy.wait(3000)

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    cy.findByText(user.username).should('exist')
  })

  it('should sign in and sign out', () => {
    cy.visit('/sign-in')

    cy.signIn('batman@gmail.com', 'Batman123')

    cy.wait(3000)

    cy.findByText(/batman/i).should('exist').click()

    cy.findByText(/sign out/i).click()

    cy.findByText(/batman/i).should('not.exist')

    cy.findByRole('link', { name: /sign in/i }).should('exist')

  })

})
