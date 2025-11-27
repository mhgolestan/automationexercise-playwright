import { test as setup } from "@playwright/test";
import { registerUser } from "@datafactory/register";
import * as path from "node:path";
import * as fs from "node:fs";

const authDir = path.join(__dirname, '../.auth');
const user01AuthFile = path.join(authDir, 'user01Auth.json');

setup.use({
  headless: true,
});

setup("Create user before tests", async ({ page, context }) => {
  // Ensure .auth directory exists
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  await registerUser();

  await context.storageState({ path: user01AuthFile });
});