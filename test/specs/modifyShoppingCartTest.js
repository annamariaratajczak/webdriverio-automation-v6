const config = require("../config/main-config.js");
const productListing_Page = require("../pageobjects/ProductListing_Page.js");
const shoppingCart_Page = require("../pageobjects/ShoppingCart_Page.js");
const productQuickView_Page = require("../pageobjects/ProductQuickView_Page.js");
const expect = require("chai").expect;

describe("Modify the shopping cart content:", () => {
  beforeEach(function () {
    browser.maximizeWindow();
    browser.url("./bekleidung/");
    productListing_Page.clickAcceptCookies();
    productListing_Page.clickAddToCartBtn();
    productQuickView_Page.quickViewOverlay.waitForDisplayed({ timeout: 5000 });
    expect(productQuickView_Page.quickViewOverlay.isDisplayed()).to.be.true;
    productQuickView_Page.clickAddToCartBtn();
    productListing_Page.cartFlyout.waitForDisplayed({ timeout: 5000 });
    productListing_Page.clickToCartBtn();
  });
  
  afterEach(function () {
    browser.deleteCookies();
    browser.deleteLocalStorage();
  });

  it("Test 1: Shopping cart page should have the right title", () => {
    shoppingCart_Page.checkBrowserTitle("Warenkorb | INTERSPORT");
  });

  it("Test 2: Should be able to remove the item from the shopping cart", () => {
    shoppingCart_Page.removeArticle();
    expect(shoppingCart_Page.getEmptyCartHeadline()).to.equal("DEIN WARENKORB IST LEER");
  });

  it("Test 3: Should be able to increase the quantity of the same item. The total price should be multiplied", () => {
    let sumForSingleItem = shoppingCart_Page.getTotalSumOfArticles();
    shoppingCart_Page.selectArticleQuantity();
    let quantity = shoppingCart_Page.getQuantityValue();
    expect(sumForSingleItem * quantity).to.equal(shoppingCart_Page.getTotalSumOfArticles());
  });

  it("Test 4: Should be able to reverse the removal of the item from the shopping cart within 5 seconds from the removal", () => {
    shoppingCart_Page.removeArticle();
    shoppingCart_Page.cancelRemoveArticle();
    expect(shoppingCart_Page.articleBlock.isDisplayed()).to.be.true;
  });

  it("Test 5: Should be able to change the color and size of the article added to the cart", () => {
    shoppingCart_Page.clickChangeArtProperties();
    productQuickView_Page.waitToBeVisible();
    expect(productQuickView_Page.quickViewOverlay.isDisplayed()).to.be.true;
    productQuickView_Page.selectArticleColorOption();
    productQuickView_Page.selectArticleSizeOption();
    let articleColorQV = productQuickView_Page.getArticleColor();
    let articleSizeQV = productQuickView_Page.getArticleSize();
    shoppingCart_Page.clickUpdateArticleBtn();
    productQuickView_Page.quickViewOverlay.waitForDisplayed({ reverse: true });
    expect(shoppingCart_Page.getArticleColor()).to.equal(articleColorQV);
    expect(shoppingCart_Page.getArticleSize()).to.equal(articleSizeQV);
    shoppingCart_Page.removeArticle();
  });

  it("Test 6: Should be able to add an article from the section 'ANDERE KUNDEN KAUFTEN AUCH' displayed in the shopping cart", () => {
    expect(shoppingCart_Page.getHeadlineOfRecommendationSection()).to.equal("ANDERE KUNDEN KAUFTEN AUCH");
    //shoppingCart_Page.recommendationSlider.waitForDisplayed({ timeout: 15000 });
    //expect(shoppingCart_Page.recommendationSlider.isDisplayed()).to.be.true;
    //browser.saveScreenshot('../webdriverio-automation-v6/errorShots/screenshot.png');
    let sliderArtName = shoppingCart_Page.getRecommendedArtName();
    shoppingCart_Page.clickAddToCartBtnSlider();
    let overlayArtName = productQuickView_Page.getArticleName();
    expect(productQuickView_Page.quickViewOverlay.isDisplayed()).to.be.true;
    expect(overlayArtName).to.equal(sliderArtName);
    productQuickView_Page.clickAddToCartBtn();
    productQuickView_Page.quickViewOverlay.waitForDisplayed({ reverse: true });
    expect(productQuickView_Page.quickViewOverlay.isDisplayed()).to.be.false;
    expect(shoppingCart_Page.getCartArticleName()).to.include(sliderArtName);
  });

  it("Test 7: All expected elements of the shopping cart for a non-logged-in user are displayed ", () => {});
});
