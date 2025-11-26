import { test, expect } from "@fixtures/pages.fixtures";
import { registerUser } from "@datafactory/register";
import * as fs from "node:fs";
import * as path from "node:path";

const authFile = path.join(__dirname, '../../.auth/user01Auth.json');

test.describe("Authentication Suite", () => {
    test.describe("Login", () => {
        test.beforeEach(async ({ page, homePage }) => {
            await homePage.goto();
            await page.getByRole("button", { name: "Consent" }).click();
        });
        test.afterEach(async ({ page }) => {
            await page.close();
        });

        test("login valid user", async ({ page, homePage, signupLoginPage }) => {
            await homePage.navigateToSignupLogin();
            const registeredUserPath = path.join(process.cwd(), '.auth/registeredUser.json');
            const registeredUser = JSON.parse(fs.readFileSync(registeredUserPath, 'utf-8'));

            await signupLoginPage.login(registeredUser.email, registeredUser.password);
            await expect(page.getByText(`Logged in as`)).toBeVisible();
        });

        test("login invalid user", async ({ page, homePage, signupLoginPage }) => {
            await homePage.navigateToSignupLogin();
            await signupLoginPage.login('wrongEmail@test.test', 'wrongPassword');
            await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
        });

        test.skip("login user with datafactory", async ({ page }) => {
            const testEmail = `testuser_${Date.now()}@test.test`;
            const testPassword = "Test@12345";
            await registerUser(testEmail, testPassword);
            console.log(`Registered new user with email: ${testEmail} and password: ${testPassword}`);
            await expect(page.getByText("Login to your account")).toBeVisible();
        });
    });

    test.describe("Logout", () => {
        test.use({ storageState: authFile });

        test("logout user", async ({ page, homePage }) => {
            await homePage.goto();
            console.log("Using auth file at:", authFile);
            await page.getByRole("link", { name: "Logout" }).click();
            await expect(page.getByText("Login to your account")).toBeVisible();
        });
    });
});

