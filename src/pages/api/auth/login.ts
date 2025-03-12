import { NextApiRequest, NextApiResponse } from "next";
import { login } from "@/controllers/authController";
import connectDB from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  
  if (req.method === "POST") return login(req, res);
  return res.status(405).json({ error: "Method Not Allowed" });
}
