import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.getByRole('link', { name: ' Signup / Login' });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL + "/");
  }

  async navigateToSignupLogin() {
    await this.signupLoginLink.click();
  }
}