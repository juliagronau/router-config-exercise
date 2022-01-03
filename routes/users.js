import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/users.js";
import { checkUser } from "../middlewares/checkUser.js";
import {
  validate,
  validateBody,
} from "../middlewares/inputValidation.js";

const users = express.Router();

users
  .route("/")
  .get(getAllUsers)
  .post(validateBody(), validate, createUser);
users
  .route("/:id")
  .get(checkUser, getSingleUser)
  .put(checkUser, updateUser)
  .delete(checkUser, deleteUser);

export default users;
