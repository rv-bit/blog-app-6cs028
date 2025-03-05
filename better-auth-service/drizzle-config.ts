import "dotenv/config";
import { type Config, defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "mysql",
	out: "./src/services/database/migrations",
	schema: "./src/services/database/schema.ts",

	dbCredentials: {
		url: process.env.DB_URL,
	},

	verbose: true,
	strict: true,
} as Config);
