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

  doGetPageTitle(pageTitle) {
    browser.waitUntil(function () {
      return (browser.getTitle() === pageTitle)
    }, 10000, "Page title is not displayed after the given time.");
    return browser.getTitle();
  }

  doIsSelected(element) {
    element.waitForDisplayed();
    return element.isSelected();
  }

  doIsEnabled(element) {
    element.waitForEnabled({ timeout: 5000 });
    return element.isEnabled();
  }

  doIsDisplayed(element) {
    return element.isDisplayed();
  }

}

module.exports = new ElementUtil();
