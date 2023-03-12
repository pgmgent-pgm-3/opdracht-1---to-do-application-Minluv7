import { body } from "express-validator";

export default [
  body("email").isEmail().withMessage("geef een geldig e-mailadres op"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("het wachtwoord moet tussen 8 en 20 karakters lang zijn"),
];
