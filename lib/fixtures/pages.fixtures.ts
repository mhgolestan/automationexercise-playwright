import { SignupLoginPage } from "@pages/signup-login/signup-login.page";
import { HomePage } from "@pages/home/home.page";
import { SignupFormPage } from "@pages/signup-form/signup-form.page";
import {test as baseTest} from "@playwright/test";

type MyPages = {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  signupFormPage: SignupFormPage;
};

export const test = baseTest.extend<MyPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupLoginPage: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },
  signupFormPage: async ({ page }, use) => {
    await use(new SignupFormPage(page));
  },
});

export { expect } from "@playwright/test";
