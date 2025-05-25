import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
  body("fullName", "Please provide your name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar URL").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Enter a post title").isLength({ min: 3 }).isString(),
  body("text", "Enter the post content").isLength({ min: 3 }).isString(),
  body("tags", "Invalid tags format").optional().isString(),
  body("imageUrl", "Invalid image URL").optional().isString(),
];

export const commentCreateValidation = [
  body("text", "Enter the comment content").isLength({ min: 3 }).isString(),
];
