import { test, expect } from "@playwright/test";
import { SignupLoginPage } from "@pages/signup-login/signup-login.page";
import { HomePage } from "@pages/home/home.page";
import { registerUser } from "@datafactory/register";
import * as fs from "fs";
import * as path from "path";

const authFile = path.join(__dirname, '../../.auth/user01Auth.json');

test.describe("Login with pom", () => {
    test("login existing user with pom", async ({ page }) => {
        const loginPage = new SignupLoginPage(page);
        await loginPage.goto();
        await page.getByRole("button", { name: "Consent" }).click();
        
        const registeredUserPath = path.join(process.cwd(), '.auth/registeredUser.json');
        const registeredUser = JSON.parse(fs.readFileSync(registeredUserPath, 'utf-8'));
        
        await loginPage.login(registeredUser.email, registeredUser.password);
        await expect(page.getByText(`Logged in as`)).toBeVisible();
    });
});

test.describe("Failed Login User Suite pom", () => {

    test("login with incorrect credentials", async ({ page }) => {
        const loginPage = new SignupLoginPage(page);
        await loginPage.goto();
        await page.getByRole("button", { name: "Consent" }).click();
        await loginPage.login('wrongEmail@test.test', 'wrongPassword');
        await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
    });
});

test.describe("Logout User Suite pom", () => {
    test.use({ storageState: authFile });
    test("logout user", async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await page.getByRole("link", { name: "Logout" }).click();
        await expect(page.getByText("Login to your account")).toBeVisible();
    });
});


test.skip("Login new User with datafactory", async ({ page }) => {
    const testEmail = `testuser_${Date.now()}@test.test`;
    const testPassword = "Test@12345";
    await registerUser(testEmail, testPassword);
    console.log(`Registered new user with email: ${testEmail} and password: ${testPassword}`);
    await expect(page.getByText("Login to your account")).toBeVisible();

});
