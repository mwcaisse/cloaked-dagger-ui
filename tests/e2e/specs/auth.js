// https://docs.cypress.io/api/introduction/api.html

describe("Authentication Flow", () => {

    it("Automatically navigates to login page if not logged in", () => {
        cy.server();
        cy.route({
            method: "GET",
            url: "/api/user/me",
            status: 401
        }).as("getCurrentUser")

        cy.visit("/");

        cy.wait("@getCurrentUser");

        cy.url().should("equal", Cypress.config().baseUrl + "login");

    });

    it ("Logged in user remains on visited page.", () => {
        cy.server();
        cy.route({
            method: "GET",
            url: "/api/user/me",
            status: 200,
            response: {
                name: "Testy McTest Face",
                username: "test",
                "email": "test@test.com"
            }
        }).as("getCurrentUser");

        cy.visit("/");

        cy.wait("@getCurrentUser");

        cy.url().should("equal", Cypress.config().baseUrl);
    });

});