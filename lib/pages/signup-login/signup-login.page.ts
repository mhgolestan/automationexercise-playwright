import { type Locator, type Page } from "@playwright/test";

export class SignupLoginPage {
  readonly page: Page;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signinEmailInput: Locator;
  readonly signinPasswordInput: Locator;
  readonly signinButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupNameInput = page.getByTestId("signup-name");
    this.signupEmailInput = page.getByTestId("signup-email");
    this.signupButton = page.getByTestId("signup-button");

    this.signinEmailInput = page.getByTestId("login-email");
    this.signinPasswordInput = page.getByTestId("login-password");
    this.signinButton = page.getByTestId("login-button");
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL + "/login");
  }

  async loginForm(email: string, password: string) {
    await this.signinEmailInput.fill(email);
    await this.signinPasswordInput.fill(password);
  }
  
  async submitLogin() {
    await this.signinButton.click();
  }

  async signupForm(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }
  async submitSignup() {
    await this.signupButton.click();
  }
}
