import * as fs from "node:fs";
import * as path from "node:path";

export interface RegisteredUser {
  name: string;
  email: string;
  password: string;
}

export function getRegisteredUser(): RegisteredUser | null {
  const registeredUserPath = path.join(process.cwd(), '.auth/registeredUser.json');
  try {
    if (fs.existsSync(registeredUserPath)) {
      return JSON.parse(fs.readFileSync(registeredUserPath, 'utf-8'));
    }
    return null;
  } catch (error) {
    console.warn(`Could not read registered user file at ${registeredUserPath}:`, error);
    return null;
  }
}
