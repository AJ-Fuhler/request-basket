import { Pool } from "pg";

const pgURI = process.env.PG_DATABASE_URI;
if (!pgURI) throw new Error('PG_URI not set in .env');

export const pool = new Pool({
    connectionString: pgURI,
});
