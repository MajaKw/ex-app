import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from '@/src/db/schema';
import pg from 'pg';
import { users } from "@/src/db/schema";

export const client = new pg.Client({
    host: process.env.HOST,
    port: process.env.PORT_DB ? parseInt(process.env.PORT_DB, 10) : undefined,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
await client.connect();
export const db = drizzle(client, { schema });
