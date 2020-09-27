class ProductQuickView_Page {

  get quickViewOverlay() { return $(".quickview-product-slider-container"); }
  get addToCartBtn() { return $(".js--quickview-product-button"); }
  get articleName() { return $(".quickview-product-info--description"); }
  get articleColor() { return $$(".quickview-color-scroll-slider--color")[1]; }
  get articleColorOption() { return $$(".configurator--variant input")[1]; }
  get articleSizeOption() { return $$(".js--color-switch-target.quickview-color-switch-targer.variant--group  .js--config-select.quickview-product-size--select")[1]; }

  selectArticleColorOption() {
    this.articleColorOption.click();
  }

  selectArticleSizeOption() {
    this.articleSizeOption.click();
    browser.keys("\uE015");
    browser.keys("\uE007");
  }

  getArticleName() {
    return this.articleName.getText();
  }

  getArticleSize() {
    let size = this.articleSizeOption.getValue();

    if (size === "643") {
      size = "S";
    }
    if (size === "644") {
      size = "M";
    }
    if (size === "645") {
      size = "L";
    }
    if (size === "646") {
      size = "XL";
    }
    if (size === "648") {
      size = "XXL";
    }
    console.log("size value: " + size);
    return size;
  }

  clickAddToCartBtn() {
    return this.addToCartBtn.click();
  }

  getArticleColor() {
    return this.articleColor.getText().toUpperCase();
  }

  checkBrowserTitle(browserTitle) {
    this.browserTitle.waitForExist({ timeout: 5000 });
    let getBrowserTitle = browser.getTitle();
    expect(getBrowserTitle).to.equal(browserTitle);
    console.log("Title is: " + browserTitle);
  }

  waitToBeVisible() {
    this.quickViewOverlay.waitForDisplayed({
      timeout: 10000,
    });
  }
}

module.exports = new ProductQuickView_Page();
