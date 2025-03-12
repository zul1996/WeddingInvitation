import { NextApiRequest, NextApiResponse } from "next";
import { registerUser, loginUser } from "@/services/authService";

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newUser = await registerUser(req.body);
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    return res.status(200).json({ token, user });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
