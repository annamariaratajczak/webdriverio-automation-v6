const expect = require('chai').expect;

class ShoppingCart_Page {

  get browserTitle() { return $("/html/head/meta[5]");}
  get articleColor() { return $(".block-group.is--last-row.row--product.table--tr .content--web-color");}
  get articleSize() { return $(".content--size");}
  get articleQuantity() { return $("select[name='sQuantity']");}
  get totalSum() { return $(".prices--container--total-sum-value");}
  get xBtn() { return $(" .cart--remove-item .icon--cross");}
  get emptyHeadline() { return $(".cart-banner--headline");}
  get cancelRemove() { return $(".cart-deletion-overlay--cancel-link");}
  get articleBlock() { return $(".block-group.is--last-row.row--product.table--tr");}
  get deleteBlock() { return $("[data-endpoint] > div:nth-of-type(1)");}
  get changeArtProperties() { return $(".product--change-container [data-off-canvas-quickview]");}
  get otherCustomersAlsoBoughtHeadline() { return $(".checkout-recommendation--header");}
  get recommendationSlider() { return $(".product-slider--container.js--scroll-progress-target-5f4f7d43b5cc4.is--horizontal");}
  get recommendationsAddToCartBtn() { return $("div:nth-of-type(1) > .box--gallery.cursor-pointer.product--box  button[title='Zum Warenkorb hinzufügen']");}
  get updateArtBtn() { return $("button[title='Artikel Aktualisieren']");}
  get orderNo() { return $("div:nth-of-type(1) > .box--gallery.cursor-pointer.product--box");}
  get articleName() { return $$(".content--title")[1];}
 

getCartArticleName() {
  return this.articleName.getText();
 
}

  getRecommendedArtName() {
    let orderNo = this.orderNo.getAttribute("data-ordernumber");
    return browser.$("[data-parent-ordernumber='" + orderNo + "'] .product--description").getText();
  }


  clickUpdateArticleBtn() {
    return this.updateArtBtn.click();
  }

  clickAddToCartBtnSlider() {
    return this.recommendationsAddToCartBtn.click();
  }

  clickChangeArtProperties() {
    return this.changeArtProperties.click();
  }

  getHeadlineOfRecommendationSection() {
    return this.otherCustomersAlsoBoughtHeadline.getText();
  }

  cancelRemoveArticle() {
    this.cancelRemove.waitForExist({ timeout: 1000 });
    return this.cancelRemove.click();
  }

  removeArticle() {
   return this.xBtn.click();
  }

  getEmptyCartHeadline() {
    return this.emptyHeadline.getText();
  }

  getTotalSumOfArticles() {
    return parseFloat((parseFloat(this.totalSum.getText().replace(",", "."))- 3.95).toFixed(2));

    /*
    let totalSumValue = this.totalSum.getText().replace(",", ".");
    let toNumber = parseFloat(totalSumValue);
    let minusShipping = toNumber - 3.95;
    let itemSum = parseFloat(minusShipping.toFixed(2));
    return itemSum;
    */
  }

  getQuantityValue() {
    return parseFloat(this.articleQuantity.getValue());
  }

  checkBrowserTitle(browserTitle) {
    this.browserTitle.waitForExist({ timeout: 5000 });
    let getBrowserTitle = browser.getTitle();
    expect(getBrowserTitle).to.equal(browserTitle);
  }

  getArticleColor() {
    return this.articleColor.getText().toUpperCase().replace("FARBE: ", "");
  }

  getArticleSize() {
    return this.articleSize.getText().replace("Größe: ", "");
  }

  selectArticleQuantity() {
    this.articleQuantity.click();
    browser.keys("\uE015");
    browser.keys("\uE007");
  }
}

module.exports = new ShoppingCart_Page();
