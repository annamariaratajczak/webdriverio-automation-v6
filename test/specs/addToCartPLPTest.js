
const shoppingCart_Page = require("../pageobjects/ShoppingCart_Page.js");
const productListing_Page = require("../pageobjects/ProductListing_Page.js");
const productQuickView_Page = require("../pageobjects/ProductQuickView_Page.js");
const expect = require("chai").expect;

describe("Add to cart: from PLP", () => {
  beforeEach(function () {
    browser.maximizeWindow();
    browser.url("./bekleidung/");
    productListing_Page.clickAcceptCookies();
  });

  afterEach(function () {
    browser.deleteCookies();
    browser.deleteLocalStorage();
  });

  it("Test 1: Product listing page should have the right title", () => {
    productListing_Page.checkBrowserTitle("Sportbekleidung kaufen im Onlineshop von INTERSPORT");
  });

  it("Test 2: Should be able to add an article from the PLP to the shopping cart flyout", () => {
    productListing_Page.clickAddToCartBtn();
    productQuickView_Page.quickViewOverlay.waitForDisplayed({ timeout: 5000 });
    expect(productQuickView_Page.quickViewOverlay.isDisplayed()).to.be.true;
    productQuickView_Page.getArticleName();
    productQuickView_Page.clickAddToCartBtn();
    productListing_Page.getArticleName();
    expect(productListing_Page.getArticleName()).to.include(
      productQuickView_Page.getArticleName()
    );
  });

  it("Test 3: Should be able to remove an article from the shopping cart through the flyout", () => {
    productListing_Page.clickAddToCartBtn();
    productQuickView_Page.quickViewOverlay.waitForDisplayed({ timeout: 5000 });
    expect(productQuickView_Page.quickViewOverlay.isDisplayed()).to.be.true;
    productQuickView_Page.clickAddToCartBtn();
    productListing_Page.cartFlyout.waitForDisplayed({ timeout: 5000 });
    productListing_Page.clickXBtnFlyout();
    productListing_Page.emptyFlyoutText.waitForDisplayed({ timeout: 5000 });
    // productListing_Page.getEmptyFlyoutText();
    expect(productListing_Page.getEmptyFlyoutText()).to.include("Ihr Warenkorb ist leer");
  });

  it("Test 4: Should be able to add an article from the PLP to the shopping cart - in desired size and color", () => {
    productListing_Page.clickAddToCartBtn();
    productQuickView_Page.quickViewOverlay.waitForDisplayed({ timeout: 5000 });
    expect(productQuickView_Page.quickViewOverlay.isDisplayed()).to.be.true;
    productQuickView_Page.selectArticleColorOption();
    productQuickView_Page.selectArticleSizeOption();

    let articleColorOverlay = productQuickView_Page.getArticleColor();
    let articleSizeOverlay = productQuickView_Page.getArticleSize();
    productQuickView_Page.clickAddToCartBtn();
    productListing_Page.cartFlyout.waitForDisplayed({ timeout: 5000 });
    productListing_Page.clickToCartBtn();
    shoppingCart_Page.checkBrowserTitle("Warenkorb | INTERSPORT");
    shoppingCart_Page.getArticleColor();
    shoppingCart_Page.getArticleSize();
    expect(shoppingCart_Page.getArticleColor()).to.include(articleColorOverlay);
    expect(shoppingCart_Page.getArticleSize()).to.include(articleSizeOverlay);
  });
});
