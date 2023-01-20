"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./Controller/user.controller");
const car_controller_1 = require("./Controller/car.controller");
const router = express_1.default.Router();
router.post("/register", user_controller_1.register);
router.post("/login", user_controller_1.login);
router.post("/car", car_controller_1.createCar);
router.get("/car", car_controller_1.getUserCars);
router.patch("/car", car_controller_1.editUserCar);
router.delete("/car", car_controller_1.deleteUserCar);
exports.default = router;
