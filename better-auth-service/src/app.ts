import { Hono } from "hono";

import { auth } from "@/utils/auth";

const app = new Hono<{
	// types for any body context of session or user
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>();

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

app.get("/", (c) => c.text("Hello Bun!"));

export default app;
