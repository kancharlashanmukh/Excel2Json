/// <reference types="cypress" />

describe('Retreive Json Data', () => {
    it('Read data from json', () => {
        cy.task('readXlsx', { file: '/Users/shanmukhkancharla/Desktop/E2Jaccounts.xlsx', sheet: "Accounts" }).then((accountsdata) => {
            const accountsfilename = 'cypress/fixtures/Accounts.json'
            cy.readFile(accountsfilename).then((accountsdata) => {
                console.log(accountsdata['WePay']['AccountNumber'])
            })
        })
    })
})