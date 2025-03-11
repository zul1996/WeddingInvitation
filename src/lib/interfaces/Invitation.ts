import mongoose from "mongoose";


export interface IInvitation extends Document{
    guestName: String;
    weddingId: mongoose.Types.ObjectId;
    status: "pending" | "attending" | "not attending";
}

