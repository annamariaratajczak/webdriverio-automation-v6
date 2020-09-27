class ElementUtil {

  doClick(element) {
      element.waitForDisplayed();
      element.click();
  }

  doGetText(element) {
      element.waitForDisplayed();
      return element.getText();
  }

  doSetValue(element, value) {
      element.waitForDisplayed();
      element.setValue(value);
  }

  doGetPageTitle() {
      return browser.getTitle();
  }

  doIsDisplayed(element) {
      element.waitForDisplayed();
      return element.isDisplayed();
  }

  doIsEnabled(element) {
      return element.isEnabled();
  }


}

module.exports = new ElementUtil();
