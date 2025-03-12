import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (data: any) => {
  const { username, email, password, firstName, lastName, role } = data;

  // Cek apakah user sudah ada
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const newUser = new User({
    username,
    email,
    password,
    firstName,
    lastName,
    role,
    accessExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 hari
  });

  await newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!user.isActive) throw new Error("Account is disabled");

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user };
};
