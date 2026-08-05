import { z } from "zod";

import { serviceCategories } from "@/config/site";

const categoryValues = serviceCategories.map((c) => c.slug) as [string, ...string[]];

/**
 * A honeypot field: real users leave it empty; bots tend to fill it. It must
 * pass validation (so we can detect + silently drop in the route, returning a
 * normal 200 rather than a 422 that would reveal the trap). Length-capped only.
 */
export const honeypot = z.string().max(200).optional();

/** Shared schema for the contact / custom-quote lead form (client + API). */
export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(20).optional().or(z.literal("")),
  service: z.enum(categoryValues).optional().or(z.literal("")),
  budget: z.string().max(40).optional(),
  message: z.string().min(10, "Tell me a bit more (min 10 chars)").max(2000),
  // Anti-spam honeypot (hidden in the UI).
  company: honeypot,
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Customer contact details collected at checkout (before opening Razorpay). */
export const customerSchema = z.object({
  name: z.string().min(2, "Enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone")
    .max(20)
    .regex(/^[+\d][\d\s-]{6,}$/, "Enter a valid phone"),
});

export type CustomerInput = z.infer<typeof customerSchema>;

/** Payload for creating a Razorpay order. */
export const createOrderSchema = z.object({
  packageId: z.string().min(1).max(120),
  paymentType: z.enum(["full", "deposit"]).default("full"),
  customer: customerSchema,
});

/** Project brief submitted on the success page after payment. */
export const intakeSchema = z.object({
  orderRef: z.string().min(6).max(80),
  footageUrl: z.string().url("Enter a valid link (Drive/Dropbox/WeTransfer)").max(500),
  brief: z.string().min(10, "Add a short brief (min 10 chars)").max(4000),
  deadline: z.string().max(60).optional().or(z.literal("")),
  company: honeypot,
});

export type IntakeInput = z.infer<typeof intakeSchema>;
