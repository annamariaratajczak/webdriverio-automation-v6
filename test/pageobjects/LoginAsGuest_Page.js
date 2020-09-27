const elementUtil = require("../util/elementUtil");
//const { browserTitle } = require("./ShoppingCart_Page");
const expect = require('chai').expect;

class LoginAsGuest_Page {

    get asGuestBtn() { return $(".js--panel-guest-info [data-collapse-panel]"); }
    get guestSalutationMs() { return $("#guest_personal_salutation_ms"); }
    get guestSalutationMr() { return $("#guest_personal_salutation_mr"); }
    get guestName() { return $("#guest_firstname"); }
    get guestLastName() { return $("#guest_lastname"); }
    get guestEmail() { return $("#guest_register_personal_email"); }
    get guestStreet() { return $("#guest_street"); }
    get guestHouseNo() { return $("#guest_housenumber"); }
    get guestPlz() { return $("#guest_zipcode"); }
    get guestCity() { return $("#guest_city"); }
    get guestCountry() { return $("#guest_country") };
    get guestPrivacyCheckbox() { return $("#guest_dpacheckbox") };
    get guestSubmitBtn() { return $(".js--panel-guest .js--step-submit") };
    get guestNameSection() { return $(".js--panel-guest.js--tracking-register > div:nth-of-type(1)") };
    get guestAddressSection() { return $(".register--guest .js--step-billing-address") };
    get guestEmailSection() { return $(".js--panel-guest .js--step:nth-of-type(2)") };
    get acceptCookies() { return $(".cookie-banner--button-accept-minimum > i:nth-child(1)") };


    clickAsGuestBtn() {
        return elementUtil.doClick(this.asGuestBtn);
    }

    getPageTitle() {
        return elementUtil.doGetPageTitle();
    }

    clickGuestPrivacyCheckbox() {
        elementUtil.doClick(this.guestPrivacyCheckbox);
    }

    clickSubmitBtn() {
        this.guestSubmitBtn.waitForEnabled();
        elementUtil.doClick(this.guestSubmitBtn);
    }

    isSubmitBtnEnabled() {
        return elementUtil.doIsEnabled(this.guestSubmitBtn);
    }

    waitForBtnToBeEnabled() {
        this.guestSubmitBtn.waitForEnabled({ timeout: 3000 });
    }

    isAddressSectionExpanded() {
        return this.guestAddressSection.getAttribute("class").includes("is--active");
    }

    doCompleteMandatoryFields(salutation, guestName, guestLastName, guestEmail, guestStreet, guestHouseNo, guestPlz, guestCity) {

        if (salutation === "sportlerin") {
            browser.pause(1000);
            this.guestSalutationMs.waitForClickable({ timeout: 10000 });
            this.guestSalutationMs.click();
        }

        if (salutation === "sportler") {
            browser.pause(1000);
            this.guestSalutationMr.waitForClickable({ timeout: 10000 });
            this.guestSalutationMr.click();
        }

        if (guestName) {
            this.guestName.setValue(guestName);
        }

        if (guestLastName) {
            this.guestLastName.setValue(guestLastName);
        }

        if (guestEmail) {
            this.guestEmail.waitForDisplayed({ timeout: 3000 });
            this.guestEmail.setValue(guestEmail);

        }

        if (guestStreet) {
            this.guestStreet.waitForDisplayed({ timeout: 3000 });
            this.guestStreet.setValue(guestStreet);

        }

        if (guestHouseNo) {
            this.guestHouseNo.waitForDisplayed({ timeout: 3000 });
            this.guestHouseNo.setValue(guestHouseNo);
        }

        if (guestPlz) {
            this.guestPlz.waitForDisplayed({ timeout: 3000 });
            this.guestPlz.setValue(guestPlz);
        }

        if (guestCity) {
            this.guestCity.waitForDisplayed({ timeout: 3000 });
            this.guestCity.setValue(guestCity);
        }

    }

    clickAcceptCookies() {
        return elementUtil.doClick(this.acceptCookies);
    }

    clickGuestPrivacyCheckbox() {
        return this.guestPrivacyCheckbox.click();
    }

    clearInputValue(inputField) {
        let value = inputField.getValue()
        inputField.clearValue()
        value = inputField.getValue()
        expect(value).to.equal("");
    }

    isEmailSectionExpanded() {
        return this.guestEmailSection.getAttribute("class").includes("is--active");
    }

    checkInputFieldColor(inputFieldName) {
        let inputField = $(inputFieldName);
        let color = inputField.getCSSProperty('background');
        expect(color.parsed.hex).to.equal("#fbd2d3");
        return color.parsed.hex
    }

}

module.exports = new LoginAsGuest_Page();