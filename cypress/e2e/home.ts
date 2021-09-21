/// <reference types="cypress" />

describe('Home Page', () => {
  it('should render home page sections', () => {
    //visitar a pagina
    cy.visit('/')

    //procurando a classe slick-slider e procurando o conteudo dentro dela
    cy.get('.slick-slider').within(() => {
      cy.findAllByRole('heading', {name: /kingdom hearts/i})[0]
      cy.findByRole('link', { name: /buy now/i})
    })
  })
})
