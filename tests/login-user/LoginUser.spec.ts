import { test, expect } from "@fixtures/pages.fixtures";
import * as fs from "node:fs";
import * as path from "node:path";

const authFile = path.join(__dirname, '../../.auth/user01Auth.json');

test.describe("User Login Suite", () => {
    test.describe("Login", () => {
        const registeredUserPath = path.join(process.cwd(), '.auth/registeredUser.json');
        const registeredUser = (() => {
            try {
                if (fs.existsSync(registeredUserPath)) {
                    return JSON.parse(fs.readFileSync(registeredUserPath, 'utf-8'));
                }
                return null;
            } catch (error) {
                console.warn(`Could not read registered user file at ${registeredUserPath}:`, error);
                return null;
            }
        })();

        test.beforeEach(async ({ homePage, page }) => {
            await test.step("1. Launch browser and 2. Navigate to home page", async () => {
                await homePage.goto();
            });

            await test.step("3. Verify that home page is visible successfully", async () => {
                await page.waitForLoadState('networkidle');
                await homePage.popupConsent();
                await expect(homePage.locatorHomepageHeader).toBeVisible();
            });

            await test.step("4. Click on 'Signup / Login' button", async () => {
                await homePage.navigateToSignupLogin();
            });

            await test.step("5. Verify 'Login to your account' is visible", async () => {
                await expect(page.getByRole("heading", { name: "Login to your account" })).toBeVisible();
            });
        });

        test.afterEach(async ({ page }) => {
            await page.close();
        });

        test("Test Case 2: Login User with correct email and password", async ({ page, homePage, signupLoginPage }) => {

            await test.step("6. Enter correct email address and password", async () => {
                await signupLoginPage.loginForm(registeredUser.email, registeredUser.password);
            });

            await test.step("7. Click 'Login' button", async () => {
                await signupLoginPage.submitLogin();
            });

            await test.step("8. Verify that 'Logged in as username' is visible", async () => {
                await expect(page.getByText(`Logged in as ${registeredUser.name}`)).toBeVisible();
            });
        });

        test("Test Case 3: Login User with incorrect email and password", async ({ page, homePage, signupLoginPage }) => {

            await test.step("6. Enter incorrect email address and password", async () => {
                await signupLoginPage.loginForm('wrongEmail@test.test', 'wrongPassword');
            });

            await test.step("7. Click 'Login' button", async () => {
                await signupLoginPage.submitLogin();
            });

            await test.step("8. Verify that 'Your email or password is incorrect!' is visible", async () => {
                await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
            });
        });

        test("Test Case 4: Logout user after login", async ({ page, homePage, signupLoginPage }) => {

            await test.step("6. Enter correct email address and password", async () => {
                await signupLoginPage.loginForm(registeredUser.email, registeredUser.password);
            });

            await test.step("7. Click 'Login' button", async () => {
                await signupLoginPage.submitLogin();
            });

            await test.step("8. Verify that 'Logged in as username' is visible", async () => {
                await expect(page.getByText(`Logged in as ${registeredUser.name}`)).toBeVisible();
            });

            await test.step("9. Click 'Logout' button", async () => {
                await page.getByRole("link", { name: " Logout" }).click();
            });

            await test.step("10. Verify that user is navigated to login page", async () => {
                await expect(page.getByText("Login to your account")).toBeVisible();
            });
        });


    });
});

