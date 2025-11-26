import { test as setup } from "@playwright/test";
import { generateRandomUser } from "@datafactory/register";
import * as path from "node:path";

const user01AuthFile = path.join(__dirname, '../.auth/user01Auth.json');
setup.use({
  headless: true,
});

setup("Create test user before tests", async ({ page, context }) => {
  const registeredUser = await generateRandomUser();

  await page.goto('https://www.automationexercise.com/');
  await page.getByRole("button", { name: "Consent" }).click();
  await page.getByRole("link", { name: "Signup / Login" }).click();

  await page.getByTestId("signup-name").fill(registeredUser.username);
  await page.getByTestId("signup-email").fill(registeredUser.email);
  await page.getByTestId("signup-button").click();

  await page.getByTestId("password").fill(registeredUser.password);

  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('1');
  await page.locator('#years').selectOption('2000');
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

  await page.getByTestId("first_name").fill(registeredUser.firstName);
  await page.getByTestId("last_name").fill(registeredUser.lastName);
  await page.getByTestId("company").fill(registeredUser.company);
  await page.getByTestId("address").fill(registeredUser.address);

  await page.getByLabel('Country *').selectOption(registeredUser.country);

  await page.getByTestId("state").fill(registeredUser.state);
  await page.getByTestId("city").fill(registeredUser.city);
  await page.getByTestId("zipcode").fill(registeredUser.zipcode);
  await page.getByTestId("mobile_number").fill(registeredUser.mobileNumber);
  await page.getByTestId("create-account").click();

  await page.getByRole('link', { name: 'Continue' }).click();

  await context.storageState({ path: user01AuthFile });
  await page.close();

});