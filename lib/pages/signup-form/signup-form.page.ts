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
  }

  async fillSignupForm() {
    await this.page.getByTestId('password').fill('your_password');
    await this.page.locator('#days').selectOption('1');
    await this.page.locator('#months').selectOption('1');
    await this.page.locator('#years').selectOption('2000');
    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    await this.page.getByTestId('first_name').fill('your_first_name');
    await this.page.getByTestId('last_name').fill('your_last_name');
    await this.page.getByTestId('company').fill('your_company');
    await this.page.getByTestId('address').fill('your_address');
    await this.page.getByLabel('Country *').selectOption(randomCountry());
    await this.page.getByTestId('state').fill('your_state');
    await this.page.getByTestId('city').fill('your_city');
    await this.page.getByTestId('zipcode').fill('your_zipcode');
    await this.page.getByTestId('mobile_number').fill('your_mobile_number');
    await this.page.getByTestId('create-account').click();
  }
}
