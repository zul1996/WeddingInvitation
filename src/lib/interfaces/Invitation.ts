import mongoose from "mongoose";


export interface IInvitation extends Document {
  guestName: mongoose.Types.ObjectId;
  weddingId: mongoose.Types.ObjectId;
  status: "pending" | "attending" | "not attending";
  createdAt?: Date;
  updatedAt?: Date;
}

