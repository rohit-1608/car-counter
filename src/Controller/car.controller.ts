import Car from "../Models/Car";
import User from "../Models/User";
import UserCar from "../Models/CarUser";

import { Request, Response } from "express";

export const createCar = async (req: Request, res: Response) => {
  const { name, count, userId } = req.body;

  try {
    // Check if the user exists in the User model
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const carUser = await Car.findOne({ user: user._id, name: name });
    console.log("carUser", carUser);
    if (carUser) {
      throw new Error("Car already present. edit it");
    }
    const car = new Car({
      name,
      count,
      user: user,
    });
    await car.save();

    // Find the UserCar and push the car to the cars array
    const userCar = await UserCar.findOne({ user: user._id });
    if (userCar) {
      userCar.cars.push(car._id);
      await userCar.save();

      res.status(201).json({ car });
    } else {
      res.status(400).json({ error: "Error while saving" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserCars = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await UserCar.findOne({ user: userId }).populate("cars");
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ cars: user.cars });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const editUserCar = async (req: Request, res: Response) => {
  //   const { userId, carId } = req.params;
  const { userId, carId, name, count } = req.body;
  console.log("carId", carId);
  try {
    const user = await UserCar.findOne({ user: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const car = await Car.findByIdAndUpdate(
      carId,
      { name, count },
      { new: true }
    );
    if (!car) {
      throw new Error("Car not found");
    }
    res.status(200).json({ car });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUserCar = async (req: Request, res: Response) => {
  const { userId, carId } = req.body;
  console.log(userId, carId);

  try {
    const user = await UserCar.findOne({ user: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const car = await Car.findByIdAndDelete(carId);
    if (!car) {
      throw new Error("Car not found");
    }
    // @ts-ignore
    user.cars.pull(carId);
    await user.save();
    res.status(200).json("Deleted");
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
