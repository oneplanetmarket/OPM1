import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// User table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  cart: text('cart').array().default([]),
  createdAt: timestamp('created_at').defaultNow(),
});

// Product table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  image: text('image').array().default([]),
  category: text('category').notNull(),
  stock: integer('stock').default(0),
  sellerId: integer('seller_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Order table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  products: text('products').array().notNull(),
  totalAmount: integer('total_amount').notNull(),
  status: text('status').default('pending'),
  paymentMethod: text('payment_method'),
  shippingAddress: text('shipping_address'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Address table
export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  street: text('street').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipCode: text('zip_code').notNull(),
  country: text('country').notNull(),
  isDefault: boolean('is_default').default(false),
});

// Producer Application table
export const producerApplications = pgTable('producer_applications', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  businessType: text('business_type'),
  description: text('description'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertAddressSchema = createInsertSchema(addresses).omit({ id: true });
export const insertProducerApplicationSchema = createInsertSchema(producerApplications).omit({ id: true, createdAt: true });

// TypeScript types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Address = typeof addresses.$inferSelect;
export type InsertAddress = z.infer<typeof insertAddressSchema>;
export type ProducerApplication = typeof producerApplications.$inferSelect;
export type InsertProducerApplication = z.infer<typeof insertProducerApplicationSchema>;