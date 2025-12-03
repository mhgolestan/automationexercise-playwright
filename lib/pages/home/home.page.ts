import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly locatorTitleCookies: Locator;
  readonly consentButton: Locator;
  readonly locatorHomepageHeader: Locator;
  readonly logoutLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.locatorHomepageHeader = page.getByAltText('Website for automation practice');
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.locatorTitleCookies = page.getByText('This site asks for consent to use your data')
    this.consentButton = page.getByRole("button", { name: "Consent" });
    this.logoutLink = page.getByRole("link", { name: " Logout" });

  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async goto() {
    await this.page.goto("/");
  }

  async navigateToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async popupConsent() {
    await this.page.addLocatorHandler(this.consentButton, async () => {
      await this.consentButton.click();
    });
  }

  async logout() {
    await this.logoutLink.click();
  }

  getLoggedInAsText(username: string) {
    return this.page.getByText(`Logged in as ${username}`);
  }
}