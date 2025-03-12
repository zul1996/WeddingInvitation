import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@/middleware/authMiddleware";
import User from "@/models/User";
import connectDB from "@/utils/dbConnect";

const getMe = authenticate(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await User.findById((req as any).user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  }
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  if (req.method === "GET") return getMe(req, res);
  return res.status(405).json({ error: "Method Not Allowed" });
}
