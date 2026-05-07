import {
  integer,
  pgTable,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export type BillingCycle = "monthly" | "yearly" | "weekly";
export type Category =
  | "streaming"
  | "music"
  | "software"
  | "gaming"
  | "news"
  | "fitness"
  | "other";

const DB_PREFIX = "sm_";

const prefixedTable = (tableName: string) => `${DB_PREFIX}${tableName}`;

export type Plan = "starter" | "pro";

export const usersTable = pgTable(prefixedTable("users"), {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  activated: boolean().default(false),
  email: varchar().notNull().unique(),
  passwordHash: varchar().notNull(),
  plan: varchar({ length: 20 }).notNull().default("starter").$type<Plan>(),
});

export const sessionsTable = pgTable(prefixedTable("sessions"), {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  tokenHash: varchar().notNull().unique(),
  expireAt: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const activationTokensTable = pgTable(
  prefixedTable("activation_tokens"),
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    tokenHash: varchar().notNull().unique(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
);

export const subscriptionsTable = pgTable(prefixedTable("subscriptions"), {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  name: varchar({ length: 100 }).notNull(),
  price: integer().notNull(), // stored in grosze (1 PLN = 100 grosze)
  currency: varchar({ length: 10 }).notNull().default("PLN"),
  billingCycle: varchar({ length: 20 }).notNull().$type<BillingCycle>(),
  nextRenewalDate: timestamp().notNull(),
  category: varchar({ length: 50 }).$type<Category>(),
  emoji: varchar({ length: 10 }),
  notes: varchar({ length: 500 }),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp().defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
  activationTokens: many(activationTokensTable),
  subscriptions: many(subscriptionsTable),
}));

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const activationTokensRelations = relations(
  activationTokensTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [activationTokensTable.userId],
      references: [usersTable.id],
    }),
  }),
);

export const subscriptionsRelations = relations(
  subscriptionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [subscriptionsTable.userId],
      references: [usersTable.id],
    }),
  }),
);

export const schema = {
  usersTable,
  sessionsTable,
  activationTokensTable,
  subscriptionsTable,
  usersRelations,
  sessionsRelations,
  activationTokensRelations,
  subscriptionsRelations,
};
