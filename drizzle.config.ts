import { defineConfig } from "drizzle-kit";
import './envConfig'

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./migrations",

  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  }
});
