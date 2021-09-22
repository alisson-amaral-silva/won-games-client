// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Add Testing library commands
import '@testing-library/cypress/add-commands'
Cypress.Commands.add('google', () => cy.visit('https://google.com'))

Cypress.Commands.add('shouldRenderBanner', () => {
  //procurando a classe slick-slider e procurando o conteudo dentro dela
  cy.get('.slick-slider').within(() => {
    cy.findAllByRole('heading', { name: /kingdom hearts/i })[0]
    cy.findByRole('link', { name: /buy now/i })
  })

  cy.get('.slick-dots > :nth-child(2) > button').click()
  cy.wait(500)

  cy.findAllByRole('heading', { name: /A light in the dark/i })[0]
  cy.findAllByRole('link', { name: /buy now/i })[0]

  cy.get('.slick-dots > :nth-child(3) > button').click()
  cy.wait(500)

  cy.findAllByRole('heading', { name: /aragami/i })[0]
  cy.findAllByRole('link', { name: /buy now/i })[0]
})
