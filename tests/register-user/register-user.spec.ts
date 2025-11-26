import { expect, test } from "@playwright/test";
import { HomePage } from "@pages/home/home.page";
import { SignupLoginPage } from "@pages/signup-login/signup-login.page";
import { SignupFormPage } from "@pages/signup-form/signup-form.page";
import * as fs from "fs";
import * as path from "path";

test.describe("Register New User ", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await page.getByRole("button", { name: "Consent" }).click();
    await homePage.navigateToSignupLogin();
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Register New User", async ({ page }) => {
    const signupLoginPage = new SignupLoginPage(page);
    const signupFormPage = new SignupFormPage(page);
  
    await test.step("Navigate to signup page", async () => {
      await expect(
        page.getByRole("heading", { name: "New User Signup!" })
      ).toBeVisible();
    });

    await test.step("Perform signup", async () => {
      signupLoginPage.signup(`test_user${Date.now()}`, `test${Date.now()}@test.test`);

      await expect(page.getByText("Enter Account Information")).toBeVisible();
    });

    await test.step("Fill signup form", async () => {
      await signupFormPage.fillSignupForm();
    });

    await test.step("Verify account creation and login", async () => {
      await expect(page.getByText("Account Created!")).toBeVisible();
      await page.getByRole("link", { name: "Continue" }).click();
      await expect(page.getByText("Logged in as test_user")).toBeVisible();
    });

    await test.step("Delete account", async () => {
      await page.getByRole("link", { name: " Delete Account" }).click();
      await expect(page.getByText("Account Deleted!")).toBeVisible();
    });
  });
});

test.describe("Create existing user", () => {
  test.beforeEach(async ({ page }) => {
    // Step 1 & 2: Launch browser and navigate to url
    await page.goto('http://automationexercise.com');
    
    // Step 3: Verify that home page is visible successfully
    await expect(page).toHaveTitle('Automation Exercise');
    await page.getByRole("button", { name: "Consent" }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("signup with already registered email", async ({ page }) => {
    // Step 4: Click on 'Signup / Login' button
    await page.getByRole("link", { name: " Signup / Login" }).click();
    
    // Step 5: Verify 'New User Signup!' is visible
    await expect(page.getByRole("heading", { name: "New User Signup!" })).toBeVisible();
    
    // Read registered user from file
    const registeredUserPath = path.join(process.cwd(), '.auth/registeredUser.json');
    const registeredUser = JSON.parse(fs.readFileSync(registeredUserPath, 'utf-8'));
    
    // Step 6: Enter name and already registered email address
    await page.getByTestId("signup-name").fill(registeredUser.username);
    await page.getByTestId("signup-email").fill(registeredUser.email);
    
    // Step 7: Click 'Signup' button
    await page.getByTestId("signup-button").click();
    
    // Step 8: Verify error 'Email Address already exist!' is visible
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});

