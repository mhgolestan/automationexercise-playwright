import { test as setup, expect } from "@playwright/test";
import { generateRandomUser } from "@datafactory/register";
import * as fs from "fs";
import * as path from "path";

const user01AuthFile = path.join(__dirname, '../.auth/user01Auth.json');

setup("Create test user before tests", async ({ page, context }) => {
  
  await generateRandomUser();
  
  const registeredUserPath = path.join(process.cwd(), '.auth/registeredUser.json');
  const registeredUser = JSON.parse(fs.readFileSync(registeredUserPath, 'utf-8'));

  await page.goto('https://www.automationexercise.com/');
  await expect(page).toHaveTitle('Automation Exercise');
  await page.getByRole("button", { name: "Consent" }).click();
  await page.getByRole("link", { name: " Signup / Login" }).click();
  await expect(page.getByRole("heading", { name: "New User Signup!" })).toBeVisible();

  await page.getByTestId("signup-name").fill(registeredUser.username);
  await page.getByTestId("signup-email").fill(registeredUser.email);
  await page.getByTestId("signup-button").click();
  await expect(page.getByText('Enter Account Information')).toBeVisible();

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

  await expect(page.getByText('Account Created!')).toBeVisible();

  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByText(`Logged in as ${registeredUser.username}`)).toBeVisible();

  // await page.getByRole('link', { name: ' Delete Account' }).click();
  // await expect(page.getByText('Account Deleted!')).toBeVisible();



  await context.storageState({ path: user01AuthFile });
  await page.close();

});