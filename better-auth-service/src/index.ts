import app from "./app";

Bun.serve({
	port: 8080,
	fetch: app.fetch,
});

console.log("Server started on port http://localhost:8080");
