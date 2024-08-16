import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, numeric } from 'drizzle-orm/pg-core';

export const users = pgTable('users',{
  id: varchar('id').primaryKey(),
});

export const tasks = pgTable('tasks', {
  id: varchar('id').primaryKey(),
  name: varchar('name', {length: 256}).unique(),
  userId: varchar('id').references(() => users.id)
})

