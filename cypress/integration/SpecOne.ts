/// <reference types="cypress-xpath" />

describe('Start here', () => {
  let ts = Date.now();

  beforeEach(() => {
    cy.login(Cypress.env('AUTH_USERNAME'), Cypress.env('AUTH_PASSWORD'));
  });

/*  it('Go to showroom', () => {
    cy.visit('?skip_browser_check=true');
  });
*/

 it('Go to showroom', () => {
   cy.visit('https://test.cloud.hatchstudio.co/CYPRESS/showroom/', { timeout: 5000 });
   cy.get('.Headersc__StyledHeaderTitle-sc-1h81g0s-1').should('have.text', 'The Digital Showroom');
 });


 it('Create Presentation Form', () => {
   cy.get('[data-testid="createNewPresentation"]').click();
   cy.contains('Presentation Name', { timeout: 5000 }).should('be.visible');

   //FILL INPUTS
   cy.get('input[id="presentationName"]').type('Test PRESENTATION FLAVIO_'+ts);
   cy.get('input[id="welcomeMessage"]').type('Test WELCOME FLAVIO');

   //SELECT CUSTOMER
   //cy.xpath("(//input[@name='count'])[2]").check()
   cy.get('input[id="based-on-customer"]').check({force: true})

   //SELECT CUSTOMER NAME
   cy.get('input[id="search"]',{ timeout: 4500 }).should('be.visible').type('Lockmanbury');
   cy.contains('location2837',{ timeout: 2500 }).should('be.visible').click();

   //FILL PRODUCT CATALOG NECESSARY INFO
   cy.get('[data-testid="dropdown-menu"]',{ timeout: 4500 }).should('be.visible').contains('Select Season').invoke('show').click({force: true});
   cy.contains('Fw 2034 189',{ timeout: 2500 }).click({force: true});

   //FINISH CREATION
   cy.get('[type="button"]').contains('Create Presentation').click();
 });

 it('Creation validation', () => {
   //VISUAL VALIDATION
   cy.get('[data-testid="icon-Menu"]',{ timeout: 4500 }).should('be.visible').click({force: true});
   cy.contains('Test PRESENTATION FLAVIO_'+ts,{ timeout: 2500 }).should('be.visible');
   cy.get('[data-testid="icon-Door"]').click({force: true});
 });

 it('List Validation', () => {
   //VISUAL VALIDATION
   //cy.visit('https://test.cloud.hatchstudio.co/CYPRESS/showroom/', { timeout: 4000 });
   cy.get('[data-testid="presentationList"]',{ timeout: 5000 }).contains('Test PRESENTATION FLAVIO_'+ts).should('be.visible');
 });

});
