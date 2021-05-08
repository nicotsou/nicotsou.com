/// <reference types="Cypress" />

describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/').get('body').injectAxe()
  })
  it('Has no detectable accessibility violations on load', () => {
    cy.checkA11y()
  })
})
