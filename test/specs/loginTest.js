const config = require("../config/main-config.js");
const login_Page = require("../pageobjects/Login_Page.js");
const expect = require('chai').expect;

describe("My Account: Login", () => {

    beforeEach(function () {
        browser.maximizeWindow();
        browser.url("./mein-konto/");
        login_Page.clickAcceptCookies();
    });

    afterEach(function () {
        browser.deleteCookies();
        browser.deleteLocalStorage();
    });

    it("Test 1: Login page should have the right title", () => {
        let title = login_Page.getPageTitle();
        expect(title).to.equal("Mein Konto - Kundenlogin INTERSPORT-Shop");
    });

    it("Test 2: Should be able to login successfully with an existing user account", () => {
        login_Page.doLogin(config.email, config.password);
        let title = login_Page.getPageTitle();
        expect(title).to.equal("Kundenkonto | INTERSPORT");
        let welcomeMsg = login_Page.getMsgText();
        console.log(welcomeMsg);
        expect(welcomeMsg).to.include("WILLKOMMEN,");
    });

    it("Test 3: Should not be able to login with an existing user email and old password", () => {
        login_Page.doLogin(config.email, config.oldPassword);
        let title = login_Page.getPageTitle();
        expect(title).to.include("Mein Konto - Kundenlogin INTERSPORT-Shop");
        let errorMsg = login_Page.getErrorText();
        expect(errorMsg).to.include("Das hat leider nicht funktioniert. Prüfe bitte, ob du die richtige E-Mail-Adresse und das richtige Passwort verwendest.");
    });
});