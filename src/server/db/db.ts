type User = { id: string; name: string };
import { drizzle } from "drizzle-orm/node-postgres";
import pg from 'pg';
import * as schema from "@/src/db/schema"

// or
// console.log({
//   host: process.env.HOST,
//   port: Number(process.env.PORT),
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// })
export const client = new pg.Client({
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  console.log("das")
  await client.connect();
  export const db = drizzle(client, {schema});