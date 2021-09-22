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


    //Details
    cy.getByDataCy('game-details').within(() => {
      cy.findByRole('heading', { name: /Game Details/i }).should('exist')
      cy.findByRole('heading', { name: /Developer/i }).should('exist')
      cy.findByRole('heading', { name: /Release Date/i }).should('exist')
      cy.findByRole('heading', { name: /Platforms/i }).should('exist')
      cy.findByRole('heading', { name: /Publisher/i }).should('exist')
      cy.findByRole('heading', { name: /Rating/i }).should('exist')
      cy.findByRole('heading', { name: /Genres/i }).should('exist')


      cy.findByText("Oct 4, 2020").should('exist')
      cy.findByRole('img', { name: /windows/i }).should('exist')
      cy.findByRole('img', { name: /mac/i }).should('exist')
      cy.findByText("FREE").should('exist')
      cy.findByText("Role-playing / Fantasy / Turn-based").should('exist')
    })


    cy.shouldRenderShowcase({name: 'Upcomming', highlight: true})
    cy.shouldRenderShowcase({name: 'You may like these games', highlight: false})
  })
})
