/// <reference types="cypress-xpath" />

describe('Start here', () => {
    let listbot = 0;

    beforeEach(() => {
        cy.login(Cypress.env('AUTH_USERNAME'), Cypress.env('AUTH_PASSWORD'));
    });

    it('Go to showroom',
        {
            retries: {
                runMode: 2,
                openMode: 1,
            },
        },
        () => {
        cy.visit('https://test.cloud.hatchstudio.co/CYPRESS/showroom/', { timeout: 4000 });
    });

    it('Apply filter', () => {
        //Select all
        cy.get('[type="button"]').contains('Presentations').click();
        cy.contains('All',{ timeout: 1500 }).click({force: true});

        //Search for BOT
        cy.get('.AnimatedInputsc__StyledIconButton-sc-1jrrq74-2').click();
        //cy.get('[type="button"]').contains('.AnimatedInputsc__StyledIconButton-sc-1jrrq74-2').click();
        cy.get('input[name="styled-input-field"]',{ timeout: 1000 }).invoke('show').type("bot").type('{enter}');
    });

    it('Search and Validate BOT Count', () => {
        //Intercept previous Request
        cy.intercept('POST', '**/presentation').as('postPresentation')

        //Filter timer
        cy.wait(1500);

        //intercept request
        cy.get('[data-testid="presentationList"]').children()
            .each($elements => {
            listbot+= $elements.length;
            cy.log(listbot);
        });

        //API count BOT Final validation, must match with UI count
        cy.wait('@postPresentation')
        //verify server response
        cy.get('@postPresentation').then( ft => {
            expect(ft.request.body.variables.input.filters.search).to.equal("bot")
            expect(ft.response.statusCode).to.equal(200)
            expect(ft.response.body.data.presentations.total).to.equal(listbot)
        });
    });

});
