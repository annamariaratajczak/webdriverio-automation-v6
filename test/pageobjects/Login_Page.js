const elementUtil = require("../util/elementUtil");

class Login_Page {
    get email() { return $("#email"); }
    get password() { return $("#passwort"); }
    get oldPassword() { return $("#passwort"); }
    get submitBtn() { return $("[name] button"); }
    get loginError() { return $(".is--error .alert--content"); }
    get logoutBtn() { return $("[data-subcategory-nav] .link--logout") }
    get acceptCookies() { return $(".btn.is--primary.js--cookie-banner-accept") };
  
  clickAcceptCookies(){
    return elementUtil.doClick(this.acceptCookies); 
}

    // my account PO
    get welcomeMsg() { return $(".account--welcome h1"); }


    getPageTitle(){
        return elementUtil.doGetPageTitle()
    }

    doLogin(emailID, pwd){
        elementUtil.doSetValue(this.email, emailID);
        elementUtil.doSetValue(this.password, pwd);
        elementUtil.doClick(this.submitBtn);
    }

    getMsgText(){
        return elementUtil.doGetText(this.welcomeMsg);
    }

    getErrorText(){
        return elementUtil.doGetText(this.loginError);
    }


/*
    setOldPassword(oldPassword) {
        return this.oldPassword.setValue(oldPassword);
    }

    clickSubmit(submitBtn) {
        return this.submitBtn.click();
    }

    clickLogoutBtn(logoutBtn) {
        return this.logoutBtn.click();

    }
    checkBrowserTitle(browserTitle) {
        let getBrowserTitle = browser.getTitle();
        expect(getBrowserTitle).to.equal(browserTitle);
        console.log("Title is: " + browserTitle);
    }
*/
}

module.exports = new Login_Page();