import { pgTable, text } from 'drizzle-orm/pg-core';
import { pgCuid2 } from 'drizzle-cuid2';

export const recipes = pgTable('recipes', {
  id: pgCuid2('uid').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});
