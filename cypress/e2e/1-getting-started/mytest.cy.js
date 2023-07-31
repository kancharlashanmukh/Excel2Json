/// <reference types="cypress" />

describe('convert data to Json', () => {
    it('read data from excel', () => {
        cy.task('readXlsx', { file: '/Users/shanmukhkancharla/Desktop/E2Jaccounts.xlsx', sheet: "Accounts" }).then((accountsdata) => {
            const accountsDataMap = new Map();
            for (var key in accountsdata) {
                for (var key1 in accountsdata[key]) {
                    var innerMap = new Map();
                    innerMap.set("AccountNumber", accountsdata[key].AccountNumber)
                    innerMap.set("AccountName", accountsdata[key].AccountName)
                    innerMap.set("AccountCountry", accountsdata[key].AccountCountry)
                    accountsDataMap.set(accountsdata[key].AccountType, innerMap)
                }
            }
            const accountsfilename = 'cypress/fixtures/Accounts.json'
            cy.writeFile(accountsfilename, JSON.parse(JSON.stringify(Object.fromEntries(accountsDataMap))))
            for (const [key, value] of accountsDataMap.entries()) {
                cy.readFile(accountsfilename).then((data) => {
                    data[key] = JSON.parse(JSON.stringify(Object.fromEntries(value)));
                    cy.writeFile(accountsfilename, data)
                })
            }

        })
        cy.task('readXlsx', { file: '/Users/shanmukhkancharla/Desktop/E2Jaccounts.xlsx', sheet: "Transactions" }).then((transactionsdata) => {
            const transactionsdataMap = new Map();
            //console.log("JSON.stringify()-----" + JSON.stringify(transactionsdata));
            for (var key in transactionsdata) {
                for (var key1 in transactionsdata[key]) {
                    var innerMap = new Map();
                    innerMap.set("Payment_ID", transactionsdata[key].Payment_ID)
                    innerMap.set("Transaction_amount", transactionsdata[key].Transaction_amount)
                    innerMap.set("Status", transactionsdata[key].Status)
                    transactionsdataMap.set(transactionsdata[key].Payment_ID, innerMap)
                }
            }
            console.log("transactionsdataMap----" + JSON.parse(JSON.stringify(Object.fromEntries(transactionsdataMap))));
            const transactionfilename = 'cypress/fixtures/Transaction.json'
            cy.writeFile(transactionfilename, JSON.parse(JSON.stringify(Object.fromEntries(transactionsdataMap))))
            for (const [key, value] of transactionsdataMap.entries()) {
                cy.readFile(transactionfilename).then((data) => {
                    data[key] = JSON.parse(JSON.stringify(Object.fromEntries(value)));
                    cy.writeFile(transactionfilename, data)
                })
            }

        })
    })
}) 