import { generateUserData } from "@datafactory/register";
import { test, expect } from "@fixtures/pages.fixtures";
import { getRegisteredUser } from "@helpers/auth-helper";

test.describe("Register User Suite ", () => {

  test.beforeEach(async ({ homePage, signupLoginPage }) => {
    await test.step("1. Launch browser and 2. Navigate to home page", async () => {
      await homePage.goto();
    });

    await test.step("3. Verify that home page is visible successfully", async () => {
      await homePage.waitForPageLoad();
      await homePage.popupConsent();
      await expect(homePage.locatorHomepageHeader).toBeVisible();
    });

    await test.step("4. Click on 'Signup / Login' button", async () => {
      await homePage.navigateToSignupLogin();
    });

    await test.step("5. Verify 'New User Signup!' is visible", async () => {
      await expect(signupLoginPage.newUserSignupHeader).toBeVisible();
    });

  });

  test("Test Case 1: Register User", async ({ homePage, signupLoginPage, signupFormPage }) => {
    const userData = generateUserData();

    await test.step("6. Enter name and email address", async () => {
      await signupLoginPage.signupForm(userData.name, userData.email);
    });

    await test.step("7. Click 'Signup' button", async () => {
      await signupLoginPage.submitSignup();
    });

    await test.step("8. Verify that 'Enter Account Information' is visible", async () => {
      await expect(signupFormPage.enterAccountInfoHeader).toBeVisible();
    });

    await test.step("9, 10, 11 and 12. Fill signup form", async () => {
      await signupFormPage.fillSignupForm(userData);
    });

    await test.step("13. Click 'Create Account' button", async () => {
      await signupFormPage.submitSignupForm();
    });

    await test.step("14. Verify that 'Account Created!' is visible", async () => {
      await expect(signupFormPage.accountCreatedText).toBeVisible();
    });

    await test.step("15. Click 'Continue' button", async () => {
      await signupFormPage.clickContinue();
    });

    await test.step("16. Verify that 'Logged in as username' is visible", async () => {
      await expect(homePage.getLoggedInAsText(userData.name)).toBeVisible();
    });

    await test.step("17. Click 'Delete Account' button", async () => {
      await signupFormPage.clickDeleteAccount();
    });

    await test.step("18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button", async () => {
      await expect(signupFormPage.accountDeletedText).toBeVisible();
    });
  });


  test("Test Case 5: Register User with existing email", async ({ signupLoginPage }) => {
    const { name, email } = getRegisteredUser();

    await test.step("6. Enter name and already registered email address", async () => {
      await signupLoginPage.signupForm(name, email);
    });

    await test.step("7. Click 'Signup' button", async () => {
      await signupLoginPage.submitSignup();
    });

    await test.step("8. Verify error 'Email Address already exist!' is visible", async () => {
      await expect(signupLoginPage.emailExistsError).toBeVisible();
    });
  });
});

