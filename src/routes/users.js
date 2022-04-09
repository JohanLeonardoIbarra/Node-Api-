import express from "express";
//import controllers from "./controllers/users";
import usersController from "../controller/users/index";

const router = express.Router();
//Routes
router.post("/register", usersController.register);

export default router;