import User from "../Models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserCar from "../Models/CarUser";

import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "secret_key");
    res.status(201).json({ token });

    //save the username in usercar model
    const userCar = new UserCar({
      name: username,
    });
    await userCar.save();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    const token = jwt.sign({ userId: user._id }, "secret_key");
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
