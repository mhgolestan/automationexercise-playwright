import { expect, request } from "@playwright/test";
import { faker } from "@faker-js/faker";

import * as fs from "node:fs";
import * as path from "node:path";

export function generateUserData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
        name: faker.internet.username({ firstName, lastName }),
        email: faker.internet.email({ firstName, lastName }),
        password: faker.internet.password({ length: 12, memorable: false }),
        title: faker.helpers.arrayElement(["Mr", "Mrs", "Miss"]),
        birth_date: faker.number.int({ min: 1, max: 28 }).toString(),
        birth_month: faker.date.month(),
        birth_year: faker.number.int({ min: 1950, max: 2005 }).toString(),
        firstname: firstName,
        lastname: lastName,
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        country: faker.helpers.arrayElement([
            "India",
            "United States",
            "Canada",
            "Australia",
            "Israel",
            "New Zealand",
            "Singapore"
        ]),
        zipcode: faker.location.zipCode(),
        state: faker.location.state(),
        city: faker.location.city(),
        mobile_number: faker.phone.number()
    };
}


export async function registerUser() {
    const user = generateUserData();

    const context = await request.newContext();

    const response = await context.post(
        process.env.BASE_URL_API + "/createAccount",
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