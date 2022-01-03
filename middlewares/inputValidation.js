import { body, validationResult } from "express-validator";

export const validateBody = () => {
  return [
    body("first_name").isLength({ min: 2 }),
    body("last_name").isLength({ min: 3 }),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};
