import { expect, request } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export async function registerUser(email: string, password: string) {
    const baseUrl = process.env.BASE_URL;
    const createRequestContext = await request.newContext();
    const response = await createRequestContext.post(
        baseUrl + '/signup',
        {
            // data: 'csrfmiddlewaretoken=BcXv1BUsLyCJRS50WNvjCW2yyCaQYUalsK75WXiXkiH6Do1u4NbVUirYN28q80Rp&name=fdvfd&email_address=fgbgfbgfbgfgf@fgbfgfg.hgnhg&password=123456&days=1&months=1&years=2008&newsletter=1&optin=1&first_name=dscsddfvdf&last_name=fdvdf&company=fdvfdfdvdf&address1=vfdvdf&address2=&country=United+States&state=fdvdf&city=fvdf&zipcode=123456&mobile_number=1233456&form_type=create_account',
            data: {
                csrfmiddlewaretoken: "BcXv1BUsLyCJRS50WNvjCW2yyCaQYUalsK75WXiXkiH6Do1u4NbVUirYN28q80Rp",
                name: "fdvfd",
                email_address: email,
                password: password,
                days: "1",
                months: "1",
                years: "2008",
                newsletter: "1",
                optin: "1",
                first_name: "dscsddfvdf",
                last_name: "fdvdf",
                company: "fdvfdfdvdf",
                address1: "vfdvdf",
                address2: "",
                country: "United States",
                state: "fdvdf",
                city: "fvdf",
                zipcode: "123456",
                mobile_number: "1233456",
                form_type: "create_account"
            },
        });

    expect(response.status()).toBe(201);
    return response.status();
}

export async function generateRandomUser() {
    const randomUser = {
        username: `test_user_${Date.now()}`,
        email: `test${Date.now()}@test.test`,
        password: "test!234567",
        firstName: "test_user",
        lastName: "test_lastName",
        company: "test_company",
        address: "test_address",
        country: "United States",
        state: "Texas",
        city: "Texas",
        zipcode: "123456",
        mobileNumber: "123456",
    };

    const authDir = path.join(process.cwd(), ".auth");
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    const filePath = path.join(authDir, "registeredUser.json");
    fs.writeFileSync(filePath, JSON.stringify(randomUser, null, 2));

    return randomUser;
}