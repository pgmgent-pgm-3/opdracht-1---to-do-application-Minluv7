import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import DataSource from "../lib/DataSource.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorsFields?.email ? req.formErrorsFields.email : null,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: req.body?.password ? req.body.password : "",
      error: req.formErrorsFields?.password
        ? req.formErrorsFields.password
        : null,
    },
  ];

  // render the register page
  res.render("register", {
    layout: "authentication",
    inputs,
    formErrors,
  });
};

export const login = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorsFields?.email ? req.formErrorsFields.email : null,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: req.body?.password ? req.body.password : "",
      error: req.formErrorsFields?.password
        ? req.formErrorsFields.password
        : null,
    },
  ];

  // render the login page
  res.render("login", {
    layout: "authentication",
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      //put the errorfields in the current request
      req.formErrorsFields = errorFields;

      return next();
    } else {
      // save the user to the database
      const userRepository = await DataSource.getRepository("User");

      // make with one email max one account
      const userExists = await userRepository.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        req.formErrors = [{ message: "Gebruiker bestaat al" }];
        return next();
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      //create a new user
      const user = await userRepository.create({
        email: req.body.email,
        password: hashedPassword,
      });

      // save the user
      await userRepository.save(user);

      res.redirect("/login");
    }
  } catch (e) {
    next(e.message);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      //put the errorfields in the current request
      req.formErrorsFields = errorFields;

      return next();
    } else {
      //get the user
      const userRepository = await DataSource.getRepository("User");

      // change email to lowercase letters
      const lwEmail = req.body.email.toLowerCase();

      // get a user with a specific email adress
      const user = await userRepository.findOne({
        where: {
          email: lwEmail,
        },
      });
      // authentication validation
      if (!user) {
        req.formErrors = [{ message: "gebruiker bestaat niet" }];
        return next();
      }

      // compare hashed password with saved hashed password
      const givenPassword = req.body.password;
      const dbPassword = user.password;
      const isAMatch = bcrypt.compareSync(givenPassword, dbPassword);

      //password check
      if (!isAMatch) {
        req.formErrors = [{ message: "wachtoord is niet correct" }];
        return next();
      }

      // create the JWT web token, aka our identity card
      const token = jwt.sign(
        { id: user.id, email: req.body.email },
        process.env.TOKEN_SALT,
        { expiresIn: "1h" }
      );

      //create a cookie and add this to the response
      res.cookie("token", token, { httpOnly: true });

      // redirect to our root
      res.redirect("/");
    }
  } catch (e) {
    next(e.message);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
};
