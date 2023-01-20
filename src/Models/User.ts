import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  try {
    return await bcrypt.compare(password, user.password);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default mongoose.model("User", userSchema);
