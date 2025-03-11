import mongoose from "mongoose";


export interface IGuest extends Document {
  name: string;
  email: string;
  phone?: string;
  invitationId: mongoose.Types.ObjectId;
  status: "pending" | "attending" | "not attending";
  createdAt?: Date;
  updatedAt?: Date;
}