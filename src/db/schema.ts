import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, numeric } from 'drizzle-orm/pg-core';


export const users = pgTable('users', {
  id: varchar('id').primaryKey(),  
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('name', { length: 256 }).unique(),
  userId: varchar('user_id').references(() => users.id) 
});


