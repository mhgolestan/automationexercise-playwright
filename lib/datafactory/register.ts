import { expect, request } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

export function generateUserData() {
    return {
        name: "JohnDoe92",
        email: `user_${Date.now()}@example.com`,
        password: "P@ssw0rd123!",
        title: "Mr",
        birth_date: "15",
        birth_month: "June",
        birth_year: "1992",
        firstname: "John",
        lastname: "Doe",
        company: "TechNova Solutions",
        address1: "123 Elm Street",
        address2: "Apt 4B",
        country: "United States",
        zipcode: "90210",
        state: "California",
        city: "Los Angeles",
        mobile_number: "+1 555 908 4421"
    };
}


export async function registerUser() {
    const user = generateUserData();

    const context = await request.newContext();

    const response = await context.post(
        process.env.BASE_URL + "/api/createAccount",
        {
            form: user
        }
    );
    expect(response.statusText()).toBe("OK");

    const authDir = path.join(process.cwd(), ".auth");
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    const filePath = path.join(authDir, "registeredUser.json");
    fs.writeFileSync(filePath, JSON.stringify(user, null, 2));

    return response.status();
}