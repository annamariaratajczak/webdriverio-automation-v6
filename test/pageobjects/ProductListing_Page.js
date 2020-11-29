const elementUtil = require("../util/elementUtil");
const expect = require('chai').expect;

class ProductListing_Page {
  get addToCartBtn() { return $(".listing > div:nth-of-type(3)  button[title='Zum Warenkorb hinzufügen']"); }
  get articleNameCartFlyout() { return $(".flyout-cart-item--name");}
  get toCartBtnFlyout() { return $(".btn.flyout-cart--action.is--full-width.is--ghost-secondary.is--icon-right.is--upercase.is--uppercase.js--cart-link > .btn--content"); }
  get cartFlyout() { return $("[data-flyout-cart]");}
  get browserTitle() { return $("/html/head/meta[5]");}
  get xBtnFlyout() { return $("[data-amount] .js--cart-item:nth-of-type(1) .icon--cross");}
  get emptyFlyoutText() { return $(".flyout-cart-item--empty-text");}
  get acceptCookies() { return $(".btn.is--primary.js--cookie-banner-accept") };
  
  clickAcceptCookies(){
    return elementUtil.doClick(this.acceptCookies); 
}

  clickAddToCartBtn() {
    this.addToCartBtn.waitForClickable({ timeout: 3000 });
    return this.addToCartBtn.click();
  }

  clickAddToCartBtn1() {
    return this.addToCartBtn1.click();
  }

  clickXBtnFlyout() {
    return this.xBtnFlyout.click();
  }

  getArticleName() {
    return this.articleNameCartFlyout.getText();
  }

  getEmptyFlyoutText() {
    return this.emptyFlyoutText.getText();
  }

  clickToCartBtn() {
    return this.toCartBtnFlyout.click();
   
  }

  checkBrowserTitle(browserTitle) {
    this.browserTitle.waitForExist({ timeout: 5000 });
    let getBrowserTitle = browser.getTitle();
    expect(getBrowserTitle).to.equal(browserTitle);
    console.log("Title is: " + browserTitle);
  }
}

module.exports = new ProductListing_Page();
