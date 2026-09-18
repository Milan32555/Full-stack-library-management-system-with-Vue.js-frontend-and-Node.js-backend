import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

let cachedSql = null;

export function getSql() {
  if (cachedSql) return cachedSql;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL in .env");
  }

  cachedSql = neon(databaseUrl);
  return cachedSql;
}
