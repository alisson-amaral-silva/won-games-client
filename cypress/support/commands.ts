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
Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args)
})

Cypress.Commands.add('getFields', (exploreFields) => {
  exploreFields.map(({ label }) => {
    cy.findByText(label).should('exist')
  })
})

Cypress.Commands.add('getGameCardAndAddIntoCart', (cardNumber) => {
  cy.getByDataCy('game-card').eq(cardNumber).within(() => {
    cy.findByRole('button', { name: /add to cart/i }).click()
  })
})

Cypress.Commands.add('getGameCardAndRemoveFromCart', (cardNumber) => {
  cy.getByDataCy('game-card').eq(cardNumber).within(() => {
    cy.findByRole('button', { name: /remove from cart/i }).click()
  })
})

Cypress.Commands.add('getGamesGreaterThan', (value) => {
  cy
    .findByText(/^\$\d+(\.\d{1,2})?/) // regex para valor
    .invoke('text') //transformando o método anterior em texto
    .then($el => $el.replace('$', ''))// removendo cifrão
    .then(parseFloat) //transformando em valor string -> number
    .should('be.gt', value) // verificando se o valor é maior doq 0
})

Cypress.Commands.add('getGamesLessThan', (value) => {
  cy
    .findByText(/^\$\d+(\.\d{1,2})?/) // regex para valor
    .invoke('text') //transformando o método anterior em texto
    .then($el => $el.replace('$', ''))// removendo cifrão
    .then(parseFloat) //transformando em valor string -> number
    .should('be.lte', value) // verificando se o valor é maior doq 0
})

Cypress.Commands.add('signUp', (user) => {
  cy.findByPlaceholderText(/username/i).type(user.username)
  cy.findByPlaceholderText(/email/i).type(user.email)
  cy.findByPlaceholderText(/^password/i).type(user.password)
  cy.findByPlaceholderText(/confirm password/i).type(user.password)
  cy.findByRole('button', { name: /sign up now/i }).click()
})

Cypress.Commands.add('signIn', (email = 'e2e@wongames.com', password = '123456') => {
  cy.findAllByPlaceholderText(/email/i).type(email)
  cy.findAllByPlaceholderText(/password/i).type(password)
  cy.findByRole('button', { name: /sign in now/i }).click()
})

Cypress.Commands.add('shouldRenderBanner', () => {
  //procurando a classe slick-slider e procurando o conteudo dentro dela
  cy.get('.slick-slider').within(() => {
    cy.findAllByRole('heading', { name: /cyberpunk 2077/i })[0]
    cy.findByRole('link', { name: /buy now/i })
  })

  cy.get('.slick-dots > :nth-child(2) > button').click()
  cy.wait(500)

  cy.findAllByRole('heading', { name: /horizon zero dawn/i })[0]
  cy.findAllByRole('link', { name: /buy now/i })[0]

  cy.get('.slick-dots > :nth-child(3) > button').click()
  cy.wait(500)

  cy.findAllByRole('heading', { name: /huge promotion/i })[0]
  cy.findAllByRole('link', { name: /buy now/i })[0]
})

Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false }) => {
  cy.getByDataCy(name).within(() => {
    cy.findByRole('heading', { name }).should('exist')

    cy.getByDataCy("highlight").should(highlight ? 'exist' : 'not.exist')

    if (highlight) {
      cy.getByDataCy("highlight").within(() => {
        cy.findByRole('link').should('have.attr', 'href')
      })
    }
    cy.getByDataCy("card-games").should('have.length.gt', 0)
  })
})
