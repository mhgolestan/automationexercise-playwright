import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly consentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.consentButton = page.getByRole("button", { name: "Consent" });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL + "/");
  }

  async navigateToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async popupConsent() {
    if (await this.consentButton.isVisible()) {
      await this.consentButton.click();
    }
  }
}