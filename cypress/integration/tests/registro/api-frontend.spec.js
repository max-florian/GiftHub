const { createYield } = require("typescript")

describe('Test de POST/Registro', () => {
    it('Registrar el usuario luego de presionar el "Registrarse"',() => {

        const datosUsuario = {
            name: "Max Florian",
            username: "testmaster69",
            email: "max@gifthubmail.com",
            password: "contraseña234"
        };

        cy.visit('http://localhost:3000/')

        cy.get('#nombreInput')
        .type(datosUsuario.name)
        .should('have.value',datosUsuario.name)

        cy.get('#idInput')
        .type(datosUsuario.username)
        .should('have.value',datosUsuario.username)

        cy.get('#emailInput')
        .type(datosUsuario.email)
        .should('have.value',datosUsuario.email)

        cy.get('#contrasenaInput')
        .type(datosUsuario.password)
        .should('have.value',datosUsuario.password)

        cy.get('#btnRegistro').click()

        cy.get('#alertRegistro', { timeout: 2000 })
        .should('be.visible')
        .contains('Usuario registrado exitosamente!')
    })
})