/// <reference types="cypress" />

describe('Game Page', () => {
  it('should render game page sections', () => {
    //visitar a pagina de um game especifico
    cy.visit('/game/baldurs-gate-iii')

    cy.wait(500)

    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('heading', { name: /Baldur's Gate 3/i }).should('exist')

      cy.findByText(/^This game is currently in development/i).should('exist')

      cy.findByText("$199.99").should('exist')

      cy.findByRole('button', { name: /add to cart/i }).should('exist')

    })

    cy.wait(500)

    //gallery
    cy.findAllByRole('button', { name: /^thumb\-/i }).should('have.length.gt', 0)

    //content
    cy.getByDataCy('content').within(() => {
      cy.findByRole('heading', { name: /description/i })
    })

    //o método children pega os filhos de cada elemento la dentro
    cy.getByDataCy('content').children().should('have.length.at.least', 2)
  })
})
