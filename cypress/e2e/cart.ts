/// <reference types="cypress" />


describe('Cart', () => {
  it('should add and remove items from cart', () => {
    // visitar a home
    cy.visit('/')

    // procurar um jogo e clicar no botão de add no cart
    cy.getGameCardAndAddIntoCart(0)
    cy.getGameCardAndAddIntoCart(1)
    cy.getGameCardAndAddIntoCart(2)

    // verificar a quantidade de itens add no cart e abrindo o carrinho
    cy.findAllByLabelText('Cart items')
      .first()
      .should('have.text', 3)
      .click()

    // verificando quantidade de itens na lista de cart
    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByText(/remover/i).should('have.length', 3)
    })

    // fechando o carrinho
    cy.findAllByLabelText('Cart items')
      .first()
      .click()

    // removendo os itens do carrinho
    cy.getGameCardAndRemoveFromCart(0)
    cy.getGameCardAndRemoveFromCart(1)
    cy.getGameCardAndRemoveFromCart(2)


    // abre o carrinho
    cy.findAllByLabelText('Shopping cart')
      .first()
      .click()

    // verificando que o cart está vazio
    cy.getByDataCy('cart-list').within(() => {
      cy.findByRole('heading', { name: /Your cart is empty/i }).should('exist')
    })

  })

})
