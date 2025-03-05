import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "@/services/database/database";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "mysql",
	}),
	basePath: "/auth",
	appName: "better-auth-service",
	plugins: [],
});
