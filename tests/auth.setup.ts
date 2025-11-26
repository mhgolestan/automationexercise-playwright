import { test as setup } from "@playwright/test";
import { registerUser } from "@datafactory/register";
import * as path from "node:path";

const user01AuthFile = path.join(__dirname, '../.auth/user01Auth.json');
setup.use({
  headless: true,
});

setup("Create user before tests", async ({ page, context }) => {
  await registerUser();

  await context.storageState({ path: user01AuthFile });
});