import { test, expect } from "@fixtures/pages.fixtures";
import * as fs from "node:fs";
import * as path from "node:path";

test.describe("Register User Suite ", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.popupConsent();
    await homePage.navigateToSignupLogin();
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Register New User", async ({ page, signupLoginPage, signupFormPage }) => {

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


  test("signup with already registered email", async ({ page, signupLoginPage }) => {
    await test.step("Click on 'Signup / Login' button", async () => {
      await page.getByRole("link", { name: " Signup / Login" }).click();
    });

    await test.step("Verify 'New User Signup!' is visible", async () => {
      await expect(page.getByRole("heading", { name: "New User Signup!" })).toBeVisible();
    });

    const registeredUserPath = path.join(process.cwd(), '.auth/registeredUser.json');
    const registeredUser = JSON.parse(fs.readFileSync(registeredUserPath, 'utf-8'));

    await test.step("Attempt signup with existing email", async () => {
    await signupLoginPage.signup(registeredUser.username, registeredUser.email);
    });
    
    await test.step("Verify error 'Email Address already exist!' is visible", async () => {
      await expect(page.getByText('Email Address already exist!')).toBeVisible();
    });
  });
});

