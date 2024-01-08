import * as z from "zod";

export const signupValidation = z.object({
  name: z.string().min(2, {message: 'Too Short'}),
  username: z.string().min(2, {message: 'username is short'}),
  email: z.string().min(2, {message: 'invalid email'}),
  password: z.string().min(2, {message: 'password too short'})
});
export const signinValidation = z.object({
  email: z.string().min(2, {message: 'invalid email'}),
  password: z.string().min(2, {message: 'password too short'})
});

export const postValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});