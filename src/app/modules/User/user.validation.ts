import { z } from 'zod';

const userCreateValidationNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'Name can not be more than 20 characters')
    .min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
});

const createUserValidationSchema = z.object({
  body: z.object({
    user: z.object({
      // Id : z.number({message : "Id is required"}),
      password: z
        .string()
        .min(5, { message: 'password can not be less then 5 characters' })
        .max(10, { message: 'password can not be more than 10 characters' })
        .optional(),
      name: userCreateValidationNameSchema,
      email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required'),
      role: z.string(),
      image : z.string(),
      isActive : z.boolean().default(false)
    }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    isActive : z.boolean()
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
