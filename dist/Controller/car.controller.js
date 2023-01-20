"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserCar = exports.editUserCar = exports.getUserCars = exports.createCar = void 0;
const Car_1 = __importDefault(require("../Models/Car"));
const User_1 = __importDefault(require("../Models/User"));
const CarUser_1 = __importDefault(require("../Models/CarUser"));
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, count, userId } = req.body;
    try {
        // Check if the user exists in the User model
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const carUser = yield Car_1.default.findOne({ user: user._id, name: name });
        console.log("carUser", carUser);
        if (carUser) {
            throw new Error("Car already present. edit it");
        }
        const car = new Car_1.default({
            name,
            count,
            user: user,
        });
        yield car.save();
        // Find the UserCar and push the car to the cars array
        const userCar = yield CarUser_1.default.findOne({ user: user._id });
        if (userCar) {
            userCar.cars.push(car._id);
            yield userCar.save();
            res.status(201).json({ car });
        }
        else {
            res.status(400).json({ error: "Error while saving" });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createCar = createCar;
const getUserCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield CarUser_1.default.findOne({ user: userId }).populate("cars");
        if (!user) {
            throw new Error("User not found");
        }
        res.status(200).json({ cars: user.cars });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getUserCars = getUserCars;
const editUserCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { userId, carId } = req.params;
    const { userId, carId, name, count } = req.body;
    console.log("carId", carId);
    try {
        const user = yield CarUser_1.default.findOne({ user: userId });
        if (!user) {
            throw new Error("User not found");
        }
        const car = yield Car_1.default.findByIdAndUpdate(carId, { name, count }, { new: true });
        if (!car) {
            throw new Error("Car not found");
        }
        res.status(200).json({ car });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.editUserCar = editUserCar;
const deleteUserCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, carId } = req.body;
    console.log(userId, carId);
    try {
        const user = yield CarUser_1.default.findOne({ user: userId });
        if (!user) {
            throw new Error("User not found");
        }
        const car = yield Car_1.default.findByIdAndDelete(carId);
        if (!car) {
            throw new Error("Car not found");
        }
        // @ts-ignore
        user.cars.pull(carId);
        yield user.save();
        res.status(200).json("Deleted");
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteUserCar = deleteUserCar;
