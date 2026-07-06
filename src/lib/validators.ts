import { z } from 'zod';

// ─── Auth Schemas ───────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be under 50 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[0-9]/, 'Password must contain a number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

// ─── Organization Schemas ───────────────────────────────
export const organizationSchema = z.object({
  name: z
    .string()
    .min(1, 'Organization name is required')
    .min(2, 'Must be at least 2 characters')
    .max(100, 'Must be under 100 characters'),
});

export const inviteMemberSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  role: z.enum(['developer', 'member'] as const),
});

// ─── API Key Schema ─────────────────────────────────────
export const apiKeySchema = z.object({
  name: z
    .string()
    .min(1, 'Key name is required')
    .min(2, 'Must be at least 2 characters')
    .max(50, 'Must be under 50 characters'),
});

// ─── Profile Schema ─────────────────────────────────────
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Must be at least 2 characters'),
  email: z.string().email('Invalid email').optional(),
});

// ─── Inferred Types ─────────────────────────────────────
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type OrganizationFormData = z.infer<typeof organizationSchema>;
export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;
export type ApiKeyFormData = z.infer<typeof apiKeySchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
