describe('Mint Énergie DOM and Buttons Test', () => {
    // Visit your application before each test.
    beforeEach(() => {
      // Change this URL to the one served by your NestJS backend
      cy.visit('http://localhost:3000/'); 
    });
  
    it('should verify header, meta tags and key elements', () => {
      // Verify the page title contains "Mint Énergie"
      cy.title().should('include', 'Mint Énergie');
  
      // Verify that the meta viewport tag exists
      cy.get('meta[name="viewport"]').should('exist');
  
      // Verify the subscription (Souscrire) button is present and visible
      cy.get('#header_LB_Souscription')
        .should('be.visible')
        .and('contain', 'Souscrire');
    });
  
    it('should navigate to subscription form and verify form fields', () => {
      // Click on the "Souscrire" button to navigate to the subscription form
      cy.get('#header_LB_Souscription').click();
  
      // Verify that the URL has changed appropriately
      cy.url().should('include', '/coordonnees');
  
      // Verify that key form fields are present:
      cy.get('#TB_Firstname').should('be.visible');
      cy.get('#TB_Lastname').should('be.visible');
      cy.get('#TB_Email').should('be.visible');
  
      // Verify that the add customer button is available
      cy.get('#LB_AddOtherCustomer').should('exist');
    });
  
    it('should click all actionable buttons and log feedback', () => {
      // This test iterates over all clickable elements (links, buttons, submit inputs)
      cy.get('a, button, input[type="submit"]').each(($el) => {
        // Only click on visible elements
        if ($el.is(':visible')) {
          cy.wrap($el)
            .click({ force: true })
            .then(() => {
              cy.log(`Clicked element: ${$el.attr('id') || $el.text().trim()}`);
            });
        }
      });
    });
  });
  