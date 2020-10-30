const { createYield } = require("typescript")

describe('Test de TextInputs', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('acepta elementos',() => {
        cy.get('#emailInput')
        .type('admin')
        .should('have.value','admin')

        cy.get('#passwordInput')
        .type('algoquenoesmax2')
        .should('have.value','algoquenoesmax2')
    })
})