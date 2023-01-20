import express from "express";
import { register, login } from "./Controller/user.controller";

import {
  createCar,
  getUserCars,
  editUserCar,
  deleteUserCar,
} from "./Controller/car.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/car", createCar);
router.get("/car", getUserCars);
router.patch("/car", editUserCar);
router.delete("/car", deleteUserCar);

export default router;
