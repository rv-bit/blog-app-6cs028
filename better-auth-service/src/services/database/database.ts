import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";

const pool = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

const db = drizzle({
	client: pool,
});

export default db;
