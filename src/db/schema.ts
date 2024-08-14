import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, numeric } from 'drizzle-orm/pg-core';

// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);



export const users = pgTable('users',{
  id: serial('user_id').primaryKey(),
  email: varchar('email', {length: 256}).unique(),
  username: varchar('username', {length: 256}).unique(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 256}).unique(),
  taskId: integer('task_id').references(() => users.id)
})
