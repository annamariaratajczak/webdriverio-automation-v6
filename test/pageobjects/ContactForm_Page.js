const elementUtil = require("../util/elementUtil");
const expect = require('chai').expect;
const path = require('path');

class ContactForm_Page {
    get browserTitle() { return $("/html/head/meta[5]"); }
    get sendMessageBtn() { return $(".faq--message-link"); }
    get faqContactOverlay() { return $("/html/body/div[4]"); }
    get faqOverlayHeadline() { return $(".customer-faq-form--headline"); }
    get firstName() { return $("#vorname"); }
    get lastName() { return $("#nachname"); }
    get emailAddress() { return $("#email"); }
    get message() { return $("#nachricht"); }
    get changeSubjectBtn() { return $(".customer-faq--request-link.js--faq-request-show-list-btn.link--primary > .on--inactive"); }
    get categorySubjectList() { return $(".faq--subject-list:nth-of-type(1) [data-collapse-panel] span:nth-child(2)"); }
    get subjectList() { return $(".js--faq-request-list"); }
    get selectSubject() { return $$(".faq--subject-label")[0]; }
    get addFileBtn() { return $(".file-label--link"); }
    get inputFile() { return $("//input[@class='normal file js--file']"); }
    get submitBtn() { return $("//form[@id='support']//button[@name='Submit']"); }
    get successfulSubmissionAlert() { return $(".faq--success"); }
    get successfulSubmissionMsg() { return $(".faq--success .faq--response-headline"); }
    get unsuccessfulSubmissionMsg() { return $(".alert.is--error.js--faq-subject-required"); }
    get acceptCookies() { return $(".btn.is--primary.js--cookie-banner-accept") };
  
  clickAcceptCookies(){
    return elementUtil.doClick(this.acceptCookies); 
}

    getFaqOverlayHeadline() {
        return this.faqOverlayHeadline.getText();
    }

    getSuccessfulSubmissionMsg() {
        return this.successfulSubmissionMsg.getText();

    }

    getUnsuccessfulSubmissionMsg() {
        return this.unsuccessfulSubmissionMsg.getText();

    }

    waitToBeDisplayed(el) {
        el.waitForDisplayed({ timeout: 5000 });
    }

    clickSubmitBtn() {
        this.submitBtn.click();

    }

    clickAddFileBtn() {
        this.addFileBtn.click();
    }

    addFile() {
        const filePath = path.join(__dirname, '../../testfile.pdf');
        console.log(filePath);
        this.inputFile.addValue(filePath)
        browser.pause(5000);
    }

    checkBrowserTitle(browserTitle) {
        this.browserTitle.waitForExist({ timeout: 5000 });
        let getBrowserTitle = browser.getTitle();
        expect(getBrowserTitle).to.equal(browserTitle);
        console.log("Title is: " + browserTitle);
    }

    clickSendMessageBtn() {
        this.sendMessageBtn.click();
    }

    completeMandatoryInputFields(firstName, lastName, emailAddress, message) {
        if (firstName) {
            this.firstName.setValue(firstName);
        }

        if (lastName) {
            this.lastName.setValue(lastName);
        }

        if (emailAddress) {
            this.emailAddress.setValue(emailAddress);
        }

        if (message) {
            this.message.setValue(message);
        }
    }

    clickChangeSubjectBtn() {
        this.changeSubjectBtn.click();
    }

    clickCategorySubjectList() {
        this.categorySubjectList.click();
    }

    clickSelectSubject() {
        this.selectSubject.waitForDisplayed({ timeout: 5000 });
        this.selectSubject.click();
    }
}

module.exports = new ContactForm_Page();
