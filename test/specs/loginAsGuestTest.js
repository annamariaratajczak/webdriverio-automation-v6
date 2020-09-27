//const config = require("../config/main-config.js");
const loginAsGuest_Page = require("../pageobjects/loginAsGuest_Page.js");
const expect = require('chai').expect;

describe("My account - Login as guest", () => {

  beforeEach(function () {
    browser.maximizeWindow();
    browser.url("./mein-konto/");
    loginAsGuest_Page.clickAcceptCookies();
    });

  afterEach(function () {
    browser.deleteCookies();
    browser.deleteLocalStorage();
  });

  it("Test 1: Login page should have the right title", () => {
    let title = loginAsGuest_Page.getPageTitle()
    expect(title).to.equal("Mein Konto - Kundenlogin INTERSPORT-Shop");
  });


  it("Test 2: Should be able to register successfully as a guest by completing all mandatory fields", () => {
    loginAsGuest_Page.clickAsGuestBtn();
    loginAsGuest_Page.doCompleteMandatoryFields("sportler", "John", "Doe", "john.doe@gmail.com", "Doestrasse", "3", "12345", "Berlin");
    loginAsGuest_Page.clickGuestPrivacyCheckbox();
    loginAsGuest_Page.clickSubmitBtn();
    let title = loginAsGuest_Page.getPageTitle()
    expect(title).to.equal("Warenkorb | INTERSPORT");

  });


  it("Test 3: The submit button should be disabled when the Privacy Policy checkbox is not checked", () => {
    loginAsGuest_Page.clickAsGuestBtn();
    loginAsGuest_Page.doCompleteMandatoryFields("sportler", "John", "Doe", "john.doe@gmail.com", "Doestrasse", "3", "12345", "Berlin");
    let isEnabled = loginAsGuest_Page.isSubmitBtnEnabled();
    expect(isEnabled).to.equal(false);
    console.log(isEnabled);
    loginAsGuest_Page.clickGuestPrivacyCheckbox();
    browser.pause(2000);
    isEnabled = loginAsGuest_Page.isSubmitBtnEnabled();
    console.log(isEnabled);
    expect(isEnabled).to.equal(true);
    loginAsGuest_Page.clickGuestPrivacyCheckbox();
    isEnabled = loginAsGuest_Page.isSubmitBtnEnabled();
    expect(isEnabled).to.equal(false);
    console.log(isEnabled);
  });


  it("Test 4: The submit button should be disabled when one of the mandatory input fields is erased. The empty mandatory field should be highlighted in red", () => {
    loginAsGuest_Page.clickAsGuestBtn();
    loginAsGuest_Page.doCompleteMandatoryFields("sportler", "John", "Doe", "john.doe@gmail.com", "Doestrasse", "3", "12345", "Berlin");
    let isEnabled = loginAsGuest_Page.isSubmitBtnEnabled();
    expect(isEnabled).to.equal(false);
    loginAsGuest_Page.clickGuestPrivacyCheckbox();
    loginAsGuest_Page.waitForBtnToBeEnabled();
    isEnabled = loginAsGuest_Page.isSubmitBtnEnabled();
    expect(isEnabled).to.equal(true);
    loginAsGuest_Page.clearInputValue(loginAsGuest_Page.guestCity);
    loginAsGuest_Page.clearInputValue(loginAsGuest_Page.guestName);
    loginAsGuest_Page.clearInputValue(loginAsGuest_Page.guestPlz);
    browser.pause(1000);
    isEnabled = loginAsGuest_Page.isSubmitBtnEnabled();
    expect(isEnabled).to.equal(false);
    loginAsGuest_Page.checkInputFieldColor(loginAsGuest_Page.guestCity);
    loginAsGuest_Page.checkInputFieldColor(loginAsGuest_Page.guestName);
    loginAsGuest_Page.checkInputFieldColor(loginAsGuest_Page.guestPlz);
  });


  it("Test 5: Email input field is visible only after the gender, first name, and last name are completed", () => {
    loginAsGuest_Page.clickAsGuestBtn();
    let isExpanded = loginAsGuest_Page.isEmailSectionExpanded();
    expect(isExpanded).to.be.false;
    loginAsGuest_Page.doCompleteMandatoryFields("sportler", null, null, null, null, null, null, null);
    isExpanded = loginAsGuest_Page.isEmailSectionExpanded();
    expect(isExpanded).to.be.false;
    loginAsGuest_Page.doCompleteMandatoryFields(null, "John", null, null, null, null, null, null);
    isExpanded = loginAsGuest_Page.isEmailSectionExpanded();
    expect(isExpanded).to.be.false;
    loginAsGuest_Page.doCompleteMandatoryFields(null, null, "Doe", null, null, null, null, null);
    browser.pause(1000);
    isExpanded = loginAsGuest_Page.isEmailSectionExpanded();
    expect(isExpanded).to.be.true;
  });

  it("Test 6: Address input fields are visible only after the gender, first name, last name, and email are completed", () => {
    loginAsGuest_Page.clickAsGuestBtn();
    expect(loginAsGuest_Page.isAddressSectionExpanded()).to.be.false;
    loginAsGuest_Page.doCompleteMandatoryFields("sportler", null, null, null, null, null, null, null);
    expect(loginAsGuest_Page.isAddressSectionExpanded()).to.be.false;
    loginAsGuest_Page.doCompleteMandatoryFields(null, "John", null, null, null, null, null, null);
    expect(loginAsGuest_Page.isAddressSectionExpanded()).to.be.false;
    loginAsGuest_Page.doCompleteMandatoryFields(null, null, "Doe", null, null, null, null, null);
    expect(loginAsGuest_Page.isAddressSectionExpanded()).to.be.false;
    loginAsGuest_Page.doCompleteMandatoryFields(null, null, null, "johndoe@gmail.com", null, null, null, null);
    browser.pause(1000);
    expect(loginAsGuest_Page.isAddressSectionExpanded()).to.be.true;
  });

});
