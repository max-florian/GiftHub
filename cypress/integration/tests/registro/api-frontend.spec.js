const { createYield } = require("typescript")

describe('Test de POST/Registro', () => {
    it('Registrar el usuario luego de presionar el boton "Registrarse"',() => {

        const datosUsuario = {
            name: "Max Florian",
            username: "testmaster69",
            email: "max@gifthubmail.com",
            password: "contraseña234"
        };

        cy.visit('http://localhost:3000/')
        cy.get('#btnRegistro').click()

        cy.get('#nombreInputR')
        .type(datosUsuario.name)
        .should('have.value',datosUsuario.name)

        cy.get('#idInputR')
        .type(datosUsuario.username)
        .should('have.value',datosUsuario.username)

        cy.get('#emailInputR')
        .type(datosUsuario.email)
        .should('have.value',datosUsuario.email)

        cy.get('#contrasenaInputR')
        .type(datosUsuario.password)
        .should('have.value',datosUsuario.password)

        cy.get('#btnRegistro').click()

        cy.get('#alertRegistro', { timeout: 2000 })
        .should('be.visible')
        .contains('Usuario registrado exitosamente!')

        cy.url().should('contain','/')
    })
})