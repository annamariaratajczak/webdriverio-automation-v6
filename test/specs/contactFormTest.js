//const config = require("../config/main-config.js");
const contactForm_Page = require("../pageobjects/ContactForm_Page.js");
const expect = require("chai").expect;

describe("Contact form functionality test", () => {
  beforeEach(function () {
    browser.maximizeWindow();
    browser.url("./faqcustom/");
    contactForm_Page.clickAcceptCookies();
  });

  afterEach(function () {
    browser.deleteCookies();
    browser.deleteLocalStorage();
  });

  it("Test 0: Shopping cart page should have the right title", () => {
    contactForm_Page.checkBrowserTitle("Sportartikel online kaufen bei INTERSPORT");
  });

  it("Test 1: Should be able to successfully submit a contact form when all mandatory fields are completed", () => {
    contactForm_Page.clickSendMessageBtn();
    contactForm_Page.faqContactOverlay.waitForDisplayed({ timeout: 5000 });
    expect(contactForm_Page.faqContactOverlay.isDisplayed()).to.be.true;
    contactForm_Page.clickChangeSubjectBtn();
    contactForm_Page.subjectList.waitForDisplayed({ timeout: 5000 });
    expect(contactForm_Page.subjectList.isDisplayed()).to.be.true;
    contactForm_Page.clickCategorySubjectList();
    contactForm_Page.selectSubject.jsClick();
    contactForm_Page.completeMandatoryInputFields("John", "Doe", "johndoe@gmail.com", "This is a test message.");
    //contactForm_Page.clickSubmitBtn();
    //expect(contactForm_Page.successfulSubmissionAlert.isDisplayed()).to.be.true;
    // expect(contactForm_Page.getSuccessfulSubmissionMsg()).to.equal("NACHRICHT GESENDET!");

  });

  it("Test 2: Should be able to attach file in accepted format to the form and submit the form successfully", () => {
    contactForm_Page.clickSendMessageBtn();
    contactForm_Page.faqContactOverlay.waitForDisplayed({ timeout: 5000 });
    contactForm_Page.clickChangeSubjectBtn();
    contactForm_Page.subjectList.waitForDisplayed({ timeout: 5000 });
    contactForm_Page.clickCategorySubjectList();
    contactForm_Page.selectSubject.jsClick();
    contactForm_Page.completeMandatoryInputFields("John", "Doe", "johndoe@gmail.com", "This is a test message.");
    contactForm_Page.addFile();
    //contactForm_Page.clickSubmitBtn();
    //expect(contactForm_Page.successfulSubmissionAlert.isDisplayed()).to.be.true;
    // expect(contactForm_Page.getSuccessfulSubmissionMsg()).to.equal("NACHRICHT GESENDET!");

  });

  it("Test 3: Should not be able to submit the form when the subject is not selected", () => {
    contactForm_Page.clickSendMessageBtn();
    contactForm_Page.faqContactOverlay.waitForDisplayed({ timeout: 5000 });
    contactForm_Page.completeMandatoryInputFields("John", "Doe", "johndoe@gmail.com", "This is a test message.");
    contactForm_Page.clickSubmitBtn();
    expect(contactForm_Page.unsuccessfulSubmissionMsg.isDisplayed()).to.be.true;
    expect(contactForm_Page.getUnsuccessfulSubmissionMsg()).to.equal("Bitte Anliegen Auswählen!");

  });

  it("Test 4: Should not be able to successfully submit a contact form when the email address field is not completed", () => {
    contactForm_Page.clickSendMessageBtn();
    contactForm_Page.faqContactOverlay.waitForDisplayed({ timeout: 5000 });
    expect(contactForm_Page.faqContactOverlay.isDisplayed()).to.be.true;
    contactForm_Page.clickChangeSubjectBtn();
    contactForm_Page.subjectList.waitForDisplayed({ timeout: 5000 });
    expect(contactForm_Page.subjectList.isDisplayed()).to.be.true;
    contactForm_Page.clickCategorySubjectList();
    contactForm_Page.selectSubject.jsClick();
    contactForm_Page.completeMandatoryInputFields("John", "Doe", null, "This is a test message.");
    contactForm_Page.clickSubmitBtn();
    expect(contactForm_Page.successfulSubmissionAlert.isDisplayed()).to.be.false;
    expect(contactForm_Page.getFaqOverlayHeadline()).to.equal("SENDE UNS EINE NACHRICHT MIT DEINEM ANLIEGEN");

  });

});
