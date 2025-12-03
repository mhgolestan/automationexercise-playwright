import { type Locator, type Page } from '@playwright/test';
import { randomCountry } from '@helpers/countries';

export class SignupFormPage {
  readonly page: Page;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly enterAccountInfoHeader: Locator;
  readonly accountCreatedText: Locator;
  readonly continueButton: Locator;
  readonly deleteAccountLink: Locator;
  readonly accountDeletedText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordInput = page.getByTestId('password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    this.specialOffersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' });
    this.firstNameInput = page.getByTestId('first_name');
    this.lastNameInput = page.getByTestId('last_name');
    this.companyInput = page.getByTestId('company');
    this.addressInput = page.getByTestId('address');
    this.stateInput = page.getByTestId('state');
    this.cityInput = page.getByTestId('city');
    this.zipcodeInput = page.getByTestId('zipcode');
    this.mobileNumberInput = page.getByTestId('mobile_number');
    this.createAccountButton = page.getByTestId('create-account');
    this.enterAccountInfoHeader = page.getByText("Enter Account Information");
    this.accountCreatedText = page.getByText("Account Created!");
    this.continueButton = page.getByRole("link", { name: "Continue" });
    this.deleteAccountLink = page.getByRole("link", { name: " Delete Account" });
    this.accountDeletedText = page.getByText("Account Deleted!");
  }

  async fillSignupForm(userData) {
    await this.page.getByTestId('password').fill(userData.password);
    await this.page.locator('#days').selectOption(userData.birth_date);
    await this.page.locator('#months').selectOption(userData.birth_month);
    await this.page.locator('#years').selectOption(userData.birth_year);
    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    await this.page.getByTestId('first_name').fill(userData.firstname);
    await this.page.getByTestId('last_name').fill(userData.lastname);
    await this.page.getByTestId('company').fill(userData.company);
    await this.page.getByTestId('address').fill(userData.address1);
    await this.page.getByLabel('Country *').selectOption(randomCountry());
    await this.page.getByTestId('state').fill(userData.state);
    await this.page.getByTestId('city').fill(userData.city);
    await this.page.getByTestId('zipcode').fill(userData.zipcode);
    await this.page.getByTestId('mobile_number').fill(userData.mobile_number);
  }
  
  async submitSignupForm() {
    await this.createAccountButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickDeleteAccount() {
    await this.deleteAccountLink.click();
  }
}
